# AgentSociety Live

**Real-time multi-agent dashboard + Polymarket spider** around three public wallets.

## What it does
- Monitors the 3 wallets (Solana + 2× Base) in public view
- Crawls active Polymarket markets via Gamma API every ~45s
- Runs 4 agent styles (BoneReaper, 0xb55-style, mo-money, almach) that emit micro-signals
- Stays working with auto-refresh + public APIs only
- **No private keys ever held** — signals are advisory; you sign any real trades

## Wallets tracked
1. `2jAMeJZH1UeNSgdzdhHgYwAm6286aRqxMCdx52DBw7xo` (Solana)
2. `0xF4BAaf1D85753A857Aa9C4AeBa877D7864bE48aA` (Base — BABYCLAW)
3. `0x34AcF08d68D85644bf322B7167151F8422f1BafC` (Base smart account)

## Stack
- Next.js 14 + Tailwind
- Public Polymarket Gamma API
- Deployed on Vercel so it stays live

## Run locally
```bash
npm i
npm run dev
```

## Stand-out features
- Agentic branding + live spider status
- Multi-style signal society (not a single bot)
- Explicit safety: no keys, no auto-execution
- Ready for micropayment / x402 hooks later

Built to hype the agentic scene while staying honest and working.
