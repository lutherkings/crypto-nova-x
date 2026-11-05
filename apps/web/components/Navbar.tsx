"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bp, nav } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="liquid-nav sticky top-3 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="Crypto Nova X home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${bp}/emblem.jpeg`} alt="" className="h-10 w-10 rounded-md object-cover" style={{ mixBlendMode: "lighten" }} />
          <span className="font-bold tracking-wide">CRYPTO NOVA <span className="gold-text">X</span></span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {nav.map((n) => (<Link key={n.href} href={n.href} className="text-sm text-muted transition hover:text-gold">{n.label}</Link>))}
          <Link href="/login/" className="text-sm text-muted hover:text-gold">Log in</Link>
          <Link href="/register/" className="btn btn-gold !py-2 text-sm">Create Account</Link>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          <span className="block h-0.5 w-6 bg-gold mb-1.5" /><span className="block h-0.5 w-6 bg-gold mb-1.5" /><span className="block h-0.5 w-6 bg-gold" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gold/10 md:hidden" aria-label="Mobile">
            <div className="flex flex-col gap-1 px-5 py-4">
              {[...nav, { href: "/login/", label: "Log in" }, { href: "/register/", label: "Create Account" }].map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg hover:bg-navy hover:text-gold">{n.label}</Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
