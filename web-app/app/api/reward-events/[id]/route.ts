import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse, ApiErrorResponse, RewardEventDTO, SelectorSchema } from '@/types';
import { EventType } from '@/lib/db/prisma/generated';
import { z } from 'zod';

const UpdateRewardEventSchema = z.object({
  walletAddress: z.string(),
  name: z.string().min(1, 'Name is required').optional(),
  eventType: z.nativeEnum(EventType).optional(),
  selectors: z.array(SelectorSchema).optional(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return safeRoute(async () => {
    const { id } = await params;

    const rewardEvent = await prisma.rewardEvent.findUnique({
      where: { id },
      include: { selectors: true },
    });

    if (!rewardEvent) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Reward event not found' },
      };
      return { response, status: 404 };
    }

    const response: ApiDataResponse<RewardEventDTO> = {
      success: true,
      data: {
        id: rewardEvent.id,
        name: rewardEvent.name,
        eventType: rewardEvent.eventType,
        selectors: rewardEvent.selectors.map(sel => ({
          id: sel.id,
          selector: sel.selector,
          eventType: sel.eventType,
          isActive: sel.isActive,
        })),
      },
    };
    return { response };
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return safeRoute(async () => {
    const { id } = await params;
    const body = await req.json();

    const validatedData = UpdateRewardEventSchema.parse(body);
    const { walletAddress, name, eventType, selectors } = validatedData;

    const user = await getOrCreateUserByWallet(walletAddress);

    // Check if reward event exists and belongs to user
    const existingEvent = await prisma.rewardEvent.findUnique({
      where: { id },
      include: { selectors: true },
    });

    if (!existingEvent) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Reward event not found' },
      };
      return { response, status: 404 };
    }

    if (existingEvent.ownerId !== user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'FORBIDDEN', message: 'You do not have permission to edit this reward event' },
      };
      return { response, status: 403 };
    }

    // Update reward event and selectors in a transaction
    const updatedEvent = await prisma.$transaction(async (tx) => {
      // Update the reward event basic fields
      const updated = await tx.rewardEvent.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(eventType && { eventType }),
        },
      });

      // If selectors are provided, update them
      if (selectors !== undefined) {
        // Delete existing selectors
        await tx.selector.deleteMany({
          where: { rewardEventId: id },
        });

        // Create new selectors
        if (selectors.length > 0) {
          await tx.selector.createMany({
            data: selectors.map(sel => ({
              rewardEventId: id,
              selector: sel.selector,
              eventType: sel.eventType,
              isActive: sel.isActive ?? true,
            })),
          });
        }
      }

      // Fetch the updated event with selectors
      return tx.rewardEvent.findUnique({
        where: { id },
        include: { selectors: true },
      });
    });

    if (!updatedEvent) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to update reward event' },
      };
      return { response, status: 500 };
    }

    const response: ApiDataResponse<RewardEventDTO> = {
      success: true,
      data: {
        id: updatedEvent.id,
        name: updatedEvent.name,
        eventType: updatedEvent.eventType,
        selectors: updatedEvent.selectors.map(sel => ({
          id: sel.id,
          selector: sel.selector,
          eventType: sel.eventType,
          isActive: sel.isActive,
        })),
      },
    };
    return { response };
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return safeRoute(async () => {
    const { id } = await params;
    const { searchParams } = new URL(req.url);

    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'walletAddress is required' },
      };
      return { response, status: 400 };
    }

    const user = await getOrCreateUserByWallet(walletAddress);

    // Check if reward event exists and belongs to user
    const existingEvent = await prisma.rewardEvent.findUnique({
      where: { id },
      include: { campaigns: true },
    });

    if (!existingEvent) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Reward event not found' },
      };
      return { response, status: 404 };
    }

    if (existingEvent.ownerId !== user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'FORBIDDEN', message: 'You do not have permission to delete this reward event' },
      };
      return { response, status: 403 };
    }

    // Check if reward event is used in any campaigns
    if (existingEvent.campaigns.length > 0) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'CONFLICT',
          message: `Cannot delete: This reward event is used in ${existingEvent.campaigns.length} campaign(s)`
        },
      };
      return { response, status: 409 };
    }

    // Delete selectors and reward event in transaction
    await prisma.$transaction(async (tx) => {
      await tx.selector.deleteMany({
        where: { rewardEventId: id },
      });
      await tx.rewardEvent.delete({
        where: { id },
      });
    });

    const response: ApiDataResponse<{ deleted: boolean }> = {
      success: true,
      data: { deleted: true },
    };
    return { response };
  });
}
