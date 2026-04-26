"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function formatDate(value) {
  if (!value) return "Unknown";

  try {
    return new Date(value).toLocaleString();
  } catch {
    return "Unknown";
  }
}

function shortenContract(contract) {
  if (!contract) return "Unknown";
  if (contract.length <= 16) return contract;

  return `${contract.slice(0, 6)}...${contract.slice(-6)}`;
}

function getTokenTitle(log) {
  if (log.token_name && log.token_symbol) {
    return `${log.token_name} (${log.token_symbol})`;
  }

  if (log.token_name) return log.token_name;
  if (log.token_symbol) return log.token_symbol;

  return "Unknown Token";
}

export default function AdminTokenLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  async function loadLogs() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/token-logs", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load token logs.");
      }

      setLogs(Array.isArray(data.logs) ? data.logs : []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  async function copyText(id, text) {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);

      setTimeout(() => {
        setCopiedId("");
      }, 1500);
    } catch {
      setError("Copy failed. Try copying manually.");
    }
  }

  function exportCSV() {
    window.open("/api/admin/token-logs?format=csv", "_blank");
  }

  const stats = useMemo(() => {
    const totalChecks = logs.reduce(
      (sum, log) => sum + Number(log.check_count || 0),
      0
    );

    const uniqueTokens = logs.length;

    const mostChecked = [...logs].sort(
      (a, b) => Number(b.check_count || 0) - Number(a.check_count || 0)
    )[0];

    return {
      totalChecks,
      uniqueTokens,
      mostChecked,
    };
  }, [logs]);

  const filteredLogs = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    if (!normalizedSearch) return logs;

    return logs.filter((log) => {
      const searchableText = [
        log.contract,
        log.token_name,
        log.token_symbol,
        log.chain,
        log.latest_risk,
        log.latest_setup,
        log.latest_source,
        log.latest_score,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [logs, searchQuery]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-emerald-300">
                Trust The Signal Intelligence Archive
              </p>

              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Token Check Logs
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
                Hidden operator view for contracts checked across the platform.
                This becomes the memory layer for demand, repeated interest, and
                future signal intelligence.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
              >
                Home
              </Link>

              <Link
                href="/admin"
                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
              >
                Admin Home
              </Link>

              <button
                onClick={loadLogs}
                disabled={loading}
                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>

              <button
                onClick={exportCSV}
                className="rounded-2xl border border-emerald-300/40 bg-emerald-300/15 px-5 py-3 text-sm font-black text-emerald-100 transition hover:bg-emerald-300/25"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Unique Tokens
            </p>
            <p className="mt-3 text-3xl font-black">{stats.uniqueTokens}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Total Checks
            </p>
            <p className="mt-3 text-3xl font-black">{stats.totalChecks}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Most Checked
            </p>
            <p className="mt-3 truncate text-xl font-black">
              {stats.mostChecked ? getTokenTitle(stats.mostChecked) : "None"}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search contract, token, symbol, risk, setup, source..."
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/50"
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-bold text-red-200">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-white/50">
            Showing{" "}
            <span className="text-emerald-200">{filteredLogs.length}</span> of{" "}
            <span className="text-white">{logs.length}</span> token logs
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center text-sm font-bold text-white/50">
            Loading token logs...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <p className="text-lg font-black">No token logs found.</p>
            <p className="mt-2 text-sm text-white/45">
              Once Signal Check tracking is connected, analyzed tokens will
              appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredLogs.map((log) => (
              <article
                key={log.id}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(255,255,255,0.03)]"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-200">
                        {log.chain || "solana"}
                      </span>

                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white/55">
                        {Number(log.check_count || 0)} checks
                      </span>

                      {log.latest_risk && (
                        <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-200">
                          {log.latest_risk}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 break-words text-2xl font-black tracking-tight text-white">
                      {getTokenTitle(log)}
                    </h2>

                    <p className="mt-2 break-all text-sm font-bold text-white/45">
                      {log.contract}
                    </p>

                    <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                          Score
                        </p>
                        <p className="mt-2 font-black text-white/85">
                          {log.latest_score ?? "Unknown"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                          Setup
                        </p>
                        <p className="mt-2 break-words font-bold text-white/85">
                          {log.latest_setup || "Unknown"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                          Source
                        </p>
                        <p className="mt-2 break-words font-bold text-white/85">
                          {log.latest_source || "Unknown"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                          Short CA
                        </p>
                        <p className="mt-2 break-words font-bold text-white/85">
                          {shortenContract(log.contract)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/30 sm:grid-cols-2">
                      <p>First checked: {formatDate(log.first_checked_at)}</p>
                      <p>Last checked: {formatDate(log.last_checked_at)}</p>
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-3 xl:w-[230px]">
                    <button
                      onClick={() => copyText(log.id, log.contract)}
                      className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:border-emerald-300/40 hover:bg-emerald-300/10"
                    >
                      {copiedId === log.id ? "Copied" : "Copy Contract"}
                    </button>

                    {log.contract && (
                      <Link
                        href={`/token/${log.contract}`}
                        className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-center text-sm font-black text-emerald-100 transition hover:bg-emerald-300/20"
                      >
                        Open Token Page
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}