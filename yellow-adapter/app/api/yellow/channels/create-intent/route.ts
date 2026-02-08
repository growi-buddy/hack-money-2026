/**
 * POST /api/yellow/channels/create-intent
 * Genera el TxIntent para crear un canal on-chain con Custody.create()
 * 
 * Flujo:
 * 1. Backend prepara canal y estado inicial
 * 2. Judge (Growi) firma el estado
 * 3. Frontend pide firma al Manager (EIP-712)
 * 4. Backend genera calldata con todas las firmas
 * 5. Frontend ejecuta TX on-chain
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { encodeFunctionData, encodeAbiParameters, parseAbiParameters, keccak256 } from 'viem';
import { getOnChainChannelService } from '@/src/lib/yellow/onchain/channelService';

export const runtime = 'nodejs';

const CreateIntentSchema = z.object({
  chainId: z.number(),
  managerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  influencerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  budgetUsdc: z.string(), // En unidades (e.g., "1000000" = 1 USDC)
  managerSignature: z.string().regex(/^0x[a-fA-F0-9]+$/), // Firma EIP-712 del manager
});

const CUSTODY_ABI = [
  {
    type: 'function',
    name: 'create',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'channel',
        type: 'tuple',
        components: [
          { name: 'chainId', type: 'uint256' },
          { name: 'participants', type: 'address[]' },
          { name: 'adjudicator', type: 'address' },
          { name: 'challenge', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
        ],
      },
      {
        name: 'state',
        type: 'tuple',
        components: [
          { name: 'intent', type: 'uint8' },
          { name: 'version', type: 'uint256' },
          { name: 'data', type: 'bytes' },
          {
            name: 'allocations',
            type: 'tuple[]',
            components: [
              { name: 'destination', type: 'address' },
              { name: 'token', type: 'address' },
              { name: 'amount', type: 'uint256' },
            ],
          },
          { name: 'sigs', type: 'bytes[]' },
        ],
      },
      { name: 'signatures', type: 'bytes[]' },
    ],
    outputs: [],
  },
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = CreateIntentSchema.parse(body);

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

    // Agregar firma del Manager
    result.initialState.sigs[0] = input.managerSignature as `0x${string}`;

    // Convertir a formato para viem
    const channel = {
      chainId: BigInt(result.channel.chainId),
      participants: result.channel.participants,
      adjudicator: result.channel.adjudicator,
      challenge: BigInt(result.channel.challenge),
      nonce: BigInt(result.channel.nonce),
    };

    const state = {
      intent: result.initialState.intent,
      version: BigInt(result.initialState.version),
      data: result.initialState.data,
      allocations: result.initialState.allocations.map((a) => ({
        destination: a.destination,
        token: a.token,
        amount: BigInt(a.amount),
      })),
      sigs: result.initialState.sigs,
    };

    // Construir calldata para Custody.create()
    const calldata = encodeFunctionData({
      abi: CUSTODY_ABI,
      functionName: 'create',
      args: [channel, state, result.initialState.sigs],
    });

    const response = {
      txIntent: {
        chainId: input.chainId,
        to: custodyAddress,
        data: calldata,
        value: '0x0',
        description: `Create channel with ${(Number(input.budgetUsdc) / 1_000_000).toFixed(2)} USDC budget`,
        estimatedGas: '500000',
      },
      channelId: result.channelId,
      debug: {
        channel: {
          chainId: channel.chainId.toString(), // Convertir BigInt a string
          participants: channel.participants,
          adjudicator: channel.adjudicator,
          challenge: channel.challenge.toString(), // Convertir BigInt a string
          nonce: channel.nonce.toString(), // Convertir BigInt a string
        },
        state: {
          intent: state.intent,
          version: state.version.toString(),
          allocations: state.allocations.map((a) => ({
            destination: a.destination,
            token: a.token,
            amount: a.amount.toString(),
          })),
        },
      },
    };

    return NextResponse.json({
      ok: true,
      data: response,
      message: 'Send this transaction to create the channel on-chain',
    });
  } catch (error: any) {
    console.error('[CreateIntent] Error:', error);

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
          code: 'CREATE_INTENT_ERROR',
          message: error.message || 'Failed to generate create intent',
        },
      },
      { status: 500 }
    );
  }
}
