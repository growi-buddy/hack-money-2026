"use client";

import { useWallet } from "@/contexts/WalletContext";
import { ConnectButton } from "@/components/ConnectButton";
import { useState, useEffect } from "react";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import Link from "next/link";
import { use } from "react";

interface CampaignPageProps {
  params: Promise<{ code: string }>;
}

interface ENSData {
  payoutRoot: string | null;
  settlementTx: string | null;
  termsHash: string | null;
  termsURI: string | null;
}

interface ProofData {
  amountMicros: string;
  proof: string[];
  payoutRoot: string;
}

export default function CampaignPage({ params }: CampaignPageProps) {
  const resolvedParams = use(params);
  const { code } = resolvedParams;
  const { address } = useWallet();
  
  const [fqdn, setFqdn] = useState("");
  const [ensData, setEnsData] = useState<ENSData | null>(null);
  const [proofData, setProofData] = useState<ProofData | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState({ ens: false, proof: false });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ensRootName = process.env.NEXT_PUBLIC_ENS_ROOT_NAME || "growi.eth";
    setFqdn(`${code.toLowerCase()}.${ensRootName}`);
  }, [code]);

  // Limpiar datos cuando se desconecta la wallet
  useEffect(() => {
    if (!address) {
      setEnsData(null);
      setProofData(null);
      setVerified(null);
      setError(null);
    }
  }, [address]);

  const loadENSData = async () => {
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading({ ...loading, ens: true });
    setError(null);

    try {
      console.log("📖 Loading ENS data for:", fqdn);

      // Cargar todos los text records en paralelo
      const [rootRes, settlementRes, termsHashRes, termsURIRes] =
        await Promise.all([
          fetch(`/api/ens/text?name=${encodeURIComponent(fqdn)}&key=growi:payoutRoot`),
          fetch(`/api/ens/text?name=${encodeURIComponent(fqdn)}&key=growi:settlementTx`),
          fetch(`/api/ens/text?name=${encodeURIComponent(fqdn)}&key=growi:termsHash`),
          fetch(`/api/ens/text?name=${encodeURIComponent(fqdn)}&key=growi:termsURI`),
        ]);

      const [rootData, settlementData, termsHashData, termsURIData] =
        await Promise.all([
          rootRes.json(),
          settlementRes.json(),
          termsHashRes.json(),
          termsURIRes.json(),
        ]);

      setEnsData({
        payoutRoot: rootData.value,
        settlementTx: settlementData.value,
        termsHash: termsHashData.value,
        termsURI: termsURIData.value,
      });

      console.log("✅ ENS data loaded");
    } catch (err) {
      console.error("Error loading ENS data:", err);
      setError(err instanceof Error ? err.message : "Failed to load ENS data");
    } finally {
      setLoading({ ...loading, ens: false });
    }
  };

  const verifyPayout = async () => {
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    if (!ensData?.payoutRoot) {
      setError("Campaign not finalized (no payout root on-chain)");
      return;
    }

    setLoading({ ...loading, proof: true });
    setError(null);
    setVerified(null);
    setProofData(null);

    try {
      console.log("🔐 Fetching proof for:", address);

      // Obtener proof
      const proofRes = await fetch(
        `/api/ens/campaigns/${code}/proof?wallet=${encodeURIComponent(address)}`
      );

      if (!proofRes.ok) {
        const errorData = await proofRes.json();
        throw new Error(errorData.details || "Failed to get proof");
      }

      const data = await proofRes.json();
      setProofData(data);

      console.log("✅ Proof received, verifying...");

      // Verificar proof localmente
      const normalizedWallet = address.toLowerCase();
      const isValid = StandardMerkleTree.verify(
        ensData.payoutRoot,
        ["address", "uint256"],
        [normalizedWallet, data.amountMicros],
        data.proof
      );

      setVerified(isValid);
      console.log(isValid ? "✅ VALID" : "❌ INVALID");
    } catch (err) {
      console.error("Error verifying payout:", err);
      setError(err instanceof Error ? err.message : "Failed to verify payout");
    } finally {
      setLoading({ ...loading, proof: false });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/dashboard"
              className="text-sm text-slate-400 hover:text-slate-300 mb-2 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold font-mono">{code}</h1>
            <p className="text-slate-400 font-mono text-sm">{fqdn}</p>
          </div>
          <ConnectButton />
        </div>

        {/* Wallet warning */}
        {!address && (
          <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🔒</span>
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">
                  Authentication Required
                </h3>
                <p className="text-yellow-200/80 text-sm">
                  Connect your wallet to access campaign data and verify your payout.
                  All verification happens locally on your device using on-chain ENS data.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={loadENSData}
            disabled={loading.ens || !address}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            title={!address ? "Connect wallet first" : "Load on-chain campaign data from ENS"}
          >
            {loading.ens ? "Loading..." : "Load ENS Data"}
          </button>
          <button
            onClick={verifyPayout}
            disabled={loading.proof || !address || !ensData?.payoutRoot}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            title={
              !address
                ? "Connect wallet first"
                : !ensData?.payoutRoot
                ? "Load ENS data first"
                : "Verify payout for your connected wallet"
            }
          >
            {loading.proof ? "Verifying..." : "Verify My Payout"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl">❌</span>
              <div>
                <h3 className="font-semibold text-red-300 mb-1">Error</h3>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* ENS Data */}
        {ensData && (
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              On-Chain Data (ENS Text Records)
            </h2>
            <div className="space-y-3 text-sm">
              {/* Terms URI */}
              {ensData.termsURI && (
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Terms URI</span>
                  <a
                    href={ensData.termsURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 font-mono bg-slate-900 px-3 py-1 rounded break-all hover:text-blue-300"
                  >
                    {ensData.termsURI}
                  </a>
                </div>
              )}

              {/* Terms Hash */}
              {ensData.termsHash && (
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Terms Hash</span>
                  <code className="text-yellow-400 font-mono bg-slate-900 px-3 py-1 rounded break-all">
                    {ensData.termsHash}
                  </code>
                </div>
              )}

              {/* Settlement Tx */}
              {ensData.settlementTx && (
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Settlement Transaction</span>
                  <code className="text-purple-400 font-mono bg-slate-900 px-3 py-1 rounded break-all">
                    {ensData.settlementTx}
                  </code>
                </div>
              )}

              {/* Payout Root */}
              {ensData.payoutRoot ? (
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">
                    Payout Root (Merkle Root)
                  </span>
                  <code className="text-green-400 font-mono bg-slate-900 px-3 py-1 rounded break-all">
                    {ensData.payoutRoot}
                  </code>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Status</span>
                  <span className="text-yellow-400 text-sm">
                    Campaign not finalized yet
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Verification Result */}
        {verified !== null && proofData && (
          <div
            className={`${
              verified
                ? "bg-green-900/20 border-green-500"
                : "bg-red-900/20 border-red-500"
            } border rounded-lg p-6 mb-6`}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{verified ? "✅" : "❌"}</span>
              <div>
                <h2 className="text-2xl font-bold">
                  {verified ? "Payout Verified" : "Verification Failed"}
                </h2>
                <p className="text-sm text-slate-300">
                  {verified
                    ? "Your payout is valid and verifiable on-chain"
                    : "Proof verification failed"}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <div className="text-sm text-slate-400 mb-1">Your Payout</div>
              <div className="text-3xl font-bold font-mono">
                {Number(proofData.amountMicros).toLocaleString()} micros
              </div>
            </div>

            {/* Proof Details */}
            <div className="text-sm">
              <div className="text-slate-400 mb-2">
                Merkle Proof ({proofData.proof.length} elements)
              </div>
              <div className="bg-slate-900 px-3 py-2 rounded space-y-1 max-h-32 overflow-y-auto">
                {proofData.proof.map((hash, i) => (
                  <code key={i} className="block text-slate-400 font-mono text-xs">
                    [{i}] {hash}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4">
          <div className="flex gap-3">
            <span className="text-blue-400 text-xl">ℹ️</span>
            <div className="text-sm text-blue-100">
              <p className="font-semibold mb-1">Trustless Verification</p>
              <p className="text-blue-200">
                All verification happens locally in your browser using data from
                ENS blockchain. You don&apos;t need to trust our backend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
