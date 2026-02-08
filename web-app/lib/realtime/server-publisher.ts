import { SiteEventType } from '@/lib/db/enums';
import * as Ably from 'ably';

const getAblyClient = () => {
  if (!process.env.ABLY_API_KEY) {
    throw new Error('ABLY_API_KEY is not configured');
  }
  return new Ably.Rest({ key: process.env.ABLY_API_KEY });
};

export class ServerPublisher {
  static async publish<T = unknown>(
    channelName: string,
    event: string,
    data: T,
  ): Promise<void> {
    try {
      const ably = getAblyClient();
      const channel = ably.channels.get(channelName);
      await channel.publish(event, data);
      console.log(`[ServerPublisher] Published to ${channelName}:${event}`);
    } catch (error) {
      console.error('[ServerPublisher] Failed to publish:', error);
      throw error;
    }
  }
  
  static async publishCampaignEvent(
    campaignId: string,
    event: string,
    data: unknown,
  ): Promise<void> {
    await this.publish(`campaign:${campaignId}`, event, data);
  }
  
  static async publishParticipationEvent(
    participationId: string,
    event: string,
    data: unknown,
  ): Promise<void> {
    await this.publish(`participation:${participationId}`, event, data);
  }
  
  static async publishAnalyticsEvent(
    campaignId: string,
    eventType: SiteEventType,
    data: {
      participationId: string;
      amount: number;
      metadata?: unknown;
    },
  ): Promise<void> {
    await Promise.all([
      this.publishCampaignEvent(campaignId, 'analytics_event', {
        type: eventType,
        ...data,
        timestamp: Date.now(),
      }),
      this.publishParticipationEvent(data.participationId, 'analytics_event', {
        type: eventType,
        ...data,
        timestamp: Date.now(),
      }),
    ]);
  }
  
  static async publishBalanceUpdate(
    campaignId: string,
    participationId: string,
    balance: number,
  ): Promise<void> {
    const data = {
      participationId,
      balance,
      timestamp: Date.now(),
    };
    
    await Promise.all([
      this.publishCampaignEvent(campaignId, 'balance_updated', data),
      this.publishParticipationEvent(participationId, 'balance_updated', data),
    ]);
  }
}
