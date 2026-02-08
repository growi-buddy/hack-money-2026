/**
 * Schemas y tipos para Sessions
 */

import { z } from "zod";

/**
 * Estados de una sesión
 */
export const SessionStatus = z.enum(["CREATED", "FUNDED", "ACTIVE", "ENDED"]);

export type SessionStatus = z.infer<typeof SessionStatus>;

/**
 * Schema para Session
 */
export const SessionSchema = z.object({
  sessionId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, "Invalid UUID"),
  campaignId: z.string(),
  chainId: z.number().int().positive(),
  managerAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  influencerAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  status: SessionStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;

/**
 * Schema para crear una sesión
 */
export const CreateSessionSchema = z.object({
  campaignId: z.string().min(1),
  chainId: z.number().int().positive(),
  managerAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  influencerAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;

/**
 * Schema para funding intents
 */
export const FundingIntentsSchema = z.object({
  amount: z.string().regex(/^\d+$/, "Amount must be numeric string"),
});

export type FundingIntentsInput = z.infer<typeof FundingIntentsSchema>;

/**
 * Schema para operate
 */
export const OperateSchema = z.object({
  eventId: z.string().min(1),
  deltaToInfluencer: z
    .string()
    .regex(/^\d+$/, "Delta must be numeric string"),
  memo: z.string().optional(),
});

export type OperateInput = z.infer<typeof OperateSchema>;

/**
 * Schema para withdraw
 */
export const WithdrawSchema = z.object({
  amount: z.string().regex(/^\d+$/, "Amount must be numeric string"),
  toAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address")
    .optional(),
});

export type WithdrawInput = z.infer<typeof WithdrawSchema>;

/**
 * Schema para end session
 */
export const EndSessionSchema = z.object({
  reason: z.enum(["time", "budget", "manual"]),
});

export type EndSessionInput = z.infer<typeof EndSessionSchema>;
