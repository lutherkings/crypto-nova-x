import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";

const objectives = [
  ["Promote informed investing", "Help customers understand cryptocurrency markets, investment strategies and associated risks before committing capital."],
  ["Encourage responsible wealth management", "Promote disciplined investment decisions rather than impulsive speculation."],
  ["Provide structured investment opportunities", "Offer clearly documented strategies with defined durations, risk classifications and transparent terms."],
  ["Maintain operational transparency", "Provide accurate investment records, transaction histories and verifiable performance information."],
  ["Prioritise customer security", "Protect customer accounts and personal information through appropriate security technologies and operational safeguards."],
  ["Leverage financial technology", "Use modern trading systems, market intelligence and portfolio management tools."],
  ["Expand access responsibly", "Develop accessible digital investment services while respecting applicable financial regulations in every market served."],
];
const values = [
  ["Integrity", "Trust begins with honesty, ethical conduct and accountability."],
  ["Transparency", "Customers deserve clear information about strategies, fees, risks, transactions and performance."],
  ["Innovation", "We embrace technological advancement to improve the digital investment experience."],
  ["Security", "We prioritise the protection of customer information, account access and financial operations."],
  ["Responsibility", "Every investment involves risk; customers should decide based on their circumstances and risk tolerance."],
  ["Excellence", "We pursue high standards in customer experience, operational efficiency and investment management."],
];
const principles = ["Research before execution.", "Strategy before speculation.", "Risk management before aggressive growth.", "Transparency before promises.", "Long-term credibility over short-term appearances."];
const why = [
  ["Structured Investment Strategies", "Clearly defined durations, conditions and risk classifications."],
  ["Transparent Operations", "Investment activity, transactions and settlement records in maintained customer records."],
  ["Technology-Driven Operations", "Modern market data, trading technology and portfolio monitoring tools."],
  ["Customer-Centred Support", "Help with account enquiries, deposits, withdrawals and investment questions."],
  ["Security-Focused Infrastructure", "Controls designed to protect customer accounts, information and financial operations."],
  ["Continuous Innovation", "We keep improving our technology, processes and customer experience."],
];
const commitments = [
  "Providing accurate and understandable investment information.", "Clearly communicating fees and applicable conditions.",
  "Maintaining transparent transaction records.", "Providing appropriate support throughout the customer experience.",
  "Protecting customer information.", "Communicating investment risks honestly.",
  "Never presenting hypothetical trading performance as actual results.", "Treating customer enquiries and financial requests professionally.",
];

function Grid({ items }: { items: string[][] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map(([t, d], i) => (<Reveal key={t} delay={i * 0.05}><div className="card h-full p-5"><h3 className="font-semibold text-gold">{t}</h3><p className="mt-2 text-sm">{d}</p></div></Reveal>))}
    </div>
  );
}
const H = ({ children }: { children: string }) => <h2 className="pt-6 text-2xl font-bold text-ink">{children}</h2>;

export const metadata = { title: "About Us | Crypto Nova X" };
export default function Page() {
  return (
    <PageShell title="About Crypto Nova X" intro="Beyond Capital. Beyond Possibilities.">
      <p>Crypto Nova X is a digital asset investment and management company focused on making cryptocurrency investment more structured, accessible and transparent.</p>
      <p>Our mission is to help individuals navigate the evolving digital asset market through informed investment decisions, disciplined trading strategies and responsible portfolio management. We believe successful investing should be approached with knowledge, strategy, patience and a clear understanding of risk.</p>
      <p>By combining modern financial technology, market intelligence and structured strategies, we aim to give customers the tools and information to participate more confidently in the cryptocurrency market, with a professional experience built around transparency, security, accountability and continuous innovation.</p>
      <H>Our Mission</H>
      <p>To empower individuals to make informed cryptocurrency investment decisions through accessible opportunities, disciplined trading strategies, transparent financial operations and technology-driven portfolio management, while promoting responsible investment practices and financial awareness.</p>
      <H>Our Vision</H>
      <p>To become a recognised and trusted name in digital asset investment management, contributing to a more accessible, transparent and technologically advanced financial ecosystem.</p>
      <H>Our Main Objectives</H>
      <Grid items={objectives} />
      <H>Our Core Values</H>
      <Grid items={values} />
      <H>Our Investment Philosophy</H>
      <p>Investment decisions should be guided by research, strategy and disciplined risk management. Cryptocurrency markets are volatile and outcomes cannot be guaranteed.</p>
      <ul className="grid gap-3 md:grid-cols-2">{principles.map((p) => (<li key={p} className="glass rounded-xl p-4 text-ink">{p}</li>))}</ul>
      <H>Why Crypto Nova X?</H>
      <Grid items={why} />
      <H>Our Commitment to Customers</H>
      <ul className="list-disc space-y-2 pl-6">{commitments.map((c) => (<li key={c}>{c}</li>))}</ul>
      <p>Customer confidence should be earned through responsible actions, not simply marketing promises.</p>
      <H>Our Future</H>
      <p>The digital asset economy continues to evolve. Crypto Nova X aims to contribute through responsible investment management, financial technology and a commitment to transparency, building towards a future where investment decisions are more informed and customers have greater visibility into how their investments are managed.</p>
      <div className="glass rounded-2xl p-6 text-sm">
        <p className="mb-2 font-semibold text-gold">Company Disclaimer</p>
        <p>Cryptocurrency investments involve substantial risk, including the potential loss of some or all invested capital. Past performance does not guarantee future results. Strategies, fees, eligibility requirements and withdrawal conditions are subject to the applicable agreements and laws. Crypto Nova X does not guarantee profits or protection against market losses. The company&apos;s legal identity, operating permissions and regulatory status must be disclosed accurately in each jurisdiction where services are offered.</p>
      </div>
    </PageShell>
  );
}
