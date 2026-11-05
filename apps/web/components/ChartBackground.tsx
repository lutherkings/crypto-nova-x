"use client";
import { useEffect, useRef } from "react";

type C = { o: number; h: number; l: number; c: number };

// DECORATIVE ONLY: random generated candles, no prices or labels. Real data lives on /markets.
export default function ChartBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = 16;
    let w = 0, h = 0, off = 0, raf = 0, p = 0.5;
    let candles: C[] = [];
    const next = (): C => {
      const o = p;
      const c = Math.min(0.85, Math.max(0.15, o + (Math.random() - 0.5) * 0.08));
      p = c;
      return { o, h: Math.max(o, c) + Math.random() * 0.04, l: Math.min(o, c) - Math.random() * 0.04, c };
    };
    const y = (v: number) => h * (1 - v);
    const resize = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * d; cv.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      candles = Array.from({ length: Math.ceil(w / W) + 3 }, next);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(214,181,109,.05)";
      for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(0, (h * i) / 6); ctx.lineTo(w, (h * i) / 6); ctx.stroke(); }
      candles.forEach((k, i) => {
        const x = i * W - off;
        const col = k.c >= k.o ? "rgba(214,181,109,.22)" : "rgba(167,175,189,.14)";
        ctx.strokeStyle = col; ctx.fillStyle = col;
        ctx.beginPath(); ctx.moveTo(x + W / 2, y(k.h)); ctx.lineTo(x + W / 2, y(k.l)); ctx.stroke();
        ctx.fillRect(x + 3, Math.min(y(k.o), y(k.c)), W - 6, Math.max(2, Math.abs(y(k.o) - y(k.c))));
      });
      ctx.beginPath();
      candles.forEach((k, i) => { const x = i * W - off + W / 2; if (i) ctx.lineTo(x, y(k.c)); else ctx.moveTo(x, y(k.c)); });
      ctx.strokeStyle = "rgba(241,223,169,.45)"; ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(214,181,109,.6)"; ctx.shadowBlur = 12; ctx.stroke(); ctx.shadowBlur = 0;
    };
    const loop = () => {
      off += 0.35;
      if (off >= W) { off -= W; candles.shift(); candles.push(next()); }
      draw(); raf = requestAnimationFrame(loop);
    };
    resize(); draw();
    if (!reduce) raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <>
      <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#080B12_95%)]" />
    </>
  );
}
