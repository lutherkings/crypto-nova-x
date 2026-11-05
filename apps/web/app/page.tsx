import Link from "next/link";
import Reveal from "@/components/Reveal";
import LiveTicker from "@/components/LiveTicker";
import { bp, faqs, rewards, strategies, tiers } from "@/lib/site";

const steps = [
  ["Create an account", "Register and complete identity verification."],
  ["Request a deposit", "Contact official support, who raise a tracked request."],
  ["Choose a strategy", "Pick an amount, duration and read the agreement."],
  ["Track and withdraw", "Follow real execution records and request withdrawals."],
];
const why = [
  ["Transparent", "Performance comes only from verifiable execution records."],
  ["Verified money movement", "Finance independently confirms every deposit and withdrawal."],
  ["Secure by design", "MFA, role-based admin access and full audit trails."],
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="beam" aria-hidden />
        <div className="planet" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 pb-10 pt-14 text-center md:pt-24">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${bp}/emblem.jpeg`} alt="Crypto Nova X emblem" className="float mx-auto mb-6 w-28 md:w-36" style={{ mixBlendMode: "lighten" }} />
            <span className="glass inline-block rounded-full px-4 py-1.5 text-xs tracking-[0.2em] text-gold">BEYOND CAPITAL. BEYOND POSSIBILITIES.</span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] md:text-7xl">A New Perspective on <span className="gold-text">Digital Asset Investing.</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">Discover a more informed approach to cryptocurrency investing through transparent strategies, real market activity and professional portfolio management.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/markets/" className="btn btn-gold">Open Live Markets</Link>
              <Link href="/strategies/" className="btn btn-ghost">Explore Investment Strategies</Link>
              <Link href="/register/" className="btn btn-ghost">Create an Account</Link>
            </div>
          </Reveal>
        </div>
        <div className="relative mx-auto max-w-5xl px-5 pb-16">
          <Reveal delay={0.2}><div className="glass rounded-3xl p-4 md:p-6"><LiveTicker /></div></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal><h2 className="text-3xl font-bold">Investment <span className="gold-text">strategies</span></h2>
          <p className="mt-3 max-w-2xl text-muted">Choose an amount and a duration. Strategy terms, risk classification and fees are shown before you confirm. Outcomes are not guaranteed.</p></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {strategies.map((s, i) => (<Reveal key={s.name} delay={i * 0.1}><div className="card p-6"><h3 className="text-xl font-semibold">{s.name}</h3><p className="mt-2 text-gold">{s.duration}</p></div></Reveal>))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
          {tiers.map((t) => (<div key={t.name} className="card p-4 text-center"><p className="font-semibold">{t.name}</p><p className="mt-1 text-xs text-muted">{t.range}</p></div>))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal><h2 className="text-3xl font-bold">Live <span className="gold-text">markets</span></h2>
          <p className="mt-3 text-muted">Interactive candlestick charts with intervals from 1 minute to 1 day, powered by real exchange data.</p>
          <Link href="/markets/" className="btn btn-gold mt-6">Open Live Markets</Link></Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal><h2 className="text-3xl font-bold">How it <span className="gold-text">works</span></h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map(([t, d], i) => (<Reveal key={t} delay={i * 0.08}><div className="card h-full p-6"><p className="text-3xl font-bold text-gold2">0{i + 1}</p><h3 className="mt-2 font-semibold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></div></Reveal>))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal><h2 className="text-3xl font-bold">Why <span className="gold-text">Crypto Nova X</span></h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {why.map(([t, d], i) => (<Reveal key={t} delay={i * 0.1}><div className="card h-full p-6"><h3 className="font-semibold text-gold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></div></Reveal>))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal><h2 className="text-3xl font-bold">Rewards and <span className="gold-text">giveaways</span></h2>
          <p className="mt-3 text-muted">No deposit or investment is required to enter. Dates, rules and eligibility will be published per campaign.</p></Reveal>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {rewards.map((r) => (<div key={r} className="card p-5 font-medium">{r}</div>))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12">
        <Reveal><h2 className="text-3xl font-bold">Frequently asked <span className="gold-text">questions</span></h2></Reveal>
        <div className="mt-6 space-y-3">
          {faqs.map(([q, a]) => (<details key={q} className="card group p-5"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-3 text-sm text-muted">{a}</p></details>))}
        </div>
      </section>
    </main>
  );
}
