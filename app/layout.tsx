import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentSociety Live — Multi-Agent Micro-Trade Dashboard",
  description: "Real-time wallet spider + Polymarket crawler + agentic signal society around 3 live wallets. Stays working.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}