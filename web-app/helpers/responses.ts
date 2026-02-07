import { toUserResponseDTO } from '@/helpers/users';
import { prisma } from '@/lib/db';
import { ApiDataResponse, ApiErrorResponse, ApiListResponse, UserResponseDTO } from '@/types';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '../lib/db/prisma/generated/client';

export function responseError(error: unknown) {
  
  const response: ApiErrorResponse = {
    success: false,
    error: { code: 'SERVER_ERROR', message: (error as Error)?.message || 'Internal Server Error' },
  };
  
  if (error instanceof ZodError) {
    response.error.code = 'VALIDATION_FAILED';
    response.error.message = 'The data provided is invalid';
    response.error.details = error.issues;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      response.error.code = 'CONFLICT';
      response.error.message = error.message;
    } else {
      response.error.code = `PRISMA_${error.code}`;
      response.error.message = error.message;
    }
  }
  
  return NextResponse.json(response, { status: 400 });
}

type Response = {
  response: ApiDataResponse<unknown> | ApiListResponse<unknown> | ApiErrorResponse,
  status?: number
};

type CB = () => Promise<Response>;

export const safeRouteWithWalletAddress = async (req: Request, cb: (user: UserResponseDTO) => Promise<Response>) => {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get('walletAddress');
    if (!walletAddress) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'MISSING_WALLET',
          message: 'Wallet address is required',
        },
      };
      return NextResponse.json(response, { status: 400 });
    }
    
    // Validate user
    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: {
        walletAddress,
      },
      include: {
        socialMedias: true,
      },
    });

    const userResponseDTO: UserResponseDTO = toUserResponseDTO(user);
    
    const { response, status } = await cb(userResponseDTO);
    return NextResponse.json(response, { status });
    
  } catch (error) {
    console.error(error);
    return responseError(error);
  }
};

export async function safeRoute(cb: CB) {
  try {
    const { response, status } = await cb();
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error(error);
    return responseError(error);
  }
}
