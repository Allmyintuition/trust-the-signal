"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  ShieldCheck,
  Activity,
  Lock,
  ArrowRight,
  Search,
  Users,
  BookOpen,
  Zap,
  TerminalSquare,
  Signal,
  Wallet,
  KeyRound,
  X,
  Radar,
  Loader2,
  TrendingUp,
  History,
  Crown,
  RadioTower,
  Send,
  MessageCircle,
  Layers,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const clampBar = (num) => Math.max(0, Math.min(100, Number(num || 0)));

const Button = ({ children, variant = "solid", onClick }) => (
  <button
    onClick={onClick}
    className={
      variant === "outline"
        ? "group rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-white backdrop-blur-xl transition hover:border-emerald-300/40 hover:bg-white/10"
        : "group rounded-2xl bg-emerald-400 px-6 py-4 font-semibold text-black shadow-lg shadow-emerald-400/25 transition hover:bg-emerald-300"
    }
  >
    <span className="inline-flex items-center gap-2">{children}</span>
  </button>
);

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-white backdrop-blur-xl transition hover:border-emerald-300/40 hover:bg-white/10"
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
      <p className="text-xs uppercase tracking-[0.22em] text-white/40">
        {label}
      </p>
      <p className="text-sm font-semibold text-emerald-200">
        {value ?? 0}/100
      </p>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-emerald-300"
        style={{ width: `${clampBar(value)}%` }}
      />
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

const Modal = ({ modal, closeModal }) => {
  if (!modal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] border border-emerald-400/20 bg-black p-7 shadow-2xl shadow-emerald-500/20"
      >
        <button
          onClick={closeModal}
          className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex items-center gap-3 text-emerald-300">
          {modal.icon}
          <span className="text-sm uppercase tracking-[0.24em]">
            {modal.label}
          </span>
        </div>

        <h3 className="text-3xl font-semibold">{modal.title}</h3>
        <p className="mt-4 leading-8 text-white/65">{modal.body}</p>

        {modal.type === "signal" && modal.live && (
          <>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["Token", `${modal.live.name} (${modal.live.symbol})`],
                ["Verdict", modal.live.verdict],
                ["Signal", modal.live.signal],
                ["Risk", modal.live.risk],
                ["DEX", modal.live.dex],
                ["Quote", modal.live.quoteToken || "--"],
                ["Liquidity", `$${formatNum(modal.live.liquidity)}`],
                ["24H Volume", `$${formatNum(modal.live.volume24h)}`],
                ["Market Cap", `$${formatNum(modal.live.marketCap)}`],
                ["24H Change", `${modal.live.priceChange24h}%`],
                ["Pair Age", modal.live.pairAge],
                ["Source Health", modal.live.sourceHealth],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                    {label}
                  </p>
                  <p className="mt-2 text-lg font-medium text-emerald-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <SignalScoreBar
                label="Liquidity"
                value={modal.live.breakdown?.liquidity}
              />
              <SignalScoreBar
                label="Volume"
                value={modal.live.breakdown?.volume}
              />
              <SignalScoreBar
                label="Balance"
                value={modal.live.breakdown?.liquidityBalance}
              />
              <SignalScoreBar
                label="Momentum"
                value={modal.live.breakdown?.momentum}
              />
              <SignalScoreBar
                label="Age"
                value={modal.live.breakdown?.age}
              />
              <SignalScoreBar
                label="Transactions"
                value={modal.live.breakdown?.transactions}
              />
              <SignalScoreBar
                label="Metadata"
                value={modal.live.breakdown?.metadata}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/45">
                Source + Social Presence
              </p>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Website
                  </p>
                  <p className="mt-2 text-lg font-medium text-emerald-200">
                    {modal.live.socialPresence?.hasWebsite
                      ? "Detected"
                      : "Not Detected"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Socials
                  </p>
                  <p className="mt-2 text-lg font-medium text-emerald-200">
                    {modal.live.socialPresence?.socialCount ?? 0}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Final Score
                  </p>
                  <p className="mt-2 text-lg font-medium text-emerald-200">
                    {modal.live.score}/100
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <ExternalLinkButton href={modal.live.pairUrl}>
                  Open DexScreener Pair
                </ExternalLinkButton>
              </div>
            </div>
          </>
        )}

        {modal.type !== "signal" && (
          <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-100/90">
            This layer continues expanding into products, access systems, and
            premium intelligence routes.
          </div>
        )}
      </motion.div>
    </div>
  );
};

