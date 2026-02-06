/**
 * Health Check Endpoint para Supabase
 * 
 * Valida que la configuración de Supabase esté correcta y funcional.
 * 
 * GET /api/health/supabase
 * 
 * Respuestas:
 * - 200: Configuración correcta, tablas accesibles
 * - 500: Error en configuración, conexión o schema
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

export async function GET() {
  try {
    // Validar que las variables de entorno existan
    const hasUrl = !!process.env.SUPABASE_URL;
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!hasUrl || !hasServiceKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing environment variables",
          env: {
            hasUrl,
            hasServiceKey,
          },
        },
        { status: 500 }
      );
    }

    // Verificación 1: Validar conectividad con Supabase Auth
    // Esto valida que:
    // 1. La URL es correcta
    // 2. El service_role_key es válido
    // 3. Hay conectividad con Supabase
    const { error: authError } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1,
    });

    if (authError) {
      console.error("[Supabase Health Check] Auth error:", authError);
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to connect to Supabase Auth",
          details: authError.message,
          env: {
            hasUrl: true,
            hasServiceKey: true,
          },
        },
        { status: 500 }
      );
    }

    // Verificación 2: Validar que las tablas existan y sean accesibles
    const dbChecks: Record<string, string> = {};

    // Check: campaigns table
    const { count: campaignsCount, error: campaignsError } = await supabaseAdmin
      .from("campaigns")
      .select("*", { count: "exact", head: true });

    if (campaignsError) {
      console.error("[Supabase Health Check] Campaigns table error:", campaignsError);
      dbChecks.campaignsTable = `error: ${campaignsError.message}`;
    } else {
      dbChecks.campaignsTable = "ok";
    }

    // Check: campaign_payouts table
    const { count: payoutsCount, error: payoutsError } = await supabaseAdmin
      .from("campaign_payouts")
      .select("*", { count: "exact", head: true });

    if (payoutsError) {
      console.error("[Supabase Health Check] Payouts table error:", payoutsError);
      dbChecks.payoutsTable = `error: ${payoutsError.message}`;
    } else {
      dbChecks.payoutsTable = "ok";
    }

    // Check: auth_nonces table
    const { count: noncesCount, error: noncesError } = await supabaseAdmin
      .from("auth_nonces")
      .select("*", { count: "exact", head: true });

    if (noncesError) {
      console.error("[Supabase Health Check] Nonces table error:", noncesError);
      dbChecks.noncesTable = `error: ${noncesError.message}`;
    } else {
      dbChecks.noncesTable = "ok";
    }

    // Check: wallet_sessions table
    const { count: sessionsCount, error: sessionsError } = await supabaseAdmin
      .from("wallet_sessions")
      .select("*", { count: "exact", head: true });

    if (sessionsError) {
      console.error("[Supabase Health Check] Sessions table error:", sessionsError);
      dbChecks.sessionsTable = `error: ${sessionsError.message}`;
    } else {
      dbChecks.sessionsTable = "ok";
    }

    // Verificar si todas las tablas están OK
    const allTablesOk = Object.values(dbChecks).every((status) => status === "ok");

    if (!allTablesOk) {
      return NextResponse.json(
        {
          ok: false,
          error: "Some database tables are not accessible",
          env: {
            hasUrl: true,
            hasServiceKey: true,
          },
          db: dbChecks,
          hint: "Run the SQL schema from supabase/schema.sql in your Supabase SQL Editor",
        },
        { status: 500 }
      );
    }

    // Todo OK
    return NextResponse.json({
      ok: true,
      message: "Supabase connection and schema validated successfully",
      env: {
        hasUrl: true,
        hasServiceKey: true,
      },
      db: dbChecks,
      stats: {
        campaignsCount: campaignsCount ?? 0,
        payoutsCount: payoutsCount ?? 0,
        noncesCount: noncesCount ?? 0,
        sessionsCount: sessionsCount ?? 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Supabase Health Check] Unexpected error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unexpected error during health check",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
