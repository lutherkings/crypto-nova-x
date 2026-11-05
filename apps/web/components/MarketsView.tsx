"use client";
import { useState } from "react";
import TradingViewChart from "./TradingViewChart";
import LiveTicker from "./LiveTicker";

const pairs = [["BTC", "BINANCE:BTCUSDT"], ["ETH", "BINANCE:ETHUSDT"], ["SOL", "BINANCE:SOLUSDT"], ["XRP", "BINANCE:XRPUSDT"], ["BNB", "BINANCE:BNBUSDT"], ["DOGE", "BINANCE:DOGEUSDT"]];

export default function MarketsView() {
  const [sym, setSym] = useState(pairs[0][1]);
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {pairs.map(([n, s]) => (
          <button key={s} onClick={() => setSym(s)} className={`btn !py-2 text-sm ${sym === s ? "btn-gold" : "btn-ghost"}`}>{n}</button>
        ))}
      </div>
      <TradingViewChart symbol={sym} />
      <p className="text-xs text-muted">Charts by TradingView using public exchange data. Intervals (1m to 1D) are in the chart toolbar. This is public market data and not Crypto Nova X trading performance.</p>
      <LiveTicker />
    </div>
  );
}
