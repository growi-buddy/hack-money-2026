/**
 * POST /api/yellow/channel/close-intent
 * Genera el TxIntent para ejecutar Custody.close() on-chain
 * 
 * Input: channelId, wallet, userSig
 * Output: TxIntent listo para enviar
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { encodeFunctionData } from "viem";
import { CloseIntentInputSchema } from "@/src/yellow/validation";
import { getChannelManager } from "@/src/yellow/channel";
import { getChainConfig } from "@/src/yellow/config";
import { orderSignatures } from "@/src/yellow/statePacking";
import { CUSTODY_ABI, type Channel, type State } from "@/src/yellow/custodyAbi";
import type { CloseIntentResponse } from "@/src/yellow/intents";

export const runtime = "nodejs";

// Store temporal para cache de prepare-close
// En producción, usar Redis o DB
const prepareCloseCache = new Map<string, {
  channel: Channel;
  state: State;
  clearnodeSig: `0x${string}`;
  timestamp: number;
}>();

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar body
    const body = await request.json();
    const input = CloseIntentInputSchema.parse(body);

    console.log("[CloseIntent] Input:", input);

    // Validar chain soportada
    const chainConfig = getChainConfig(input.chainId);
    if (!chainConfig) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "UNSUPPORTED_CHAIN",
            message: `Chain ${input.chainId} not supported`,
          },
        },
        { status: 400 }
      );
    }

    // Obtener datos del prepare-close (cache o RPC)
    const cacheKey = `${input.channelId}_${input.wallet.toLowerCase()}`;
    let closeData = prepareCloseCache.get(cacheKey);

    if (!closeData) {
      // Si no hay cache, obtener del clearnode
      console.log("[CloseIntent] No cache, fetching from clearnode...");
      const channelManager = getChannelManager();
      const closeResponse = await channelManager.closeChannel(input.channelId);

      closeData = {
        channel: closeResponse.channel,
        state: closeResponse.state,
        clearnodeSig: closeResponse.clearnodeSig,
        timestamp: Date.now(),
      };
    }

    // Verificar que wallet es participant
    const participantIndex = closeData.channel.participants.findIndex(
      (p) => p.toLowerCase() === input.wallet.toLowerCase()
    );

    if (participantIndex === -1) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Wallet is not a participant in this channel",
          },
        },
        { status: 403 }
      );
    }

    // Ordenar firmas correctamente
    // Docs: Signature Order Critical
    // Index 0 = creator/user (participants[0])
    // Index 1 = clearnode (participants[1])
    const userIsParticipant0 = participantIndex === 0;
    const signatures = orderSignatures(
      input.userSig as `0x${string}`,
      closeData.clearnodeSig,
      userIsParticipant0
    );

    console.log("[CloseIntent] Ordered signatures:", signatures);
    console.log("[CloseIntent] User is participant[0]:", userIsParticipant0);

    // Construir calldata para Custody.close()
    const calldata = encodeFunctionData({
      abi: CUSTODY_ABI,
      functionName: "close",
      args: [
        closeData.channel,
        closeData.state,
        signatures,
      ],
    });

    console.log("[CloseIntent] Generated calldata:", calldata);

    // Construir TxIntent
    const response: CloseIntentResponse = {
      txIntent: {
        chainId: input.chainId,
        to: chainConfig.custodyContract,
        data: calldata,
        value: "0x0",
        description: "Custody.close cooperative FINALIZE",
        estimatedGas: "500000", // Estimación conservadora
      },
      debug: {
        packedState: "0x", // Podríamos incluirlo si es útil
        intent: closeData.state.intent,
        version: Number(closeData.state.version),
        channelId: input.channelId,
        signatures,
      },
    };

    return NextResponse.json({
      ok: true,
      data: response,
      message: "Send this transaction from your wallet to close the channel on-chain",
    });
  } catch (error: any) {
    console.error("[CloseIntent] Error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Validation failed",
            details: { errors: error.issues },
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "CLOSE_INTENT_ERROR",
          message: error.message || "Failed to generate close intent",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Helper: Cache prepare-close data
 */
export function cachePrepareClose(
  channelId: string,
  wallet: string,
  data: {
    channel: Channel;
    state: State;
    clearnodeSig: `0x${string}`;
  }
): void {
  const cacheKey = `${channelId}_${wallet.toLowerCase()}`;
  prepareCloseCache.set(cacheKey, {
    ...data,
    timestamp: Date.now(),
  });

  // Limpiar cache antigua (> 10 minutos)
  setTimeout(() => {
    const now = Date.now();
    for (const [key, value] of prepareCloseCache.entries()) {
      if (now - value.timestamp > 10 * 60 * 1000) {
        prepareCloseCache.delete(key);
      }
    }
  }, 1000);
}