const recentFallback = ["So11111111111111111111111111111111111111112"];

const tools = [
  {
    title: "Signal Check Pro",
    desc: "Paste a Solana contract and receive weighted live contract intelligence with verdict logic.",
    icon: ShieldCheck,
  },
  {
    title: "Trending Intelligence",
    desc: "Live Solana trending discovery board pulling top liquidity, volume, and momentum.",
    icon: TrendingUp,
  },
  {
    title: "Wallet Intelligence",
    desc: "Future learned wallets, smart clusters, recurrence, and execution intelligence.",
    icon: Wallet,
  },
];

const liveStats = [
  ["Tracked Tokens", "18,420+"],
  ["Wallet Signals", "4,900+"],
  ["Daily Checks", "1,200+"],
  ["Protected Members", "2,100+"],
];

const terminalFeed = [
  ["06:42:01", "DEX_STREAM", "new pair detected / liquidity seeded"],
  ["06:42:14", "RUG_FILTER", "caution: low_liq_to_mc"],
  ["06:42:39", "WALLET_TRACE", "candidate wallet recurrence detected"],
  ["06:43:08", "SIGNAL_ENGINE", "setup classified: early_potential"],
  ["06:43:21", "ALERT_ROUTE", "telegram preview queued"],
];

const products = [
  {
    title: "Signal Operator Guide",
    price: "$19",
    desc: "A premium beginner-to-operator guide for understanding token structure and execution.",
    icon: BookOpen,
  },
  {
    title: "Wallet Intelligence Notes",
    price: "$29",
    desc: "Smart wallet pattern recognition, recurrence logic, and movement interpretation.",
    icon: Wallet,
  },
  {
    title: "Protected Signal Framework",
    price: "Soon",
    desc: "Private ecosystem access, alert routing, and disciplined execution architecture.",
    icon: KeyRound,
  },
];

