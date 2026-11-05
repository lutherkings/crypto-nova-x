"use client";
import { useEffect, useRef } from "react";

export default function MiniChart({ symbol }: { symbol: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current!;
    el.innerHTML = "";
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    s.async = true;
    s.innerHTML = JSON.stringify({ symbol, width: "100%", height: 220, locale: "en", dateRange: "1D", colorTheme: "dark", isTransparent: true, autosize: false, largeChartUrl: "" });
    el.appendChild(s);
    return () => { el.innerHTML = ""; };
  }, [symbol]);
  return <div ref={box} className="tradingview-widget-container card h-[240px] overflow-hidden p-2" />;
}
