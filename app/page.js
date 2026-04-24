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
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Button = ({ children, variant = "solid" }) => (
  <button
    className={
      variant === "outline"
        ? "rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-white hover:bg-white/10"
        : "rounded-2xl bg-emerald-400 px-6 py-4 font-semibold text-black shadow-lg shadow-emerald-400/20 hover:bg-emerald-300"
    }
  >
    {children}
  </button>
);

const Badge = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75 backdrop-blur-xl">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-[28px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-emerald-500/10 backdrop-blur-xl ${className}`}
  >
    {children}
  </div>
);

const tools = [
  {
    title: "Signal Check",
    desc: "Paste a Solana contract and get a branded risk, liquidity, and market structure snapshot.",
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
    desc: "Searchable token intelligence pages that build indexed traffic.",
    icon: Search,
    tag: "SEO",
  },
  {
    title: "Wallet Intelligence",
    desc: "Smart wallet clusters, learned wallets, and recurring behavior.",
    icon: Wallet,
    tag: "Intel",
  },
  {
    title: "Guides & Products",
    desc: "Premium educational assets, frameworks, and monetized downloads.",
    icon: BookOpen,
    tag: "Revenue",
  },
  {
    title: "Community Funnel",
    desc: "Telegram, Discord, Twitch, and private premium signal flow.",
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

const roadmap = [
  ["Phase 1", "Brand Site + Signal Check", ["Homepage", "Signal Check", "Community CTAs", "Digital guides"]],
  ["Phase 2", "Traffic Utility", ["Trending tokens", "Token pages", "Watchlists", "Daily utility"]],
  ["Phase 3", "Platform Layer", ["Accounts", "Premium dashboard", "Wallet intelligence", "Scanner integration"]],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.18),transparent_35%),radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_15%_80%,rgba(0,180,140,0.13),transparent_24%)]" />
      <div className="fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
              <Eye className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">ALL MY INTUITION</p>
              <h1 className="text-lg font-semibold tracking-[0.18em]">TRUST THE SIGNAL</h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Badge>Signal.Observed()</Badge>
            <Button>Enter System</Button>
          </div>
        </header>

        <section className="grid gap-10 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="mb-5 flex flex-wrap gap-3">
              <Badge>👁️ Signal.Detected()</Badge>
              <Badge>📡 System.Listening</Badge>
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              A signal platform built to look rare,
              <span className="block text-emerald-300">feel powerful,</span>
              and stay useful.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              Trust The Signal is a premium intelligence system with tools, data, education,
              monetization, and community flow built into one evolving digital brand.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button>Build Core Experience <ArrowRight className="ml-2 inline h-4 w-4" /></Button>
              <Button variant="outline">View Tool Structure</Button>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <Card>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-white/45">SIGNAL CHECK</p>
                    <h3 className="mt-1 text-xl font-semibold">Contract Intelligence Layer</h3>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                    Live Tool Concept
                  </span>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-4">
                  <label className="mb-3 block text-sm text-white/60">Paste Solana token address</label>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <input
                      defaultValue="7xKXtg2X...sampleContract"
                      className="h-12 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none"
                    />
                    <button className="h-12 rounded-2xl bg-emerald-400 px-5 font-medium text-black">
                      Run Check
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {[
                      ["Risk Status", "CAUTION"],
                      ["Liquidity Structure", "Stable"],
                      ["Smart Wallet Presence", "Developing"],
                      ["Signal Strength", "76 / 100"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
                        <p className="mt-2 text-lg font-medium">{value}</p>
                      </div>
                    ))}
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
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Core Utility Layer</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-5xl">Platform sections that create return traffic.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.title}>
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
            [Users, "Protected Community", "Funnels into Telegram, Discord, and private premium channels."],
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
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200">{phase}</span>
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
                <TerminalSquare className="h-4 w-4" />
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