/**
 * POST /api/yellow/channel/prepare-close
 * Prepara el cierre cooperativo de un canal
 * 
 * Output: SignIntent para que el usuario firme el packedState
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { PrepareCloseInputSchema } from "@/src/yellow/validation";
import { getChannelManager } from "@/src/yellow/channel";
import { getChainConfig } from "@/src/yellow/config";
import { hashState, packState } from "@/src/yellow/statePacking";
import type { PrepareCloseResponse } from "@/src/yellow/intents";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar body
    const body = await request.json();
    const input = PrepareCloseInputSchema.parse(body);

    console.log("[PrepareClose] Input:", input);

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

    // Conectar al channel manager y solicitar cierre
    const channelManager = getChannelManager();
    const closeResponse = await channelManager.closeChannel(input.channelId);

    console.log("[PrepareClose] Close response:", closeResponse);

    // Verificar que el estado tiene intent FINALIZE (3)
    if (closeResponse.state.intent !== 3) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "INVALID_INTENT",
            message: `Expected FINALIZE intent (3), got ${closeResponse.state.intent}`,
          },
        },
        { status: 500 }
      );
    }

    // Verificar que wallet es participant del canal
    const isParticipant = closeResponse.channel.participants.some(
      (p) => p.toLowerCase() === input.wallet.toLowerCase()
    );

    if (!isParticipant) {
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

    // Pack state y calcular hash
    const packedState = packState(closeResponse.channel, closeResponse.state);
    const stateHash = hashState(closeResponse.channel, closeResponse.state);

    console.log("[PrepareClose] PackedState:", packedState);
    console.log("[PrepareClose] StateHash:", stateHash);

    // Construir SignIntent
    const response: PrepareCloseResponse = {
      signIntent: {
        kind: "EIP191_PERSONAL_SIGN",
        wallet: input.wallet as `0x${string}`,
        chainId: input.chainId,
        messageToSign: stateHash, // Hash del packed state
        description: "Sign FINALIZE packedState for cooperative close",
        metadata: {
          channelId: input.channelId,
          version: Number(closeResponse.state.version),
          intent: "FINALIZE",
        },
      },
      serverPart: {
        packedState,
        state: {
          version: Number(closeResponse.state.version),
          intent: closeResponse.state.intent,
          allocations: closeResponse.state.allocations.map((a) => ({
            destination: a.destination,
            amount: a.amount.toString(),
          })),
          data: closeResponse.state.data,
        },
        clearnodeSig: closeResponse.clearnodeSig,
        channelId: input.channelId,
      },
    };

    return NextResponse.json({
      ok: true,
      data: response,
      message: "Sign the messageToSign with your wallet and send to /close-intent",
    });
  } catch (error: any) {
    console.error("[PrepareClose] Error:", error);

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
          code: "PREPARE_CLOSE_ERROR",
          message: error.message || "Failed to prepare close",
        },
      },
      { status: 500 }
    );
  }
}
