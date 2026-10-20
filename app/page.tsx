"use client";

import { useEffect, useState } from "react";
import { Activity, Bot, Radar, Wallet, Zap, RefreshCw, ExternalLink } from "lucide-react";

const WALLETS = [
  {
    id: "sol",
    label: "Solana Dust",
    address: "2jAMeJZH1UeNSgdzdhHgYwAm6286aRqxMCdx52DBw7xo",
    chain: "Solana",
    explorer: "https://solscan.io/account/2jAMeJZH1UeNSgdzdhHgYwAm6286aRqxMCdx52DBw7xo",
  },
  {
    id: "base1",
    label: "Base Main (BABYCLAW)",
    address: "0xF4BAaf1D85753A857Aa9C4AeBa877D7864bE48aA",
    chain: "Base",
    explorer: "https://basescan.org/address/0xF4BAaf1D85753A857Aa9C4AeBa877D7864bE48aA",
  },
  {
    id: "base2",
    label: "Base Smart Account",
    address: "0x34AcF08d68D85644bf322B7167151F8422f1BafC",
    chain: "Base",
    explorer: "https://basescan.org/address/0x34AcF08d68D85644bf322B7167151F8422f1BafC",
  },
];

const AGENTS = [
  {
    name: "BoneReaper",
    style: "Directional + Dynamic Hedge",
    edge: "Recalculates fair probability faster than the book. Captures short-term pricing gaps.",
    color: "#00ff9d",
  },
  {
    name: "0xb55-Style",
    style: "Async Complete-Set Accumulator",
    edge: "Buys opposite sides across time. Converts volatility into structural edge < $1.",
    color: "#60a5fa",
  },
  {
    name: "mo-money",
    style: "Multi-Timeframe Hybrid",
    edge: "Directional on 5m, neutral inventory on 1h/4h. Switches mode by microstructure.",
    color: "#f472b6",
  },
  {
    name: "almach",
    style: "Buy-Side Inventory Builder",
    edge: "Passive fills. Waits for the market to come to its levels. Execution quality edge.",
    color: "#fbbf24",
  },
];

export default function Home() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [spiderStatus, setSpiderStatus] = useState("idle");

  async function runSpider() {
    setSpiderStatus("crawling");
    try {
      const res = await fetch("/api/spider");
      const data = await res.json();
      setMarkets(data.markets || []);
      setSignals(data.signals || []);
      setLastUpdate(new Date().toLocaleTimeString());
      setSpiderStatus("live");
    } catch (e) {
      setSpiderStatus("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    runSpider();
    const id = setInterval(runSpider, 45000); // stay working — refresh every 45s
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-agent-bg text-gray-100">
      {/* Header */}
      <header className="border-b border-agent-border bg-agent-card/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-agent-accent/20 flex items-center justify-center glow">
              <Bot className="w-6 h-6 text-agent-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AgentSociety <span className="text-agent-accent">Live</span></h1>
              <p className="text-xs text-agent-muted">Multi-agent micro-trade layer • stays working</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full pulse-dot ${spiderStatus === "live" ? "bg-agent-accent" : spiderStatus === "crawling" ? "bg-agent-warn" : "bg-red-500"}`} />
              <span className="text-agent-muted">Spider: {spiderStatus}</span>
            </div>
            <button
              onClick={runSpider}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-agent-border hover:bg-agent-accent/20 transition text-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Wallets */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-agent-accent" />
            <h2 className="text-lg font-semibold">Live Wallets (Public Monitor)</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {WALLETS.map((w) => (
              <div key={w.id} className="bg-agent-card border border-agent-border rounded-xl p-5 hover:border-agent-accent/40 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">{w.label}</p>
                    <p className="text-xs text-agent-muted mt-0.5">{w.chain}</p>
                  </div>
                  <a href={w.explorer} target="_blank" rel="noreferrer" className="text-agent-muted hover:text-agent-accent">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="font-mono text-xs break-all text-gray-400">{w.address}</p>
                <p className="mt-3 text-xs text-agent-muted">Public view only • no private keys held</p>
              </div>
            ))}
          </div>
        </section>

        {/* Agents */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-agent-accent" />
            <h2 className="text-lg font-semibold">Agent Society — Micro-Trade Styles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {AGENTS.map((a) => (
              <div key={a.name} className="bg-agent-card border border-agent-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: a.color }} />
                  <h3 className="font-semibold">{a.name}</h3>
                </div>
                <p className="text-sm text-agent-accent mb-2">{a.style}</p>
                <p className="text-sm text-gray-400">{a.edge}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spider Markets */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radar className="w-5 h-5 text-agent-accent" />
              <h2 className="text-lg font-semibold">Polymarket Spider — Live Markets</h2>
            </div>
            {lastUpdate && <span className="text-xs text-agent-muted">Last crawl: {lastUpdate}</span>}
          </div>
          {loading ? (
            <div className="text-center py-12 text-agent-muted">Crawling markets…</div>
          ) : markets.length === 0 ? (
            <div className="text-center py-12 text-agent-muted">No active markets returned (API may be rate-limited). Retry in a moment.</div>
          ) : (
            <div className="grid gap-3">
              {markets.slice(0, 12).map((m: any, i: number) => (
                <div key={i} className="bg-agent-card border border-agent-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{m.question || m.title || "Market"}</p>
                    <p className="text-xs text-agent-muted mt-1">{m.slug || m.condition_id?.slice(0, 18) + "…"}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    {m.outcomePrices && (
                      <span className="font-mono text-agent-accent">
                        {Array.isArray(m.outcomePrices) ? m.outcomePrices[0] : JSON.parse(m.outcomePrices || "[]")[0] || "—"}
                      </span>
                    )}
                    {m.volume && <span className="text-agent-muted">Vol {Number(m.volume).toLocaleString()}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Signals */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-agent-accent" />
            <h2 className="text-lg font-semibold">Agent Micro-Signals</h2>
          </div>
          <div className="bg-agent-card border border-agent-border rounded-xl p-5 space-y-3">
            {signals.length === 0 ? (
              <p className="text-sm text-agent-muted">Spider generates signals when pricing gaps or inventory opportunities appear. Refresh to force a crawl.</p>
            ) : (
              signals.map((s: any, i: number) => (
                <div key={i} className="flex items-start gap-3 text-sm border-b border-agent-border last:border-0 pb-3 last:pb-0">
                  <Activity className="w-4 h-4 text-agent-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{s.agent} — {s.type}</p>
                    <p className="text-gray-400">{s.message}</p>
                    <p className="text-xs text-agent-muted mt-1">{s.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Stand-out footer */}
        <footer className="border-t border-agent-border pt-8 pb-12 text-center space-y-3">
          <p className="text-sm text-agent-muted">
            Built for the agentic scene • Public wallet monitor • Polymarket spider • No private keys ever held
          </p>
          <p className="text-xs text-agent-muted">
            Micro-trade signals are advisory. Execution requires your own wallet signatures. BABYCLAW liquidity remains thin — treat as dust until depth returns.
          </p>
          <p className="text-xs">
            <a href="https://github.com/OkfreelancerAi/agentsociety-live" className="text-agent-accent hover:underline" target="_blank" rel="noreferrer">
              Source on GitHub
            </a>
            {" · "}AgentSociety Live stays working via auto-refresh + public APIs
          </p>
        </footer>
      </main>
    </div>
  );
}