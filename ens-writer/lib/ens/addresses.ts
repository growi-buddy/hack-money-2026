/**
 * Direcciones de contratos ENS (server-only)
 */

import { Address } from "viem";

function getEnvAddress(name: string): Address {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  if (!value.startsWith("0x") || value.length !== 42) {
    throw new Error(`${name} must be a valid Ethereum address (0x + 40 hex chars)`);
  }
  return value as Address;
}

/**
 * ENS Registry contract address
 * Sepolia: 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
 * Mainnet: 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
 */
export const ENS_REGISTRY_ADDRESS = getEnvAddress("ENS_REGISTRY_ADDRESS");

/**
 * NameWrapper contract address
 * Sepolia: 0x0635513f179D50A207757E05759CbD106d7dFcE8
 * Mainnet: 0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401
 */
export const NAMEWRAPPER_ADDRESS = getEnvAddress("NAMEWRAPPER_ADDRESS");

/**
 * ENS Public Resolver address
 * Sepolia: 0x8FADE66B79cC9f707aB26799354482EB93a5B7dD
 * Mainnet: 0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63
 */
export const ENS_PUBLIC_RESOLVER_ADDRESS = getEnvAddress("ENS_PUBLIC_RESOLVER_ADDRESS");

console.log("📍 ENS Contract Addresses:", {
  registry: ENS_REGISTRY_ADDRESS,
  nameWrapper: NAMEWRAPPER_ADDRESS,
  publicResolver: ENS_PUBLIC_RESOLVER_ADDRESS,
});
