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
  },
  {
    title: "Wallet Intelligence Notes",
    price: "$29",
    description:
      "Prepared premium notes for wallet recurrence, smart wallet behavior, early cluster interpretation, and follow-the-money observation.",
    href: "/protected",
    icon: Wallet,
    status: "Premium Intel",
  },
  {
    title: "Protected Signal Framework",
    price: "Soon",
    description:
      "Future member infrastructure for private alerts, scanner upgrades, premium frameworks, protected rooms, and deeper operator tools.",
    href: "/protected",
    icon: KeyRound,
    status: "Protected Access",
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
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.28em]">
              Premium Monetization Layer
            </p>
          </div>

          <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Operator-grade digital intelligence products.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
            This vault converts Trust The Signal platform authority into premium
            educational guides, intelligence notes, protected member frameworks,
            and future digital operator assets.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <Crown className="h-5 w-5 text-emerald-300" />
            <p className="mt-4 text-lg font-black">Authority Based Products</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            <p className="mt-4 text-lg font-black">Protected Member Routes</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <Lock className="h-5 w-5 text-emerald-300" />
            <p className="mt-4 text-lg font-black">Future Instant Delivery</p>
          </div>
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

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-black text-emerald-300">
                    {product.price}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm font-black text-emerald-200">
                    Open Vault <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
