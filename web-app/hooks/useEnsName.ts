'use client';

import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

// Mainnet client for ENS resolution (ENS lives on mainnet)
const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http('https://eth.llamarpc.com'),
});

// Simple in-memory cache to avoid redundant RPC calls
const ensCache = new Map<string, { name: string | null; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useEnsName(address: string | null) {
  const [ensName, setEnsName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address) {
      setEnsName(null);
      return;
    }

    const normalizedAddress = address.toLowerCase();

    // Check cache first
    const cached = ensCache.get(normalizedAddress);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setEnsName(cached.name);
      return;
    }

    let cancelled = false;

    const resolve = async () => {
      setIsLoading(true);
      try {
        const name = await mainnetClient.getEnsName({
          address: address as `0x${string}`,
        });

        if (!cancelled) {
          setEnsName(name);
          ensCache.set(normalizedAddress, { name, timestamp: Date.now() });
        }
      } catch (err) {
        console.error('ENS resolution failed:', err);
        if (!cancelled) {
          setEnsName(null);
          ensCache.set(normalizedAddress, { name: null, timestamp: Date.now() });
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    resolve();

    return () => {
      cancelled = true;
    };
  }, [address]);

  const displayName = ensName
    ? ensName
    : address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : null;

  return { ensName, displayName, isLoading };
}
