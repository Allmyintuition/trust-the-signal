"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  BookOpen,
  Wallet,
  KeyRound,
  X,
  TrendingUp,
  Mail,
  CheckCircle2,
  RadioTower,
  Sparkles,
  Database,
  Network,
  ScanSearch,
  BrainCircuit,
  Loader2,
  Activity,
  Orbit,
  Brain,
  Cpu,
  Satellite,
  Star,
} from "lucide-react";

const Button = ({ children, variant = "solid", onClick, href, icon }) => {
  const Icon = icon;
  const className =
    variant === "outline"
      ? "group whitespace-nowrap rounded-2xl border border-emerald-300/20 bg-white/[0.04] px-4 py-3 text-sm text-white md:px-6 backdrop-blur-xl transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
      : "group whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-300 to-emerald-400 px-4 py-3 text-sm font-semibold text-black md:px-6 shadow-lg shadow-emerald-400/25 transition hover:brightness-110";

  if (href) {
    return (
      <a href={href} className={className}>
        <span className="inline-flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <span className="inline-flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </span>
    </button>
  );
};

const NavLink = ({ href, children, icon }) => {
  const Icon = icon;
  return (
    <a
      href={href}
      className="whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white md:px-5 md:py-3 md:text-sm backdrop-blur-xl transition hover:border-emerald-300/40 hover:bg-white/10"
    >
      <span className="inline-flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-emerald-300" />}
        {children}
      </span>
    </a>
  );
};

