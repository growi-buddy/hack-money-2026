/**
 * Lógica para asegurar resolver y escribir text records
 */

import { Address } from "viem";
import { publicClient } from "../chain/clients";
import { writeSafeContract } from "../chain/tx";
import { ENS_REGISTRY_ADDRESS, ENS_PUBLIC_RESOLVER_ADDRESS } from "./addresses";
import { ensRegistryAbi } from "./abi/ensRegistry";
import { publicResolverAbi } from "./abi/publicResolver";

/**
 * Asegura que un nodo tenga el Public Resolver configurado.
 * Si no lo tiene, lo configura.
 *
 * @param node - Hash del nodo ENS
 * @returns Hash de la transacción si se configuró, undefined si ya estaba configurado
 */
export async function ensureResolver(node: `0x${string}`): Promise<`0x${string}` | undefined> {
  console.log("🔍 Checking resolver for node:", node);

  // Leer resolver actual
  const currentResolver = await publicClient.readContract({
    address: ENS_REGISTRY_ADDRESS,
    abi: ensRegistryAbi,
    functionName: "resolver",
    args: [node],
  });

  console.log("  Current resolver:", currentResolver);
  console.log("  Expected resolver:", ENS_PUBLIC_RESOLVER_ADDRESS);

  // Si ya tiene el resolver correcto, no hacer nada
  if (
    currentResolver.toLowerCase() === ENS_PUBLIC_RESOLVER_ADDRESS.toLowerCase()
  ) {
    console.log("✅ Resolver already set correctly");
    return undefined;
  }

  // Configurar resolver
  console.log("🔧 Setting resolver to Public Resolver...");

  try {
    const result = await writeSafeContract(
      {
        address: ENS_REGISTRY_ADDRESS,
        abi: ensRegistryAbi,
        functionName: "setResolver",
        args: [node, ENS_PUBLIC_RESOLVER_ADDRESS],
      },
      true // Esperar receipt
    );

    console.log("✅ Resolver set successfully:", {
      txHash: result.hash,
      blockNumber: result.receipt?.blockNumber,
    });

    return result.hash;
  } catch (error: any) {
    console.error("❌ Failed to set resolver:", error);
    throw new Error(`CANNOT_SET_RESOLVER: ${error.message}`);
  }
}

export interface TextRecord {
  key: string;
  value: string;
}

/**
 * Escribe múltiples text records en el resolver de un nodo.
 * Por ahora escribe todos, sin verificar si ya existen (idempotente a nivel de blockchain).
 *
 * @param node - Hash del nodo ENS
 * @param records - Array de { key, value } a escribir
 * @returns Array de hashes de transacciones
 */
export async function setTextRecords(
  node: `0x${string}`,
  records: TextRecord[]
): Promise<`0x${string}`[]> {
  if (records.length === 0) {
    console.log("⚠️  No text records to set");
    return [];
  }

  console.log(`📝 Setting ${records.length} text record(s)...`);

  const txHashes: `0x${string}`[] = [];

  // Escribir cada record
  for (const record of records) {
    console.log(`  Setting "${record.key}" = "${record.value}"`);

    try {
      const result = await writeSafeContract(
        {
          address: ENS_PUBLIC_RESOLVER_ADDRESS,
          abi: publicResolverAbi,
          functionName: "setText",
          args: [node, record.key, record.value],
        },
        true // Esperar receipt
      );

      console.log(`  ✅ Text record set: ${record.key} (tx: ${result.hash})`);
      txHashes.push(result.hash);
    } catch (error: any) {
      console.error(`  ❌ Failed to set text record "${record.key}":`, error);
      throw new Error(`SET_TEXT_FAILED for "${record.key}": ${error.message}`);
    }
  }

  console.log(`✅ All ${records.length} text record(s) set successfully`);
  return txHashes;
}
