/**
 * Tipos y helpers para respuestas de API
 */

import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: ApiError;
  warnings?: string[];
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Crea una respuesta exitosa
 */
export function ok<T>(
  data: T,
  warnings?: string[],
  status = 200
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    ok: true,
    data,
  };

  if (warnings && warnings.length > 0) {
    response.warnings = warnings;
  }

  return NextResponse.json(response, { status });
}

/**
 * Crea una respuesta de error
 */
export function fail(
  status: number,
  code: string,
  message: string,
  details?: Record<string, unknown>
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    ok: false,
    error: {
      code,
      message,
      details,
    },
  };

  return NextResponse.json(response, { status });
}

/**
 * Códigos de error comunes
 */
export const ErrorCodes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  INVALID_STATE: "INVALID_STATE",
} as const;
