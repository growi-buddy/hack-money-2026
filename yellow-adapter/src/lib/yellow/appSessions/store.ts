/**
 * In-memory store para App Sessions
 * 
 * Usa globalThis para persistir entre HMR en desarrollo
 */

import type { AppSessionState } from "./types";

class AppSessionStore {
  private sessions: Map<string, AppSessionState>;

  constructor() {
    // Usar globalThis para persistir entre HMR en desarrollo
    if (!(globalThis as any).__appSessionStore__) {
      (globalThis as any).__appSessionStore__ = new Map<string, AppSessionState>();
      console.log("[Store] Initialized new global store");
    }
    this.sessions = (globalThis as any).__appSessionStore__;
  }

  save(session: AppSessionState): void {
    this.sessions.set(session.appSessionId, session);
    console.log(`[Store] Saved session ${session.appSessionId}. Total sessions: ${this.sessions.size}`);
  }

  get(appSessionId: string): AppSessionState | undefined {
    console.log(`[Store] Getting session ${appSessionId}. Total sessions: ${this.sessions.size}`);
    return this.sessions.get(appSessionId);
  }

  list(): AppSessionState[] {
    return Array.from(this.sessions.values());
  }

  updateVersion(appSessionId: string, newVersion: number, newAllocations: any[]): void {
    const session = this.sessions.get(appSessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    session.version = newVersion;
    session.allocations = newAllocations;
    session.updatedAt = new Date().toISOString();
    
    this.sessions.set(appSessionId, session);
  }
}

export const appSessionStore = new AppSessionStore();
