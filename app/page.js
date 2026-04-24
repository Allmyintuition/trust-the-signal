"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Radio,
  ShieldCheck,
  Activity,
  Lock,
  ArrowRight,
  Sparkles,
  Search,
  Users,
  BookOpen,
  Zap,
  Globe,
  Layers,
  TerminalSquare,
  Signal,
  Wallet,
  BarChart3,
  Cpu,
  Store,
  ChevronRight,
  Radar,
  Crown,
  Flame,
  Orbit,
  Network,
  ScanLine,
  Gem,
  RadioTower,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const Button = ({ children, variant = "solid" }) => (
  <button
    className={
      variant === "outline"
        ? "group rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-white backdrop-blur-xl transition hover:border-emerald-300/40 hover:bg-white/10"
        : "group rounded-2xl bg-emerald-400 px-6 py-4 font-semibold text-black shadow-lg shadow-emerald-400/25 transition hover:bg-emerald-300"
    }
  >
    <span className="inline-flex items-center gap-2">{children}</span>
  </button>
);

const Badge = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75 shadow-lg shadow-black/20 backdrop-blur-xl">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-[30px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-emerald-500/10 backdrop-blur-xl ${className}`}
  >
    {children}
  </div>
);

const tools = [
  {
    title: "Signal Check",
    desc: "Paste a Solana contract and receive a branded risk, liquidity, and structure snapshot.",
    icon: ShieldCheck,
    tag: "Core Tool",
  },
  {
    title: "Live Pair Watch",
    desc: "Monitor new pairs, volume shifts, buy pressure, and momentum changes.",
    icon: Activity,
    tag: "Traffic",
  },
  {
    title: "Token Pages",
    desc: "Searchable token intelligence pages built for discoverability and repeat checks.",
    icon: Search,
    tag: "SEO",
  },
  {
    title: "Wallet Intelligence",
    desc: "Future layer for learned wallets, smart clusters, recurrence, and execution behavior.",
    icon: Wallet,
    tag: "Intel",
  },
  {
    title: "Guides & Products",
    desc: "Premium guides, frameworks, operator maps, and monetized education.",
    icon: BookOpen,
    tag: "Revenue",
  },
  {
    title: "Community Funnel",
    desc: "Telegram, Discord, Twitch, and protected access routes built into one ecosystem.",
    icon: Users,
    tag: "Growth",
  },
];

const liveStats = [
  ["Tracked Tokens", "18,420+"],
  ["Wallet Signals", "4,900+"],
  ["Daily Checks", "1,200+"],
  ["Protected Members", "2,100+"],
];

const transmissions = [
  ["01", "Liquidity structure stabilized", "CAUTION"],
  ["02", "Wallet cluster forming", "WATCH"],
  ["03", "Volume impulse detected", "ACTIVE"],
  ["04", "Risk flags reduced", "IMPROVING"],
];

