import { ApiDataResponse, ApiErrorResponse, ApiListResponse } from '@/types';
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
      response.error.message = 'A user with this wallet or email already exists';
    } else {
      response.error.code = `PRISMA_${error.code}`;
      response.error.message = error.message;
    }
  }
  
  return NextResponse.json(response, { status: 400 });
};

export async function safeRoute(cb: () => Promise<{
  response: ApiDataResponse<unknown> | ApiListResponse<unknown> | ApiErrorResponse,
  status?: number
}>) {
  try {
    const { response, status } = await cb();
    return NextResponse.json(response, { status });
  } catch (error) {
    return responseError(error);
  }
}
