/**
 * App Session Service
 * Maneja creación de App Sessions con Yellow Network
 */

import { PrivateKeyAccount } from 'viem';
import { createAppSessionMessage, MessageSigner } from '@erc7824/nitrolite';
import WebSocket from 'ws';
import { authenticateWithYellow } from './auth';
import { appSessionStore } from './store';
import { 
  CreateSessionInput,
  PayoutInput, 
  ClaimInput, 
  AppSessionState,
  AppDefinition,
  GrowiRole,
  Allocation 
} from './types';

export interface CreateSessionOutput {
  appSessionId: string;
  definition: AppDefinition;
  allocations: Allocation[];
}

// Re-exportar tipos para uso externo
export type { AppDefinition, Allocation, AppSessionState };

/**
 * Servicio para App Sessions
 */
export class AppSessionService {
  private ws: WebSocket | null = null;
  private judgeAccount: PrivateKeyAccount;
  private clearNodeUrl: string;
  private messageHandlers = new Map<number | string, (response: unknown) => void>();
  private isAuthenticated = false;
  private sessionKey: PrivateKeyAccount | null = null;

  constructor(clearNodeUrl: string, judgeAccount: PrivateKeyAccount) {
    this.clearNodeUrl = clearNodeUrl;
    this.judgeAccount = judgeAccount;
    
    console.log('[AppSession] Service created');
    console.log('[AppSession] Judge address:', judgeAccount.address);
    console.log('[AppSession] Clearnode URL:', clearNodeUrl);
  }

  /**
   * Conectar WebSocket y autenticar
   */
  private async connect(): Promise<void> {
    if (this.ws && this.ws.readyState === WebSocket.OPEN && this.isAuthenticated) {
      console.log('[AppSession] Already connected');
      return;
    }

    console.log('[AppSession] 🔌 Connecting...');

    await new Promise<void>((resolve, reject) => {
      this.ws = new WebSocket(this.clearNodeUrl);

      this.ws.on('open', () => {
        console.log('[AppSession] ✅ Connected');
        resolve();
      });

      this.ws.on('message', (data) => {
        this.handleMessage(data.toString());
      });

      this.ws.on('error', (error) => {
        console.error('[AppSession] ❌ Error:', error);
        reject(error);
      });

      this.ws.on('close', () => {
        console.log('[AppSession] Closed');
        this.isAuthenticated = false;
      });
    });

    // Autenticar (retorna el judgeAccount autenticado)
    if (!this.ws) {
      throw new Error('WebSocket not initialized');
    }
    this.sessionKey = await authenticateWithYellow(this.ws, this.judgeAccount, this.messageHandlers);
    this.isAuthenticated = true;
  }

  /**
   * Manejar mensajes entrantes
   */
  private handleMessage(data: string): void {
    try {
      const message = JSON.parse(data); 
      console.log('[AppSession] 📨 Message:', JSON.stringify(message, null, 2).substring(0, 200) + '...');

      // Extraer ID - 0 es válido para broadcasts
      let messageId: string | number | undefined;
      
      if (message.res && Array.isArray(message.res)) {
        messageId = message.res[0];
      } else if (message.req && Array.isArray(message.req)) {
        messageId = message.req[0];
      }
      
      const normalizedId = typeof messageId === 'string' ? parseInt(messageId, 10) : messageId;
      
      if (normalizedId !== undefined && !isNaN(normalizedId as number) && this.messageHandlers.has(normalizedId)) {
        const handler = this.messageHandlers.get(normalizedId);
        this.messageHandlers.delete(normalizedId);
        handler?.(message);
      }
    } catch (error) {
      console.error('[AppSession] ❌ Parse error:', error);
    }
  }

