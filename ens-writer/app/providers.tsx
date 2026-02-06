"use client";

import { WalletProvider } from "@/contexts/WalletContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}
