/**
 * App Sessions Service
 * Maneja creación y actualización de App Sessions con Yellow
 */

import { privateKeyToAccount } from "viem/accounts";
import { YellowRpcClient } from "../rpc/client";
import { appSessionStore } from "./store";
import { GrowiRole } from "./types";
import type {
  AppDefinition,
  AppSessionState,
  Allocation,
  CreateSessionInput,
  PayoutInput,
  ClaimInput,
} from "./types";

/**
 * Configuración de wallets para modo test
 */
interface TestWallets {
  manager: any;
  influencer: any;
  judge: any;
  feeTreasury: any;
}

/**
 * Crea la definición de App Session para Growi
 */
export function createGrowiAppDefinition(
  managerAddress: `0x${string}`,
  influencerAddress: `0x${string}`,
  judgeAddress: `0x${string}`,
  feeTreasuryAddress: `0x${string}`,
  asset: string = "ytest.usd"
): AppDefinition {
  return {
    protocol: "growi-campaign-v1",
    participants: [managerAddress, influencerAddress, judgeAddress, feeTreasuryAddress],
    weights: [0, 0, 100, 0], // Solo judge tiene peso (quorum 100)
    quorum: 100,
    challenge: 0,
    nonce: Date.now(),
    asset,
  };
}

/**
 * Service para manejar App Sessions
 */
export class AppSessionService {
  private rpcClient: YellowRpcClient;
  private testWallets: TestWallets;

  constructor(wsUrl: string, testWallets: TestWallets) {
    this.rpcClient = new YellowRpcClient(wsUrl);
    this.testWallets = testWallets;
  }

