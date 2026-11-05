"use client";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { api } from "@/lib/api";
import type { User } from "@/components/AuthProvider";

const labels: Record<string, string> = { not_started: "Not started", pending: "Under review", approved: "Verified", rejected: "Needs attention" };

export default function Verification() {
  const { user, token, setUser } = useAuth();
  const [legalName, setLegalName] = useState(user?.fullName ?? "");
  const [country, setCountry] = useState(user?.country ?? "");
  const [err, setErr] = useState("");
  if (!user) return null;
  const canSubmit = user.kycStatus === "not_started" || user.kycStatus === "rejected";
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    try { setUser(await api<User>("/kyc", { method: "POST", token, body: { legalName, country } })); }
    catch (x) { setErr((x as Error).message); }
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold"><span className="gold-text">Identity verification</span></h1>
      <div className="card p-6"><p className="text-sm text-muted">Status</p><p className="mt-1 text-2xl font-bold">{labels[user.kycStatus] ?? user.kycStatus}</p></div>
      {canSubmit ? (
        <form onSubmit={submit} className="glass max-w-lg space-y-4 p-6">
          <p className="text-sm text-muted">Enter your legal name exactly as on your government ID. Document upload and automated checks will be added with our identity provider.</p>
          <input className="field" placeholder="Legal full name" required value={legalName} onChange={(e) => setLegalName(e.target.value)} />
          <input className="field" placeholder="Country of residence" required value={country} onChange={(e) => setCountry(e.target.value)} />
          {err && <p role="alert" className="text-sm text-bad">{err}</p>}
          <button className="btn btn-gold">Submit for review</button>
        </form>
      ) : <p className="text-muted">Your details are with our compliance team. We will notify you of the outcome.</p>}
    </div>
  );
}