const roadmap = [
  ["Phase 1", "Brand Site + Signal Check", ["Homepage", "Signal Check", "Community CTAs", "Digital guides"]],
  ["Phase 2", "Traffic Utility", ["Trending tokens", "Token pages", "Watchlists", "Daily utility"]],
  ["Phase 3", "Platform Layer", ["Accounts", "Premium dashboard", "Wallet intelligence", "Scanner integration"]],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.18),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.08),transparent_17%),radial-gradient(circle_at_12%_78%,rgba(0,180,140,0.14),transparent_25%)]" />
      <div className="fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/40 px-5 py-4 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
              <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-xl" />
              <Eye className="relative h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">ALL MY INTUITION</p>
              <h1 className="text-lg font-semibold tracking-[0.2em]">TRUST THE SIGNAL</h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Badge>Signal.Observed()</Badge>
            <Button>Enter System</Button>
          </div>
        </header>

        <section className="grid gap-10 pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
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
              A premium intelligence platform for token discovery, risk awareness, wallet behavior,
              digital products, community growth, and signal-based execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button>
                Activate Signal Layer <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline">View Intelligence Map</Button>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 md:grid-cols-3">
              {["Survival First", "Structure Over Noise", "Access Earned"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/65 backdrop-blur-xl">
                  <span className="text-emerald-300">⌁</span> {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="relative p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-white/45">Signal Check</p>
                    <h3 className="mt-1 text-2xl font-semibold">Contract Intelligence Layer</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                    <Radar className="h-5 w-5 text-emerald-300" />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/45 p-4">
                  <label className="mb-3 block text-sm text-white/60">Paste Solana token address</label>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <input
                      defaultValue="7xKXtg2X...sampleContract"
                      className="h-12 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none"
                    />
                    <button className="h-12 rounded-2xl bg-emerald-400 px-5 font-medium text-black hover:bg-emerald-300">
                      Run Check
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {[
                      ["Risk Status", "CAUTION"],
                      ["Liquidity", "Stable"],
                      ["Wallet Signal", "Developing"],
                      ["Strength", "76 / 100"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
                        <p className="mt-2 text-lg font-medium">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-100/90">
                    Future output: token security, liquidity structure, wallet intelligence, risk flags,
                    and a final AMI / TTS signal verdict.
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
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

        <section className="pt-20">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Live Transmission</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
                A dashboard that feels alive before the tools are even connected.
              </h2>
              <p className="mt-4 text-white/60 leading-8">
                The platform should feel like a command center: part scanner, part observatory,
                part protected community gateway.
              </p>
            </div>

            <Card>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3 text-emerald-300">
                  <ScanLine className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-[0.24em]">Transmission Feed</span>
                </div>
                <div className="space-y-3">
                  {transmissions.map(([num, text, status]) => (
                    <div key={num} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-emerald-300">{num}</span>
                        <p className="text-white/75">{text}</p>
                      </div>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="pt-20">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Core Utility Layer</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
              Tools that make people return.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.title} className="transition hover:-translate-y-1 hover:border-emerald-300/25">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
                        <Icon className="h-5 w-5 text-emerald-300" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                        {tool.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{tool.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">{tool.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="pt-20 grid gap-6 lg:grid-cols-3">
          {[
            [Cpu, "Scanner Intelligence", "Future AI scanner integration, market logic, and signal classification."],
            [Store, "Premium Products", "Monetized educational products, guides, and operator frameworks."],
            [Users, "Protected Community", "Funnels into Telegram, Discord, Twitch, and private premium channels."],
          ].map(([Icon, title, text]) => (
            <Card key={title}>
              <div className="p-7">
                <Icon className="h-6 w-6 text-emerald-300" />
                <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/65">{text}</p>
                <div className="mt-5 flex items-center gap-2 text-emerald-300">
                  <span className="text-sm">Expand Layer</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section className="pt-20">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card>
              <div className="p-8">
                <p className="mb-3 text-sm uppercase tracking-[0.24em] text-emerald-300">Monetization System</p>
                <h2 className="text-3xl font-semibold">Build value before asking for money.</h2>
                <div className="mt-6 space-y-4 text-white/70">
                  {[
                    "Free utility tools pull users in.",
                    "Premium education deepens trust.",
                    "Private memberships unlock exclusivity.",
                    "Community increases retention.",
                    "Products + subscriptions become scalable revenue.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 p-4">
                      <Zap className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                      <p className="text-sm leading-7">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <p className="mb-3 text-sm uppercase tracking-[0.24em] text-emerald-300">Architecture Path</p>
                <h2 className="text-3xl font-semibold">Start lean. Grow into platform.</h2>

                <div className="mt-6 space-y-4">
                  {roadmap.map(([phase, title, items]) => (
                    <div key={phase} className="rounded-3xl border border-white/10 bg-black/25 p-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200">
                          {phase}
                        </span>
                        <h3 className="text-lg font-medium">{title}</h3>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {items.map((item) => (
                          <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                            <Layers className="h-4 w-4 text-emerald-300" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="pt-20">
          <Card className="border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 via-white/[0.05] to-white/[0.02]">
            <div className="p-10">
              <div className="mb-3 flex items-center gap-2 text-emerald-300">
                <Crown className="h-4 w-4" />
                <span className="text-sm uppercase tracking-[0.24em]">Brand Standard</span>
              </div>
              <h2 className="max-w-3xl text-3xl font-semibold md:text-5xl">
                Make it feel like a signal artifact — not a template.
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
                Every section should create authority, utility, retention, and premium perception.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button>Launch Foundation</Button>
                <Button variant="outline">Map Platform</Button>
              </div>
            </div>
          </Card>
        </section>

        <footer className="pb-10 pt-16 text-center text-sm text-white/40">
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