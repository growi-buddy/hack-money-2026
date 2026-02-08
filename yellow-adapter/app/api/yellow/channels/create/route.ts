/**
 * POST /api/yellow/channels/create
 * Crea un canal on-chain real con Yellow Network
 * 
 * Flujo:
 * 1. Backend prepara canal y estado inicial
 * 2. Judge (Growi) firma el estado
 * 3. Frontend recibe los datos y pide firma al Manager
 * 4. Manager firma con MetaMask
 * 5. Frontend envía TX on-chain
 */

import { NextRequest, NextResponse } from 'next/server';
import { getOnChainChannelService } from '@/src/lib/yellow/onchain/channelService';
import { z } from 'zod';

export const runtime = 'nodejs';

const CreateChannelSchema = z.object({
  managerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid manager address'),
  influencerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid influencer address'),
  budgetUsdc: z.string().regex(/^\d+$/, 'Budget must be numeric string'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = CreateChannelSchema.parse(body);

    const service = getOnChainChannelService();

    // Crear canal (prepara todo para firma del manager)
    const result = await service.createChannel(
      input.managerAddress as `0x${string}`,
      input.influencerAddress as `0x${string}`,
      input.budgetUsdc
    );

    return NextResponse.json({
      ok: true,
      data: {
        channelId: result.channelId,
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
          allocations: result.initialState.allocations.map(a => ({
            destination: a.destination,
            token: a.token,
            amount: a.amount.toString(),
          })),
          sigs: result.initialState.sigs,
        },
        instructions: {
          step1: 'Manager debe aprobar USDC: approve(custody, ' + input.budgetUsdc + ')',
          step2: 'Manager debe depositar: deposit(token, ' + input.budgetUsdc + ')',
          step3: 'Manager debe firmar el initialState',
          step4: 'Manager debe llamar: custody.create(channel, initialState, signatures)',
          note: 'El frontend debe manejar estos pasos con MetaMask',
        },
      },
    });
  } catch (error: any) {
    console.error('[API] /api/yellow/channels/create error:', error);

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
          code: 'CHANNEL_CREATE_ERROR',
          message: error.message || 'Failed to create channel',
        },
      },
      { status: 500 }
    );
  }
}
