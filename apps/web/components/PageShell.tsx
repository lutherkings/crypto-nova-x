import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageShell({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16">
      <Reveal>
        <h1 className="text-4xl font-bold md:text-5xl"><span className="gold-text">{title}</span></h1>
        {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
      </Reveal>
      <div className="mt-10 space-y-6 text-muted">{children}</div>
    </main>
  );
}
