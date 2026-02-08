/**
 * GET /api/health
 * Health check endpoint
 */

import { NextResponse } from "next/server";
import { SERVICE_NAME, VERSION, getUptimeSeconds } from "@/src/lib/service";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      ok: true,
      service: SERVICE_NAME,
      version: VERSION,
      now: new Date().toISOString(),
      uptimeSec: getUptimeSeconds(),
    },
    { status: 200 }
  );
}
