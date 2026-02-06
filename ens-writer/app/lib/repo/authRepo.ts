/**
 * Auth Repository (Server-Only)
 * 
 * Manejo de nonces y sesiones para autenticación con wallets.
 * Solo usar en backend (Route Handlers, Server Actions).
 */

import "server-only";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import type { AuthNonceRow, WalletSessionRow } from "./types";
import { randomBytes } from "crypto";

/**
 * Normaliza wallet address a lowercase
 */
function normalizeWallet(wallet: string): string {
  return wallet.toLowerCase();
}

/**
 * Genera un nonce aleatorio (hex string)
 */
function generateNonce(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Genera un session ID aleatorio (hex string)
 */
function generateSessionId(): string {
  return randomBytes(32).toString("hex");
}

// ============================================================================
// Nonces
// ============================================================================

/**
 * Crear un nuevo nonce para una wallet
 * 
 * El nonce expira en 5 minutos por defecto.
 * Devuelve el nonce generado.
 */
export async function createNonce(
  wallet: string,
  expiresInMinutes: number = 5
): Promise<string> {
  const normalizedWallet = normalizeWallet(wallet);
  const nonce = generateNonce();
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

  const { error } = await supabaseAdmin.from("auth_nonces").insert({
    wallet: normalizedWallet,
    nonce,
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    console.error("[authRepo] createNonce error:", error);
    throw new Error(`Failed to create nonce: ${error.message}`);
  }

  return nonce;
}

/**
 * Consumir (validar y eliminar) un nonce
 * 
 * Retorna true si el nonce es válido y no ha expirado.
 * Elimina el nonce después de validarlo.
 */
export async function consumeNonce(
  wallet: string,
  nonce: string
): Promise<boolean> {
  const normalizedWallet = normalizeWallet(wallet);

  // Buscar el nonce
  const { data, error } = await supabaseAdmin
    .from("auth_nonces")
    .select("*")
    .eq("wallet", normalizedWallet)
    .eq("nonce", nonce)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Nonce no encontrado
      return false;
    }
    console.error("[authRepo] consumeNonce select error:", error);
    throw new Error(`Failed to validate nonce: ${error.message}`);
  }

  const nonceRow = data as AuthNonceRow;

  // Validar expiración
  const now = new Date();
  const expiresAt = new Date(nonceRow.expires_at);
  if (now > expiresAt) {
    // Nonce expirado, eliminar
    await supabaseAdmin
      .from("auth_nonces")
      .delete()
      .eq("wallet", normalizedWallet)
      .eq("nonce", nonce);
    return false;
  }

  // Valid nonce, delete it to make it single-use
  const { error: deleteError } = await supabaseAdmin
    .from("auth_nonces")
    .delete()
    .eq("wallet", normalizedWallet)
    .eq("nonce", nonce);

  if (deleteError) {
    console.error("[authRepo] consumeNonce delete error:", deleteError);
    throw new Error(`Failed to consume nonce: ${deleteError.message}`);
  }

  return true;
}

/**
 * Limpiar nonces expirados
 * 
 * Útil para ejecutar periódicamente (ej: cron job).
 */
export async function cleanupExpiredNonces(): Promise<number> {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("auth_nonces")
    .delete()
    .lt("expires_at", now)
    .select();

  if (error) {
    console.error("[authRepo] cleanupExpiredNonces error:", error);
    throw new Error(`Failed to cleanup nonces: ${error.message}`);
  }

  return data?.length || 0;
}

// ============================================================================
// Sessions
// ============================================================================

/**
 * Crear una nueva sesión para una wallet
 * 
 * La sesión expira en 7 días por defecto.
 * Devuelve el session_id generado.
 */
export async function createSession(
  wallet: string,
  expiresInDays: number = 7
): Promise<string> {
  const normalizedWallet = normalizeWallet(wallet);
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

  const { error } = await supabaseAdmin.from("wallet_sessions").insert({
    session_id: sessionId,
    wallet: normalizedWallet,
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    console.error("[authRepo] createSession error:", error);
    throw new Error(`Failed to create session: ${error.message}`);
  }

  return sessionId;
}

/**
 * Obtener sesión por session_id
 * 
 * Retorna null si la sesión no existe o ha expirado.
 */
export async function getSession(
  sessionId: string
): Promise<WalletSessionRow | null> {
  const { data, error } = await supabaseAdmin
    .from("wallet_sessions")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Session not found
      return null;
    }
    console.error("[authRepo] getSession error:", error);
    throw new Error(`Failed to get session: ${error.message}`);
  }

  const session = data as WalletSessionRow;

  // Validar expiración
  const now = new Date();
  const expiresAt = new Date(session.expires_at);
  if (now > expiresAt) {
    // Sesión expirada, eliminar
    await destroySession(sessionId);
    return null;
  }

  return session;
}

/**
 * Validar que una sesión existe y es válida
 * 
 * Retorna la wallet si es válida, null si no.
 */
export async function validateSession(
  sessionId: string
): Promise<string | null> {
  const session = await getSession(sessionId);
  return session ? session.wallet : null;
}

/**
 * Destruir (eliminar) una sesión
 */
export async function destroySession(sessionId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("wallet_sessions")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    console.error("[authRepo] destroySession error:", error);
    throw new Error(`Failed to destroy session: ${error.message}`);
  }
}

/**
 * Destruir todas las sesiones de una wallet
 */
export async function destroyAllSessionsForWallet(wallet: string): Promise<number> {
  const normalizedWallet = normalizeWallet(wallet);

  const { data, error } = await supabaseAdmin
    .from("wallet_sessions")
    .delete()
    .eq("wallet", normalizedWallet)
    .select();

  if (error) {
    console.error("[authRepo] destroyAllSessionsForWallet error:", error);
    throw new Error(`Failed to destroy sessions: ${error.message}`);
  }

  return data?.length || 0;
}

/**
 * Limpiar sesiones expiradas
 * 
 * Útil para ejecutar periódicamente (ej: cron job).
 */
export async function cleanupExpiredSessions(): Promise<number> {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("wallet_sessions")
    .delete()
    .lt("expires_at", now)
    .select();

  if (error) {
    console.error("[authRepo] cleanupExpiredSessions error:", error);
    throw new Error(`Failed to cleanup sessions: ${error.message}`);
  }

  return data?.length || 0;
}
