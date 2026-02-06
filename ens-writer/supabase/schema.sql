-- ============================================================================
-- ENS Writer - Supabase Schema
-- ============================================================================
-- Ejecutar en: Supabase Dashboard → SQL Editor
--
-- Tablas:
-- - campaigns: Campañas ENS creadas
-- - campaign_payouts: Distribuciones (micros) por wallet
-- - auth_nonces: Nonces para autenticación wallet
-- - wallet_sessions: Sesiones activas de wallets autenticadas
-- ============================================================================

-- (A) Habilitar extensión UUID (suele venir habilitada por defecto)
create extension if not exists "uuid-ossp";

-- Opcional: si prefieres gen_random_uuid(), habilita pgcrypto
-- create extension if not exists "pgcrypto";

-- ============================================================================
-- (B) Tabla: campaigns
-- ============================================================================
create table if not exists public.campaigns (
  -- Identificador único de la campaña (código corto, ej: "abc123")
  code text primary key,
  
  -- ENS info
  ens_root_name text not null,  -- ej: "growi.eth"
  fqdn text not null,            -- ej: "abc123.growi.eth"
  node text not null,            -- ENS node hash (keccak256)
  
  -- Owner y metadata
  owner_wallet text null,        -- wallet del creador (lowercase)
  yellow_channel_id text null,   -- ID del canal (si aplica)
  
  -- Terms (T&C)
  terms_uri text not null,       -- URI de términos y condiciones
  terms_hash text not null,      -- Hash del contenido
  
  -- Settlement (finalización)
  settlement_tx text null,       -- tx hash de settlement on-chain
  payout_root text null,         -- merkle root de payouts
  
  -- Estado
  status text not null default 'ACTIVE',  -- ACTIVE | FINALIZED | SETTLED
  
  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Índices para búsquedas frecuentes
create index if not exists campaigns_fqdn_idx on public.campaigns (fqdn);
create index if not exists campaigns_owner_wallet_idx on public.campaigns (owner_wallet);
create index if not exists campaigns_status_idx on public.campaigns (status);

-- ============================================================================
-- (C) Tabla: campaign_payouts
-- ============================================================================
create table if not exists public.campaign_payouts (
  id uuid primary key default uuid_generate_v4(),
  
  -- Relación con campaign
  campaign_code text not null references public.campaigns(code) on delete cascade,
  
  -- Beneficiario
  wallet text not null,          -- wallet del beneficiario (lowercase)
  amount_micros numeric not null, -- cantidad en micros (ej: 1000000 = 1 unidad)
  
  -- Timestamps
  created_at timestamptz not null default now(),
  
  -- Constraint: un wallet no puede tener múltiples payouts en la misma campaña
  unique (campaign_code, wallet)
);

-- Índices
create index if not exists campaign_payouts_campaign_idx on public.campaign_payouts (campaign_code);
create index if not exists campaign_payouts_wallet_idx on public.campaign_payouts (wallet);

-- ============================================================================
-- (D) Tabla: auth_nonces
-- ============================================================================
create table if not exists public.auth_nonces (
  wallet text not null,          -- wallet (lowercase)
  nonce text not null,           -- nonce random para firmar
  expires_at timestamptz not null, -- expiración (típicamente +5 min)
  created_at timestamptz not null default now(),
  
  primary key (wallet, nonce)
);

-- Índice para limpieza de nonces expirados
create index if not exists auth_nonces_expires_idx on public.auth_nonces (expires_at);

-- ============================================================================
-- (E) Tabla: wallet_sessions
-- ============================================================================
create table if not exists public.wallet_sessions (
  session_id text primary key,   -- ID de sesión (UUID v4)
  wallet text not null,          -- wallet autenticada (lowercase)
  expires_at timestamptz not null, -- expiración (típicamente +7 días)
  created_at timestamptz not null default now()
);

-- Índices
create index if not exists wallet_sessions_wallet_idx on public.wallet_sessions (wallet);
create index if not exists wallet_sessions_expires_idx on public.wallet_sessions (expires_at);

-- ============================================================================
-- NOTA: Row Level Security (RLS)
-- ============================================================================
-- Por ahora NO activamos RLS porque Supabase solo se usa desde backend con service_role.
-- Si más adelante expones lecturas al cliente, activa RLS:
--
-- alter table public.campaigns enable row level security;
-- alter table public.campaign_payouts enable row level security;
-- alter table public.auth_nonces enable row level security;
-- alter table public.wallet_sessions enable row level security;
--
-- Y define policies apropiadas.
-- ============================================================================

-- ============================================================================
-- Función helper: actualizar updated_at automáticamente
-- ============================================================================
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger para campaigns.updated_at
drop trigger if exists campaigns_updated_at on public.campaigns;
create trigger campaigns_updated_at
  before update on public.campaigns
  for each row
  execute function public.update_updated_at_column();

-- ============================================================================
-- Verificación: Listar tablas creadas
-- ============================================================================
-- Ejecuta esto para confirmar:
-- select table_name from information_schema.tables where table_schema = 'public';
