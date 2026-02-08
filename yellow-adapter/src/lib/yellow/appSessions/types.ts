/**
 * Tipos y schemas para App Sessions
 */

import { z } from "zod";

/**
 * Participante en una sesión
 */
export interface Participant {
  address: `0x${string}`;
  weight: number;
}

/**
 * Definición de App Session
 */
export interface AppDefinition {
  protocol: string;
  participants: `0x${string}`[];
  weights: number[];
  quorum: number;
  challenge: number;
  nonce: number;
}

/**
 * Allocation de fondos por participante
 */
export interface Allocation {
  participant: `0x${string}`;
  asset: string; // ej: 'ytest.usd'
  amount: string; // En unidades mínimas (ej: 6 decimales para USDC)
}

/**
 * Estado de una App Session
 */
export interface AppSessionState {
  appSessionId: string;
  definition: AppDefinition;
  version: number;
  allocations: Allocation[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Roles en Growi sessions
 */
export enum GrowiRole {
  MANAGER = 0,
  INFLUENCER = 1,
  JUDGE = 2,
  FEE_TREASURY = 3,
}

/**
 * Schema para crear sesión
 */
export const CreateSessionSchema = z.object({
  budgetUsdc: z.string().regex(/^\d+$/, "Budget must be numeric string"),
  managerAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid manager address"),
  influencerAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid influencer address"),
});

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;

/**
 * Schema para payout
 */
export const PayoutSchema = z.object({
  appSessionId: z.string().min(1),
  earnedUsdc: z
    .string()
    .regex(/^\d+$/, "Earned must be numeric string")
    .refine((val) => BigInt(val) > BigInt(0), "Earned must be greater than 0"),
  feeBps: z
    .number()
    .int()
    .min(0, "Fee BPS must be >= 0")
    .max(2000, "Fee BPS must be <= 2000"),
});

export type PayoutInput = z.infer<typeof PayoutSchema>;

/**
 * Schema para claim
 */
export const ClaimSchema = z.object({
  appSessionId: z.string().min(1),
  participant: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid participant address"),
  amountUsdc: z
    .string()
    .regex(/^\d+$/, "Amount must be numeric string")
    .refine((val) => BigInt(val) > BigInt(0), "Amount must be greater than 0"),
});

export type ClaimInput = z.infer<typeof ClaimSchema>;
