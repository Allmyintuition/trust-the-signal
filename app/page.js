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
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const clampBar = (num) => Math.max(0, Math.min(100, Number(num || 0)));

const Button = ({ children, variant = "solid", onClick, href }) => {
  const className =
    variant === "outline"
      ? "group rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-white backdrop-blur-xl transition hover:border-emerald-300/40 hover:bg-white/10"
      : "group rounded-2xl bg-emerald-400 px-6 py-4 font-semibold text-black shadow-lg shadow-emerald-400/25 transition hover:bg-emerald-300";

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
          <span className="text-sm uppercase tracking-[0.24em]">
            {modal.label}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl font-semibold">{modal.title}</h3>
        <p className="mt-4 leading-8 text-white/65">{modal.body}</p>

        {modal.type === "signal" && modal.live && (
          <>
            <div className="mt-7 grid gap-3 md:grid-cols-4">
              {[
                ["Token", `${modal.live.name} (${modal.live.symbol})`],
                ["Final Score", `${modal.live.score}/100`],
                ["Verdict", modal.live.verdict],
                ["Signal", modal.live.signal],
                ["Risk", modal.live.risk],
                ["DEX", modal.live.dex],
                ["Quote", modal.live.quoteToken || "--"],
                ["Source Health", modal.live.sourceHealth],
                ["Liquidity", `$${formatNum(modal.live.liquidity)}`],
                ["24H Volume", `$${formatNum(modal.live.volume24h)}`],
                ["Market Cap", `$${formatNum(modal.live.marketCap)}`],
                ["24H Change", `${modal.live.priceChange24h}%`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                    {label}
                  </p>
                  <p className="mt-2 text-base md:text-lg font-medium text-emerald-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <SignalScoreBar label="Liquidity" value={modal.live.breakdown?.liquidity} />
              <SignalScoreBar label="Volume" value={modal.live.breakdown?.volume} />
              <SignalScoreBar label="Balance" value={modal.live.breakdown?.liquidityBalance} />
              <SignalScoreBar label="Momentum" value={modal.live.breakdown?.momentum} />
              <SignalScoreBar label="Age" value={modal.live.breakdown?.age} />
              <SignalScoreBar label="Transactions" value={modal.live.breakdown?.transactions} />
            </div>

            {Array.isArray(modal.live.riskFlags) && modal.live.riskFlags.length > 0 && (
              <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-red-200/70">
                  Active Risk Flags
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {modal.live.riskFlags.map((flag) => (
                    <span
                      key={flag}
                      className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs font-bold text-red-200"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Intelligence Continuation
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <ExternalLinkButton href={modal.live.pairUrl}>
                  Open DexScreener Pair
                </ExternalLinkButton>

                <button
                  onClick={() => routeToTokenPage(modal.live.address)}
                  className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-400/20"
                >
                  Open Full Token Report
                </button>
              </div>
            </div>
          </>
        )}

        {modal.type !== "signal" && (
          <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-100/90">
            This layer continues expanding into products, access systems, premium signal routes, and protected operator infrastructure.
          </div>
        )}
      </motion.div>
    </div>
  );
}; const recentFallback = [
  {
    contract: "So11111111111111111111111111111111111111112",
    token_name: "Wrapped SOL",
    token_symbol: "SOL",
    latest_score: null,
    latest_risk: "Reference Asset",
  },
];

const tools = [
  {
    title: "Signal Check Pro",
    desc: "Run weighted Solana contract interpretation through the live Trust The Signal authority engine.",
    icon: ShieldCheck,
    href: "/",
  },
  {
    title: "Trending Intelligence",
    desc: "Observe liquidity, velocity, and volume concentration across active Solana pairs before commitment.",
    icon: TrendingUp,
    href: "/trending",
  },
  {
    title: "Token Intelligence Reports",
    desc: "Dedicated premium token dossier pages generated per contract for deeper continuation review.",
    icon: FileSearch,
    href: "/tools/token-memory",
  },
  {
    title: "Protected Access Layer",
    desc: "Private route preparation for premium guides, operator alerts, and future member signal infrastructure.",
    icon: Lock,
    href: "/protected",
  },
];

const liveStats = [
  ["Signal Engine", "Active"],
  ["Platform Memory", "Live"],
  ["Token Reports", "Online"],
  ["Lead Capture", "Secured"],
];

const terminalFeed = [
  ["06:42:01", "DEX_STREAM", "new liquidity event detected"],
  ["06:42:14", "RISK_LAYER", "caution flag triggered / liquidity imbalance"],
  ["06:42:39", "MEMORY_CORE", "contract demand archived to supabase"],
  ["06:43:08", "SIGNAL_ENGINE", "setup classified / early_potential"],
  ["06:43:21", "ACCESS_ROUTE", "lead captured / protected queue"],
];

const products = [
  {
    title: "Signal Operator Guide",
    price: "$19",
    desc: "Beginner to structured operator guide for understanding entries, warnings, setups, and survival.",
    icon: BookOpen,
    action: "Preview Guide",
  },
  {
    title: "Wallet Intelligence Notes",
    price: "$29",
    desc: "Smart wallet recurrence, cluster behavior, movement logic, and high-value tracking interpretation.",
    icon: Wallet,
    action: "View Notes",
  },
  {
    title: "Protected Signal Framework",
    price: "Soon",
    desc: "Private signal ecosystem, premium operator access, structured route alerts, and gated intelligence.",
    icon: KeyRound,
    action: "Request Access",
  },
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
  const [platformMetrics, setPlatformMetrics] = useState(null);
  const [signalReceipts, setSignalReceipts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const contractFromUrl = params.get("contract");

    if (contractFromUrl) {
      setContract(decodeURIComponent(contractFromUrl));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function loadRecentChecks() {
      try {
        const response = await fetch("/api/recent-token-checks", {
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success && Array.isArray(data.logs)) {
          setRecentChecks(data.logs);
        }
      } catch {
        setRecentChecks([]);
      }
    }

    async function loadPlatformMetrics() {
      try {
        const response = await fetch("/api/platform-metrics", {
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success) {
          setPlatformMetrics(data.metrics);
        }
      } catch {}
    }

    async function loadSignalReceipts() {
      try {
        const response = await fetch("/api/signal-receipts", {
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success && Array.isArray(data.receipts)) {
          setSignalReceipts(data.receipts.slice(0, 3));
        }
      } catch {}
    }

    loadRecentChecks();
    loadPlatformMetrics();
    loadSignalReceipts();
  }, []);

  const closeModal = () => setModal(null);

  const saveRecentCheck = async () => {
    try {
      const response = await fetch("/api/recent-token-checks", {
        cache: "no-store",
      });

      const data = await response.json();

      if (data.success && Array.isArray(data.logs)) {
        setRecentChecks(data.logs);
      }
    } catch {
      setRecentChecks((current) => current);
    }
  };

  const openSignalModal = () =>
    setModal({
      type: "signal",
      label: "Signal Check Pro",
      title: "Contract Intelligence Result",
      body: "The entered contract is interpreted through a live weighted authority engine built around liquidity, flow, source health, risk behavior, and structure.",
      icon: <Radar className="h-5 w-5" />,
    });

  const openAccessModal = () =>
    setModal({
      label: "Protected Access",
      title: "Protected Operator Access Route",
      body: "This access layer is being prepared for private signal infrastructure, premium guide releases, gated community routes, and member intelligence expansion.",
      icon: <Lock className="h-5 w-5" />,
    });

  const openProductModal = (product) =>
    setModal({
      label: "Digital Product",
      title: product.title,
      body: `${product.desc} This premium product route is being prepared for checkout, delivery, and wider ecosystem integration.`,
      icon: <BookOpen className="h-5 w-5" />,
    });

  const submitAccessRequest = async () => {
    const contact = accessEmail.trim();

    if (!contact) {
      setModal({
        label: "Access Request",
        title: "Contact Required",
        body: "Enter an email, Telegram handle, Discord name, or preferred contact before requesting access.",
        icon: <Mail className="h-5 w-5" />,
      });
      return;
    }

    try {
      const response = await fetch("/api/access-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact,
          source: "homepage_access_capture",
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Access request failed.");
      }

      setAccessSubmitted(true);

      setModal({
        label: "Access Request",
        title: "Request Captured",
        body: "Your request has been captured into the protected access queue.",
        icon: <CheckCircle2 className="h-5 w-5" />,
      });
    } catch (error) {
      setModal({
        label: "Access Request",
        title: "Request Failed",
        body: "The access route could not capture this request. Try again.",
        icon: <Mail className="h-5 w-5" />,
      });
    }
  };

  const runLiveSignalCheck = async () => {
    const trimmedContract = contract.trim();

    if (!trimmedContract) {
      setModal({
        type: "signal",
        label: "Signal Error",
        title: "No Contract Entered",
        body: "Paste a valid Solana contract address to activate the live intelligence layer.",
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

      const data = await response.json(); if (!data.success) {
        setModal({
          type: "signal",
          label: "Signal Error",
          title: "Live Check Failed",
          body: data.error || "No signal data found.",
          icon: <Radar className="h-5 w-5" />,
        });
      } else {
        await saveRecentCheck();

        setModal({
          type: "signal",
          label: "Live Signal Result",
          title: "Contract Intelligence Result",
          body: "Live token data has been processed through the Trust The Signal weighted authority layer.",
          icon: <Radar className="h-5 w-5" />,
          live: data.result,
        });
      }
    } catch (err) {
      setModal({
        type: "signal",
        label: "Signal Error",
        title: "System Route Failure",
        body: "Unable to complete live intelligence request.",
        icon: <Radar className="h-5 w-5" />,
      });
    }

    setChecking(false);
  };

  const routeToTokenPage = (manualContract) => {
    const target = manualContract || contract.trim();

    if (!target) {
      setModal({
        label: "Token Report",
        title: "No Contract Entered",
        body: "Paste a Solana contract first, then open its dedicated intelligence report.",
        icon: <FileSearch className="h-5 w-5" />,
      });
      return;
    }

    window.location.href = `/token/${encodeURIComponent(target)}`;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <Modal modal={modal} closeModal={closeModal} routeToTokenPage={routeToTokenPage} />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.18),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.08),transparent_17%),radial-gradient(circle_at_12%_78%,rgba(0,180,140,0.14),transparent_25%)]" />
      <div className="fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-5 md:py-8">
        <header className="sticky top-2 md:top-4 z-40 flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between rounded-3xl border border-white/10 bg-black/50 px-4 sm:px-5 py-3 md:py-4 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
              <Eye className="relative h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/45">
                ALL MY INTUITION
              </p>
              <h1 className="text-sm sm:text-lg font-semibold tracking-[0.2em]">
                TRUST THE SIGNAL
              </h1>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:items-center md:gap-3">
            <Badge>Signal.Observed()</Badge>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/trending">Trending</NavLink>
            <NavLink href="/tools">Tools</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/protected">Protected</NavLink>
            <Button onClick={openAccessModal}>Enter System</Button>
          </div>
        </header>

        <section className="grid gap-8 pt-8 md:pt-12 lg:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>👁️ Signal.Detected()</Badge>
              <Badge>📡 System.Listening</Badge>
              <Badge>🔒 Protected.Channel</Badge>
              <Badge>🧠 Platform.Memory.Live</Badge>
            </div>

            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              Premium Solana intelligence,
              <span className="block bg-gradient-to-r from-emerald-200 via-emerald-400 to-white bg-clip-text text-transparent">
                structured beyond basic scanners.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              Analyze live contracts, observe active demand, open dedicated token dossiers, and secure protected access into the wider Trust The Signal ecosystem.
            </p>

            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Button onClick={runLiveSignalCheck}>
                Run Signal Check <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/trending" variant="outline">
                Explore Trending Board
              </Button>
              <Button href="/tools" variant="outline">
                Open Tool Suite
              </Button>
              <Button href="/tools/token-memory" variant="outline">
                Token Memory
              </Button>
            </div>
          </motion.div>

          <Card className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/45">
                  Live Contract Intelligence
                </p>
                <h3 className="mt-1 text-2xl font-semibold">
                  Signal Check Pro
                </h3>
              </div>
              <Radar className="h-5 w-5 text-emerald-300" />
            </div>

            <label className="mb-3 block text-sm text-white/60">
              Paste Solana token address
            </label>

            <div className="flex flex-col gap-3">
              <input
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                placeholder="Enter live Solana contract..."
                className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none"
              />

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  onClick={runLiveSignalCheck}
                  className="h-12 rounded-2xl bg-emerald-400 px-5 font-medium text-black hover:bg-emerald-300"
                >
                  {checking ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Checking
                    </span>
                  ) : (
                    "Run Quick Check"
                  )}
                </button>

                <button
                  onClick={() => routeToTokenPage()}
                  className="h-12 rounded-2xl border border-white/10 bg-white/5 px-5 font-medium text-white/75 transition hover:border-emerald-300/30 hover:text-white"
                >
                  Open Token Report
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ["Signal Engine", "Operational"],
                ["Platform Memory", "Supabase Live"],
                ["Token Reports", "Generated"],
                ["Protected Access", "Capturing"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
                  <p className="mt-2 text-lg font-medium">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="pt-12">
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-300">
              <History className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.24em]">Recent Platform Checks</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {(recentChecks.length ? recentChecks : recentFallback).map((item) => {
                const address = item.contract || item;
                const name = item.token_name || "Unknown Token";
                const symbol = item.token_symbol || "TOKEN";

                return (
                  <div
                    key={address}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-emerald-300/30 hover:bg-emerald-300/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <button onClick={() => setContract(address)} className="min-w-0 flex-1 text-left">
                        <p className="text-sm font-semibold text-white">
                          {name} ({symbol})
                        </p>
                        <p className="mt-2 break-all font-mono text-xs text-white/45">
                          {address}
                        </p>
                      </button>

                      {item.latest_score !== null && item.latest_score !== undefined && (
                        <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
                          {item.latest_score}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                        {item.latest_risk || "Live platform check"}
                      </p>

                      <div className="flex gap-2">
                        <a
                          href={`/token/${address}`}
                          className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[11px] font-black text-emerald-200"
                        >
                          Open Dossier
                        </a>

                        <a
                          href={`/tools/token-memory?q=${address}`}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/70"
                        >
                          Memory
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        <section className="pt-14">
          <div className="grid gap-4 md:grid-cols-4">
            {liveStats.map(([label, value]) => (
              <Card key={label}>
                <div className="p-5 text-center">
                  <p className="text-3xl font-semibold text-emerald-300">{value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/45">{label}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>


        <section className="pt-14">
          <div className="mb-6 flex items-center gap-2 text-emerald-300">
            <BarChart3 className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.24em]">Live Platform Authority</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {[
              ["Contracts", platformMetrics?.contractsProcessed ?? "--"],
              ["Total Checks", platformMetrics?.totalChecks ?? "--"],
              ["Protected Queue", platformMetrics?.protectedQueue ?? "--"],
              ["Safe Routes", platformMetrics?.safeRoutes ?? "--"],
              ["Caution Routes", platformMetrics?.cautionRoutes ?? "--"],
              ["Operator Marked", platformMetrics?.operatorMarked ?? "--"],
            ].map(([label, value]) => (
              <Card key={label}>
                <div className="p-5 text-center">
                  <p className="text-3xl font-semibold text-emerald-300">{value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/45">{label}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
                Signal Receipt Archive
              </p>
              <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
                Public proof of recent intelligence.
              </h2>
            </div>

            <a
              href="/receipts"
              className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-5 py-3 text-sm font-black text-emerald-200"
            >
              <span className="inline-flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Open Receipts
              </span>
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {signalReceipts.map((receipt) => (
              <Card key={receipt.id} className="h-full">
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">
                      {receipt.receiptType}
                    </span>

                    <span className="text-xs text-white/40">
                      {receipt.checkCount || 0} checks
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold">
                    {receipt.tokenName} ({receipt.tokenSymbol})
                  </h3>

                  <p className="mt-2 break-all font-mono text-[11px] text-white/35">
                    {receipt.contract}
                  </p>

                  <div className="mt-4 grid gap-2 text-sm">
                    <p>Score: <span className="text-emerald-300">{receipt.score ?? "--"}</span></p>
                    <p>Risk: <span className="text-emerald-300">{receipt.risk || "--"}</span></p>
                    <p>MC: <span className="text-emerald-300">${formatNum(receipt.marketCap)}</span></p>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <a
                      href={`/token/${receipt.contract}`}
                      className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[11px] font-black text-emerald-200"
                    >
                      Open Dossier
                    </a>

                    <a
                      href={`/tools/token-memory?q=${receipt.contract}`}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/70"
                    >
                      Memory
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>


        <section className="pt-20">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
              Platform Intelligence Layers
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
              Built as a system, not a single checker.
            </h2>
          </div>

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
                <Card
                  key={product.title}
                  onClick={() => openProductModal(product)}
                  className="cursor-pointer transition hover:-translate-y-1 hover:border-emerald-300/25"
                >
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

          <div className="flex justify-center gap-2 text-emerald-300">
            <Signal className="h-4 w-4" />
            <span>Signal Over Noise.</span>
          </div>

          <p className="mt-3">© Trust The Signal — Built by ALL MY INTUITION.</p>
        </footer>
      </div>
    </main>
  );
}
