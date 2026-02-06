/**
 * Lógica para crear y gestionar subdominios ENS wrapped
 */

import { namehash, normalize } from "viem/ens";
import { Address } from "viem";
import { publicClient, walletClient, account } from "../chain/clients";
import { writeSafeContract } from "../chain/tx";
import { ENS_ROOT_NAME } from "../chain/config";
import { NAMEWRAPPER_ADDRESS, ENS_PUBLIC_RESOLVER_ADDRESS } from "./addresses";
import { nameWrapperAbi } from "./abi/nameWrapper";

export interface EnsureCampaignSubnameResult {
  fqdn: string;
  node: `0x${string}`;
}

/**
 * Crea o verifica que existe un subdominio ENS wrapped.
 * Implementa idempotencia: si ya existe con el owner correcto, no falla.
 *
 * @param code - Código de la campaña (ya validado como uppercase alphanum)
 * @returns { fqdn, node } - FQDN completo y node hash
 * @throws Error si el subdominio existe pero con otro owner (409 SUBNAME_TAKEN)
 */
export async function ensureCampaignSubname(params: {
  code: string;
}): Promise<EnsureCampaignSubnameResult> {
  const { code } = params;

  // 1. Calcular nombres y hashes
  const fqdn = `${code.toLowerCase()}.${ENS_ROOT_NAME}`;
  const normalizedFqdn = normalize(fqdn);
  const node = namehash(normalizedFqdn) as `0x${string}`;
  
  const normalizedRoot = normalize(ENS_ROOT_NAME);
  const parentNode = namehash(normalizedRoot) as `0x${string}`;
  const label = code.toLowerCase();

  console.log("🏷️  Ensuring ENS subname:", {
    code,
    fqdn: normalizedFqdn,
    node,
    parentNode,
    label,
  });

  // 2. Verificar idempotencia: ¿Ya existe?
  try {
    const existingOwner = await publicClient.readContract({
      address: NAMEWRAPPER_ADDRESS,
      abi: nameWrapperAbi,
      functionName: "ownerOf",
      args: [BigInt(node)],
    });

    console.log("ℹ️  Subname already exists, owner:", existingOwner);

    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    // If owner is address(0), the subdomain is "abandoned" - we can reclaim it
    if (existingOwner.toLowerCase() === ZERO_ADDRESS.toLowerCase()) {
      console.log("⚠️  Subname exists but is abandoned (owner is 0x0), will attempt to reclaim");
      // Continue with creation to reclaim it
    }
    // If it already exists and we are the owner, perfect (idempotent)
    else if (existingOwner.toLowerCase() === account.address.toLowerCase()) {
      console.log("✅ Subname already owned by us, skipping creation");
      return { fqdn: normalizedFqdn, node };
    }
    // If it exists with another real owner, error
    else {
      throw new Error(
        `SUBNAME_TAKEN: ${normalizedFqdn} already exists with owner ${existingOwner}`
      );
    }
  } catch (error: any) {
    // If the error is that it doesn't exist (typical ERC721 revert), continue with creation
    const isNotFoundError =
      error.message?.includes("ERC721") ||
      error.message?.includes("does not exist") ||
      error.message?.includes("owner query");

    if (!isNotFoundError && !error.message?.includes("SUBNAME_TAKEN")) {
      console.warn("⚠️  Unexpected error checking ownership:", error.message);
      // Continue anyway, we'll try to create
    } else if (error.message?.includes("SUBNAME_TAKEN")) {
      // Re-throw SUBNAME_TAKEN errors
      throw error;
    }
  }

  // 3. Create the subdomain using setSubnodeRecord
  console.log("🔨 Creating wrapped subname with setSubnodeRecord...");

  // Parameters to create the subname
  const owner = account.address;
  const resolver = ENS_PUBLIC_RESOLVER_ADDRESS;
  const ttl = BigInt(0); // TTL 0 = use default
  const fuses = 0; // No special fuses for now
  const expiry = BigInt(Math.floor(Date.now() / 1000) + 31536000); // 1 year from now

  try {
    const result = await writeSafeContract(
      {
        address: NAMEWRAPPER_ADDRESS,
        abi: nameWrapperAbi,
        functionName: "setSubnodeRecord",
        args: [parentNode, label, owner, resolver, ttl, fuses, expiry],
      },
      true // Esperar el receipt
    );

    console.log("✅ Subname created successfully:", {
      fqdn: normalizedFqdn,
      node,
      txHash: result.hash,
      blockNumber: result.receipt?.blockNumber,
    });

    return { fqdn: normalizedFqdn, node };
  } catch (error: any) {
    // Si falla por "already exists", tratar como idempotente
    if (
      error.message?.includes("already") ||
      error.message?.includes("exists")
    ) {
      console.log("✅ Subname creation reverted (already exists), treating as success");
      return { fqdn: normalizedFqdn, node };
    }

    // Otros errores se propagan
    console.error("❌ Failed to create subname:", error);
    throw new Error(`Failed to create ENS subname: ${error.message}`);
  }
}
