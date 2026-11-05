import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChartBackground from "@/components/ChartBackground";
import ScrollProgress from "@/components/ScrollProgress";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Crypto Nova X | Beyond Capital. Beyond Possibilities.",
  description: "Transparent strategies, real market activity and professional portfolio management.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        <ChartBackground />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
