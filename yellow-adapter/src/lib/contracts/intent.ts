/**
 * Schemas y tipos para Transaction Intents
 */

import { z } from "zod";

/**
 * Tipos de intents soportados
 */
export const IntentKind = z.enum([
  "ERC20_APPROVE",
  "YELLOW_DEPOSIT",
  "YELLOW_CLOSE",
  "YELLOW_WITHDRAW",
  "UNKNOWN",
]);

export type IntentKind = z.infer<typeof IntentKind>;

/**
 * Schema para TransactionIntent
 */
export const TransactionIntentSchema = z.object({
  id: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, "Invalid UUID"),
  kind: IntentKind,
  chainId: z.number().int().positive(),
  to: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  data: z.string().regex(/^0x([a-fA-F0-9]{2})*$/, "Invalid hex data"),
  value: z.string().regex(/^\d+$/, "Value must be numeric string").default("0"),
  meta: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      dangerous: z.boolean().optional(),
    })
    .optional(),
  createdAt: z.string(),
});

export type TransactionIntent = z.infer<typeof TransactionIntentSchema>;

/**
 * Tipos de acciones para bundles
 */
export const BundleAction = z.enum([
  "FUNDING",
  "CLAIM",
  "OPERATE",
  "WITHDRAW",
  "END",
]);

export type BundleAction = z.infer<typeof BundleAction>;

/**
 * Schema para IntentBundle
 */
export const IntentBundleSchema = z.object({
  bundleId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, "Invalid UUID"),
  action: BundleAction,
  sessionId: z.string(),
  intents: z.array(TransactionIntentSchema),
  summary: z.object({
    title: z.string(),
    steps: z.array(z.string()),
  }),
  warnings: z.array(z.string()).default([]),
  createdAt: z.string(),
});

export type IntentBundle = z.infer<typeof IntentBundleSchema>;
