import Link from "next/link";
import {
  Clock3,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Wrench,
  RadioTower,
  Lock,
  Mail,
} from "lucide-react";

const pendingNotes = [
  "Your request is captured inside the operator intake terminal",
  "Higher-quality submissions are prioritized first",
  "Product and access updates route to early registrants first",
  "Protected signal access invitations route through this queue",
];

const confidenceSteps = [
  "Check your email or Telegram for future contact",
  "Keep using the public tools while your access is staged",
  "Review products and receipts to understand the system",
  "Submit again only if your contact details need correction",
];

const nextMoves = [
  {
    title: "Study the product vault",
    body: "Review current digital guides and future premium intelligence products.",
    href: "/products",
    icon: BookOpen,
  },
  {
    title: "Run the public tools",
    body: "Use Rug Risk, Metadata, Token Memory, Wallet Snapshot, and live token checks.",
    href: "/tools",
    icon: Wrench,
  },
  {
    title: "Watch public receipts",
    body: "Review visible platform checks and public proof routes while access is staged.",
    href: "/receipts",
    icon: RadioTower,
  },
];

export default function AccessPendingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_18%)]" />

      <section className="relative mx-auto flex max-w-5xl flex-col px-5 py-8 sm:px-8">
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
                ACCESS PENDING
              </h1>
            </div>
          </div>

          <Link
            href="/protected"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
          >
            Protected
          </Link>
        </header>

        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-8 text-center shadow-[0_0_80px_rgba(16,185,129,0.12)]">
          <Clock3 className="mx-auto h-8 w-8 text-emerald-300" />

          <p className="mt-5 text-sm uppercase tracking-[0.28em] text-emerald-300">
            Queue Placement Confirmed
          </p>

          <h2 className="mt-3 text-4xl font-black sm:text-6xl">
            Your route is staged.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
            Your request has entered the protected operator intake flow. Trust The Signal reviews access interest, product demand, wallet-aware operators, and premium signal readiness from one internal command layer.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black hover:bg-emerald-300"
            >
              View Product Vault <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white/75 hover:border-emerald-300/30"
            >
              Use Public Tools <ShieldCheck className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center gap-3 text-emerald-300">
              <Lock className="h-5 w-5" />
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                What Happens Next
              </p>
            </div>

            <div className="grid gap-3">
              {pendingNotes.map((note) => (
                <div key={note} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-300" />
                  <p className="text-sm leading-7 text-white/70">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
            <div className="mb-5 flex items-center gap-3 text-emerald-300">
              <Mail className="h-5 w-5" />
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                While You Wait
              </p>
            </div>

            <div className="grid gap-3">
              {confidenceSteps.map((step) => (
                <div key={step} className="flex items-start gap-3">
                  <Clock3 className="mt-1 h-5 w-5 text-emerald-300" />
                  <p className="text-sm leading-7 text-white/70">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {nextMoves.map((move) => {
            const Icon = move.icon;

            return (
              <Link
                key={move.title}
                href={move.href}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-emerald-300/[0.08]"
              >
                <Icon className="h-6 w-6 text-emerald-300" />
                <h3 className="mt-5 text-xl font-black">{move.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {move.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-200">
                  Continue <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-black text-white/70 hover:border-emerald-300/30"
        >
          Return Home <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
