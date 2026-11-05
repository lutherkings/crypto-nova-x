"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthCard from "@/components/AuthCard";
import { useAuth } from "@/components/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setBusy(true);
    try { await login(email, password); router.push("/dashboard/"); }
    catch (x) { setErr((x as Error).message); }
    setBusy(false);
  }
  return (
    <AuthCard title="Welcome back" subtitle="Log in to your Crypto Nova X account.">
      <form onSubmit={submit} className="space-y-4">
        <input className="field" type="email" placeholder="Email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="field" type="password" placeholder="Password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {err && <p role="alert" className="text-sm text-bad">{err}</p>}
        <button className="btn btn-gold w-full" disabled={busy}>{busy ? "Logging in..." : "Log In"}</button>
      </form>
      <p className="mt-5 text-center text-sm text-muted">New here? <Link href="/register/" className="text-gold hover:underline">Create an account</Link></p>
    </AuthCard>
  );
}
