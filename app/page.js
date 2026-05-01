"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  Eye,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  Network,
  Orbit,
  Radar,
  RadioTower,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";

const fallbackTicker = [
  "SIGNAL DETECTED",
  "DEX FEED ACTIVE",
  "RISK LAYER ONLINE",
  "TOKEN MEMORY UPDATED",
  "PROTECTED QUEUE OPEN",
  "OPERATOR NODE READY",
];

const fallbackMarketTicker = [
  "$SOL • rotation strength",
  "$NEWPAIR • launch watch",
  "$FLOW • volume expanding",
  "$RUNNER • momentum building",
];

const ecosystemBlocks = [
  {
    title: "Signal Reading",
    desc: "Weighted setup interpretation, risk flags, liquidity awareness, and structure checks.",
    icon: ScanSearch,
  },
  {
    title: "Memory Core",
    desc: "Token checks, repeated demand, receipts, notes, and contract intelligence continuation.",
    icon: Database,
  },
  {
    title: "Protected Access",
    desc: "Operator intake, gated releases, private alerts, and future premium routes.",
    icon: Lock,
  },
  {
    title: "Knowledge Layer",
    desc: "Guides, frameworks, wallet notes, and branded intelligence products.",
    icon: Brain,
  },
];

const trustFunnels = [
  {
    title: "Run Signal Check",
    desc: "Paste a Solana contract and route into a dedicated intelligence report.",
    href: "#signal-check",
    icon: Radar,
  },
  {
    title: "Open Product Vault",
    desc: "Digital guides, wallet notes, and operator intelligence products.",
    href: "/products",
    icon: BookOpen,
  },
  {
    title: "Request Protected Access",
    desc: "Reserve placement for future gated intelligence routes.",
    href: "/protected",
    icon: KeyRound,
  },
];

const products = [
  {
    title: "Signal Operator Guide",
    price: "$19",
    desc: "Entry logic, warning signs, structure reading, and operator survival framework.",
    icon: BookOpen,
    href: "/products/signal-operator-guide",
  },
  {
    title: "Wallet Intelligence Notes",
    price: "$29",
    desc: "Smart wallet recurrence, flow behavior, and tracking interpretation.",
    icon: Wallet,
    href: "/products",
  },
  {
    title: "Protected Signal Framework",
    price: "Soon",
    desc: "Private operator route, gated alerts, and premium access layer.",
    icon: KeyRound,
    href: "/protected",
  },
];

const commandStats = [
  ["DEX FEED", "ACTIVE"],
  ["MEMORY", "LIVE"],
  ["RISK", "ONLINE"],
  ["QUEUE", "OPEN"],
];

function Button({ children, href, onClick, variant = "solid", icon: Icon }) {
  const className =
    variant === "outline"
      ? "group rounded-2xl border border-emerald-300/20 bg-black/35 px-5 py-3 text-sm font-black text-white/80 backdrop-blur-xl transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
      : "group rounded-2xl bg-gradient-to-r from-emerald-300 to-emerald-400 px-5 py-3 text-sm font-black text-black shadow-[0_0_35px_rgba(52,211,153,0.25)] transition hover:brightness-110";

  const inner = (
    <span className="inline-flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );

  if (href) return <a href={href} className={className}>{inner}</a>;
  return <button onClick={onClick} className={className}>{inner}</button>;
}

function NavLink({ href, children, icon: Icon }) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/65 backdrop-blur-xl transition hover:border-emerald-300/40 hover:text-emerald-200"
    >
      <span className="inline-flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-emerald-300" />}
        {children}
      </span>
    </a>
  );
}

