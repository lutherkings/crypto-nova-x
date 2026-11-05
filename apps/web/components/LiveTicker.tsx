"use client";
import { useEffect, useState } from "react";

const coins: [string, string, string][] = [["bitcoin", "BTC", "Bitcoin"], ["ethereum", "ETH", "Ethereum"], ["solana", "SOL", "Solana"], ["ripple", "XRP", "XRP"], ["binancecoin", "BNB", "BNB"], ["dogecoin", "DOGE", "Dogecoin"]];
type D = Record<string, { usd: number; usd_24h_change: number }>;

export default function LiveTicker() {
  const [d, setD] = useState<D | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    let on = true;
    const load = async () => {
      try {
        const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=" + coins.map((c) => c[0]).join(",") + "&vs_currencies=usd&include_24hr_change=true");
        if (!r.ok) throw new Error("bad");
        const j = await r.json();
        if (on) { setD(j); setErr(false); }
      } catch { if (on) setErr(true); }
    };
    load();
    const t = setInterval(load, 30000);
    return () => { on = false; clearInterval(t); };
  }, []);
  return (
    <div>
      <div className="noscroll -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {coins.map(([id, sym, name]) => {
          const v = d?.[id];
          const up = (v?.usd_24h_change ?? 0) >= 0;
          return (
            <div key={id} className="card min-w-[80%] shrink-0 snap-center p-6 text-left md:min-w-0">
              <div className="flex items-center justify-between">
                <div><p className="text-lg font-semibold">{name}</p><p className="text-sm text-muted">{sym}/USD</p></div>
                {v && <span className={`rounded-full px-3 py-1 text-sm font-semibold ${up ? "bg-ok/15 text-ok" : "bg-bad/15 text-bad"}`}>{up ? "+" : ""}{v.usd_24h_change.toFixed(2)}%</span>}
              </div>
              <p className="mt-5 text-3xl font-extrabold md:text-2xl">{v ? v.usd.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: v.usd < 1 ? 4 : 2 }) : "Loading..."}</p>
              <p className="mt-1 text-xs text-muted">24h change</p>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted">{err ? "Live prices are temporarily unavailable." : "Swipe for more. Real market prices from CoinGecko, refreshed every 30 seconds. Not Crypto Nova X performance."}</p>
    </div>
  );
}
