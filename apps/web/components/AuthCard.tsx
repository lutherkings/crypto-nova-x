import type { ReactNode } from "react";
import { bp } from "@/lib/site";

export default function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-5 py-12">
      <div className="glass w-full p-7 md:p-9">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${bp}/emblem.jpeg`} alt="" className="mx-auto mb-4 w-16" style={{ mixBlendMode: "lighten" }} />
        <h1 className="text-center text-3xl font-bold"><span className="gold-text">{title}</span></h1>
        {subtitle && <p className="mt-2 text-center text-sm text-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