  /**
   * Enviar mensaje y esperar respuesta
   */
  private async sendMessage(message: string, timeoutMs = 30000): Promise<{
    res?: [number | string, string, { app_session_id?: string; error?: string }, number];
  }> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN || !this.isAuthenticated) {
      throw new Error('Not connected or not authenticated');
    }

    const parsedMessage = JSON.parse(message);
    const messageId = parsedMessage.req?.[0];

    if (!messageId) {
      throw new Error('Message has no ID');
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.messageHandlers.delete(messageId);
        reject(new Error(`Timeout (ID: ${messageId})`));
      }, timeoutMs);

      this.messageHandlers.set(messageId, (response: unknown) => {
        clearTimeout(timeout);
        const res = response as { res?: [number | string, string, { app_session_id?: string; error?: string }, number] };
        
        if (res.res?.[1] === 'error') {
          const errorDetail = res.res[2];
          reject(new Error(errorDetail?.error || JSON.stringify(errorDetail)));
        } else {
          resolve(res);
        }
      });

      this.ws!.send(message);
    });
  }

  /**
   * Crear App Session
   */
  async createSession(input: CreateSessionInput): Promise<CreateSessionOutput> {
    const { managerAddress, influencerAddress, budgetUsdc } = input;
    
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { validateOffChainConfig } = require('@/src/lib/config/env');
    const config = validateOffChainConfig();

    console.log('[AppSession] Creating session...');
    console.log('[AppSession] Manager:', managerAddress);
    console.log('[AppSession] Influencer:', influencerAddress);
    console.log('[AppSession] Budget:', budgetUsdc);

    const definition: AppDefinition = {
      protocol: 'NitroRPC/0.4',
      participants: [
        managerAddress as `0x${string}`, 
        influencerAddress as `0x${string}`, 
        this.judgeAccount.address, 
        config.YELLOW_FEE_ADDRESS as `0x${string}`
      ],
      weights: [0, 0, 100, 0],
      quorum: 100,
      challenge: 0,
      nonce: Date.now(),
    };

    const allocations: Allocation[] = [
      { participant: managerAddress as `0x${string}`, asset: 'ytest.usd', amount: budgetUsdc },
      { participant: influencerAddress as `0x${string}`, asset: 'ytest.usd', amount: '0' },
      { participant: this.judgeAccount.address, asset: 'ytest.usd', amount: '0' },
      { participant: config.YELLOW_FEE_ADDRESS as `0x${string}`, asset: 'ytest.usd', amount: '0' },
    ];

    try {
      // Conectar y autenticar
      await this.connect();
      
      if (!this.sessionKey) {
        throw new Error('Authentication failed - no signing key');
      }

      // Message signer con el wallet autenticado
      const signingWallet = this.sessionKey;
      const messageSigner: MessageSigner = async (payload) => {
        const payloadString = JSON.stringify(payload);
        return await signingWallet.signMessage({ message: payloadString });
      };

      // Crear mensaje con SDK (v0.4.0 espera un objeto, no un array)
      const sessionMessage = await createAppSessionMessage(
        messageSigner,
        { definition, allocations } as any // eslint-disable-line @typescript-eslint/no-explicit-any
      );

      // Enviar a Clearnode
      const response = await this.sendMessage(sessionMessage, 60000);

      // Extraer app_session_id
      const appSessionId = response.res?.[2]?.app_session_id;

      if (!appSessionId) {
        throw new Error('No app_session_id in response');
      }

      console.log('[AppSession] ✅ Created:', appSessionId);

      // Guardar en store
      const sessionState: AppSessionState = {
        appSessionId,
        definition,
        version: 0,
        allocations,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      appSessionStore.save(sessionState);

      return { appSessionId, definition, allocations };
    } catch (error) {
      const err = error as Error;
      console.error('[AppSession] ❌ Failed:', err.message);
      throw new Error(`Failed to create App Session: ${err.message}`);
    }
  }

  /**
   * Aplicar payout (OPERATE intent)
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

    // Validar balance del manager
    const managerAlloc = session.allocations[GrowiRole.MANAGER];
    const managerBalance = BigInt(managerAlloc.amount);

    if (managerBalance < total) {
      throw new Error(`Insufficient manager balance: ${managerBalance} < ${total}`);
    }

    // Calcular nuevas allocations
    const newAllocations: Allocation[] = [
      {
        participant: session.allocations[GrowiRole.MANAGER].participant,
        asset: session.allocations[GrowiRole.MANAGER].asset,
        amount: (managerBalance - total).toString(),
      },
      {
        participant: session.allocations[GrowiRole.INFLUENCER].participant,
        asset: session.allocations[GrowiRole.INFLUENCER].asset,
        amount: (BigInt(session.allocations[GrowiRole.INFLUENCER].amount) + earned).toString(),
      },
      {
        participant: session.allocations[GrowiRole.JUDGE].participant,
        asset: session.allocations[GrowiRole.JUDGE].asset,
        amount: session.allocations[GrowiRole.JUDGE].amount,
      },
      {
        participant: session.allocations[GrowiRole.FEE_TREASURY].participant,
        asset: session.allocations[GrowiRole.FEE_TREASURY].asset,
        amount: (BigInt(session.allocations[GrowiRole.FEE_TREASURY].amount) + fee).toString(),
      },
    ];

    const newVersion = session.version + 1;

    // TODO: Enviar submit_app_state con intent OPERATE al clearnode
    appSessionStore.updateVersion(input.appSessionId, newVersion, newAllocations);

    console.log(`[AppSession] Payout applied: earned=${input.earnedUsdc}, fee=${fee}, newVersion=${newVersion}`);

    return appSessionStore.get(input.appSessionId)!;
  }

  /**
   * Ejecutar claim (WITHDRAW intent)
   */
  async claim(input: ClaimInput): Promise<AppSessionState> {
    const session = appSessionStore.get(input.appSessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    const participantAddr = input.participant as `0x${string}`;
    const amount = BigInt(input.amountUsdc);

    // Encontrar participante
    const participantIndex = session.allocations.findIndex(
      (a) => a.participant.toLowerCase() === participantAddr.toLowerCase()
    );

    if (participantIndex === -1) {
      throw new Error("Participant not found in session");
    }

    const participantAlloc = session.allocations[participantIndex];
    const currentBalance = BigInt(participantAlloc.amount);

    if (currentBalance < amount) {
      throw new Error(`Insufficient balance: ${currentBalance} < ${amount}`);
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

    const newVersion = session.version + 1;

    // TODO: Enviar submit_app_state con intent WITHDRAW al clearnode
    appSessionStore.updateVersion(input.appSessionId, newVersion, newAllocations);

    console.log(`[AppSession] Claim executed: amount=${input.amountUsdc}, participant=${input.participant}, newVersion=${newVersion}`);

    return appSessionStore.get(input.appSessionId)!;
  }

  /**
   * Obtener sesión por ID
   */
  getSession(appSessionId: string): AppSessionState | undefined {
    return appSessionStore.get(appSessionId);
  }

  /**
   * Listar todas las sesiones
   */
  listSessions(): AppSessionState[] {
    return appSessionStore.list();
  }

  /**
   * Desconectar
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.messageHandlers.clear();
      this.isAuthenticated = false;
      this.sessionKey = null;
    }
  }
}

/**
 * Singleton
 */
let instance: AppSessionService | null = null;

export function getAppSessionService(): AppSessionService {
  if (!instance) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { validateOffChainConfig } = require('@/src/lib/config/env');
    const config = validateOffChainConfig();

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { privateKeyToAccount } = require('viem/accounts');
    const judgeAccount = privateKeyToAccount(config.YELLOW_JUDGE_PK);

    instance = new AppSessionService(config.YELLOW_WS_URL, judgeAccount);
  }

  return instance;
}
