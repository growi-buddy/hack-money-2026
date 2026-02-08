/**
 * POST /api/yellow/channels/sign-data
 * Retorna los datos EIP-712 que el Manager debe firmar antes de crear el canal
 * 
 * Este endpoint prepara el canal y estado inicial, y retorna:
 * - Los datos para firma EIP-712
 * - El channelId
 * - Toda la info del canal para el próximo paso
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getOnChainChannelService } from '@/src/lib/yellow/onchain/channelService';

export const runtime = 'nodejs';

const SignDataSchema = z.object({
  chainId: z.number(),
  managerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  influencerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  budgetUsdc: z.string(), // En unidades (e.g., "1000000" = 1 USDC)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = SignDataSchema.parse(body);

    // Validar config y obtener servicio (ya valida internamente)
    const service = getOnChainChannelService();
    
    // Obtener address desde config validada
    const { validateOnChainConfig } = await import('@/src/lib/config/env');
    const config = validateOnChainConfig();
    const custodyAddress = config.YELLOW_CUSTODY_ADDRESS as `0x${string}`;

    // Crear canal (prepara todo con firma de Judge)
    const result = await service.createChannel(
      input.managerAddress as `0x${string}`,
      input.influencerAddress as `0x${string}`,
      input.budgetUsdc
    );

    // Preparar datos EIP-712 para que el Manager firme
    // IMPORTANTE: Convertir BigInt a string para JSON serialization
    const typedData = {
      domain: {
        name: 'Nitrolite:Custody',
        version: '0.3.0',
        chainId: input.chainId,
        verifyingContract: custodyAddress,
      },
      types: {
        AllowStateHash: [
          { name: 'channelId', type: 'bytes32' },
          { name: 'intent', type: 'uint8' },
          { name: 'version', type: 'uint256' },
          { name: 'data', type: 'bytes' },
          { name: 'allocations', type: 'Allocation[]' },
        ],
        Allocation: [
          { name: 'destination', type: 'address' },
          { name: 'token', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
      },
      primaryType: 'AllowStateHash' as const,
      message: {
        channelId: result.channelId,
        intent: result.initialState.intent,
        version: result.initialState.version.toString(), // Convertir a string
        data: result.initialState.data,
        allocations: result.initialState.allocations.map((a) => ({
          destination: a.destination,
          token: a.token,
          amount: a.amount.toString(), // Convertir a string
        })),
      },
    };

    const response = {
      channelId: result.channelId,
      typedData,
      channel: {
        chainId: result.channel.chainId.toString(),
        participants: result.channel.participants,
        adjudicator: result.channel.adjudicator,
        challenge: result.channel.challenge.toString(),
        nonce: result.channel.nonce.toString(),
      },
      initialState: {
        intent: result.initialState.intent,
        version: result.initialState.version.toString(),
        data: result.initialState.data,
        allocations: result.initialState.allocations.map((a) => ({
          destination: a.destination,
          token: a.token,
          amount: a.amount.toString(),
        })),
        sigs: result.initialState.sigs,
      },
    };

    return NextResponse.json({
      ok: true,
      data: response,
      message: 'Sign this data with your wallet (EIP-712)',
    });
  } catch (error: any) {
    console.error('[SignData] Error:', error);

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
          code: 'SIGN_DATA_ERROR',
          message: error.message || 'Failed to generate sign data',
        },
      },
      { status: 500 }
    );
  }
}
