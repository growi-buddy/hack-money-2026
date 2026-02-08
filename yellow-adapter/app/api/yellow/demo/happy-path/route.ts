/**
 * POST /api/yellow/demo/happy-path
 * Demo completo end-to-end SOLO para testnet
 * 
 * Flujo:
 * 1. Create channel + on-chain create (INITIALIZE)
 * 2. Off-chain payouts (OPERATE)
 * 3. Close cooperatively (FINALIZE)
 * 
 * IMPORTANTE: Usa wallets de test configuradas en .env
 * NO viola la regla de oro porque son wallets de prueba locales
 */

import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, createWalletClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { encodeFunctionData, type Account } from "viem";
import { getChannelManager } from "@/src/yellow/channel";
import { getChainConfig } from "@/src/yellow/config";
import { hashState, packState, orderSignatures, calculateChannelId } from "@/src/yellow/statePacking";
import { CUSTODY_ABI, Intent, type Channel, type State } from "@/src/yellow/custodyAbi";

export const runtime = "nodejs";

interface DemoStep {
  step: number;
  name: string;
  status: "pending" | "success" | "error";
  result?: any;
  txHash?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  const steps: DemoStep[] = [];
  
  try {
    // Validar que estamos en testnet
    const chainId = 84532; // Base Sepolia
    const chainConfig = getChainConfig(chainId);
    
    if (!chainConfig) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: "UNSUPPORTED_CHAIN", message: "Chain not supported" },
        },
        { status: 400 }
      );
    }

    // Cargar wallets de test desde env
    const managerPk = process.env.YELLOW_MANAGER_PK as `0x${string}`;
    const influencerPk = process.env.YELLOW_INFLUENCER_PK as `0x${string}`;

    if (!managerPk || !influencerPk) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "MISSING_TEST_WALLETS",
            message: "Set YELLOW_MANAGER_PK and YELLOW_INFLUENCER_PK in .env",
          },
        },
        { status: 500 }
      );
    }

    const managerAccount = privateKeyToAccount(managerPk);
    const influencerAccount = privateKeyToAccount(influencerPk);

    console.log("[Demo] Manager:", managerAccount.address);
    console.log("[Demo] Influencer:", influencerAccount.address);

    // Crear clientes
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(chainConfig.rpcUrl),
    });

    const walletClient = createWalletClient({
      chain: baseSepolia,
      transport: http(chainConfig.rpcUrl),
      account: managerAccount,
    });

    // ========================================
    // STEP 1: Create Channel
    // ========================================
    steps.push({
      step: 1,
      name: "Create Channel (INITIALIZE)",
      status: "pending",
    });

    const channel: Channel = {
      chainId: BigInt(chainId),
      participants: [managerAccount.address, influencerAccount.address],
      challenge: BigInt(0),
      nonce: BigInt(Date.now()),
      asset: chainConfig.usdcAddress,
    };

    const channelId = calculateChannelId(channel);

    const initialAllocations = [
      {
        destination: managerAccount.address,
        amount: parseUnits("1", 6), // 1 USDC
      },
      {
        destination: influencerAccount.address,
        amount: BigInt(0),
      },
    ];

    const initialState: State = {
      version: BigInt(0),
      intent: Intent.INITIALIZE,
      allocations: initialAllocations,
      data: "0x",
    };

    // Firmar estado inicial
    const stateHash = hashState(channel, initialState);
    const managerSig = await managerAccount.signMessage({
      message: { raw: stateHash },
    });
    const influencerSig = await influencerAccount.signMessage({
      message: { raw: stateHash },
    });

    const signatures = [managerSig, influencerSig];

    // Encode calldata para Custody.create
    const createCalldata = encodeFunctionData({
      abi: CUSTODY_ABI,
      functionName: "create",
      args: [channel, initialState, signatures],
    });

    // Enviar TX on-chain
    try {
      const createTxHash = await walletClient.sendTransaction({
        to: chainConfig.custodyContract,
        data: createCalldata,
        value: BigInt(0),
      });

      console.log("[Demo] Create TX hash:", createTxHash);

      // Esperar confirmación
      await publicClient.waitForTransactionReceipt({ hash: createTxHash });

      steps[0].status = "success";
      steps[0].txHash = createTxHash;
      steps[0].result = { channelId };
    } catch (error: any) {
      steps[0].status = "error";
      steps[0].error = error.message;
      throw error;
    }

    // ========================================
    // STEP 2: Off-chain Payout (OPERATE)
    // ========================================
    steps.push({
      step: 2,
      name: "Off-chain Payout (OPERATE)",
      status: "pending",
    });

    const payoutAmount = parseUnits("0.3", 6); // 0.3 USDC

    const operateState: State = {
      version: BigInt(1),
      intent: Intent.OPERATE,
      allocations: [
        {
          destination: managerAccount.address,
          amount: parseUnits("1", 6) - payoutAmount,
        },
        {
          destination: influencerAccount.address,
          amount: payoutAmount,
        },
      ],
      data: "0x",
    };

    // Firmar estado OPERATE
    const operateHash = hashState(channel, operateState);
    const managerOpSig = await managerAccount.signMessage({
      message: { raw: operateHash },
    });

    // En producción, esto se haría via RPC al clearnode
    // Por ahora, simulamos
    steps[1].status = "success";
    steps[1].result = {
      version: 1,
      managerBalance: "0.7 USDC",
      influencerBalance: "0.3 USDC",
    };

    // ========================================
    // STEP 3: Close Channel (FINALIZE)
    // ========================================
    steps.push({
      step: 3,
      name: "Close Channel (FINALIZE)",
      status: "pending",
    });

    const finalState: State = {
      version: BigInt(2),
      intent: Intent.FINALIZE,
      allocations: operateState.allocations, // Mismo allocation que OPERATE
      data: "0x",
    };

    // Firmar estado FINALIZE
    const finalHash = hashState(channel, finalState);
    const managerFinalSig = await managerAccount.signMessage({
      message: { raw: finalHash },
    });
    const influencerFinalSig = await influencerAccount.signMessage({
      message: { raw: finalHash },
    });

    const finalSignatures = [managerFinalSig, influencerFinalSig];

    // Encode calldata para Custody.close
    const closeCalldata = encodeFunctionData({
      abi: CUSTODY_ABI,
      functionName: "close",
      args: [channel, finalState, finalSignatures],
    });

    // Enviar TX on-chain
    try {
      const closeTxHash = await walletClient.sendTransaction({
        to: chainConfig.custodyContract,
        data: closeCalldata,
        value: BigInt(0),
      });

      console.log("[Demo] Close TX hash:", closeTxHash);

      // Esperar confirmación
      await publicClient.waitForTransactionReceipt({ hash: closeTxHash });

      steps[2].status = "success";
      steps[2].txHash = closeTxHash;
      steps[2].result = {
        finalVersion: 2,
        intent: "FINALIZE",
        settled: true,
      };
    } catch (error: any) {
      steps[2].status = "error";
      steps[2].error = error.message;
      throw error;
    }

    // ========================================
    // Summary
    // ========================================
    return NextResponse.json({
      ok: true,
      data: {
        steps,
        summary: {
          channelId,
          chainId,
          explorerUrl: chainConfig.explorerUrl,
          createTxHash: steps[0].txHash,
          closeTxHash: steps[2].txHash,
          totalPayouts: "0.3 USDC",
          finalBalances: {
            manager: "0.7 USDC",
            influencer: "0.3 USDC",
          },
        },
      },
      message: "Happy path demo completed successfully! Check explorer for tx details.",
    });
  } catch (error: any) {
    console.error("[Demo] Error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "DEMO_ERROR",
          message: error.message || "Demo failed",
        },
        steps,
      },
      { status: 500 }
    );
  }
}
