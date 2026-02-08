# Setup - Yellow Adapter

Guía completa de instalación y configuración.

---

## 📦 Instalación

```bash
# 1. Clonar/Navegar al proyecto
cd yellow-adapter

# 2. Instalar dependencias
npm install
```

---

## ⚙️ Configuración

### 1. Copiar .env

```bash
cp .env.example .env
```

### 2. Editar .env

Abre `.env` y configura:

```bash
# ============================================
# Yellow ClearNode (Sandbox)
# ============================================

YELLOW_WS_URL=wss://clearnet-sandbox.yellow.com/ws
YELLOW_HTTP_URL=https://clearnet-sandbox.yellow.com

# ============================================
# Chain RPCs (Públicos funcionan OK)
# ============================================

BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology

# ============================================
# Test Wallets (SOLO para testing)
# ============================================

# ⚠️ IMPORTANTE: Estas son wallets de PRUEBA
# NUNCA uses wallets reales aquí

# Manager wallet (provee presupuesto en campañas)
YELLOW_MANAGER_PK=0xYOUR_MANAGER_PRIVATE_KEY_HERE

# Influencer wallet (recibe payouts)
YELLOW_INFLUENCER_PK=0xYOUR_INFLUENCER_PRIVATE_KEY_HERE

# 🔑 Growi Judge wallet (LA WALLET DE GROWI - firma todos los payouts)
# Esta es la wallet que CONTROLA la plataforma
YELLOW_JUDGE_PK=0xYOUR_GROWI_PLATFORM_PRIVATE_KEY_HERE

# Fee Treasury wallet (recibe fees de plataforma)
YELLOW_FEE_PK=0xYOUR_FEE_TREASURY_PRIVATE_KEY_HERE
```

---

## 🔑 Generar Wallets de Test

### Opción 1: Node.js

```javascript
// En la consola de node:
const { generatePrivateKey } = require("viem/accounts");
console.log(generatePrivateKey());
```

### Opción 2: Online

Usa: https://vanity-eth.tk/ (SOLO para testnet)

### Opción 3: Metamask

1. Crear nueva wallet en Metamask
2. Exportar private key
3. Copiar a `.env`

⚠️ **NUNCA** compartas estas keys. Son SOLO para testing local.

---

## 💰 Obtener Fondos de Test

### Paso 1: ETH en Base Sepolia (Para gas)

Necesitas ETH en las wallets para pagar gas de TXs on-chain.

**Faucets ETH**:
- Alchemy: https://www.alchemy.com/faucets/base-sepolia
- Coinbase: https://portal.cdp.coinbase.com/products/faucet

**Addresses de tus wallets** (las que generaste):
- Manager: La address correspondiente a YELLOW_MANAGER_PK
- Influencer: La address correspondiente a YELLOW_INFLUENCER_PK

Necesitas ~0.01 ETH por wallet.

### Paso 2: ytest.usd (Yellow Test USDC)

Yellow Sandbox usa `ytest.usd` (token de prueba, NO es USDC real).

**🎯 Obtener ytest.usd con tu API**:

```bash
# Opción 1: Todas las wallets a la vez (RECOMENDADO)
curl -X POST http://localhost:3003/api/yellow/faucet/all

# Opción 2: Solo Manager
curl -X POST http://localhost:3003/api/yellow/faucet/manager

# Opción 3: Solo Influencer
curl -X POST http://localhost:3003/api/yellow/faucet/influencer

# Opción 4: Cualquier address
curl -X POST http://localhost:3003/api/yellow/faucet \
  -H "Content-Type: application/json" \
  -d '{"userAddress": "0x..."}'
```

**Respuesta esperada**:
```json
{
  "ok": true,
  "data": {
    "wallets": {
      "manager": { "success": true, "address": "0x742d35..." },
      "influencer": { "success": true, "address": "0x5B38Da..." }
    }
  },
  "message": "Faucet requested for all test wallets: 4/4 succeeded"
}
```

