/**
 * Schemas y tipos para Transaction Records
 */

import { z } from "zod";

/**
 * Estados de una transacción
 */
export const TxStatus = z.enum(["SUBMITTED", "CONFIRMED", "FAILED"]);

export type TxStatus = z.infer<typeof TxStatus>;

/**
 * Schema para TxRecord
 */
export const TxRecordSchema = z.object({
  intentId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, "Invalid UUID"),
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, "Invalid transaction hash"),
  status: TxStatus,
  createdAt: z.string(),
});

export type TxRecord = z.infer<typeof TxRecordSchema>;

/**
 * Schema para confirmar una transacción
 */
export const ConfirmTxSchema = z.object({
  intentId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, "Invalid UUID"),
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, "Invalid transaction hash"),
  status: TxStatus,
});

export type ConfirmTxInput = z.infer<typeof ConfirmTxSchema>;
