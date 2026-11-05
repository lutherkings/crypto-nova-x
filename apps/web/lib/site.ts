export const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// PLACEHOLDERS: replace with verified information. Never invent licences or addresses.
export const company = {
  legalName: "Crypto Nova X, Inc.",
  registration: "2025-7842395",
  regulator: "",
  address: "8 The Green, Suite 12000, Dover, Delaware 19901, United States",
  email: "info.cryptonovax@gmail.com",
};

export const nav = [
  { href: "/about/", label: "About" },
  { href: "/strategies/", label: "Strategies" },
  { href: "/markets/", label: "Markets" },
  { href: "/rewards/", label: "Rewards" },
  { href: "/support/", label: "Support" },
];

export const tiers = [
  { name: "Starter", range: "$50 - $249" },
  { name: "Silver", range: "$250 - $999" },
  { name: "Gold", range: "$1,000 - $2,499" },
  { name: "Platinum", range: "$2,500 - $4,999" },
  { name: "Diamond", range: "$5,000 - $9,999" },
  { name: "Elite", range: "$10,000+" },
];

export const strategies = [
  { name: "Short-term", duration: "2 weeks" },
  { name: "Medium-term", duration: "2 - 4 weeks" },
  { name: "Long-term", duration: "4 weeks and above" },
];

export const legalDocs = [
  { slug: "terms", title: "Terms of Service" },
  { slug: "privacy", title: "Privacy Policy" },
  { slug: "risk-disclosure", title: "Investment Risk Disclosure" },
  { slug: "aml-kyc", title: "AML/KYC Policy" },
  { slug: "withdrawal-policy", title: "Withdrawal Policy" },
  { slug: "cookies", title: "Cookie Policy" },
  { slug: "investment-agreement", title: "Investment Management Agreement" },
];

export const rewards = [
  "iPhone 18 series", "iPhone Duo", "Latest MacBook",
  "Samsung Galaxy S26 series", "Samsung Galaxy Z Flip", "Samsung Galaxy Z Fold",
];

export const faqs = [
  ["Are returns guaranteed?", "No. Cryptocurrency trading carries risk, including the loss of capital. Past performance is never a guarantee of future results."],
  ["How do I deposit?", "Deposits are requested through official customer support and confirmed by our finance team only after independent verification. A screenshot alone never credits an account."],
  ["Do I need to invest to enter giveaways?", "No. Giveaways do not require a deposit or investment."],
  ["Is the platform available in my country?", "Availability depends on local regulation. Country restrictions will be published once configured."],
];
