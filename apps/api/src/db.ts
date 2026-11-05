import { Pool } from "pg";
import { readFileSync } from "fs";
import { join } from "path";

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Creates tables on startup if they do not exist yet.
export async function initDb() {
  const sql = readFileSync(join(__dirname, "..", "schema.sql"), "utf8");
  await pool.query(sql);
}

export async function logEvent(userId: string | null, event: string, ip?: string) {
  try {
    await pool.query("INSERT INTO security_events (user_id, event, ip) VALUES ($1,$2,$3)", [userId, event, ip ?? null]);
  } catch { /* logging must never break a request */ }
}
