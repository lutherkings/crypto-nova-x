"use client";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { api } from "@/lib/api";
import type { User } from "@/components/AuthProvider";

export default function Profile() {
  const { user, token, setUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [country, setCountry] = useState(user?.country ?? "");
  const [msg, setMsg] = useState("");
  if (!user) return null;
  async function save(e: React.FormEvent) {
    e.preventDefault(); setMsg("");
    try { setUser(await api<User>("/me", { method: "PATCH", token, body: { fullName, country } })); setMsg("Saved."); }
    catch (x) { setMsg((x as Error).message); }
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold"><span className="gold-text">Profile</span></h1>
      <form onSubmit={save} className="glass max-w-lg space-y-4 p-6">
        <input className="field" value={user.email} disabled aria-label="Email" />
        <p className="text-xs text-muted">Email {user.emailVerified ? "verified" : "not yet verified"}.</p>
        <input className="field" placeholder="Full name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="field" placeholder="Country" required value={country} onChange={(e) => setCountry(e.target.value)} />
        {msg && <p role="status" className="text-sm text-muted">{msg}</p>}
        <button className="btn btn-gold">Save changes</button>
      </form>
    </div>
  );
}
