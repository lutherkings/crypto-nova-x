"use client";
import Link from "next/link";
import { useState } from "react";
import AuthCard from "@/components/AuthCard";
import { api } from "@/lib/api";

export default function Register() {
  const [f, setF] = useState({ fullName: "", email: "", country: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    if (f.password !== f.confirm) return setErr("Passwords do not match.");
    if (!agree) return setErr("Please accept the terms and risk disclosure.");
    setBusy(true);
    try { await api("/auth/register", { method: "POST", body: { fullName: f.fullName, email: f.email, country: f.country, password: f.password } }); setDone(true); }
    catch (x) { setErr((x as Error).message); }
    setBusy(false);
  }
  if (done) return (
    <AuthCard title="Check your email" subtitle="If this email can be registered, a verification link is on its way. It expires in 24 hours.">
      <Link href="/login/" className="btn btn-gold w-full">Go to Log In</Link>
    </AuthCard>
  );
  return (
    <AuthCard title="Create your account" subtitle="Join Crypto Nova X.">
      <form onSubmit={submit} className="space-y-4">
        <input className="field" placeholder="Full name" autoComplete="name" required value={f.fullName} onChange={set("fullName")} />
        <input className="field" type="email" placeholder="Email" autoComplete="email" required value={f.email} onChange={set("email")} />
        <input className="field" placeholder="Country of residence" autoComplete="country-name" required value={f.country} onChange={set("country")} />
        <input className="field" type="password" placeholder="Password (10+ characters)" autoComplete="new-password" required minLength={10} value={f.password} onChange={set("password")} />
        <input className="field" type="password" placeholder="Confirm password" autoComplete="new-password" required value={f.confirm} onChange={set("confirm")} />
        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" className="mt-1" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>I have read the <Link href="/legal/terms/" className="text-gold">Terms</Link> and <Link href="/legal/risk-disclosure/" className="text-gold">Risk Disclosure</Link>. I understand returns are not guaranteed.</span>
        </label>
        {err && <p role="alert" className="text-sm text-bad">{err}</p>}
        <button className="btn btn-gold w-full" disabled={busy}>{busy ? "Creating..." : "Create Account"}</button>
      </form>
      <p className="mt-5 text-center text-sm text-muted">Already registered? <Link href="/login/" className="text-gold hover:underline">Log in</Link></p>
    </AuthCard>
  );
}
