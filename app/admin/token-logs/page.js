"use client";

import { useEffect, useMemo, useState } from "react";

function formatNumber(value) {
  if (value === null || value === undefined || value === "") return "—";

  const num = Number(value);
  if (Number.isNaN(num)) return value;

  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;

  return `$${num.toFixed(2)}`;
}

function badgeStyle(type) {
  const map = {
    SAFE: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
    LOW: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
    MEDIUM: "border-yellow-300/35 bg-yellow-300/10 text-yellow-200",
    CAUTION: "border-yellow-300/35 bg-yellow-300/10 text-yellow-200",
    HIGH: "border-red-300/35 bg-red-300/10 text-red-200",
    DANGER: "border-red-300/35 bg-red-300/10 text-red-200",
  };

  return (
    map[type] ||
    "border-white/15 bg-white/5 text-white/60"
  );
}

export default function TokenLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadLogs() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/token-logs");
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const text = `${log.contract} ${log.token_name} ${log.token_symbol} ${log.latest_risk} ${log.latest_setup} ${log.latest_source}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [logs, search]);

  const totalChecks = filteredLogs.reduce(
    (sum, log) => sum + Number(log.check_count || 0),
    0
  );

  const mostChecked =
    [...filteredLogs].sort(
      (a, b) => Number(b.check_count || 0) - Number(a.check_count || 0)
    )[0] || null;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-emerald-300">
                Trust The Signal Intelligence Archive
              </p>

              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Token Check Logs
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60 sm:text-base">
                Hidden operator view for contracts checked across the platform.
                This memory layer tracks repeated interest, signal demand, and
                future intelligence behavior.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="/"
                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold hover:border-emerald-300/40 hover:bg-emerald-300/10"
              >
                Home
              </a>
              <a
                href="/admin"
                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold hover:border-emerald-300/40 hover:bg-emerald-300/10"
              >
                Admin Home
              </a>
              <button
                onClick={loadLogs}
                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold hover:border-emerald-300/40 hover:bg-emerald-300/10"
              >
                Refresh
              </button>
              <a
                href="/api/admin/token-logs?format=csv"
                className="rounded-2xl border border-emerald-300/35 bg-emerald-300/10 px-5 py-3 text-sm font-black text-emerald-200 hover:bg-emerald-300/20"
              >
                Export CSV
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-white/35">
              Unique Tokens
            </div>
            <div className="mt-3 text-5xl font-black">{filteredLogs.length}</div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-white/35">
              Total Checks
            </div>
            <div className="mt-3 text-5xl font-black">{totalChecks}</div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-white/35">
              Most Checked
            </div>
            <div className="mt-3 text-2xl font-black">
              {mostChecked
                ? `${mostChecked.token_name || "Unknown"} (${mostChecked.token_symbol || "?"})`
                : "—"}
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contract, token, symbol, risk, setup, source..."
            className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 outline-none placeholder:text-white/25"
          />
        </div>

        <div className="space-y-6">
          {loading && <div className="text-white/40">Loading archive...</div>}

          {!loading &&
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex flex-wrap justify-between gap-4 items-start">
                  <div>
                    <div className="flex gap-3 flex-wrap mb-3">
                      <span className="rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
                        SOLANA
                      </span>

                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-black text-white/60">
                        {log.check_count || 0} CHECKS
                      </span>

                      <span className={`rounded-full px-3 py-1 text-xs font-black ${badgeStyle((log.latest_risk || "").split(" ")[0])}`}>
                        {log.latest_risk || "UNKNOWN"}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black">
                      {log.token_name || "Unknown Token"} ({log.token_symbol || "?"})
                    </h2>

                    <div className="mt-1 text-sm text-white/35 break-all">
                      {log.contract}
                    </div>
                  </div>

                  <button
                    onClick={() => navigator.clipboard.writeText(log.contract)}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold hover:border-emerald-300/40 hover:bg-emerald-300/10"
                  >
                    Copy Contract
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-4">
                  <div>Score: <span className="font-black">{log.latest_score ?? "—"}</span></div>
                  <div>Market Cap: <span className="font-black">{formatNumber(log.market_cap)}</span></div>
                  <div>Liquidity: <span className="font-black">{formatNumber(log.liquidity)}</span></div>
                  <div>24H Volume: <span className="font-black">{formatNumber(log.volume_24h)}</span></div>
                  <div>Buys: <span className="font-black">{log.buys_24h ?? "—"}</span></div>
                  <div>Sells: <span className="font-black">{log.sells_24h ?? "—"}</span></div>
                  <div>Verdict: <span className="font-black">{log.verdict || "—"}</span></div>
                  <div>Source: <span className="font-black">{log.latest_source || "—"}</span></div>
                </div>

                {Array.isArray(log.risk_flags) && log.risk_flags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {log.risk_flags.map((flag, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-red-300/20 bg-red-300/10 px-3 py-1 text-xs font-black text-red-200"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 text-xs text-white/30">
                  Last Checked: {log.last_checked_at}
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}