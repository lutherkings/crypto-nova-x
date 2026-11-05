import Fastify, { FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { z } from "zod";
import { pool, initDb, logEvent } from "./db";

const JWT_SECRET = process.env.JWT_SECRET ?? "";
if (JWT_SECRET.length < 32) throw new Error("JWT_SECRET must be set and at least 32 characters");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL must be set");
const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

const app = Fastify({ logger: true, trustProxy: true });

const sha = (s: string) => crypto.createHash("sha256").update(s).digest("hex");

// SANDBOX: if RESEND_API_KEY is not set, emails are only written to the server log.
async function sendEmail(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) { app.log.warn({ to, subject, text }, "SANDBOX EMAIL - not sent (no RESEND_API_KEY)"); return; }
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.MAIL_FROM ?? "Crypto Nova X <onboarding@resend.dev>", to, subject, text }),
  });
}

function currentUserId(req: FastifyRequest): string | null {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer ")) return null;
  try { return (jwt.verify(h.slice(7), JWT_SECRET) as { sub: string }).sub; } catch { return null; }
}

const authLimit = { config: { rateLimit: { max: 8, timeWindow: "1 minute" } } };

async function main() {
  await initDb();
  await app.register(helmet);
  await app.register(rateLimit, { max: 100, timeWindow: "1 minute" });
  await app.register(cors, {
    origin: (process.env.ALLOWED_ORIGIN ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    methods: ["GET", "POST", "PATCH"],
  });

  app.get("/health", async () => ({ ok: true }));

  app.post("/auth/register", authLimit, async (req, reply) => {
    const p = z.object({
      email: z.string().email().max(200),
      password: z.string().min(10).max(128),
      fullName: z.string().min(2).max(100),
      country: z.string().min(2).max(60),
    }).safeParse(req.body);
    if (!p.success) return reply.code(400).send({ error: "Check your details. Password needs at least 10 characters." });
    const email = p.data.email.toLowerCase();
    const hash = await argon2.hash(p.data.password, { type: argon2.argon2id });
    const r = await pool.query(
      "INSERT INTO users (email, password_hash, full_name, country) VALUES ($1,$2,$3,$4) ON CONFLICT (email) DO NOTHING RETURNING id",
      [email, hash, p.data.fullName, p.data.country]);
    if (r.rowCount) {
      const id = r.rows[0].id as string;
      await pool.query("INSERT INTO kyc_records (user_id) VALUES ($1)", [id]);
      const token = crypto.randomBytes(32).toString("hex");
      await pool.query("INSERT INTO email_tokens (token_hash, user_id, purpose, expires_at) VALUES ($1,$2,'verify', now() + interval '24 hours')", [sha(token), id]);
      await sendEmail(email, "Verify your Crypto Nova X email", `Welcome to Crypto Nova X.\n\nVerify your email: ${APP_URL}/verify/?token=${token}\n\nThis link expires in 24 hours. We never ask for your password, private keys or seed phrase.`);
      await logEvent(id, "register", req.ip);
    }
    // Same answer whether or not the email already existed, so accounts cannot be probed.
    return reply.code(201).send({ ok: true });
  });

  app.post("/auth/verify-email", authLimit, async (req, reply) => {
    const p = z.object({ token: z.string().min(20).max(200) }).safeParse(req.body);
    if (!p.success) return reply.code(400).send({ error: "Invalid link." });
    const r = await pool.query("DELETE FROM email_tokens WHERE token_hash=$1 AND purpose='verify' AND expires_at > now() RETURNING user_id", [sha(p.data.token)]);
    if (!r.rowCount) return reply.code(400).send({ error: "This link is invalid or has expired." });
    await pool.query("UPDATE users SET email_verified = TRUE WHERE id=$1", [r.rows[0].user_id]);
    await logEvent(r.rows[0].user_id, "email_verified", req.ip);
    return { ok: true };
  });

  app.post("/auth/login", authLimit, async (req, reply) => {
    const p = z.object({ email: z.string().email(), password: z.string().min(1).max(128) }).safeParse(req.body);
    if (!p.success) return reply.code(400).send({ error: "Enter your email and password." });
    const r = await pool.query("SELECT id, password_hash, status FROM users WHERE email=$1", [p.data.email.toLowerCase()]);
    const u = r.rows[0];
    const ok = u && u.status === "active" && (await argon2.verify(u.password_hash, p.data.password));
    if (!ok) { await logEvent(u?.id ?? null, "login_failed", req.ip); return reply.code(401).send({ error: "Incorrect email or password." }); }
    await logEvent(u.id, "login", req.ip);
    return { token: jwt.sign({ sub: u.id }, JWT_SECRET, { expiresIn: "2h" }) };
  });

  const loadMe = async (id: string) => (await pool.query(
    `SELECT u.id, u.email, u.full_name AS "fullName", u.country, u.email_verified AS "emailVerified", k.status AS "kycStatus"
     FROM users u LEFT JOIN kyc_records k ON k.user_id = u.id WHERE u.id=$1`, [id])).rows[0];

  app.get("/me", async (req, reply) => {
    const id = currentUserId(req);
    if (!id) return reply.code(401).send({ error: "Please log in." });
    const me = await loadMe(id);
    return me ?? reply.code(401).send({ error: "Please log in." });
  });

  app.patch("/me", async (req, reply) => {
    const id = currentUserId(req);
    if (!id) return reply.code(401).send({ error: "Please log in." });
    const p = z.object({ fullName: z.string().min(2).max(100), country: z.string().min(2).max(60) }).safeParse(req.body);
    if (!p.success) return reply.code(400).send({ error: "Check your details." });
    await pool.query("UPDATE users SET full_name=$1, country=$2 WHERE id=$3", [p.data.fullName, p.data.country, id]);
    return loadMe(id);
  });

  // Phase 2: records basic details and marks KYC as pending. Staff review and a KYC vendor come in later phases.
  app.post("/kyc", async (req, reply) => {
    const id = currentUserId(req);
    if (!id) return reply.code(401).send({ error: "Please log in." });
    const p = z.object({ legalName: z.string().min(2).max(120), country: z.string().min(2).max(60) }).safeParse(req.body);
    if (!p.success) return reply.code(400).send({ error: "Check your details." });
    await pool.query("UPDATE kyc_records SET status='pending', legal_name=$1, country=$2, submitted_at=now() WHERE user_id=$3 AND status IN ('not_started','rejected')", [p.data.legalName, p.data.country, id]);
    await logEvent(id, "kyc_submitted", req.ip);
    return loadMe(id);
  });

  await app.listen({ port: Number(process.env.PORT ?? 8080), host: "0.0.0.0" });
}

main().catch((e) => { console.error(e); process.exit(1); });
