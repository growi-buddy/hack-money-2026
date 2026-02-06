"use client";

import { useWallet } from "@/contexts/WalletContext";
import { ConnectButton } from "@/components/ConnectButton";
import { useState, useEffect } from "react";
import Link from "next/link";

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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Campaigns
            </h1>
            <p className="text-slate-400">
              {address
                ? "Campaigns where you are manager or beneficiary"
                : "Connect your wallet to get started"}
            </p>
          </div>
          <ConnectButton />
        </div>

        {/* Content */}
        {!address ? (
          // CTA: Connect wallet
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-12 border border-slate-700 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">🔐</div>
              <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-slate-400 mb-8">
                Connect your wallet using WaaP to see campaigns where you are a
                manager or have payouts. All verification happens locally using
                on-chain ENS data.
              </p>
              <ConnectButton />
            </div>
          </div>
        ) : loading ? (
          // Loading
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <p className="mt-4 text-slate-400">Loading campaigns...</p>
          </div>
        ) : error ? (
          // Error
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl">❌</span>
              <div>
                <h3 className="font-semibold text-red-300 mb-1">Error</h3>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          </div>
        ) : campaigns.length === 0 ? (
          // No campaigns
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-12 border border-slate-700 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">📭</div>
              <h2 className="text-2xl font-bold mb-4">No Campaigns Yet</h2>
              <p className="text-slate-400 mb-6">
                You don&apos;t have any campaigns yet. Campaigns where you are a
                manager or beneficiary will appear here.
              </p>
              <div className="text-sm text-slate-500 font-mono bg-slate-900 px-4 py-2 rounded">
                Connected: {address}
              </div>
            </div>
          </div>
        ) : (
          // Campaigns list
          <div>
            <div className="mb-4 text-sm text-slate-400">
              Found {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <Link
                  key={campaign.code}
                  href={`/campaigns/${campaign.code}`}
                  className="block bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all duration-200 hover:scale-[1.02]"
                >
                  {/* Role Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        campaign.role === "manager"
                          ? "bg-purple-900/50 text-purple-300"
                          : "bg-green-900/50 text-green-300"
                      }`}
                    >
                      {campaign.role === "manager" ? "Manager" : "Beneficiary"}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        campaign.status === "FINALIZED"
                          ? "bg-green-900/50 text-green-300"
                          : "bg-yellow-900/50 text-yellow-300"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>

                  {/* Code */}
                  <h3 className="text-xl font-bold mb-2 font-mono text-blue-400">
                    {campaign.code}
                  </h3>

                  {/* FQDN */}
                  <p className="text-sm text-slate-400 font-mono mb-4">
                    {campaign.fqdn}
                  </p>

                  {/* Date */}
                  <p className="text-xs text-slate-500">
                    Created {new Date(campaign.created_at).toLocaleDateString()}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 text-blue-400">→</div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
