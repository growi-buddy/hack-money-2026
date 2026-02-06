# ENS Writer

Servicio Next.js para crear y gestionar subdominios ENS (Ethereum Name Service) con text records onchain.

## Características

- 🔐 API autenticada con `x-api-key`
- 🔗 Integración con ENS via viem (server-only)
- ✅ Validación completa de inputs
- 🚀 Next.js 16 + TypeScript + Tailwind CSS
- 📝 Escritura segura de contratos con simulación previa

## Estructura del Proyecto

```
ens-writer/
├── app/
│   ├── api/ens/campaigns/          # Endpoints de API
│   │   ├── route.ts                # POST /api/ens/campaigns
│   │   └── [code]/finalize/        # PATCH /api/ens/campaigns/:code/finalize
│   └── page.tsx                    # Landing page
├── lib/
│   ├── chain/                      # Configuración de blockchain
│   │   ├── config.ts               # Chain config + env vars
│   │   ├── clients.ts              # viem public/wallet clients
│   │   └── tx.ts                   # writeSafeContract() helper
│   └── ensWriter.ts                # Lógica de ENS (stubs)
├── scripts/
│   └── test-viem.ts                # Test de configuración
├── API.md                          # Documentación de API
├── BLOCKCHAIN.md                   # Documentación de blockchain
└── .env.local                      # Variables de entorno (no commitear)
```

## Inicio Rápido

### 1. Instalar Dependencias

```bash
pnpm install
```

### 2. Configurar Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```bash
# API Key
ENS_WRITER_API_KEY=tu-clave-secreta-aqui

# Blockchain
ENS_WRITER_PRIVATE_KEY=0x...
RPC_URL=
CHAIN_ID=
ENS_ROOT_NAME=

# ENS Contracts
ENS_REGISTRY_ADDRESS=0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
NAMEWRAPPER_ADDRESS=0x0635513f179D50A207757E05759CbD106d7dFcE8
ENS_PUBLIC_RESOLVER_ADDRESS=0x8FADE66B79cC9f707aB26799354482EB93a5B7dD
```

Ver `BLOCKCHAIN.md` para más detalles sobre configuración de blockchain.

### 3. Iniciar Servidor de Desarrollo

```bash
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`.

### 4. Probar Configuración de viem

```bash
pnpm test:viem
```

Esto verificará que la configuración de blockchain funciona correctamente.

## API Endpoints

### POST `/api/ens/campaigns`

Crea una nueva campaña creando un subdominio ENS y escribiendo text records.

**Response:** `{ ok, code, fqdn, node, txHashes }`

### GET `/api/ens/campaigns/:code`

Lee los text records de una campaña desde ENS (blockchain).

**Response:** `{ ok, fqdn, records: { termsURI, termsHash, ... } }`

### PATCH `/api/ens/campaigns/:code/finalize`

Finaliza una campaña escribiendo settlement y payout records.

**Response:** `{ ok, code, fqdn, node, txHashes }`

Ver `EXAMPLES.md` para ejemplos completos con curl.

## Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Styling
- **viem** - Cliente Ethereum type-safe
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

- **NUNCA** commitees `.env.local` al repositorio
- **NUNCA** uses variables `NEXT_PUBLIC_*` para private keys
- Todo está configurado como **server-only**
- Usa wallets de prueba en desarrollo

## Referencias

- [ENS Documentation](https://docs.ens.domains/)
- [viem Documentation](https://viem.sh)
- [Next.js Documentation](https://nextjs.org/docs)
- [ENS NameWrapper](https://docs.ens.domains/wrapper/contracts)
- [ENS Resolver](https://docs.ens.domains/resolvers/interacting)

## Estado del Proyecto

🚧 **En Desarrollo**

- ✅ Endpoints de API con validación
- ✅ Configuración de viem
- ✅ Autenticación con API key
- ✅ Creación de subdominios ENS wrapped (NameWrapper)
- ✅ Idempotencia en creación de subdominios
- ✅ Configuración de resolver (Public Resolver)
- ✅ Escritura de text records en ENS
- ✅ Endpoints completos (crear + finalizar + verificar)
- ✅ Lectura de records desde blockchain (GET)
- 🚧 Tests unitarios completos
- 🚧 Deploy a producción

## Licencia

MIT
