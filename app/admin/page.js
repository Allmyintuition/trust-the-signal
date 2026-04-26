"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Eye,
  Database,
  Users,
  Activity,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

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
      "View checked token history, repeated demand, signal outcomes, market data, risk flags, and intelligence trails.",
    href: "/admin/token-logs",
    status: "Live",
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

function shortContract(contract) {
  if (!contract) return "Unknown";
  if (contract.length <= 14) return contract;
  return `${contract.slice(0, 6)}...${contract.slice(-6)}`;
}

export default function AdminGatewayPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadSummary() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/summary", {
        cache: "no-store",
      });

      const data = await response.json();

      if (data.success) {
        setSummary(data.summary);
      }
    } catch (error) {
      console.error("Admin summary failed:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  const stats = [
    {
      label: "Token Records",
      value: summary?.tokenCount ?? 0,
      icon: Database,
    },
    {
      label: "Access Requests",
      value: summary?.accessCount ?? 0,
      icon: Users,
    },
    {
      label: "New Leads",
      value: summary?.newAccessCount ?? 0,
      icon: ShieldCheck,
    },
    {
      label: "Recent Visible Checks",
      value: summary?.recentVisibleChecks ?? 0,
      icon: Activity,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3 text-emerald-300">
                <Eye className="h-5 w-5" />
                <p className="text-xs font-black uppercase tracking-[0.35em]">
                  Trust The Signal Internal Gateway
                </p>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Operator Control Center
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
                Hidden admin command layer for protected platform operations,
                lead management, token intelligence memory, platform activity,
                and future growth tools.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
              >
                Home
              </Link>

              <button
                onClick={loadSummary}
                className="rounded-2xl border border-emerald-300/35 bg-emerald-300/10 px-5 py-3 text-sm font-black text-emerald-100 transition hover:bg-emerald-300/20"
              >
                {loading ? "Refreshing..." : "Refresh Summary"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <Icon className="h-5 w-5 text-emerald-300" />

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                  {stat.label}
                </p>

                <p className="mt-3 text-4xl font-black text-white">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                  Recent Token Memory
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Latest Checked Contracts
                </h2>
              </div>

              <Link
                href="/admin/token-logs"
                className="text-sm font-black text-emerald-200 hover:text-emerald-100"
              >
                Open →
              </Link>
            </div>

            <div className="grid gap-3">
              {(summary?.recentTokenLogs || []).length > 0 ? (
                summary.recentTokenLogs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-2xl border border-white/10 bg-black/35 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-black">
                          {log.token_name || "Unknown"} ({log.token_symbol || "?"})
                        </p>
                        <p className="mt-1 font-mono text-xs text-white/40">
                          {shortContract(log.contract)}
                        </p>
                      </div>

                      <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
                        {log.latest_score ?? "—"}
                      </span>
                    </div>

                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                      {log.check_count || 0} checks • {log.latest_risk || "unknown risk"}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-white/45">
                  No token memory yet.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                  Recent Access Queue
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Latest Protected Requests
                </h2>
              </div>

              <Link
                href="/admin/access-requests"
                className="text-sm font-black text-emerald-200 hover:text-emerald-100"
              >
                Open →
              </Link>
            </div>

            <div className="grid gap-3">
              {(summary?.recentAccessRequests || []).length > 0 ? (
                summary.recentAccessRequests.map((request) => {
                  const contact =
                    request.contact ||
                    request.email ||
                    request.telegram ||
                    request.wallet ||
                    "No contact";

                  return (
                    <div
                      key={request.id}
                      className="rounded-2xl border border-white/10 bg-black/35 p-4"
                    >
                      <p className="break-words font-black">{contact}</p>

                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                        {request.status || "new"} • {request.source || "unknown source"}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-white/45">
                  No access requests yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ADMIN_MODULES.map((module) => {
            const isLive = module.status === "Live";

            const card = (
              <div
                className={`h-full rounded-[1.75rem] border p-6 transition ${isLive
                  ? "border-emerald-300/25 bg-emerald-300/[0.06] hover:border-emerald-300/50 hover:bg-emerald-300/[0.1]"
                  : "border-white/10 bg-white/[0.04] opacity-70"
                  }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-black tracking-tight">
                    {module.title}
                  </h2>

                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${isLive
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

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-emerald-200">
                  {isLive ? "Open Module" : "Module Locked"}
                  {isLive && <ArrowRight className="h-4 w-4" />}
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
            Current Live Admin Routes
          </p>

          <div className="mt-3 flex flex-col gap-2 text-sm font-bold text-white/70">
            <p>/admin/access-requests</p>
            <p>/admin/token-logs</p>
            <p>/api/admin/summary</p>
          </div>
        </div>
      </section>
    </main>
  );
}