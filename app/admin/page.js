import Link from "next/link";

const ADMIN_MODULES = [
  {
    title: "Access Requests",
    description:
      "Review protected access leads, update statuses, export contacts, and manage operator intake.",
    href: "/admin/access-requests",
    status: "Live",
  },
  {
    title: "Token Logs",
    description:
      "Future operator view for checked token history, signal outcomes, and intelligence trails.",
    href: "#",
    status: "Coming Soon",
  },
  {
    title: "Watchlist",
    description:
      "Future private watchlist for tracked contracts, narratives, alerts, and priority setups.",
    href: "#",
    status: "Coming Soon",
  },
  {
    title: "Analytics",
    description:
      "Future dashboard for traffic, access demand, signal usage, and platform growth metrics.",
    href: "#",
    status: "Coming Soon",
  },
  {
    title: "Operator Settings",
    description:
      "Future internal controls for platform tuning, access rules, scoring thresholds, and admin tools.",
    href: "#",
    status: "Coming Soon",
  },
];

export default function AdminGatewayPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-cyan-400/10 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-emerald-300">
            Trust The Signal Internal Gateway
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Operator Control Center
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Hidden admin command layer for protected platform operations, lead
            management, signal intelligence, and future internal growth tools.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ADMIN_MODULES.map((module) => {
            const isLive = module.status === "Live";

            const card = (
              <div
                className={`h-full rounded-[1.75rem] border p-6 transition ${
                  isLive
                    ? "border-emerald-300/25 bg-emerald-300/[0.06] hover:border-emerald-300/50 hover:bg-emerald-300/[0.1]"
                    : "border-white/10 bg-white/[0.04] opacity-70"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-black tracking-tight">
                    {module.title}
                  </h2>

                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
                      isLive
                        ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-200"
                        : "border-white/15 bg-white/5 text-white/40"
                    }`}
                  >
                    {module.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/55">
                  {module.description}
                </p>

                <div className="mt-6 text-sm font-black text-emerald-200">
                  {isLive ? "Open Module →" : "Module Locked"}
                </div>
              </div>
            );

            return isLive ? (
              <Link key={module.title} href={module.href}>
                {card}
              </Link>
            ) : (
              <div key={module.title}>{card}</div>
            );
          })}
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/35">
            Current Live Admin Route
          </p>

          <p className="mt-3 break-words text-sm font-bold text-white/70">
            /admin/access-requests
          </p>
        </div>
      </section>
    </main>
  );
}