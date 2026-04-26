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
    SAFE: "bg-green-500/20 text-green-300 border border-green-500/30",
    MEDIUM: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    HIGH: "bg-red-500/20 text-red-300 border border-red-500/30",
    LOW: "bg-green-500/20 text-green-300 border border-green-500/30",
    CAUTION: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    DANGER: "bg-red-500/20 text-red-300 border border-red-500/30",
  };

  return map[type] || "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
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
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="border border-cyan-500/30 rounded-3xl p-8 bg-zinc-950 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="text-cyan-400 tracking-[4px] text-xs font-semibold mb-2">
                TRUST THE SIGNAL INTELLIGENCE ARCHIVE
              </div>
              <h1 className="text-5xl font-bold mb-3">Token Check Logs</h1>
              <p className="text-zinc-400 max-w-3xl">
                Hidden operator view for contracts checked across the platform.
                This becomes the memory layer for demand, repeated interest, and
                future signal intelligence.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href="/" className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700">Home</a>
              <a href="/admin" className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700">Admin Home</a>
              <button onClick={loadLogs} className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700">Refresh</button>
              <a href="/api/admin/token-logs?format=csv" className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500">Export CSV</a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <div className="text-xs tracking-[4px] text-zinc-500 mb-3">UNIQUE TOKENS</div>
            <div className="text-5xl font-bold">{filteredLogs.length}</div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <div className="text-xs tracking-[4px] text-zinc-500 mb-3">TOTAL CHECKS</div>
            <div className="text-5xl font-bold">{totalChecks}</div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <div className="text-xs tracking-[4px] text-zinc-500 mb-3">MOST CHECKED</div>
            <div className="text-3xl font-bold">
              {mostChecked
                ? `${mostChecked.token_name || "Unknown"} (${mostChecked.token_symbol || "?"})`
                : "—"}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contract, token, symbol, risk, setup, source..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 outline-none"
          />
        </div>

        <div className="mt-8 space-y-6">
          {loading && <div className="text-zinc-500">Loading archive...</div>}

          {!loading &&
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6"
              >
                <div className="flex flex-wrap justify-between gap-4 items-start">
                  <div>
                    <div className="flex gap-3 flex-wrap mb-3">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs">
                        SOLANA
                      </span>
                      <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs">
                        {log.check_count || 0} CHECKS
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${badgeStyle((log.latest_risk || "").split(" ")[0])}`}>
                        {log.latest_risk || "UNKNOWN"}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold">
                      {log.token_name || "Unknown Token"} ({log.token_symbol || "?"})
                    </h2>

                    <div className="text-zinc-500 text-sm mt-1 break-all">
                      {log.contract}
                    </div>
                  </div>

                  <button
                    onClick={() => navigator.clipboard.writeText(log.contract)}
                    className="px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700"
                  >
                    Copy Contract
                  </button>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mt-6">
                  <div>Score: <span className="font-bold">{log.latest_score ?? "—"}</span></div>
                  <div>Market Cap: <span className="font-bold">{formatNumber(log.market_cap)}</span></div>
                  <div>Liquidity: <span className="font-bold">{formatNumber(log.liquidity)}</span></div>
                  <div>24H Volume: <span className="font-bold">{formatNumber(log.volume_24h)}</span></div>
                  <div>Buys: <span className="font-bold">{log.buys_24h ?? "—"}</span></div>
                  <div>Sells: <span className="font-bold">{log.sells_24h ?? "—"}</span></div>
                  <div>Verdict: <span className="font-bold">{log.verdict || "—"}</span></div>
                  <div>Source: <span className="font-bold">{log.latest_source || "—"}</span></div>
                </div>

                {Array.isArray(log.risk_flags) && log.risk_flags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {log.risk_flags.map((flag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 text-xs text-zinc-500">
                  Last Checked: {log.last_checked_at}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}