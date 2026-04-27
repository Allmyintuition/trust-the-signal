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
  title: "Trust The Signal | Solana Token Intelligence",
  description:
    "Trust The Signal is a premium Solana intelligence ecosystem for token checks, risk review, signal receipts, token memory, protected access, and operator-level crypto research.",
  keywords: [
    "Trust The Signal",
    "Solana token checker",
    "crypto intelligence",
    "meme coin scanner",
    "token risk checker",
    "Solana trading tools",
    "ALL MY INTUITION",
  ],
  openGraph: {
    title: "Trust The Signal | Solana Token Intelligence",
    description:
      "Analyze contracts, review token memory, inspect signal receipts, and enter the protected operator access layer.",
    type: "website",
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