"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  ShieldCheck,
  Lock,
  ArrowRight,
  BookOpen,
  TerminalSquare,
  Signal,
  Wallet,
  KeyRound,
  X,
  Radar,
  Loader2,
  TrendingUp,
  History,
  FileSearch,
  Mail,
  CheckCircle2,
  Crown,
  RadioTower,
  Layers,
  Sparkles,
  BarChart3,
  Database,
  ExternalLink,
  Network,
  ScanSearch,
  BrainCircuit,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const clampBar = (num) => Math.max(0, Math.min(100, Number(num || 0)));

const Button = ({ children, variant = "solid", onClick, href }) => {
  const className =
    variant === "outline"
      ? "group whitespace-nowrap rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white md:px-6 md:py-4 backdrop-blur-xl transition hover:border-emerald-300/40 hover:bg-white/10"
      : "group whitespace-nowrap rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-black md:px-6 md:py-4 shadow-lg shadow-emerald-400/25 transition hover:bg-emerald-300";

  if (href) {
    return (
      <a href={href} className={className}>
        <span className="inline-flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <span className="inline-flex items-center gap-2">{children}</span>
    </button>
  );
};

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="whitespace-nowrap rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white md:px-5 md:py-4 md:text-sm backdrop-blur-xl transition hover:border-emerald-300/40 hover:bg-white/10"
  >
    {children}
  </a>
);

const Badge = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75 shadow-lg shadow-black/20 backdrop-blur-xl">
    {children}
  </span>
);

