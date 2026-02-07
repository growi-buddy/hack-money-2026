import { getAblyRoomId } from '@/helpers';
import { prisma } from '@/lib/db';
import * as Ably from 'ably';
import { NextResponse } from 'next/server';

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

export async function GET(req: Request) {
  try {
    // Verify CRON secret
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      );
    }
    
    if (!process.env.ABLY_API_KEY) {
      throw new Error('ABLY_API_KEY is not configured');
    }
    
    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    
    // Find rooms with activity in the last 2 days
    const twoDaysAgo = new Date(Date.now() - TWO_DAYS_MS);
    
    const activeRooms = await prisma.chatRoom.findMany({
      where: {
        lastActivityAt: { gte: twoDaysAgo },
      },
      select: {
        id: true,
        userOne: { select: { id: true, walletAddress: true } },
        userTwo: { select: { id: true, walletAddress: true } },
      },
    });
    
    let totalSynced = 0;
    let totalRooms = 0;
    const errors: string[] = [];
    
    for (const room of activeRooms) {
      const ablyRoomId = getAblyRoomId(room.userOne.id, room.userTwo.id);
      try {
        const channelName = `${ablyRoomId}::$chat::$chatMessages`;
        const channel = ably.channels.get(channelName);
        
        const historyPage = await channel.history({
          start: twoDaysAgo.getTime(),
          end: Date.now(),
          limit: 100,
          direction: 'forwards',
        });
        
        let messagesInRoom = 0;
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let currentPage: any = historyPage;
        while (true) {
          const messages = currentPage.items as Ably.Message[];
          for (const msg of messages) {
            // Ably Chat message data structure
            const data = msg.data as { text?: string } | undefined;
            const text = data?.text;
            if (!text || !msg.clientId) continue;
            
            const serial = msg.id || `${msg.timestamp}-${msg.clientId}`;
            
            // Find sender by wallet address (clientId = wallet address)
            const sender =
              room.userOne.walletAddress === msg.clientId
                ? room.userOne
                : room.userTwo.walletAddress === msg.clientId
                  ? room.userTwo
                  : null;
            
            if (!sender) continue;
            
            // Upsert message (skip if already exists by ablySerial)
            try {
              await prisma.chatMessage.upsert({
                where: { ablySerial: serial },
                update: {},
                create: {
                  chatRoomId: room.id,
                  senderId: sender.id,
                  text,
                  ablySerial: serial,
                  createdAt: msg.timestamp ? new Date(msg.timestamp) : new Date(),
                },
              });
              messagesInRoom++;
            } catch {
              // Skip duplicate serial errors
            }
          }
          
          // Check for more pages
          if (currentPage.hasNext()) {
            currentPage = await currentPage.next();
          } else {
            break;
          }
        }
        
        if (messagesInRoom > 0) {
          // Update lastActivityAt
          await prisma.chatRoom.update({
            where: { id: room.id },
            data: { lastActivityAt: new Date() },
          });
          totalSynced += messagesInRoom;
          totalRooms++;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        errors.push(`Room ${ablyRoomId}: ${message}`);
        console.error(`[CRON] Failed to sync room ${ablyRoomId}:`, err);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        roomsChecked: activeRooms.length,
        roomsSynced: totalRooms,
        messagesSynced: totalSynced,
        errors: errors.length > 0 ? errors : undefined,
        syncedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[CRON] Sync failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      },
      { status: 500 },
    );
  }
}
