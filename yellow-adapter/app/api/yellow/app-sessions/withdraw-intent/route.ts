/**
 * POST /api/yellow/app-sessions/withdraw-intent
 * Genera el TxIntent para retirar USDC del Custody contract a la wallet del influencer
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { encodeFunctionData } from 'viem';
import { CUSTODY_ABI } from '@/src/lib/yellow/onchain/custody-abi';

const WithdrawIntentSchema = z.object({
  chainId: z.number(),
  influencerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  amountUsdc: z.string(), // En unidades (e.g., "250000" = 0.25 USDC)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = WithdrawIntentSchema.parse(body);

    // Validar chain
    if (input.chainId !== 84532) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'UNSUPPORTED_CHAIN',
            message: 'Only Base Sepolia (84532) is supported',
          },
        },
        { status: 400 }
      );
    }

    // Contratos (Base Sepolia)
    const custodyAddress = process.env.YELLOW_CUSTODY_ADDRESS as `0x${string}`;
    const usdcAddress = '0xDB9F293e3898c9E5536A3be1b0C56c89d2b32DEb' as `0x${string}`; // ytest.usd

    if (!custodyAddress) {
      throw new Error('YELLOW_CUSTODY_ADDRESS not configured');
    }

    // Construir calldata para withdrawal(token, amount)
    const calldata = encodeFunctionData({
      abi: CUSTODY_ABI,
      functionName: 'withdrawal',
      args: [usdcAddress, BigInt(input.amountUsdc)],
    });

    const response = {
      txIntent: {
        chainId: input.chainId,
        to: custodyAddress,
        data: calldata,
        value: '0x0',
        description: `Withdraw ${(Number(input.amountUsdc) / 1_000_000).toFixed(2)} USDC from Custody`,
        estimatedGas: '150000',
      },
      debug: {
        token: usdcAddress,
        amount: input.amountUsdc,
        custody: custodyAddress,
        influencer: input.influencerAddress,
      },
    };

    return NextResponse.json({
      ok: true,
      data: response,
      message: 'Send this transaction to withdraw USDC from Custody to your wallet',
    });
  } catch (error) {
    const err = error as Error;
    console.error('[API] /api/yellow/app-sessions/withdraw-intent error:', err);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
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
          code: 'WITHDRAW_INTENT_ERROR',
          message: err.message || 'Failed to generate withdraw intent',
        },
      },
      { status: 500 }
    );
  }
}