const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-[32px] border border-white/10 bg-white/[0.05] shadow-[0_0_50px_rgba(16,185,129,0.08)] backdrop-blur-xl ${className}`}
  >
    {children}
  </div>
);

const Modal = ({ modal, closeModal }) => {
  if (!modal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[32px] border border-emerald-400/20 bg-black p-8 shadow-2xl shadow-emerald-500/20"
      >
        <button
          onClick={closeModal}
          className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex items-center gap-3 text-emerald-300">
          {modal.icon}
          <span className="text-sm uppercase tracking-[0.24em]">{modal.label}</span>
        </div>

        <h3 className="text-4xl font-semibold">{modal.title}</h3>
        <p className="mt-5 leading-8 text-white/65">{modal.body}</p>
      </motion.div>
    </div>
  );
};

const fallbackTicker = [
  "SIGNAL DETECTED",
  "LIQUIDITY EVENT",
  "TOKEN MEMORY UPDATED",
  "EARLY POTENTIAL",
  "PROTECTED QUEUE OPEN",
  "SMART FLOW TRACKED",
];

const trustFunnels = [
  { title: "Operator Product Vault", desc: "Premium digital intelligence, notes, frameworks, and operator tools.", href: "/products", icon: BookOpen },
  { title: "Protected Access Queue", desc: "Reserve placement for private alerts, gated tools, and operator releases.", href: "/protected", icon: Lock },
  { title: "Public Signal Receipts", desc: "Visible proof archive showing trust, continuation, and authority receipts.", href: "/receipts", icon: RadioTower },
];

const ecosystemBlocks = [
  { title: "Signal Reading", desc: "Weighted setup interpretation beyond emotional entry.", icon: ScanSearch },
  { title: "Memory Core", desc: "Persistent contract logging and demand intelligence.", icon: Database },
  { title: "Protected Funnels", desc: "Guide buyers, queue leads, and premium intake capture.", icon: Network },
  { title: "A.M.I. Brain Layer", desc: "ALL MY INTUITION mother intelligence feeding the operator stack.", icon: Brain },
];

const products = [
  { title: "Signal Operator Guide", price: "$19", desc: "Entry logic, warning signs, structured survival framework.", icon: BookOpen, action: "Preview Guide" },
  { title: "Wallet Intelligence Notes", price: "$29", desc: "Smart wallet recurrence, behavior tracking, flow logic.", icon: Wallet, action: "View Notes" },
  { title: "Protected Signal Framework", price: "Soon", desc: "Private operator route, gated alerts, premium access.", icon: KeyRound, action: "Request Access" },
];

export default function Home() {
  const [modal, setModal] = useState(null);
  const [contract, setContract] = useState("");
  const [checking, setChecking] = useState(false);
  const [recentChecks, setRecentChecks] = useState([]);
  const [trendingTokens, setTrendingTokens] = useState([]);
  const [accessEmail, setAccessEmail] = useState("");
  const [accessSubmitted, setAccessSubmitted] = useState(false);

  useEffect(() => {
    async function loadRecent() {
      try {
        const res = await fetch("/api/recent-token-checks");
        const data = await res.json();
        if (data.success) setRecentChecks(data.logs || []);
      } catch {
        setRecentChecks([]);
      }
    }

    async function loadTrendingTokens() {
      try {
        const res = await fetch("/api/trending", { cache: "no-store" });
        const data = await res.json();

        if (data.success && data.result) {
          const merged = [
            ...(data.result.topMomentum || []),
            ...(data.result.topVolume || []),
            ...(data.result.topLiquidity || []),
          ];

          const unique = Array.from(
            new Map(merged.map((token) => [token.address || token.symbol, token])).values()
          ).slice(0, 10);

          setTrendingTokens(unique);
        }
      } catch {
        setTrendingTokens([]);
      }
    }

    loadRecent();
    loadTrendingTokens();
  }, []);

  const intelligenceTicker = recentChecks.length
    ? [
        ...recentChecks.slice(0, 5).map(
          (token) => `$${token.token_symbol || "SOL"} ${token.latest_risk || "signal activity"}`
        ),
        ...fallbackTicker,
      ]
    : fallbackTicker;

  const closeModal = () => setModal(null);

  const runSignalCheck = async () => {
    if (!contract) return;
    setChecking(true);
    setTimeout(() => {
      window.location.href = `/token/${contract}`;
    }, 700);
  };

  const submitAccessRequest = () => {
    if (!accessEmail) return;
    setAccessSubmitted(true);
  };

  const openProductModal = (product) => {
    if (product.title === "Signal Operator Guide") return (window.location.href = "/products/signal-operator-guide");
    if (product.title === "Protected Signal Framework") return (window.location.href = "/protected");

    setModal({
      icon: <Sparkles className="h-5 w-5" />,
      label: "Premium Product Layer",
      title: product.title,
      body: product.desc,
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Modal modal={modal} closeModal={closeModal} />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.14),transparent_28%),radial-gradient(circle_at_20%_30%,rgba(70,130,255,0.08),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_14%)]" />

      <section className="pointer-events-none absolute left-[-120px] top-[120px] h-[320px] w-[320px] rounded-full border border-emerald-300/10 opacity-30 blur-3xl" />
      <section className="pointer-events-none absolute right-[-80px] top-[260px] h-[240px] w-[240px] rounded-full border border-blue-300/10 opacity-20 blur-3xl" />

      <section className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/45 px-5 py-4 backdrop-blur-2xl">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">TRUST THE SIGNAL</p>
            <h1 className="text-lg font-semibold tracking-[0.22em]">INTELLIGENCE TERMINAL</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <NavLink href="/trending" icon={TrendingUp}>Trending</NavLink>
            <NavLink href="/products" icon={BookOpen}>Products</NavLink>
            <NavLink href="/protected" icon={Lock}>Protected</NavLink>
            <NavLink href="/receipts" icon={RadioTower}>Receipts</NavLink>
          </div>
        </header>

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-300/15 bg-emerald-300/5 py-3">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 whitespace-nowrap text-sm font-semibold text-emerald-200"
          >
            {[...intelligenceTicker, ...intelligenceTicker, ...intelligenceTicker].map((item, i) => (
              <span key={i}>◉ {item}</span>
            ))}
          </motion.div>
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl border border-blue-300/10 bg-white/[0.03] py-3">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 whitespace-nowrap text-xs uppercase tracking-[0.18em] text-white/60"
          >
            {[
              ...(trendingTokens.length
                ? trendingTokens.map((token) => {
                    const change = Number(token.priceChange24h || 0);
                    const label =
                      change >= 50
                        ? "CONFIRMED RUNNER"
                        : change >= 15
                        ? "MOMENTUM WATCH"
                        : Number(token.volume24h || 0) > 50000
                        ? "VOLUME EXPANDING"
                        : Number(token.liquidity || 0) > 25000
                        ? "LIQUIDITY BUILDING"
                        : "NEW LAUNCH WATCH";

                    return `$${token.symbol || "TOKEN"} ${change ? `${change.toFixed(1)}%` : ""} • ${label}`;
                  })
                : [
                    "$SOL • rotation strength",
                    "$NEWPAIR • launch watch",
                    "$FLOW • volume expanding",
                    "$RUNNER • momentum building",
                  ]),
              ...(trendingTokens.length
                ? trendingTokens.map((token) => {
                    const change = Number(token.priceChange24h || 0);
                    const label =
                      change >= 50
                        ? "CONFIRMED RUNNER"
                        : change >= 15
                        ? "MOMENTUM WATCH"
                        : Number(token.volume24h || 0) > 50000
                        ? "VOLUME EXPANDING"
                        : Number(token.liquidity || 0) > 25000
                        ? "LIQUIDITY BUILDING"
                        : "NEW LAUNCH WATCH";

                    return `$${token.symbol || "TOKEN"} ${change ? `${change.toFixed(1)}%` : ""} • ${label}`;
                  })
                : [
                    "$SOL • rotation strength",
                    "$NEWPAIR • launch watch",
                    "$FLOW • volume expanding",
                    "$RUNNER • momentum building",
                  ]),
            ].map((item, i) => (
              <span key={i}>✦ {item}</span>
            ))}
          </motion.div>
        </div>

        <section className="pt-14 text-center">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-white/[0.04] px-5 py-2 text-sm text-emerald-200">
            <Orbit className="h-4 w-4" />
            Signal over noise.
          </div>

          <h2 className="mx-auto mt-6 max-w-5xl text-4xl font-semibold md:text-7xl leading-tight">
            Solana intelligence built to filter what blind traders miss.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/65">
            A premium operator ecosystem blending signal reading, memory logging, protected funnels, and ALL MY INTUITION intelligence infrastructure.
          </p>

          <div className="mx-auto mt-10 max-w-4xl rounded-[34px] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-white/[0.03] to-black p-6 shadow-[0_0_100px_rgba(16,185,129,0.12)]">
            <div className="mb-4 flex items-center justify-center gap-2 text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm uppercase tracking-[0.24em]">Live Signal Check Pro</span>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                placeholder="Paste Solana contract address..."
                className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/30 px-5 text-white outline-none"
              />

              <button
                onClick={runSignalCheck}
                className="h-14 rounded-2xl bg-gradient-to-r from-emerald-300 to-emerald-400 px-8 font-semibold text-black hover:brightness-110"
              >
                {checking ? <Loader2 className="h-5 w-5 animate-spin" /> : "Run Check"}
              </button>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button href="/products" variant="outline" icon={Brain}>Knowledge Vault</Button>
              <Button href="/protected" variant="outline" icon={Satellite}>Protected Access</Button>
              <Button href="/trending" variant="outline" icon={Cpu}>Live Market Feed</Button>
            </div>
          </div>
        </section>

        <section className="pt-12">
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <Activity className="h-5 w-5" />
            <span className="text-sm uppercase tracking-[0.24em]">Recent Intelligence Activity</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {recentChecks.slice(0, 3).map((token, i) => (
              <Card key={i} className="p-5">
                <p className="text-xl font-semibold">{token.token_name || "Unknown"} ({token.token_symbol || "?"})</p>
                <p className="mt-2 text-sm text-white/55">{token.latest_risk || "Awaiting classification"}</p>
                <p className="mt-4 text-sm text-emerald-300">Score: {token.latest_score ?? "--"}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="pt-20 grid gap-5 md:grid-cols-3">
          {trustFunnels.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.title} href={item.href}>
                <Card className="h-full p-7 transition hover:-translate-y-1 hover:border-emerald-300/25">
                  <Icon className="h-6 w-6 text-emerald-300" />
                  <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.desc}</p>
                </Card>
              </a>
            );
          })}
        </section>

        <section className="pt-20">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Why Trust The Signal</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-5xl">Professional structure. Cosmic operator identity.</h2>
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
        </section>

        <section className="pt-20">
          <Card className="border-emerald-400/20 bg-gradient-to-br from-emerald-400/12 via-white/[0.03] to-black">
            <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2 text-emerald-300">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-[0.24em]">Protected Access Queue</span>
                </div>

                <h2 className="text-3xl font-semibold md:text-5xl">
                  Secure early placement before operator access expands.
                </h2>

                <div className="mt-6 flex flex-col gap-3 md:flex-row">
                  <input
                    value={accessEmail}
                    onChange={(e) => setAccessEmail(e.target.value)}
                    placeholder="Email or preferred contact..."
                    className="h-12 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 text-white outline-none"
                  />
                  <button
                    onClick={submitAccessRequest}
                    className="h-12 rounded-2xl bg-gradient-to-r from-emerald-300 to-emerald-400 px-6 font-semibold text-black hover:brightness-110"
                  >
                    {accessSubmitted ? "Request Captured" : "Request Access"}
                  </button>
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  "Early premium operator queue placement",
                  "Private release notification priority",
                  "Future member intelligence access",
                  "Signal route continuation eligibility",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-7 text-white/70">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="pt-20 grid gap-5 md:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Card key={product.title} onClick={() => openProductModal(product)} className="cursor-pointer p-7 transition hover:-translate-y-1 hover:border-emerald-300/25">
                <Icon className="h-6 w-6 text-emerald-300" />
                <h3 className="mt-5 text-2xl font-semibold">{product.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{product.desc}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-semibold text-emerald-300">{product.price}</span>
                  <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                    {product.action}
                  </button>
                </div>
              </Card>
            );
          })}
        </section>

        <footer className="pb-10 pt-20 text-center text-sm text-white/40">
          TRUST THE SIGNAL — Intelligence first. Execution second. Survival always.
        </footer>
      </section>
    </main>
  );
}
