"use client";
import { useEffect, useRef } from "react";

export default function TradingViewChart({ symbol }: { symbol: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current!;
    el.innerHTML = "";
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      width: "100%", height: 560, symbol, interval: "15", timezone: "Etc/UTC", theme: "dark", style: "1", locale: "en",
      backgroundColor: "#0B1019", gridColor: "rgba(214,181,109,0.06)", allow_symbol_change: true, hide_side_toolbar: false,
    });
    el.appendChild(s);
    return () => { el.innerHTML = ""; };
  }, [symbol]);
  return <div ref={box} className="tradingview-widget-container h-[560px] w-full overflow-hidden rounded-3xl border border-white/15" />;
}
