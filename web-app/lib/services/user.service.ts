import { prisma } from '@/lib/db';
import { PrismaClient } from '@/lib/db/prisma/generated';

type PrismaTransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

/**
 * Get user by wallet address, or create if not exists
 * @param walletAddress - The wallet address to look up
 * @param tx - Optional transaction client for use within transactions
 */
export async function getOrCreateUserByWallet(
  walletAddress: string,
  tx?: PrismaTransactionClient
) {
  const client = tx || prisma;
  return client.user.upsert({
    where: { walletAddress },
    update: {},
    create: { walletAddress },
  });
}

/**
 * Get user by wallet address (returns null if not found)
 * @param walletAddress - The wallet address to look up
 * @param tx - Optional transaction client for use within transactions
 */
export async function getUserByWallet(
  walletAddress: string,
  tx?: PrismaTransactionClient
) {
  const client = tx || prisma;
  return client.user.findUnique({
    where: { walletAddress },
  });
}

/**
 * Get user by ID
 * @param id - The user ID
 * @param tx - Optional transaction client for use within transactions
 */
export async function getUserById(
  id: string,
  tx?: PrismaTransactionClient
) {
  const client = tx || prisma;
  return client.user.findUnique({
    where: { id },
  });
}