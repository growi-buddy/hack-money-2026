import { NextRequest, NextResponse } from 'next/server';
import * as Ably from 'ably';
import { ApiDataResponse, ApiErrorResponse } from '@/types';

interface PublishBody {
  channel: string;
  event: string;
  data: unknown;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ABLY_API_KEY) {
      throw new Error('ABLY_API_KEY is not configured');
    }

    const body: PublishBody = await req.json();
    const { channel, event, data } = body;

    if (!channel || !event) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'Channel and event are required',
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    const ablyChannel = ably.channels.get(channel);
    await ablyChannel.publish(event, data);

    const response: ApiDataResponse<{ published: boolean; channel: string; event: string }> = {
      success: true,
      data: { published: true, channel, event },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Publish] Error:', error);

    const response: ApiErrorResponse = {
      success: false,
      error: {
        code: 'PUBLISH_FAILED',
        message: 'Failed to publish message',
      },
    };

    return NextResponse.json(response, { status: 500 });
  }
}