# ENS Writer

Servicio Next.js para crear y gestionar subdominios ENS (Ethereum Name Service) con text records onchain.

## Características

- 🔐 API autenticada con `x-api-key`
- 🔗 Integración con ENS via viem (server-only)
- 💾 Persistencia en Supabase (server-only)
- ✅ Validación completa de inputs
- 🚀 Next.js 16 + TypeScript + Tailwind CSS
- 📝 Escritura segura de contratos con simulación previa

## Estructura del Proyecto

```
ens-writer/
├── app/
│   ├── api/
│   │   ├── ens/campaigns/          # Endpoints ENS
│   │   │   ├── route.ts            # POST /api/ens/campaigns
│   │   │   └── [code]/finalize/    # PATCH /api/ens/campaigns/:code/finalize
│   │   ├── campaigns/              # Endpoints Supabase
│   │   │   └── [code]/payouts/     # GET/POST payouts
│   │   └── health/supabase/        # Health check de DB
│   ├── lib/
│   │   ├── supabase/
│   │   │   └── admin.ts            # Cliente Supabase admin
│   │   └── repo/                   # Capa de repositorios
│   │       ├── types.ts            # Types de DB
│   │       ├── campaignRepo.ts     # CRUD campaigns
│   │       ├── payoutRepo.ts       # CRUD payouts
│   │       └── authRepo.ts         # Auth nonces/sessions
│   └── page.tsx                    # Landing page
├── lib/
│   ├── chain/                      # Configuración de blockchain
│   │   ├── config.ts               # Chain config + env vars
│   │   ├── clients.ts              # viem public/wallet clients
│   │   └── tx.ts                   # writeSafeContract() helper
│   └── ensWriter.ts                # Lógica de ENS
├── supabase/
│   ├── schema.sql                  # Schema de BD
│   └── README.md                   # Docs de Supabase
├── scripts/
│   └── test-viem.ts                # Test de configuración
├── API.md                          # Documentación de API
├── BLOCKCHAIN.md                   # Documentación de blockchain
└── .env                            # Variables de entorno (no commitear)
```

## Inicio Rápido

### 1. Instalar Dependencias

```bash
pnpm install
```

### 2. Configurar Variables de Entorno

Copia `.env.example` a `.env` y configura:

```bash
# API Key
ENS_WRITER_API_KEY=tu-clave-secreta-aqui

# Supabase (SERVER-ONLY - NO usar NEXT_PUBLIC_)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Blockchain
ENS_WRITER_PRIVATE_KEY=0x...
RPC_URL=your-rpc-url
CHAIN_ID=11155111
ENS_ROOT_NAME=your-root-name.eth

# ENS Contracts
ENS_REGISTRY_ADDRESS=0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
NAMEWRAPPER_ADDRESS=0x0635513f179D50A207757E05759CbD106d7dFcE8
ENS_PUBLIC_RESOLVER_ADDRESS=0x8FADE66B79cC9f707aB26799354482EB93a5B7dD
```

Ver `BLOCKCHAIN.md` para blockchain y `supabase/README.md` para base de datos.

### 3. Configurar Base de Datos (Supabase)

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a SQL Editor y ejecuta el script: `supabase/schema.sql`
3. Obtén tu `service_role` key de Settings → API
4. Actualiza `SUPABASE_SERVICE_ROLE_KEY` en tu `.env`

Ver `supabase/README.md` para más detalles.

### 4. Iniciar Servidor de Desarrollo

```bash
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`.

### 5. Verificar Configuración

```bash
# Blockchain
pnpm test:viem

# Supabase
curl http://localhost:3000/api/health/supabase
```

## API Endpoints

### ENS (Blockchain)

#### POST `/api/ens/campaigns`
Crea una nueva campaña creando un subdominio ENS y escribiendo text records.

**Response:** `{ ok, code, fqdn, node, txHashes }`

#### GET `/api/ens/campaigns/:code`
Lee los text records de una campaña desde ENS (blockchain).

**Response:** `{ ok, fqdn, records: { termsURI, termsHash, ... } }`

#### PATCH `/api/ens/campaigns/:code/finalize`
Finaliza una campaña escribiendo settlement y payout records.

**Response:** `{ ok, code, fqdn, node, txHashes }`

### Supabase (Database)

#### GET `/api/campaigns/:code/payouts`
Lista todos los payouts de una campaña.

**Response:** `{ campaignCode, payouts[], stats }`

#### POST `/api/campaigns/:code/payouts`
Agregar/actualizar payouts para una campaña.

**Body:** `{ payouts: [{ wallet, amount_micros }] }`

#### GET `/api/health/supabase`
Health check de Supabase (conexión + schema).

Ver `EXAMPLES.md` para ejemplos completos con curl.

## Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Styling
- **viem** - Cliente Ethereum type-safe
- **Supabase** - Base de datos PostgreSQL (server-only)
- **pnpm** - Package manager


## Scripts

```bash
# Desarrollo
pnpm dev

# Build para producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Linter
pnpm lint

# Test de configuración de viem
pnpm test:viem

# Test de creación de subdominios ENS
pnpm test:subname

# Test de escritura de text records
pnpm test:records

# Ver ejemplos completos de uso
cat EXAMPLES.md
```

## Seguridad

⚠️ **IMPORTANTE:**

- **NUNCA** commitees `.env` al repositorio
- **NUNCA** uses variables `NEXT_PUBLIC_*` para private keys o service_role
- Todo está configurado como **server-only** (blockchain + Supabase)
- El `service_role` key bypasea RLS - solo usar en backend
- Usa wallets de prueba en desarrollo

## Referencias

- [ENS Documentation](https://docs.ens.domains/)
- [viem Documentation](https://viem.sh)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [ENS NameWrapper](https://docs.ens.domains/wrapper/contracts)
- [ENS Resolver](https://docs.ens.domains/resolvers/interacting)

## Estado del Proyecto

🚧 **En Desarrollo**

### Blockchain (ENS)
- ✅ Endpoints de API con validación
- ✅ Configuración de viem
- ✅ Autenticación con API key
- ✅ Creación de subdominios ENS wrapped (NameWrapper)
- ✅ Idempotencia en creación de subdominios
- ✅ Configuración de resolver (Public Resolver)
- ✅ Escritura de text records en ENS
- ✅ Endpoints completos (crear + finalizar + verificar)
- ✅ Lectura de records desde blockchain (GET)

### Base de Datos (Supabase)
- ✅ Cliente admin con protección server-only
- ✅ Schema SQL (campaigns, payouts, auth_nonces, sessions)
- ✅ Repositorios con CRUD completo
- ✅ Health check de DB con validación de schema
- ✅ Endpoints de ejemplo (payouts)
- 🚧 Integración completa con flujo ENS
- 🚧 Sistema de autenticación con wallets

### General
- 🚧 Tests unitarios completos
- 🚧 Deploy a producción

## Licencia

MIT
