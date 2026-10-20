import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Polymarket Gamma public API — active markets
    const res = await fetch(
      "https://gamma-api.polymarket.com/events?active=true&closed=false&limit=20&order=volume_24hr&ascending=false",
      { next: { revalidate: 30 } }
    );

    let markets: any[] = [];
    if (res.ok) {
      const events = await res.json();
      // Flatten markets from events
      for (const ev of events) {
        if (ev.markets && Array.isArray(ev.markets)) {
          for (const m of ev.markets) {
            markets.push({
              question: m.question || ev.title,
              title: ev.title,
              slug: m.slug || ev.slug,
              condition_id: m.conditionId || m.condition_id,
              outcomePrices: m.outcomePrices,
              volume: m.volume || m.volumeNum || ev.volume,
              liquidity: m.liquidity,
              endDate: m.endDate || ev.endDate,
            });
          }
        }
      }
    }

    // Generate lightweight agent signals from market data (public, no execution)
    const signals = [];
    const now = new Date().toISOString();

    if (markets.length > 0) {
      const top = markets[0];
      signals.push({
        agent: "BoneReaper",
        type: "Directional Watch",
        message: `Monitoring top volume market: "${(top.question || "").slice(0, 80)}...". Looking for short-term probability lag vs external spot.`,
        time: now,
      });
      signals.push({
        agent: "0xb55-Style",
        type: "Inventory Scan",
        message: `Scanning ${markets.length} active markets for async complete-set opportunities across time windows.`,
        time: now,
      });
      signals.push({
        agent: "mo-money",
        type: "Timeframe Switch",
        message: "Hybrid mode active: bias directional on short windows, neutral inventory on longer horizons.",
        time: now,
      });
      signals.push({
        agent: "almach",
        type: "Passive Levels",
        message: "Buy-side inventory builder waiting for attractive fills on both sides. No force-crossing.",
        time: now,
      });
    } else {
      signals.push({
        agent: "Spider",
        type: "Status",
        message: "Gamma API returned empty or rate-limited. Will retry on next cycle. Dashboard stays live.",
        time: now,
      });
    }

    // Wallet reminder signals
    signals.push({
      agent: "AgentSociety",
      type: "Wallet Monitor",
      message: "3 public wallets tracked. Base main holds BABYCLAW (illiquid). Solana + smart-account are dust-level. No keys held — signals only.",
      time: now,
    });

    return NextResponse.json({
      ok: true,
      markets,
      signals,
      crawledAt: now,
      note: "Public data only. No private keys. Execution requires user signature.",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        markets: [],
        signals: [
          {
            agent: "Spider",
            type: "Error",
            message: err?.message || "Crawl failed. Will retry.",
            time: new Date().toISOString(),
          },
        ],
        error: String(err),
      },
      { status: 200 }
    );
  }
}