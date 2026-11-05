"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MiniChart from "@/components/MiniChart";
import { useAuth } from "@/components/AuthProvider";

const symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "BNBUSDT", "DOGEUSDT", "ADAUSDT"];
const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Overview() {
  const { user } = useAuth();
  if (!user) return null;
  // No ledger yet (Phase 6), so every balance is a true zero, never an invented number.
  const stats = [["Total account value", 0], ["Available balance", 0], ["Invested capital", 0]] as const;
  const activity = [
    "Account created",
    user.emailVerified ? "Email verified" : "Email not yet verified",
    user.kycStatus === "approved" ? "Identity verified" : user.kycStatus === "pending" ? "Identity verification under review" : "Identity verification not started",
  ];
  return (
    <div className="space-y-6">
      <Reveal>
        <h1 className="text-3xl font-bold md:text-4xl">Welcome, <span className="gold-text">{user.fullName.split(" ")[0]}</span></h1>
        {(!user.emailVerified || user.kycStatus !== "approved") && (
          <div className="glass mt-4 rounded-2xl p-4 text-sm text-muted">
            {!user.emailVerified && <p>Verify your email using the link we sent you. </p>}
            {user.kycStatus !== "approved" && <p>Complete <Link href="/dashboard/verification/" className="text-gold">identity verification</Link> to unlock deposits and trading.</p>}
          </div>
        )}
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(([t, v], i) => (
          <Reveal key={t} delay={i * 0.06}><div className="card p-5"><p className="text-sm text-muted">{t}</p><p className="mt-3 text-3xl font-extrabold">{money(v)}</p></div></Reveal>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Reveal><div className="card h-full p-6"><h2 className="text-xl font-semibold text-gold">Deposit</h2>
          <p className="mt-2 text-sm text-muted">Request a deposit through official support. Finance verifies every payment before your balance changes.</p>
          <Link href="/support/" className="btn btn-gold mt-5 w-full">Request a Deposit</Link></div></Reveal>
        <Reveal delay={0.06}><div className="card h-full p-6"><h2 className="text-xl font-semibold text-gold">Withdraw</h2>
          <p className="mt-2 text-sm text-muted">Request a withdrawal through official support. Requests are reviewed and confirmed before completion.</p>
          <Link href="/support/" className="btn btn-ghost mt-5 w-full">Request a Withdrawal</Link></div></Reveal>
        <Reveal delay={0.12}><div className="card h-full p-6"><h2 className="text-xl font-semibold text-gold">Auto Trade</h2>
          <p className="mt-2 text-sm text-muted">Choose an amount and strategy once your account is verified and funded. Outcomes are not guaranteed and capital is at risk.</p>
          <button disabled className="btn btn-ghost mt-5 w-full opacity-50">Not available yet</button></div></Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Reveal><div className="card p-6 md:col-span-2" style={{ background: "linear-gradient(135deg, rgba(32,185,129,.16), rgba(16,24,39,.6))" }}>
          <p className="text-sm text-muted">Total profit made</p>
          <p className="mt-3 text-5xl font-extrabold text-ok md:text-6xl">{money(0)}</p>
          <p className="mt-3 text-xs text-muted">Calculated only from verified trade execution records, after fees. Shows $0.00 until you have funded, settled activity.</p></div></Reveal>
        <Reveal delay={0.08}><div className="card h-full p-6"><h2 className="font-semibold">Activity</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">{activity.map((a) => (<li key={a} className="flex gap-2"><span className="text-gold">•</span>{a}</li>))}</ul></div></Reveal>
      </div>

      <Reveal><div>
        <h2 className="mb-4 text-2xl font-bold">Live <span className="gold-text">markets</span></h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{symbols.map((s) => <MiniChart key={s} symbol={"BINANCE:" + s} />)}</div>
        <p className="mt-3 text-xs text-muted">Public market data by TradingView. Not Crypto Nova X trading performance.</p>
      </div></Reveal>
    </div>
  );
}
