/**
 * POST /api/yellow/channels/approve-intent
 * Genera el TxIntent para aprobar USDC al Custody contract
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { encodeFunctionData, parseUnits } from 'viem';

export const runtime = 'nodejs';

const ApproveIntentSchema = z.object({
  chainId: z.number(),
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  amountUsdc: z.string(), // En unidades (e.g., "1000000" = 1 USDC)
});

const ERC20_ABI = [
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = ApproveIntentSchema.parse(body);

    // Validar configuración on-chain
    const { validateOnChainConfig } = await import('@/src/lib/config/env');
    const config = validateOnChainConfig();
    
    const custodyAddress = config.YELLOW_CUSTODY_ADDRESS as `0x${string}`;
    const usdcAddress = config.YELLOW_USDC_ADDRESS as `0x${string}`;

    // Construir calldata para approve()
    const calldata = encodeFunctionData({
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [custodyAddress, BigInt(input.amountUsdc)],
    });

    const response = {
      txIntent: {
        chainId: input.chainId,
        to: usdcAddress,
        data: calldata,
        value: '0x0',
        description: `Approve ${(Number(input.amountUsdc) / 1_000_000).toFixed(2)} USDC to Custody`,
        estimatedGas: '100000',
      },
      debug: {
        spender: custodyAddress,
        amount: input.amountUsdc,
        token: usdcAddress,
      },
    };

    return NextResponse.json({
      ok: true,
      data: response,
      message: 'Send this transaction to approve USDC',
    });
  } catch (error: any) {
    console.error('[ApproveIntent] Error:', error);

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
          code: 'APPROVE_INTENT_ERROR',
          message: error.message || 'Failed to generate approve intent',
        },
      },
      { status: 500 }
    );
  }
}
