/**
 * POST /api/yellow/faucet
 * Solicita tokens del faucet de Yellow para cualquier address
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const RequestSchema = z.object({
  userAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userAddress } = RequestSchema.parse(body);

    const faucetUrl = process.env.YELLOW_FAUCET_URL || "https://clearnet-sandbox.yellow.com/faucet/requestTokens";

    console.log(`[Faucet] Requesting tokens for: ${userAddress}`);

    // Llamar al faucet de Yellow
    const response = await fetch(faucetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userAddress }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Faucet request failed: ${response.status}`);
    }

    console.log(`[Faucet] Success:`, data);

    return NextResponse.json({
      ok: true,
      data: {
        userAddress,
        faucetResponse: data,
      },
      message: `Tokens requested for ${userAddress}`,
    });
  } catch (error: any) {
    console.error("[API] /api/yellow/faucet error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request body",
            details: error.issues,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "FAUCET_ERROR",
          message: error.message || "Failed to request faucet tokens",
        },
      },
      { status: 500 }
    );
  }
}