function TerminalCard({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-emerald-300/15 bg-black/45 shadow-[0_0_65px_rgba(16,185,129,0.08)] backdrop-blur-2xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.035)_1px,transparent_1px)] bg-[length:100%_14px]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Modal({ modal, closeModal }) {
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

        <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
          Premium Layer
        </p>
        <h3 className="mt-3 text-4xl font-black">{modal.title}</h3>
        <p className="mt-5 leading-8 text-white/65">{modal.body}</p>
      </motion.div>
    </div>
  );
}

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
        const res = await fetch("/api/recent-token-checks", { cache: "no-store" });
        const data = await res.json();
        if (data.success) setRecentChecks(data.logs || []);
      } catch {
        setRecentChecks([]);
      }
    }

    async function loadTrending() {
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
          ).slice(0, 12);

          setTrendingTokens(unique);
        }
      } catch {
        setTrendingTokens([]);
      }
    }

    loadRecent();
    loadTrending();
  }, []);

  const systemTicker = useMemo(() => {
    const recent = recentChecks.slice(0, 5).map((token) => {
      return `$${token.token_symbol || "TOKEN"} ${token.latest_risk || "signal activity"}`;
    });

    return recent.length ? [...recent, ...fallbackTicker] : fallbackTicker;
  }, [recentChecks]);

  const marketTicker = useMemo(() => {
    if (!trendingTokens.length) return fallbackMarketTicker;

    return trendingTokens.map((token) => {
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
    });
  }, [trendingTokens]);

  async function submitAccessRequest() {
    if (!accessEmail) return;

    try {
      await fetch("/api/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: accessEmail,
          email: accessEmail.includes("@") ? accessEmail : "",
          telegram: accessEmail.startsWith("@") ? accessEmail : "",
          source: "homepage_access_capture",
          message: "Homepage protected access request",
        }),
      });
    } catch {}

    setAccessSubmitted(true);
  }

  function runSignalCheck() {
    if (!contract) return;
    setChecking(true);
    setTimeout(() => {
      window.location.href = `/token/${encodeURIComponent(contract.trim())}`;
    }, 600);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#02070b] text-white">
      <Modal modal={modal} closeModal={() => setModal(null)} />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.16),transparent_28%),radial-gradient(circle_at_18%_30%,rgba(0,120,255,0.09),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(255,0,170,0.05),transparent_14%)]" />
      <div className="fixed inset-0 opacity-[0.08] bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:46px_46px]" />

      <section className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-black/55 px-5 py-4 backdrop-blur-2xl">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.38em] text-emerald-300">
              TRUST THE SIGNAL
            </p>
            <h1 className="mt-1 text-lg font-black tracking-[0.24em] text-white">
              OPERATOR TERMINAL
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <NavLink href="/trending" icon={TrendingUp}>Trending</NavLink>
            <NavLink href="/products" icon={BookOpen}>Vault</NavLink>
            <NavLink href="/protected" icon={Lock}>Access</NavLink>
            <NavLink href="/receipts" icon={RadioTower}>Receipts</NavLink>
          </div>
        </header>

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] py-3">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 whitespace-nowrap text-sm font-black text-emerald-200"
          >
            {[...systemTicker, ...systemTicker, ...systemTicker].map((item, i) => (
              <span key={i}>◉ {item}</span>
            ))}
          </motion.div>
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl border border-cyan-300/10 bg-white/[0.03] py-3">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 whitespace-nowrap text-xs font-black uppercase tracking-[0.18em] text-white/60"
          >
            {[...marketTicker, ...marketTicker, ...marketTicker].map((item, i) => (
              <span key={i}>✦ {item}</span>
            ))}
          </motion.div>
        </div>

        <section className="grid gap-8 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-white/[0.04] px-5 py-2 text-sm font-black text-emerald-200">
              <Orbit className="h-4 w-4" />
              SIGNAL OVER NOISE
            </div>

            <h2 className="mt-7 max-w-4xl text-4xl font-black leading-tight md:text-7xl">
              A live crypto intelligence command center for Solana operators.
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/65">
              Built to help traders detect stronger setups, inspect risk, watch momentum,
              archive token memory, and route deeper into protected intelligence layers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#signal-check" icon={Radar}>[ RUN SIGNAL ]</Button>
              <Button href="/products" variant="outline" icon={Brain}>[ KNOWLEDGE VAULT ]</Button>
              <Button href="/protected" variant="outline" icon={KeyRound}>[ ACCESS NODE ]</Button>
            </div>
          </div>

          <TerminalCard className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-emerald-300">
                <TerminalSquare className="h-5 w-5" />
                <p className="text-xs font-black uppercase tracking-[0.24em]">
                  System Boot
                </p>
              </div>
              <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            </div>

            <div className="space-y-3 font-mono text-sm">
              {[
                ["scanner.py", "ready"],
                ["risk_filter", "online"],
                ["memory_core", "synced"],
                ["protected_queue", "open"],
                ["operator_layer", "forming"],
              ].map(([left, right]) => (
                <div
                  key={left}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-4 py-3"
                >
                  <span className="text-white/55">{left}</span>
                  <span className="text-emerald-300">{right}</span>
                </div>
              ))}
            </div>
          </TerminalCard>
        </section>

        <section id="signal-check" className="pt-12">
          <TerminalCard className="p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
                  SIGNAL CHECK PRO
                </p>
                <h3 className="mt-2 text-3xl font-black">
                  Paste contract. Run intelligence.
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {commandStats.map(([label, value]) => (
                  <span
                    key={label}
                    className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs text-white/60"
                  >
                    {label}: <span className="text-emerald-300">{value}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                placeholder="Paste Solana contract address..."
                className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/50 px-5 font-mono text-white outline-none placeholder:text-white/30"
              />

              <button
                onClick={runSignalCheck}
                className="h-14 rounded-2xl bg-gradient-to-r from-emerald-300 to-emerald-400 px-8 font-black text-black hover:brightness-110"
              >
                {checking ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Radar className="h-5 w-5" /> RUN
                  </span>
                )}
              </button>
            </div>
          </TerminalCard>
        </section>

        <section className="pt-12">
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <Activity className="h-5 w-5" />
            <span className="text-sm font-black uppercase tracking-[0.24em]">
              Recent Intelligence Activity
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(recentChecks.length ? recentChecks.slice(0, 3) : [
              { token_name: "Awaiting Feed", token_symbol: "LIVE", latest_risk: "Recent checks load here", latest_score: "--" },
              { token_name: "Token Memory", token_symbol: "CORE", latest_risk: "Archive ready", latest_score: "--" },
              { token_name: "Signal Layer", token_symbol: "RUN", latest_risk: "Scanner online", latest_score: "--" },
            ]).map((token, i) => (
              <TerminalCard key={i} className="p-5">
                <p className="text-xl font-black">
                  {token.token_name || "Unknown"} ({token.token_symbol || "?"})
                </p>
                <p className="mt-2 text-sm text-white/55">
                  {token.latest_risk || "Awaiting classification"}
                </p>
                <p className="mt-4 font-mono text-sm text-emerald-300">
                  SCORE: {token.latest_score ?? "--"}
                </p>
              </TerminalCard>
            ))}
          </div>
        </section>

        <section className="grid gap-5 pt-20 md:grid-cols-3">
          {trustFunnels.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.title} href={item.href}>
                <TerminalCard className="h-full p-7 transition hover:-translate-y-1 hover:border-emerald-300/30">
                  <Icon className="h-6 w-6 text-emerald-300" />
                  <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-emerald-300">
                    OPEN NODE <ArrowRight className="h-4 w-4" />
                  </span>
                </TerminalCard>
              </a>
            );
          })}
        </section>

        <section className="pt-20">
          <div className="mb-6">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-emerald-300">
              ══════ TRUST LAYER ══════
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">
              Custom intelligence infrastructure with a signature operator identity.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {ecosystemBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <TerminalCard key={block.title} className="p-7">
                  <Icon className="h-6 w-6 text-emerald-300" />
                  <h3 className="mt-5 text-2xl font-black">{block.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{block.desc}</p>
                </TerminalCard>
              );
            })}
          </div>
        </section>

        <section className="pt-20">
          <TerminalCard className="border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-white/[0.03] to-black">
            <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2 text-emerald-300">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm font-black uppercase tracking-[0.24em]">
                    Protected Access Queue
                  </span>
                </div>

                <h2 className="text-3xl font-black md:text-5xl">
                  Secure early placement before operator access expands.
                </h2>

                <div className="mt-6 flex flex-col gap-3 md:flex-row">
                  <input
                    value={accessEmail}
                    onChange={(e) => setAccessEmail(e.target.value)}
                    placeholder="Email / Telegram / preferred contact..."
                    className="h-12 flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 font-mono text-white outline-none placeholder:text-white/30"
                  />
                  <button
                    onClick={submitAccessRequest}
                    className="h-12 rounded-2xl bg-gradient-to-r from-emerald-300 to-emerald-400 px-6 font-black text-black hover:brightness-110"
                  >
                    {accessSubmitted ? "CAPTURED" : "REQUEST ACCESS"}
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
                  <div
                    key={benefit}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-7 text-white/70">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </TerminalCard>
        </section>

        <section className="grid gap-5 pt-20 md:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <a key={product.title} href={product.href}>
                <TerminalCard className="h-full p-7 transition hover:-translate-y-1 hover:border-emerald-300/30">
                  <Icon className="h-6 w-6 text-emerald-300" />
                  <h3 className="mt-5 text-2xl font-black">{product.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{product.desc}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-300">{product.price}</span>
                    <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                      {product.action}
                    </span>
                  </div>
                </TerminalCard>
              </a>
            );
          })}
        </section>

        <footer className="pb-10 pt-20 text-center font-mono text-sm text-white/40">
          TRUST THE SIGNAL — Intelligence first. Execution second. Survival always.
        </footer>
      </section>
    </main>
  );
}
