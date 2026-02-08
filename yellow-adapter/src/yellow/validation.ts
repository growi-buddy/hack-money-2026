/**
 * Zod validation schemas
 */

import { z } from "zod";

/**
 * Ethereum address regex
 */
const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

/**
 * Hex string regex
 */
const hexStringRegex = /^0x[a-fA-F0-9]*$/;

/**
 * Prepare Close Input Schema
 */
export const PrepareCloseInputSchema = z.object({
  chainId: z.number().int().positive(),
  channelId: z.string().regex(hexStringRegex, "Invalid channelId (must be hex)"),
  wallet: z.string().regex(ethAddressRegex, "Invalid wallet address"),
});

export type PrepareCloseInput = z.infer<typeof PrepareCloseInputSchema>;

/**
 * Close Intent Input Schema
 */
export const CloseIntentInputSchema = z.object({
  chainId: z.number().int().positive(),
  channelId: z.string().regex(hexStringRegex, "Invalid channelId (must be hex)"),
  wallet: z.string().regex(ethAddressRegex, "Invalid wallet address"),
  userSig: z.string().regex(hexStringRegex, "Invalid signature (must be hex)"),
});

export type CloseIntentInput = z.infer<typeof CloseIntentInputSchema>;

/**
 * Create Channel Input Schema
 */
export const CreateChannelInputSchema = z.object({
  chainId: z.number().int().positive(),
  participants: z
    .array(z.string().regex(ethAddressRegex))
    .min(2, "At least 2 participants required"),
  challenge: z.number().int().min(0).default(0),
  nonce: z.number().int().positive().optional(),
  initialAllocations: z.array(
    z.object({
      destination: z.string().regex(ethAddressRegex),
      amount: z.string().regex(/^\d+$/, "Amount must be numeric string"),
    })
  ),
});

export type CreateChannelInput = z.infer<typeof CreateChannelInputSchema>;
