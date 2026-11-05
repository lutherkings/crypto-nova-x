"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/components/AuthProvider";

const items = [
  { href: "/dashboard/", label: "Overview" },
  { href: "/dashboard/verification/", label: "Verification" },
  { href: "/dashboard/profile/", label: "Profile" },
  { href: "/markets/", label: "Markets" },
  { href: "/support/", label: "Support" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, ready, logout } = useAuth();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => { if (ready && !user) router.replace("/login/"); }, [ready, user, router]);
  if (!ready || !user) return <p className="p-16 text-center text-muted">Loading...</p>;
  const active = (h: string) => path === h || path === h.slice(0, -1);
  return (
    <>
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <aside className="glass sticky top-24 hidden h-fit w-60 shrink-0 p-4 md:block">
          <p className="mb-4 px-3 text-xs uppercase tracking-widest text-muted">Dashboard</p>
          <nav className="space-y-1" aria-label="Dashboard">
            {items.map((i) => (
              <Link key={i.href} href={i.href} className={`block rounded-xl px-3 py-2.5 text-sm transition ${active(i.href) ? "bg-gold text-midnight font-semibold" : "text-muted hover:bg-white/10 hover:text-ink"}`}>{i.label}</Link>
            ))}
          </nav>
          <button onClick={() => { logout(); router.push("/"); }} className="mt-6 w-full rounded-xl px-3 py-2.5 text-left text-sm text-muted hover:bg-white/10 hover:text-bad">Log out</button>
        </aside>
        <div className="min-w-0 flex-1 pb-28 md:pb-0">{children}</div>
      </div>
      <nav className="glass fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-3xl p-2 md:hidden" aria-label="Dashboard mobile">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className={`rounded-2xl px-2.5 py-2 text-xs ${active(i.href) ? "bg-gold font-semibold text-midnight" : "text-muted"}`}>{i.label}</Link>
        ))}
        <button onClick={() => { logout(); router.push("/"); }} className="rounded-2xl px-2.5 py-2 text-xs text-muted">Log out</button>
      </nav>
    </>
  );
}
