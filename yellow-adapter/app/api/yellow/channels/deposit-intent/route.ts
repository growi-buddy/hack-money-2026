/**
 * POST /api/yellow/channels/deposit-intent
 * Genera el TxIntent para depositar USDC en Custody contract
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { encodeFunctionData } from 'viem';

export const runtime = 'nodejs';

const DepositIntentSchema = z.object({
  chainId: z.number(),
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  amountUsdc: z.string(), // En unidades (e.g., "1000000" = 1 USDC)
});

const CUSTODY_ABI = [
  {
    type: 'function',
    name: 'deposit',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = DepositIntentSchema.parse(body);

    // Validar configuración on-chain
    const { validateOnChainConfig } = await import('@/src/lib/config/env');
    const config = validateOnChainConfig();
    
    const custodyAddress = config.YELLOW_CUSTODY_ADDRESS as `0x${string}`;
    const usdcAddress = config.YELLOW_USDC_ADDRESS as `0x${string}`;

    // Construir calldata para deposit()
    const calldata = encodeFunctionData({
      abi: CUSTODY_ABI,
      functionName: 'deposit',
      args: [usdcAddress, BigInt(input.amountUsdc)],
    });

    const response = {
      txIntent: {
        chainId: input.chainId,
        to: custodyAddress,
        data: calldata,
        value: '0x0',
        description: `Deposit ${(Number(input.amountUsdc) / 1_000_000).toFixed(2)} USDC to Custody`,
        estimatedGas: '200000',
      },
      debug: {
        token: usdcAddress,
        amount: input.amountUsdc,
        custody: custodyAddress,
      },
    };

    return NextResponse.json({
      ok: true,
      data: response,
      message: 'Send this transaction to deposit USDC',
    });
  } catch (error: any) {
    console.error('[DepositIntent] Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
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
          code: 'DEPOSIT_INTENT_ERROR',
          message: error.message || 'Failed to generate deposit intent',
        },
      },
      { status: 500 }
    );
  }
}
