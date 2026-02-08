/**
 * In-memory store para sessions, bundles y tx records
 */

import { randomUUID } from "crypto";
import type { Session, CreateSessionInput } from "../contracts/session";
import type { IntentBundle } from "../contracts/intent";
import type { TxRecord } from "../contracts/tx";

/**
 * Store global en memoria
 */
class MemoryStore {
  private sessions: Map<string, Session> = new Map();
  private bundles: Map<string, IntentBundle> = new Map();
  private txRecords: Map<string, TxRecord> = new Map();

  /**
   * Crea una nueva sesión
   */
  createSession(input: CreateSessionInput): Session {
    const now = new Date().toISOString();
    const session: Session = {
      sessionId: randomUUID(),
      campaignId: input.campaignId,
      chainId: input.chainId,
      managerAddress: input.managerAddress,
      influencerAddress: input.influencerAddress,
      status: "CREATED",
      createdAt: now,
      updatedAt: now,
    };

    this.sessions.set(session.sessionId, session);
    return session;
  }

  /**
   * Obtiene una sesión por ID
   */
  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Actualiza una sesión existente
   */
  updateSession(sessionId: string, updates: Partial<Session>): Session | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return undefined;
    }

    const updated: Session = {
      ...session,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.sessions.set(sessionId, updated);
    return updated;
  }

  /**
   * Guarda un bundle
   */
  saveBundle(bundle: IntentBundle): void {
    this.bundles.set(bundle.bundleId, bundle);
  }

  /**
   * Obtiene un bundle por ID
   */
  getBundle(bundleId: string): IntentBundle | undefined {
    return this.bundles.get(bundleId);
  }

  /**
   * Lista bundles de una sesión
   */
  listBundlesBySession(sessionId: string): IntentBundle[] {
    return Array.from(this.bundles.values()).filter(
      (bundle) => bundle.sessionId === sessionId
    );
  }

  /**
   * Confirma una transacción
   */
  confirmTx(record: TxRecord): void {
    this.txRecords.set(record.intentId, record);
  }

  /**
   * Obtiene un record de transacción
   */
  getTxRecord(intentId: string): TxRecord | undefined {
    return this.txRecords.get(intentId);
  }

  /**
   * Lista todos los records de tx
   */
  listAllTxRecords(): TxRecord[] {
    return Array.from(this.txRecords.values());
  }

  /**
   * Obtiene estadísticas de una sesión
   */
  getSessionStats(sessionId: string): {
    bundlesCount: number;
    txRecordsCount: number;
    recentTxRecords: TxRecord[];
  } {
    const bundles = this.listBundlesBySession(sessionId);
    const allTxRecords = this.listAllTxRecords();
    
    // Filtrar tx records que pertenecen a bundles de esta sesión
    const intentIds = new Set(
      bundles.flatMap((b) => b.intents.map((i) => i.id))
    );
    const sessionTxRecords = allTxRecords.filter((tx) =>
      intentIds.has(tx.intentId)
    );

    // Ordenar por fecha descendente y tomar los últimos 10
    const recentTxRecords = sessionTxRecords
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 10);

    return {
      bundlesCount: bundles.length,
      txRecordsCount: sessionTxRecords.length,
      recentTxRecords,
    };
  }
}

/**
 * Singleton del store
 */
export const store = new MemoryStore();
