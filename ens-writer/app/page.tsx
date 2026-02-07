"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden relative" style={{ background: "linear-gradient(135deg, #FDFCF7 0%, #F8FAE5 50%, #E8F5E9 100%)" }}>
      {/* Decorative background blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl" style={{ background: "#B0D74C" }}></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl" style={{ background: "#B0D74C" }}></div>

      {/* Header */}
      <header className="relative z-10 px-6 lg:px-12 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
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
        </div>
        <Link
          href="/dashboard"
          className="px-5 py-2 rounded-full font-bold text-sm lg:text-base transition-all hover:scale-105"
          style={{
            backgroundColor: "#B0D74C",
            color: "#2D3436",
            boxShadow: "0 2px 10px rgba(176, 215, 76, 0.4)"
          }}
        >
          Verify Payment
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center px-6 h-[calc(100vh-120px)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col gap-5 lg:gap-8 order-2 lg:order-1">
            <div className="space-y-3 lg:space-y-5">
              <div className="inline-block px-3 py-1 rounded-full text-xs lg:text-sm font-semibold"
                style={{
                  backgroundColor: "rgba(176, 215, 76, 0.15)",
                  color: "#5D7A1F"
                }}>
                ✨ On-chain Verification
              </div>

              <h1 className="text-2xl lg:text-5xl font-bold leading-tight" style={{ color: "#2D3436" }}>
                Verify your payments{" "}
                <span style={{ color: "#B0D74C" }}>transparently</span>
              </h1>

              <p className="text-sm lg:text-lg leading-relaxed" style={{ color: "#636E72" }}>
                Growi uses ENS and Merkle trees so you can verify your payments
                directly on blockchain, without intermediaries.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 lg:p-4 rounded-2xl transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  boxShadow: "0 2px 15px rgba(0,0,0,0.05)"
                }}>
                <div className="shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center text-lg lg:text-xl"
                  style={{ backgroundColor: "rgba(176, 215, 76, 0.2)" }}>
                  🔒
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm lg:text-base" style={{ color: "#2D3436" }}>Trustless</h3>
                  <p className="text-xs lg:text-sm" style={{ color: "#636E72" }}>
                    Don&apos;t trust anyone. Verify directly on blockchain.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 lg:p-4 rounded-2xl transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  boxShadow: "0 2px 15px rgba(0,0,0,0.05)"
                }}>
                <div className="shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center text-lg lg:text-xl"
                  style={{ backgroundColor: "rgba(176, 215, 76, 0.2)" }}>
                  📊
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm lg:text-base" style={{ color: "#2D3436" }}>Transparent</h3>
                  <p className="text-xs lg:text-sm" style={{ color: "#636E72" }}>
                    All data public on ENS. Auditable forever.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 lg:p-4 rounded-2xl transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  boxShadow: "0 2px 15px rgba(0,0,0,0.05)"
                }}>
                <div className="shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center text-lg lg:text-xl"
                  style={{ backgroundColor: "rgba(176, 215, 76, 0.2)" }}>
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm lg:text-base" style={{ color: "#2D3436" }}>Cryptographic</h3>
                  <p className="text-xs lg:text-sm" style={{ color: "#636E72" }}>
                    Mathematical proofs using Merkle trees.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="px-5 py-2 rounded-full font-bold text-sm lg:text-base transition-all hover:scale-105 flex items-center justify-center"
                style={{
                  backgroundColor: "#B0D74C",
                  color: "#2D3436",
                  boxShadow: "0 2px 10px rgba(176, 215, 76, 0.4)"
                }}
              >
                Verify Payment
              </Link>
              <a
                href="https://github.com/growi-buddy/hack-money-2026/tree/main/ens-writer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-full font-bold text-sm lg:text-base text-center transition-all hover:scale-105"
                style={{
                  backgroundColor: "white",
                  color: "#2D3436",
                  boxShadow: "0 2px 15px rgba(0,0,0,0.1)"
                }}
              >
                View on GitHub
              </a>
            </div>
          </div>

          {/* Right Side - Mascot */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Animated glow effect behind */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse"
                style={{ backgroundColor: "#B0D74C" }}></div>

              {/* Mascot Container with white background */}
              <div className="relative rounded-3xl p-6 lg:p-8 w-[250px] lg:w-[400px]">
                <Image
                  src="/growi.png"
                  alt="Growi - Your verification assistant"
                  width={400}
                  height={400}
                  priority
                  className="w-full h-auto"
                />
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-3 -right-3 lg:-bottom-4 lg:-right-4 px-4 py-2 lg:px-5 lg:py-2 rounded-full font-bold shadow-xl flex items-center gap-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  color: "#2D3436",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
                }}>
                <div className="text-xs lg:text-sm opacity-70">100% On-chain</div>
                <div className="text-lg lg:text-xl" style={{ color: "#B0D74C" }}>✓</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-2 text-center text-xs" style={{ color: "#95A5A6" }}>
        <p>Powered by ENS • Secured by Merkle Trees</p>
      </footer>
    </div>
  );
}
