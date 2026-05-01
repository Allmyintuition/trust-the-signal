import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://trust-the-signal-gamma.vercel.app"),
  title: "Trust The Signal | Solana Token Intelligence Platform",
  description:
    "Trust The Signal is a premium Solana token intelligence platform for contract checks, rug risk review, token memory, wallet snapshots, signal receipts, protected access, and operator-level crypto research.",
  keywords: [
    "Trust The Signal",
    "Solana token checker",
    "Solana rug risk checker",
    "crypto intelligence platform",
    "meme coin scanner",
    "wallet snapshot Solana",
    "token metadata checker",
    "Solana trading tools",
    "ALL MY INTUITION",
  ],
  openGraph: {
    title: "Trust The Signal | Solana Token Intelligence Platform",
    description:
      "Analyze Solana contracts, inspect wallet behavior, review token memory, verify risk, study receipts, and enter the protected operator access layer.",
    url: "https://trust-the-signal-gamma.vercel.app",
    siteName: "Trust The Signal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust The Signal | Solana Token Intelligence Platform",
    description:
      "Premium Solana contract intelligence, risk review, wallet snapshots, token memory, receipts, and protected operator access.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
