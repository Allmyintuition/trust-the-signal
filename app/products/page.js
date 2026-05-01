import Link from "next/link";
import {
  BookOpen,
  Wallet,
  KeyRound,
  ArrowRight,
  Eye,
  Lock,
  Sparkles,
  Crown,
  ShieldCheck,
  CheckCircle2,
  RadioTower,
  FileText,
  Zap,
} from "lucide-react";

const products = [
  {
    title: "Signal Operator Guide",
    price: "$19",
    description:
      "Beginner-to-operator guide for reading token structure, conviction, entries, exits, protected execution, and disciplined market survival.",
    href: "/products/signal-operator-guide",
    icon: BookOpen,
    status: "Digital Guide",
    cta: "Open Guide",
    fit: "Best first product for new operators.",
  },
  {
    title: "Wallet Intelligence Notes",
    price: "$29",
    description:
      "Prepared premium notes for wallet recurrence, smart wallet behavior, early cluster interpretation, and follow-the-money observation.",
    href: "/protected",
    icon: Wallet,
    status: "Premium Intel",
    cta: "Request Access",
    fit: "For traders tracking repeat wallet behavior.",
  },
  {
    title: "Protected Signal Framework",
    price: "Soon",
    description:
      "Future member infrastructure for private alerts, scanner upgrades, premium frameworks, protected rooms, and deeper operator tools.",
    href: "/protected",
    icon: KeyRound,
    status: "Protected Access",
    cta: "Join Queue",
    fit: "For early members who want private routing.",
  },
];

const trustPoints = [
  "Built from live platform scanner logic",
  "Designed for Solana meme coin operators",
  "Connected to public tools, receipts, and token memory",
  "Expands into protected access, premium notes, and private infrastructure",
];

const vaultLayers = [
  {
    title: "Learn the structure",
    body: "Understand why liquidity, volume, risk flags, token age, and momentum matter before entering.",
    icon: FileText,
  },
  {
    title: "Use the tools",
    body: "Run public checks through Signal Check, Rug Risk, Metadata, Token Memory, and Wallet Snapshot tools.",
    icon: Zap,
  },
  {
    title: "Move protected",
    body: "Route into premium access when the public layer is no longer enough for your operator workflow.",
    icon: ShieldCheck,
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_18%)]" />

      <section className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="mb-10 flex items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
              <Eye className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                TRUST THE SIGNAL
              </p>
              <h1 className="text-lg font-semibold tracking-[0.2em]">
                PRODUCT VAULT
              </h1>
            </div>
          </div>

          <div className="hidden gap-3 sm:flex">
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30">
              Home
            </Link>
            <Link href="/tools" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30">
              Tools
            </Link>
            <Link href="/protected" className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm font-bold text-emerald-100">
              Protected
            </Link>
          </div>
        </header>

        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-emerald-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
              <Sparkles className="h-4 w-4" />
              Premium Monetization Layer
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/55">
              Beta Vault Live
            </span>
          </div>

          <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Operator-grade digital intelligence products.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
            This vault converts Trust The Signal platform authority into premium
            educational guides, intelligence notes, protected member frameworks,
            and future digital operator assets.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products/signal-operator-guide"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black hover:bg-emerald-300"
            >
              Start With The Guide <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/protected"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white/75 hover:border-emerald-300/30"
            >
              Request Protected Access <Lock className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {vaultLayers.map((layer) => {
            const Icon = layer.icon;

            return (
              <div
                key={layer.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <Icon className="h-5 w-5 text-emerald-300" />
                <p className="mt-4 text-lg font-black">{layer.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {layer.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <Link
                key={product.title}
                href={product.href}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-emerald-300/[0.08]"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-6 w-6 text-emerald-300" />

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/45">
                    {product.status}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-black">{product.title}</h3>

                <p className="mt-3 text-sm leading-7 text-white/60">
                  {product.description}
                </p>

                <div className="mt-4 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200/80">
                    Best Fit
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {product.fit}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-black text-emerald-300">
                    {product.price}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm font-black text-emerald-200">
                    {product.cta} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center gap-3 text-emerald-300">
              <Crown className="h-5 w-5" />
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                Why Operators Buy
              </p>
            </div>

            <div className="grid gap-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                  <p className="text-sm leading-7 text-white/65">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
            <div className="flex items-start gap-3">
              <Lock className="mt-1 h-5 w-5 text-emerald-300" />
              <div>
                <h3 className="text-xl font-black">
                  This vault becomes the revenue branch of platform trust.
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  Stripe checkout, instant downloads, premium guide fulfillment,
                  gated files, and protected member digital delivery can be connected
                  directly into this monetization layer.
                </p>

                <Link
                  href="/protected"
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-emerald-300/25 bg-black/30 px-5 py-3 text-sm font-black text-emerald-100 hover:bg-black/50"
                >
                  Enter Protected Funnel <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
