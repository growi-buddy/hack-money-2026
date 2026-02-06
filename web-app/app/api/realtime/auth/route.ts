import { NextResponse } from 'next/server';
import * as Ably from 'ably';
import { ApiDataResponse, ApiErrorResponse } from '@/types';

export async function GET(req: Request) {
  try {
    if (!process.env.ABLY_API_KEY) {
      throw new Error('ABLY_API_KEY is not configured');
    }

    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('clientId') || 'growi-client';

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });

    const tokenRequest = await ably.auth.createTokenRequest({
      clientId,
      capability: {
        '*': ['publish', 'subscribe', 'presence'],
      },
    });

    const response: ApiDataResponse<Ably.TokenRequest> = {
      success: true,
      data: tokenRequest,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Auth] Failed to create token:', error);

    const response: ApiErrorResponse = {
      success: false,
      error: {
        code: 'AUTH_FAILED',
        message: 'Failed to create authentication token',
      },
    };

    return NextResponse.json(response, { status: 500 });
  }
}