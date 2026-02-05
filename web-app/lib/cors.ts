import { NextResponse } from 'next/server';

// CORS headers for public tracking endpoints
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400', // 24 hours
};

// Helper to add CORS headers to a response
export function withCors(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// Handle OPTIONS preflight request
export function handleOptions(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Create a JSON response with CORS headers
export function corsJsonResponse<T>(data: T, status = 200): NextResponse {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}