export default function Home() {
  const [modal, setModal] = useState(null);
  const [contract, setContract] = useState("");
  const [checking, setChecking] = useState(false);
  const [recentChecks, setRecentChecks] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const contractFromUrl = params.get("contract");

    if (contractFromUrl) {
      setContract(decodeURIComponent(contractFromUrl));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const stored = window.localStorage.getItem("tts_recent_checks");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentChecks(Array.isArray(parsed) ? parsed.slice(0, 6) : []);
      } catch {
        setRecentChecks([]);
      }
    }
  }, []); const closeModal = () => setModal(null);

  const saveRecentCheck = (address) => {
    if (!address) return;

    const next = [address, ...recentChecks.filter((item) => item !== address)].slice(
      0,
      6
    );

    setRecentChecks(next);
    window.localStorage.setItem("tts_recent_checks", JSON.stringify(next));
  };

  const openSignalModal = () =>
    setModal({
      type: "signal",
      label: "Signal Check Pro",
      title: "Contract Intelligence Result",
      body: "The entered token is being interpreted through a live weighted authority engine.",
      icon: <Radar className="h-5 w-5" />,
    });

  const openAccessModal = () =>
    setModal({
      label: "Protected Access",
      title: "Access Route Opening Soon",
      body: "This portal becomes the gateway into Telegram, Discord, private signal channels, premium guides, and future membership access.",
      icon: <Lock className="h-5 w-5" />,
    });

  const openProductModal = (product) =>
    setModal({
      label: "Digital Product",
      title: product.title,
      body: product.desc,
      icon: <BookOpen className="h-5 w-5" />,
    });

  const runLiveSignalCheck = async () => {
    const trimmedContract = contract.trim();

    if (!trimmedContract) {
      setModal({
        type: "signal",
        label: "Signal Error",
        title: "No Contract Entered",
        body: "Paste a valid Solana token contract address to run the live intelligence layer.",
        icon: <Radar className="h-5 w-5" />,
      });
      return;
    }

    setChecking(true);

    try {
      const response = await fetch("/api/signal-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contract: trimmedContract }),
      });

      const data = await response.json();

      if (!data.success) {
        setModal({
          type: "signal",
          label: "Signal Error",
          title: "Live Check Failed",
          body: data.error || "No signal data found.",
          icon: <Radar className="h-5 w-5" />,
        });
      } else {
        saveRecentCheck(trimmedContract);

        setModal({
          type: "signal",
          label: "Live Signal Result",
          title: "Contract Intelligence Result",
          body: "Live token data has been processed through the Trust The Signal authority layer.",
          icon: <Radar className="h-5 w-5" />,
          live: data.result,
        });
      }
    } catch (err) {
      setModal({
        type: "signal",
        label: "Signal Error",
        title: "System Route Failure",
        body: "Unable to complete live DexScreener request.",
        icon: <Radar className="h-5 w-5" />,
      });
    }

    setChecking(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <Modal modal={modal} closeModal={closeModal} />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.18),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.08),transparent_17%),radial-gradient(circle_at_12%_78%,rgba(0,180,140,0.14),transparent_25%)]" />
      <div className="fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="sticky top-4 z-40 flex items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-5 py-4 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
              <Eye className="relative h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                ALL MY INTUITION
              </p>
              <h1 className="text-lg font-semibold tracking-[0.2em]">
                TRUST THE SIGNAL
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Badge>Signal.Observed()</Badge>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/trending">Trending</NavLink>
            <Button onClick={openAccessModal}>Enter System</Button>
          </div>
        </header>

        <section className="grid gap-10 pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 flex flex-wrap gap-3">
              <Badge>👁️ Signal.Detected()</Badge>
              <Badge>📡 System.Listening</Badge>
              <Badge>🔒 Protected.Channel</Badge>
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-tight md:text-7xl">
              The signal was never noise.
              <span className="block bg-gradient-to-r from-emerald-200 via-emerald-400 to-white bg-clip-text text-transparent">
                It was structure waiting to be seen.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              A premium intelligence platform for token discovery, risk
              awareness, wallet behavior, digital products, community growth,
              and signal-based execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={openSignalModal}>
                Activate Signal Layer <ArrowRight className="h-4 w-4" />
              </Button>
              <NavLink href="/trending">View Trending Intelligence</NavLink>
            </div>
          </motion.div>

          <Card className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/45">
                  Signal Check Pro
                </p>
                <h3 className="mt-1 text-2xl font-semibold">
                  Contract Intelligence Layer
                </h3>
              </div>
              <Radar className="h-5 w-5 text-emerald-300" />
            </div>

            <label className="mb-3 block text-sm text-white/60">
              Paste Solana token address
            </label>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                placeholder="Enter live Solana contract..."
                className="h-12 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none"
              />

              <button
                onClick={runLiveSignalCheck}
                className="h-12 rounded-2xl bg-emerald-400 px-5 font-medium text-black hover:bg-emerald-300"
              >
                {checking ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking
                  </span>
                ) : (
                  "Run Check"
                )}
              </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ["Backend Route", "Connected"],
                ["DexScreener API", "Live"],
                ["Signal Layer", "Operational"],
                ["Authority Mode", "Phase 12"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                    {label}
                  </p>
                  <p className="mt-2 text-lg font-medium">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>        <section className="pt-12">
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-300">
              <History className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.24em]">
                Recent Checked Tokens
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {(recentChecks.length ? recentChecks : recentFallback).map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setContract(item)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left font-mono text-xs text-white/70 transition hover:border-emerald-300/30"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </Card>
        </section>

        <section className="pt-14">
          <div className="grid gap-4 md:grid-cols-4">
            {liveStats.map(([label, value]) => (
              <Card key={label}>
                <div className="p-5 text-center">
                  <p className="text-3xl font-semibold text-emerald-300">
                    {value}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/45">
                    {label}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
              Platform Utility Layer
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
              Tools that make people return.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Card key={tool.title}>
                  <div className="p-6">
                    <Icon className="h-5 w-5 text-emerald-300" />
                    <h3 className="mt-4 text-xl font-semibold">
                      {tool.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">
                      {tool.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="pt-20">
          <Card className="overflow-hidden">
            <div className="border-b border-white/10 bg-black/40 px-6 py-4">
              <div className="flex items-center gap-3 text-emerald-300">
                <TerminalSquare className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.24em]">
                  Scanner Terminal
                </span>
              </div>
            </div>

            <div className="space-y-3 p-6 font-mono text-sm">
              {terminalFeed.map(([time, source, text]) => (
                <div
                  key={time + source}
                  className="grid gap-2 rounded-2xl border border-white/10 bg-black/40 p-4 md:grid-cols-[100px_160px_1fr]"
                >
                  <span className="text-white/35">{time}</span>
                  <span className="text-emerald-300">{source}</span>
                  <span className="text-white/70">{text}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="pt-20">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
                Digital Product Layer
              </p>
              <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
                Monetize the intelligence.
              </h2>
            </div>
            <p className="max-w-xl text-white/60">
              Premium guides and private frameworks turn trust into an actual
              product ecosystem.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {products.map((product) => {
              const Icon = product.icon;

              return (
                <Card
                  key={product.title}
                  onClick={() => openProductModal(product)}
                  className="cursor-pointer transition hover:-translate-y-1 hover:border-emerald-300/25"
                >
                  <div className="p-7">
                    <Icon className="h-6 w-6 text-emerald-300" />
                    <h3 className="mt-5 text-2xl font-semibold">
                      {product.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">
                      {product.desc}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-2xl font-semibold text-emerald-300">
                        {product.price}
                      </span>
                      <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                        View
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="pt-20">
          <Card className="border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 via-white/[0.05] to-black">
            <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-emerald-300">
                  <Lock className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-[0.24em]">
                    Protected Access
                  </span>
                </div>

                <h2 className="text-3xl font-semibold md:text-5xl">
                  Access is earned. Trust is protected.
                </h2>

                <p className="mt-4 leading-8 text-white/65">
                  This section becomes the entry point for Telegram, Discord,
                  private signal rooms, premium guides, and future membership
                  access.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Button onClick={openAccessModal}>Request Access</Button>
                  <Button variant="outline" onClick={openAccessModal}>
                    Observe First
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  [Send, "Telegram Signal Feed"],
                  [MessageCircle, "Discord Community"],
                  [RadioTower, "Protected Alerts"],
                  [Layers, "Platform Expansion"],
                ].map(([Icon, label]) => (
                  <div
                    key={label}
                    onClick={openAccessModal}
                    className="cursor-pointer rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-emerald-300/25 hover:bg-white/10"
                  >
                    <Icon className="h-5 w-5 text-emerald-300" />
                    <p className="mt-4 font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="pt-20">
          <Card className="border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 via-white/[0.05] to-white/[0.02]">
            <div className="p-10">
              <div className="mb-3 flex items-center gap-2 text-emerald-300">
                <Crown className="h-4 w-4" />
                <span className="text-sm uppercase tracking-[0.24em]">
                  Brand Standard
                </span>
              </div>

              <h2 className="max-w-3xl text-3xl font-semibold md:text-5xl">
                Make it feel like a signal artifact — not a template.
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
                Every section should create authority, utility, retention, and
                premium perception.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button onClick={openSignalModal}>Launch Foundation</Button>
                <NavLink href="/trending">Explore Trending</NavLink>
              </div>
            </div>
          </Card>
        </section>

        <footer className="pb-10 pt-16 text-center text-sm text-white/40">
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {[
              "Home",
              "Trending",
              "Signal Check",
              "Telegram",
              "Discord",
              "Guides",
              "Protected Access",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/55"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex justify-center gap-2 text-emerald-300">
            <Signal className="h-4 w-4" />
            <span>Signal Over Noise.</span>
          </div>

          <p className="mt-3">© Trust The Signal. Built by ALL MY INTUITION.</p>
        </footer>
      </div>
    </main>
  );
}