**⚠️ Nota sobre App Sessions**:
- Los App Sessions son **OFF-CHAIN** → NO necesitas ytest.usd
- El `budgetUsdc` es virtual (solo memoria)
- Solo necesitas ytest.usd para **Happy Path** (transacciones on-chain reales)

---

## 🎯 Entender el Budget

### ¿De dónde sale el budget?

```json
{
  "budgetUsdc": "1000000",  // ← Esto es VIRTUAL (off-chain)
  "managerAddress": "0x...",
  "influencerAddress": "0x..."
}
```

**Explicación**:

1. **El budget es CONTABILIDAD OFF-CHAIN**:
   - No se verifica que el manager tenga fondos reales
   - Es como un "crédito virtual" en la sesión
   - Los payouts solo mueven números off-chain

2. **El token se define en el código** (línea 37 de `service.ts`):
   ```typescript
   asset: string = "ytest.usd"  // ← Token por defecto
   ```

3. **Formato del budget**:
   ```
   "1000000" = 1 USDC (6 decimales)
   "500000"  = 0.5 USDC
   "250000"  = 0.25 USDC
   ```

### ¿Cuándo se necesitan fondos reales?

Solo cuando haces **settlement on-chain**:

1. **Create Channel** (INITIALIZE):
   - Necesitas fondos reales en la wallet
   - Se bloquean en Custody contract

2. **Close Channel** (FINALIZE):
   - Los fondos se distribuyen según allocations
   - Se envían a las wallets de los participantes

Pero para **App Sessions** (testing básico), es todo off-chain y no necesitas fondos reales.

---

## 🧪 Verificar Setup

### 1. Levantar servidor

```bash
npm run dev
```

**Expected**:
```
▲ Next.js 16.1.6 (Turbopack)
- Local: http://localhost:3003
✓ Ready in 620ms
```

### 2. Health Check

```bash
curl http://localhost:3003/api/yellow/health
```

**Expected**:
```json
{
  "ok": true,
  "service": "yellow-adapter",
  "nitroRpc": {
    "connected": true,
    "latencyMs": 150
  },
  "chainsConfigured": [...]
}
```

### 3. Crear una sesión de prueba

```bash
curl -X POST http://localhost:3003/api/yellow/app-sessions/create \
  -H "Content-Type: application/json" \
  -d '{
    "budgetUsdc": "1000000",
    "managerAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB",
    "influencerAddress": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
  }'
```

**Expected**:
```json
{
  "ok": true,
  "data": {
    "appSessionId": "session_...",
    "allocations": [
      { "participant": "0x742d35...", "amount": "1000000" },
      { "participant": "0x5B38Da...", "amount": "0" },
      ...
    ],
    "version": 0
  }
}
```

✅ Si ves esto, el setup está correcto!

---

## 🎯 Chains Soportadas

| Chain | ChainId | Custody Contract | Testnet |
|-------|---------|------------------|---------|
| Base Sepolia | 84532 | `0x9f5314FB00C98Eb274B83001e37902c91b332e8A` | ✅ |
| Polygon Amoy | 80002 | `0x9f5314FB00C98Eb274B83001e37902c91b332e8A` | ✅ |

---

## 🐛 Troubleshooting

### Error: "Port 3000 is in use"

```bash
# Matar procesos node
pkill -9 node

# Limpiar cache
rm -rf .next

# Reintentar
npm run dev
```

### Error: "NitroRPC not connected"

- Verifica internet connection
- Verifica `YELLOW_WS_URL` en `.env`
- Debe ser: `wss://clearnet-sandbox.yellow.com/ws`

### Error: "Test wallets not configured"

- Verifica que `.env` tiene las 4 keys:
  - `YELLOW_MANAGER_PK`
  - `YELLOW_INFLUENCER_PK`
  - `YELLOW_JUDGE_PK`
  - `YELLOW_FEE_PK`

---

## 📚 Siguiente Paso

Lee **[API.md](./API.md)** para ver todos los endpoints con ejemplos.

O ve **[TESTING.md](./TESTING.md)** para empezar a testear con Postman.
