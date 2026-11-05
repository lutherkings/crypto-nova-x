import Link from "next/link";
import { company, legalDocs } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/10 bg-navy/40">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-bold">CRYPTO NOVA <span className="gold-text">X</span></p>
            <p className="mt-2 text-sm text-muted">Beyond Capital. Beyond Possibilities.</p>
            <p className="mt-4 text-xs text-muted">{company.legalName}<br />{company.registration}<br />{company.address}<br />{company.email}</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-gold">Legal</p>
            <ul className="space-y-2 text-sm text-muted">
              {legalDocs.map((d) => (<li key={d.slug}><Link className="hover:text-gold" href={`/legal/${d.slug}/`}>{d.title}</Link></li>))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-gold">Company</p>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link className="hover:text-gold" href="/about/">About</Link></li>
              <li><Link className="hover:text-gold" href="/support/">Help and Support</Link></li>
              <li><Link className="hover:text-gold" href="/contact/">Contact</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-gold/10 pt-6 text-xs leading-relaxed text-muted">
          Risk warning: cryptocurrency trading is high risk and you may lose some or all of your capital. Nothing on this site is a guarantee of returns or financial advice. Availability is subject to local law and regulatory authorisation. {company.regulator}
        </p>
      </div>
    </footer>
  );
}