  /**
   * Crea una nueva App Session
   */
  async createSession(input: CreateSessionInput): Promise<AppSessionState> {
    await this.rpcClient.ensureConnected();

    const managerAddr = input.managerAddress as `0x${string}`;
    const influencerAddr = input.influencerAddress as `0x${string}`;
    const judgeAddr = this.testWallets.judge.address;
    const feeAddr = this.testWallets.feeTreasury.address;

    // Crear definición
    const definition = createGrowiAppDefinition(
      managerAddr,
      influencerAddr,
      judgeAddr,
      feeAddr
    );

    // Allocations iniciales
    const allocations: Allocation[] = [
      { participant: managerAddr, amount: input.budgetUsdc },
      { participant: influencerAddr, amount: "0" },
      { participant: judgeAddr, amount: "0" },
      { participant: feeAddr, amount: "0" },
    ];

    // TODO: Enviar create_app_session al clearnode
    // Por ahora, crear localmente
    const appSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const session: AppSessionState = {
      appSessionId,
      definition,
      version: 0,
      allocations,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    appSessionStore.save(session);

    console.log("[AppSession] Created:", appSessionId);
    return session;
  }

  /**
   * Aplica un payout (OPERATE intent)
   */
  async applyPayout(input: PayoutInput): Promise<AppSessionState> {
    const session = appSessionStore.get(input.appSessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    // Calcular fee
    const earned = BigInt(input.earnedUsdc);
    const fee = (earned * BigInt(input.feeBps)) / BigInt(10000);
    const total = earned + fee;

    // Validar que manager tenga suficiente balance
    const managerAlloc = session.allocations[GrowiRole.MANAGER];
    const managerBalance = BigInt(managerAlloc.amount);

    if (managerBalance < total) {
      throw new Error(
        `Insufficient manager balance: ${managerBalance} < ${total}`
      );
    }

    // Calcular nuevas allocations
    const newAllocations: Allocation[] = [
      {
        participant: session.allocations[GrowiRole.MANAGER].participant,
        amount: (managerBalance - total).toString(),
      },
      {
        participant: session.allocations[GrowiRole.INFLUENCER].participant,
        amount: (
          BigInt(session.allocations[GrowiRole.INFLUENCER].amount) + earned
        ).toString(),
      },
      {
        participant: session.allocations[GrowiRole.JUDGE].participant,
        amount: session.allocations[GrowiRole.JUDGE].amount,
      },
      {
        participant: session.allocations[GrowiRole.FEE_TREASURY].participant,
        amount: (
          BigInt(session.allocations[GrowiRole.FEE_TREASURY].amount) + fee
        ).toString(),
      },
    ];

    // Incrementar versión
    const newVersion = session.version + 1;

    // TODO: Enviar submit_app_state con intent OPERATE al clearnode
    // Por ahora, actualizar localmente
    appSessionStore.updateVersion(input.appSessionId, newVersion, newAllocations);

    console.log(
      `[AppSession] Payout applied: earned=${input.earnedUsdc}, fee=${fee}, newVersion=${newVersion}`
    );

    const updatedSession = appSessionStore.get(input.appSessionId)!;
    return updatedSession;
  }

  /**
   * Ejecuta un claim/withdraw (WITHDRAW intent)
   */
  async claim(input: ClaimInput): Promise<AppSessionState> {
    const session = appSessionStore.get(input.appSessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    const participantAddr = input.participant as `0x${string}`;
    const amount = BigInt(input.amountUsdc);

    // Encontrar al participante en allocations
    const participantIndex = session.allocations.findIndex(
      (a) => a.participant.toLowerCase() === participantAddr.toLowerCase()
    );

    if (participantIndex === -1) {
      throw new Error("Participant not found in session");
    }

    const participantAlloc = session.allocations[participantIndex];
    const currentBalance = BigInt(participantAlloc.amount);

    if (currentBalance < amount) {
      throw new Error(
        `Insufficient balance: ${currentBalance} < ${amount}`
      );
    }

    // Calcular nuevas allocations
    const newAllocations = session.allocations.map((alloc, index) => {
      if (index === participantIndex) {
        return {
          ...alloc,
          amount: (currentBalance - amount).toString(),
        };
      }
      return alloc;
    });

    // Incrementar versión
    const newVersion = session.version + 1;

    // TODO: Enviar submit_app_state con intent WITHDRAW al clearnode
    // Por ahora, actualizar localmente
    appSessionStore.updateVersion(input.appSessionId, newVersion, newAllocations);

    console.log(
      `[AppSession] Claim executed: participant=${participantAddr}, amount=${amount}, newVersion=${newVersion}`
    );

    const updatedSession = appSessionStore.get(input.appSessionId)!;
    return updatedSession;
  }

  /**
   * Obtiene una sesión por ID
   */
  getSession(appSessionId: string): AppSessionState | undefined {
    return appSessionStore.get(appSessionId);
  }

  /**
   * Lista todas las sesiones
   */
  listSessions(): AppSessionState[] {
    return appSessionStore.list();
  }

  /**
   * Consulta sesiones desde el clearnode
   */
  async getSessionsFromClearnode(): Promise<any> {
    await this.rpcClient.ensureConnected();

    // TODO: Implementar get_app_sessions RPC call
    return {
      sessions: appSessionStore.list(),
      note: "Currently using local store. ClearNode query pending.",
    };
  }
}

/**
 * Factory para crear el service con test wallets
 */
export function createAppSessionService(
  wsUrl: string,
  managerPk: `0x${string}`,
  influencerPk: `0x${string}`,
  judgePk: `0x${string}`,
  feePk: `0x${string}`
): AppSessionService {
  const testWallets: TestWallets = {
    manager: privateKeyToAccount(managerPk),
    influencer: privateKeyToAccount(influencerPk),
    judge: privateKeyToAccount(judgePk),
    feeTreasury: privateKeyToAccount(feePk),
  };

  return new AppSessionService(wsUrl, testWallets);
}

/**
 * Singleton del service
 */
let serviceInstance: AppSessionService | null = null;

export function getAppSessionService(): AppSessionService {
  if (!serviceInstance) {
    // Leer env vars
    const wsUrl =
      process.env.YELLOW_WS_URL || "wss://clearnet-sandbox.yellow.com/ws";
    const managerPk = process.env.YELLOW_MANAGER_PK as `0x${string}`;
    const influencerPk = process.env.YELLOW_INFLUENCER_PK as `0x${string}`;
    const judgePk = process.env.YELLOW_JUDGE_PK as `0x${string}`;
    const feePk = process.env.YELLOW_FEE_PK as `0x${string}`;

    if (!managerPk || !influencerPk || !judgePk || !feePk) {
      throw new Error(
        "Test wallets not configured. Set YELLOW_MANAGER_PK, YELLOW_INFLUENCER_PK, YELLOW_JUDGE_PK, YELLOW_FEE_PK in .env"
      );
    }

    serviceInstance = createAppSessionService(
      wsUrl,
      managerPk,
      influencerPk,
      judgePk,
      feePk
    );
  }

  return serviceInstance;
}
