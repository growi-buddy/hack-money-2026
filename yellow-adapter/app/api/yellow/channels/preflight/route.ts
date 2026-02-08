/**
 * POST /api/yellow/channels/preflight
 * Verifica pre-condiciones antes de iniciar flujo on-chain:
 * - Validación de configuración
 * - Balance ETH para gas
 * - Balance USDC para depósito
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createPublicClient, http, formatEther, formatUnits } from 'viem';
import { baseSepolia } from 'viem/chains';
import { validateOnChainConfig } from '@/src/lib/config/env';

export const runtime = 'nodejs';

const PreflightSchema = z.object({
  chainId: z.number(),
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  budgetUsdc: z.string(), // En unidades (e.g., "1000000" = 1 USDC)
});

const ERC20_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = PreflightSchema.parse(body);

    // Validar configuración on-chain
    const config = validateOnChainConfig();
    
    // Crear public client
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(config.BASE_SEPOLIA_RPC_URL),
    });

    // 1. Verificar balance ETH (para gas)
    const ethBalance = await publicClient.getBalance({
      address: input.wallet as `0x${string}`,
    });

    const ethBalanceFormatted = formatEther(ethBalance);
    const hasEnoughEth = ethBalance > BigInt('10000000000000000'); // > 0.01 ETH

    // 2. Verificar balance USDC
    const usdcBalance = await publicClient.readContract({
      address: config.YELLOW_USDC_ADDRESS as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [input.wallet as `0x${string}`],
    });

    const usdcBalanceFormatted = formatUnits(usdcBalance as bigint, 6);
    const requiredUsdc = BigInt(input.budgetUsdc);
    const hasEnoughUsdc = (usdcBalance as bigint) >= requiredUsdc;

    // 3. Resultado
    const checks = {
      configValid: true, // Si llegamos aquí, la config es válida
      hasEnoughEth,
      hasEnoughUsdc,
      ethBalance: ethBalanceFormatted,
      usdcBalance: usdcBalanceFormatted,
      requiredUsdc: formatUnits(requiredUsdc, 6),
    };

    const allPassed = checks.configValid && checks.hasEnoughEth && checks.hasEnoughUsdc;

    return NextResponse.json({
      ok: true,
      data: {
        ready: allPassed,
        checks,
        warnings: [
          !hasEnoughEth && `⚠️ Necesitas al menos 0.01 ETH para gas fees. Tienes: ${ethBalanceFormatted} ETH`,
          !hasEnoughUsdc && `⚠️ Balance USDC insuficiente. Necesitas: ${formatUnits(requiredUsdc, 6)} USDC, Tienes: ${usdcBalanceFormatted} USDC`,
        ].filter(Boolean),
      },
    });
  } catch (error: any) {
    console.error('[Preflight] Error:', error);

    // Si es error de validación de config, retornar detalles
    if (error.message?.includes('Configuración')) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'CONFIG_ERROR',
            message: 'Configuración on-chain incompleta. Contacta al administrador.',
            details: error.message,
          },
        },
        { status: 400 }
      );
    }

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
          code: 'PREFLIGHT_ERROR',
          message: error.message || 'Failed to run preflight checks',
        },
      },
      { status: 500 }
    );
  }
}
