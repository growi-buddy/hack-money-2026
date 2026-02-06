/**
 * Cliente Supabase Admin (Server-Only)
 * 
 * ⚠️ IMPORTANTE: Este módulo usa "server-only" para impedir imports accidentales
 * en Client Components. Solo debe usarse en:
 * - Route Handlers (app/api/*)
 * - Server Actions
 * - Server Components
 * 
 * El service_role_key bypasea RLS (Row Level Security), úsalo con precaución.
 */

import "server-only";
import { createClient } from "@supabase/supabase-js";

// Validar que las variables de entorno existan
if (!process.env.SUPABASE_URL) {
  throw new Error(
    "Missing SUPABASE_URL: Asegúrate de tener SUPABASE_URL en tu archivo .env"
  );
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY: Asegúrate de tener SUPABASE_SERVICE_ROLE_KEY en tu archivo .env"
  );
}

// Validar que NO se esté usando NEXT_PUBLIC_ (error común)
if (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    "⚠️ ADVERTENCIA: Detectadas variables NEXT_PUBLIC_SUPABASE_*. " +
    "Para uso server-only, debes usar SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY sin el prefijo NEXT_PUBLIC_"
  );
}

/**
 * Cliente Supabase con permisos de administrador (service_role)
 * 
 * Este cliente bypasea Row Level Security (RLS) y tiene permisos completos.
 * Solo usar en backend (Route Handlers, Server Actions).
 */
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
