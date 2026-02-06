/**
 * Helpers para escribir contratos de forma segura con simulación previa
 */

import { Abi, Address } from "viem";
import { publicClient, walletClient } from "./clients";

export interface WriteContractParams<TAbi extends Abi = Abi> {
  address: Address;
  abi: TAbi;
  functionName: string;
  args?: readonly unknown[];
  value?: bigint;
}

export interface WriteContractResult {
  hash: `0x${string}`;
  receipt?: {
    status: "success" | "reverted";
    blockNumber: bigint;
    gasUsed: bigint;
    transactionHash: `0x${string}`;
  };
}

/**
 * Escribe un contrato de forma segura:
 * 1. Simula la transacción para detectar errores antes de enviar
 * 2. Envía la transacción
 * 3. Opcionalmente espera el receipt
 * 
 * @param params - Parámetros del contrato (address, abi, functionName, args)
 * @param waitForReceipt - Si es true, espera a que la tx sea minada (default: true)
 */
export async function writeSafeContract<TAbi extends Abi>(
  params: WriteContractParams<TAbi>,
  waitForReceipt = true
): Promise<WriteContractResult> {
  try {
    console.log("🔍 Simulating contract call:", {
      address: params.address,
      functionName: params.functionName,
      args: params.args,
    });

    // 1. Simular transacción para verificar que no va a revertir
    const { request } = await publicClient.simulateContract({
      address: params.address,
      abi: params.abi,
      functionName: params.functionName,
      args: params.args,
      value: params.value,
      account: walletClient.account,
    } as any);

    console.log("✅ Simulation successful, sending transaction...");

    // 2. Enviar transacción
    const hash = await walletClient.writeContract(request as any);

    console.log("📤 Transaction sent:", hash);

    // 3. Opcionalmente esperar el receipt
    if (waitForReceipt) {
      console.log("⏳ Waiting for transaction receipt...");
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
        timeout: 60_000, // 60 segundos timeout
      });

      console.log("✅ Transaction confirmed:", {
        hash: receipt.transactionHash,
        status: receipt.status,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed,
      });

      return {
        hash,
        receipt: {
          status: receipt.status,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed,
          transactionHash: receipt.transactionHash,
        },
      };
    }

    return { hash };
  } catch (error) {
    console.error("❌ Error writing contract:", error);

    // Extraer mensaje de error útil
    if (error instanceof Error) {
      // Si la simulación falló, el error suele contener el motivo del revert
      throw new Error(`Contract call failed: ${error.message}`);
    }

    throw error;
  }
}
