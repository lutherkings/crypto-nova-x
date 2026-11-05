import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { legalDocs } from "@/lib/site";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export default function Legal({ params }: { params: { slug: string } }) {
  const doc = legalDocs.find((d) => d.slug === params.slug);
  if (!doc) notFound();
  return (
    <PageShell title={doc.title} intro="DRAFT PLACEHOLDER">
      <p>This document must be written or reviewed by a qualified lawyer for each jurisdiction before launch. No legal text is provided here.</p>
    </PageShell>
  );
}
