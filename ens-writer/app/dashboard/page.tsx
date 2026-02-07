"use client";

import { useWallet } from "@/contexts/WalletContext";
import { ConnectButton } from "@/components/ConnectButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Campaign {
  code: string;
  fqdn: string;
  status: string;
  role: "manager" | "beneficiary" | "unknown";
  owner_wallet: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const { address } = useWallet();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load campaigns when address is available
  useEffect(() => {
    if (!address) {
      setCampaigns([]);
      return;
    }

    loadCampaigns(address);
  }, [address]);

  const loadCampaigns = async (wallet: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/campaigns?wallet=${encodeURIComponent(wallet)}`
      );

      if (!response.ok) {
        throw new Error("Failed to load campaigns");
      }

      const data = await response.json();
      setCampaigns(data.campaigns || []);
      console.log(`✅ Loaded ${data.count} campaigns`);
    } catch (err) {
      console.error("Error loading campaigns:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "linear-gradient(135deg, #FDFCF7 0%, #F8FAE5 50%, #E8F5E9 100%)" }}>
      {/* Decorative background blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl" style={{ background: "#B0D74C" }}></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl" style={{ background: "#B0D74C" }}></div>

      {/* Header */}
      <header className="relative z-10 px-6 lg:px-12 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10">
            <Image
              src="/growi.png"
              alt="Growi"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <span className="text-xl lg:text-2xl font-bold" style={{ color: "#2D3436" }}>Growi</span>
        </Link>
        <ConnectButton />
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3" style={{ color: "#2D3436" }}>
              My Campaigns
            </h1>
            <p className="text-lg" style={{ color: "#636E72" }}>
              {address
                ? "Campaigns where you are manager or beneficiary"
                : "Connect your wallet to get started"}
            </p>
          </div>

          {/* Content */}
          {!address ? (
            // CTA: Connect wallet
            <div className="rounded-3xl p-12 text-center"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.1)"
              }}>
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl"
                  style={{ backgroundColor: "rgba(176, 215, 76, 0.15)" }}>
                  🔐
                </div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "#2D3436" }}>
                  Connect Your Wallet
                </h2>
                <p className="mb-8" style={{ color: "#636E72" }}>
                  Connect your wallet using WaaP to see campaigns where you are
                  manager or have payments. All verification happens locally
                  using on-chain ENS data.
                </p>
                <ConnectButton />
              </div>
            </div>
          ) : loading ? (
            // Loading
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-t-transparent"
                style={{ borderColor: "#B0D74C", borderTopColor: "transparent" }}></div>
              <p className="mt-4" style={{ color: "#636E72" }}>Loading campaigns...</p>
            </div>
          ) : error ? (
            // Error
            <div className="rounded-3xl p-6"
              style={{
                backgroundColor: "rgba(255, 99, 71, 0.1)",
                border: "2px solid rgba(255, 99, 71, 0.3)"
              }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: "#2D3436" }}>Error</h3>
                  <p className="text-sm" style={{ color: "#636E72" }}>{error}</p>
                </div>
              </div>
            </div>
          ) : campaigns.length === 0 ? (
            // No campaigns
            <div className="rounded-3xl p-12 text-center"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.1)"
              }}>
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl"
                  style={{ backgroundColor: "rgba(176, 215, 76, 0.15)" }}>
                  📭
                </div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "#2D3436" }}>
                  No Campaigns Yet
                </h2>
                <p className="mb-6" style={{ color: "#636E72" }}>
                  You don&apos;t have any campaigns yet. Campaigns where you are manager or
                  beneficiary will appear here.
                </p>
                <div className="text-sm px-4 py-2 rounded-xl font-mono inline-block"
                  style={{
                    backgroundColor: "rgba(176, 215, 76, 0.1)",
                    color: "#5D7A1F"
                  }}>
                  Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
              </div>
            </div>
          ) : (
            // Campaigns list
            <div>
              <div className="mb-6 px-4 py-2 rounded-full inline-block font-semibold text-sm"
                style={{
                  backgroundColor: "rgba(176, 215, 76, 0.15)",
                  color: "#5D7A1F"
                }}>
                {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""} found
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {campaigns.map((campaign) => (
                  <Link
                    key={campaign.code}
                    href={`/campaigns/${campaign.code}`}
                    className="block rounded-3xl p-6 transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                    }}
                  >
                    {/* Role & Status Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: campaign.role === "manager" 
                            ? "rgba(138, 43, 226, 0.15)" 
                            : "rgba(176, 215, 76, 0.25)",
                          color: campaign.role === "manager" 
                            ? "#8A2BE2" 
                            : "#5D7A1F"
                        }}
                      >
                        {campaign.role === "manager" ? "Manager" : "Beneficiary"}
                      </span>
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: campaign.status === "FINALIZED"
                            ? "rgba(76, 175, 80, 0.15)"
                            : "rgba(255, 193, 7, 0.15)",
                          color: campaign.status === "FINALIZED"
                            ? "#4CAF50"
                            : "#FFC107"
                        }}
                      >
                        {campaign.status}
                      </span>
                    </div>

                    {/* Code */}
                    <h3 className="text-2xl font-bold mb-2 font-mono" style={{ color: "#2D3436" }}>
                      {campaign.code}
                    </h3>

                    {/* FQDN */}
                    <p className="text-sm font-mono mb-4 break-all" style={{ color: "#636E72" }}>
                      {campaign.fqdn}
                    </p>

                    {/* Date */}
                    <p className="text-xs mb-4" style={{ color: "#95A5A6" }}>
                      Created {new Date(campaign.created_at).toLocaleDateString()}
                    </p>

                    {/* Arrow */}
                    <div className="text-2xl" style={{ color: "#B0D74C" }}>→</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
