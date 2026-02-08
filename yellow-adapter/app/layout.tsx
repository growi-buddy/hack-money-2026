import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WaapProvider } from "@/src/components/WaapProvider";
import { Header } from "@/src/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yellow Adapter - Growi",
  description: "Non-custodial campaign payouts with Yellow Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 min-h-screen`}
        style={{ background: '#96BCFD' }}
      >
        <WaapProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </WaapProvider>
      </body>
    </html>
  );
}