const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-[30px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-emerald-500/10 backdrop-blur-xl ${className}`}
  >
    {children}
  </div>
);

const formatNum = (num) => {
  if (!num && num !== 0) return "--";
  return Number(num).toLocaleString();
};

const SignalScoreBar = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="mb-2 flex items-center justify-between gap-3">
      <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="text-sm font-semibold text-emerald-200">{value ?? 0}/100</p>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-emerald-300" style={{ width: `${clampBar(value)}%` }} />
    </div>
  </div>
);

const ExternalLinkButton = ({ href, children }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-400/20"
    >
      {children}
    </a>
  );
};

const Modal = ({ modal, closeModal, routeToTokenPage }) => {
  if (!modal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[32px] border border-emerald-400/20 bg-black p-6 md:p-8 shadow-2xl shadow-emerald-500/20"
      >
        <button
          onClick={closeModal}
          className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex items-center gap-3 text-emerald-300">
          {modal.icon}
          <span className="text-sm uppercase tracking-[0.24em]">{modal.label}</span>
        </div>

        <h3 className="text-3xl md:text-4xl font-semibold">{modal.title}</h3>
        <p className="mt-4 leading-8 text-white/65">{modal.body}</p>

        {modal.type !== "signal" && (
          <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-100/90">
            This layer continues expanding into products, access systems, premium signal routes, and protected operator infrastructure.
          </div>
        )}
      </motion.div>
    </div>
  );
};

const recentFallback = [
  {
    contract: "So11111111111111111111111111111111111111112",
    token_name: "Wrapped SOL",
    token_symbol: "SOL",
    latest_score: null,
    latest_risk: "Reference Asset",
  },
];

const trustFunnels = [
  {
    title: "Operator Product Vault",
    desc: "Move beyond public checks with digital guides, wallet notes, and future premium intelligence products.",
    href: "/products",
    icon: BookOpen,
  },
  {
    title: "Protected Access Queue",
    desc: "Reserve early placement for private alerts, premium routes, gated downloads, and future operator infrastructure.",
    href: "/protected",
    icon: Lock,
  },
  {
    title: "Public Signal Receipts",
    desc: "Review visible authority proof, tracked token checks, and ongoing Trust The Signal intelligence continuation.",
    href: "/receipts",
    icon: RadioTower,
  },
];

const ecosystemBlocks = [
  {
    title: "Signal Interpretation",
    desc: "Weighted token reading, risk verdicts, market structure, and setup classification instead of blind guessing.",
    icon: ScanSearch,
  },
  {
    title: "Memory Infrastructure",
    desc: "Repeated checks, token history, operator notes, archived demand, and contract intelligence continuation.",
    icon: Database,
  },
  {
    title: "Monetization + Access",
    desc: "Protected queues, premium guides, future gated rooms, and operator-specific conversion routes.",
    icon: Network,
  },
  {
    title: "Operator Intelligence",
    desc: "Wallet layers, receipts, analytics, and future premium command tools feeding one ecosystem.",
    icon: BrainCircuit,
  },
];

const tools = [
  { title: "Signal Check Pro", desc: "Run weighted Solana contract interpretation through the live Trust The Signal authority engine.", icon: ShieldCheck, href: "/" },
  { title: "Trending Intelligence", desc: "Observe liquidity, velocity, and volume concentration across active Solana pairs before commitment.", icon: TrendingUp, href: "/trending" },
  { title: "Token Intelligence Reports", desc: "Dedicated premium token dossier pages generated per contract for deeper continuation review.", icon: FileSearch, href: "/tools/token-memory" },
  { title: "Protected Access Layer", desc: "Private route preparation for premium guides, operator alerts, and future member signal infrastructure.", icon: Lock, href: "/protected" },
];

const terminalFeed = [
  ["06:42:01", "DEX_STREAM", "new liquidity event detected"],
  ["06:42:14", "RISK_LAYER", "caution flag triggered / liquidity imbalance"],
  ["06:42:39", "MEMORY_CORE", "contract demand archived to supabase"],
  ["06:43:08", "SIGNAL_ENGINE", "setup classified / early_potential"],
  ["06:43:21", "ACCESS_ROUTE", "lead captured / protected queue"],
];

const products = [
  { title: "Signal Operator Guide", price: "$19", desc: "Beginner to structured operator guide for understanding entries, warnings, setups, and survival.", icon: BookOpen, action: "Preview Guide" },
  { title: "Wallet Intelligence Notes", price: "$29", desc: "Smart wallet recurrence, cluster behavior, movement logic, and high-value tracking interpretation.", icon: Wallet, action: "View Notes" },
  { title: "Protected Signal Framework", price: "Soon", desc: "Private signal ecosystem, premium operator access, structured route alerts, and gated intelligence.", icon: KeyRound, action: "Request Access" },
];

const accessBenefits = [
  "Early entry into the protected operator waiting list",
  "Private signal route preparation and alert notifications",
  "Premium product + guide release priority",
  "Future Telegram / Discord / member intelligence expansion",
];

const accessTiers = [
  "Public Utility Layer",
  "Premium Guide Layer",
  "Protected Operator Layer",
  "Future Signal Membership Layer",
];

export default function Home() {
  const [modal, setModal] = useState(null);
  const [contract, setContract] = useState("");
  const [checking, setChecking] = useState(false);
  const [recentChecks, setRecentChecks] = useState([]);
  const [accessEmail, setAccessEmail] = useState("");
  const [accessSubmitted, setAccessSubmitted] = useState(false);

  useEffect(() => {
    setRecentChecks(recentFallback);
  }, []);

  const closeModal = () => setModal(null);

  const submitAccessRequest = async () => {
    if (!accessEmail) return;
    setAccessSubmitted(true);
  };

  const openProductModal = (product) => {
    if (product.title === "Signal Operator Guide") {
      window.location.href = "/products/signal-operator-guide";
      return;
    }

    if (product.title === "Protected Signal Framework") {
      window.location.href = "/protected";
      return;
    }

    setModal({
      icon: <Sparkles className="h-5 w-5" />,
      label: "Premium Product Layer",
      title: product.title,
      body: product.desc,
      type: "product",
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Modal modal={modal} closeModal={closeModal} />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.14),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_18%)]" />

      <section className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-2xl">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">TRUST THE SIGNAL</p>
            <h1 className="text-lg font-semibold tracking-[0.2em]">INTELLIGENCE TERMINAL</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <NavLink href="/trending">Trending</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/protected">Protected</NavLink>
            <NavLink href="/receipts">Receipts</NavLink>
          </div>
        </header>

        <section className="pt-16 text-center">
          <Badge>Signal over noise.</Badge>
          <h2 className="mx-auto mt-6 max-w-5xl text-4xl font-semibold md:text-7xl">
            Solana intelligence built to filter what blind traders miss.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/65">
            Trust The Signal combines contract interpretation, memory infrastructure, premium operator funnels, and protected intelligence layers into one connected ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/trending">Open Trending <ArrowRight className="h-4 w-4" /></Button>
            <Button href="/protected" variant="outline">Protected Queue</Button>
          </div>
        </section>

        <section className="pt-20">
          <div className="grid gap-5 md:grid-cols-3">
            {trustFunnels.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.title} href={item.href}>
                  <Card className="h-full cursor-pointer transition hover:-translate-y-1 hover:border-emerald-300/25">
                    <div className="p-7">
                      <Icon className="h-6 w-6 text-emerald-300" />
                      <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/65">{item.desc}</p>
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </section>

        <section className="pt-20">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Why Trust The Signal</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-5xl">More than a scanner. A connected operator ecosystem.</h2>
            <p className="mt-4 max-w-4xl leading-8 text-white/65">
              Every layer of this platform feeds the next: token checks create memory, memory builds authority, authority drives products, products route buyers, protected access captures operators, and admin intelligence monitors the full system.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {ecosystemBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <Card key={block.title} className="p-7">
                  <Icon className="h-6 w-6 text-emerald-300" />
                  <h3 className="mt-5 text-2xl font-semibold">{block.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{block.desc}</p>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/products">Explore Products <ArrowRight className="h-4 w-4" /></Button>
            <Button href="/receipts" variant="outline">View Public Receipts</Button>
          </div>
        </section>

        <section className="pt-20">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <a key={tool.title} href={tool.href}>
                  <Card className="h-full cursor-pointer transition hover:-translate-y-1 hover:border-emerald-300/25">
                    <div className="p-6">
                      <Icon className="h-5 w-5 text-emerald-300" />
                      <h3 className="mt-4 text-xl font-semibold">{tool.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/65">{tool.desc}</p>
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </section>

        <section className="pt-20">
          <Card className="border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 via-white/[0.05] to-black">
            <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2 text-emerald-300">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-[0.24em]">Protected Access Queue</span>
                </div>

                <h2 className="text-3xl font-semibold md:text-5xl">
                  Secure early placement before operator access expands.
                </h2>

                <p className="mt-4 leading-8 text-white/65">
                  This route captures protected interest for premium releases, private alerts, gated rooms, and future signal membership access.
                </p>

                <div className="mt-6 flex flex-col gap-3 md:flex-row">
                  <input
                    value={accessEmail}
                    onChange={(e) => setAccessEmail(e.target.value)}
                    placeholder="Email or preferred contact..."
                    className="h-12 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 text-white outline-none"
                  />

                  <button
                    onClick={submitAccessRequest}
                    className="h-12 rounded-2xl bg-emerald-400 px-6 font-semibold text-black hover:bg-emerald-300"
                  >
                    {accessSubmitted ? "Request Captured" : "Request Access"}
                  </button>
                </div>
              </div>

              <div className="grid gap-3">
                {accessBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-7 text-white/70">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="pt-20">
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="p-7">
              <div className="flex items-center gap-2 text-emerald-300">
                <Layers className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.24em]">Access Tier Preview</span>
              </div>

              <div className="mt-5 space-y-3">
                {accessTiers.map((tier) => (
                  <div key={tier} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    {tier}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="border-b border-white/10 bg-black/40 px-6 py-4">
                <div className="flex items-center gap-3 text-emerald-300">
                  <TerminalSquare className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-[0.24em]">Platform Activity</span>
                </div>
              </div>

              <div className="space-y-3 p-6 font-mono text-sm">
                {terminalFeed.map(([time, source, text]) => (
                  <div key={time + source} className="grid gap-2 rounded-2xl border border-white/10 bg-black/40 p-4 md:grid-cols-[100px_150px_1fr]">
                    <span className="text-white/35">{time}</span>
                    <span className="text-emerald-300">{source}</span>
                    <span className="text-white/70">{text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="pt-20">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Premium Product Layer</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-5xl">Monetize the intelligence trust.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Card key={product.title} onClick={() => openProductModal(product)} className="cursor-pointer transition hover:-translate-y-1 hover:border-emerald-300/25">
                  <div className="p-7">
                    <Icon className="h-6 w-6 text-emerald-300" />
                    <h3 className="mt-5 text-2xl font-semibold">{product.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">{product.desc}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-2xl font-semibold text-emerald-300">{product.price}</span>
                      <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                        {product.action}
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <footer className="pb-10 pt-20 text-center text-sm text-white/40">
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {["Home", "Trending", "Token Reports", "Signal Check", "Protected Access", "Products", "Admin"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/55">
                {item}
              </span>
            ))}
          </div>

          TRUST THE SIGNAL — Intelligence first. Execution second. Survival always.
        </footer>
      </section>
    </main>
  );
}
