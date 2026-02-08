/**
 * Constantes del servicio yellow-adapter
 */

export const SERVICE_NAME = "yellow-adapter";
export const VERSION = "0.1.0";
export const startedAt = new Date();

/**
 * Calcula el uptime del servicio en segundos
 */
export function getUptimeSeconds(): number {
  return Math.floor((Date.now() - startedAt.getTime()) / 1000);
}
