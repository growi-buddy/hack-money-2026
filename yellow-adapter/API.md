# API Reference

Todos los endpoints con ejemplos y explicaciones.

**Base URL**: `http://localhost:3003`

---

## 🏥 Health & Config

### GET /api/yellow/health

Health check del servicio.

**Request**:
```bash
curl http://localhost:3003/api/yellow/health
```

**Response**:
```json
{
  "ok": true,
  "service": "yellow-adapter",
  "nitroRpc": {
    "connected": true,
    "latencyMs": 150
  },
  "chainsConfigured": [
    { "chainId": 84532, "name": "Base Sepolia", "custodyContract": "0x9f5314..." }
  ]
}
```

---

### GET /api/yellow/config

Chains soportadas y contratos.

**Request**:
```bash
curl http://localhost:3003/api/yellow/config
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "environment": "sandbox",
    "clearNode": {
      "wsUrl": "wss://clearnet-sandbox.yellow.com/ws"
    },
    "chains": [
      {
        "chainId": 84532,
        "name": "Base Sepolia",
        "rpcUrl": "https://sepolia.base.org",
        "custodyContract": "0x9f5314FB00C98Eb274B83001e37902c91b332e8A",
        "usdcAddress": "0xDB9F293e3898c9E5536A3be1b0C56c89d2b32DEb"
      }
    ]
  }
}
```

---

## 💧 Faucet (Obtener ytest.usd)

### POST /api/yellow/faucet/all

Solicita tokens del faucet de Yellow para TODAS las wallets de test.

**Request**:
```bash
curl -X POST http://localhost:3003/api/yellow/faucet/all
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "wallets": {
      "manager": {
        "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB",
        "success": true,
        "response": { "message": "Tokens sent" }
      },
      "influencer": {
        "address": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        "success": true,
        "response": { "message": "Tokens sent" }
      },
      "judge": { "success": true, ... },
      "fee": { "success": true, ... }
    },
    "summary": {
      "successful": 4,
      "failed": 0,
      "total": 4
    }
  },
  "message": "Faucet requested for all test wallets: 4/4 succeeded"
}
```

**Cuándo usar**: Antes de ejecutar Happy Path Demo.

---

### POST /api/yellow/faucet/manager

Solicita tokens solo para la wallet Manager.

**Request**:
```bash
curl -X POST http://localhost:3003/api/yellow/faucet/manager
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "wallet": "manager",
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB",
    "faucetResponse": { "message": "Tokens sent" }
  },
  "message": "Tokens requested for Manager wallet"
}
```

---

### POST /api/yellow/faucet/influencer

Solicita tokens solo para la wallet Influencer.

**Request**:
```bash
curl -X POST http://localhost:3003/api/yellow/faucet/influencer
```

---

### POST /api/yellow/faucet

Solicita tokens para cualquier address.

**Body**:
```json
{
  "userAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB"
}
```

**Request**:
```bash
curl -X POST http://localhost:3003/api/yellow/faucet \
  -H "Content-Type: application/json" \
  -d '{
    "userAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB"
  }'
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "userAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB",
    "faucetResponse": { "message": "Tokens sent" }
  },
  "message": "Tokens requested for 0x742d35..."
}
```

---

## 🎯 App Sessions

### Conceptos Clave

**¿Qué es el budget?**
- El budget es **VIRTUAL** (contabilidad off-chain)
- NO necesitas tener fondos reales en la wallet
- Es como un "crédito" que asignas a la campaña

**¿Qué token se usa?**
- Definido en el código: `"ytest.usd"` (Yellow test USDC)
- Está hardcodeado en `src/lib/yellow/appSessions/service.ts` línea 37
- Para cambiar el token, edita esa línea

**Formato del budget**:
```
USDC usa 6 decimales:
"1000000" = 1 USDC
"500000"  = 0.5 USDC
"250000"  = 0.25 USDC
"100000"  = 0.1 USDC
```

---

### POST /api/yellow/app-sessions/create

Crea una nueva App Session.

**Body**:
```json
{
  "budgetUsdc": "1000000",
  "managerAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB",
  "influencerAddress": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
}
```

**Campos**:
- `budgetUsdc`: Budget VIRTUAL en units (6 decimales)
  - Ejemplo: `"1000000"` = 1 USDC virtual
  - Puedes poner cualquier número (10, 100, 1000 USDC)
  - NO necesitas tener estos fondos realmente
- `managerAddress`: Wallet que provee el presupuesto
- `influencerAddress`: Wallet que recibe payouts

**Request**:
```bash
curl -X POST http://localhost:3003/api/yellow/app-sessions/create \
  -H "Content-Type: application/json" \
  -d '{
    "budgetUsdc": "1000000",
    "managerAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB",
    "influencerAddress": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
  }'
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "appSessionId": "session_1707331200000_abc123",
    "definition": {
      "protocol": "growi-campaign-v1",
      "participants": [
        "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB",  // Manager
        "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",  // Influencer
        "0x5CbDd86a2FA8Dc4bDdd8a8f69dBa48572EeC07FB",  // Judge (automático)
        "0x7564105E977516C53bE337314c7E53838967bDaC"   // Fee (automático)
      ],
      "weights": [0, 0, 100, 0],
      "quorum": 100,
      "asset": "ytest.usd"  // ← El token usado
    },
    "allocations": [
      { "participant": "0x742d35...", "amount": "1000000" },  // Manager: 1 USDC
      { "participant": "0x5B38Da...", "amount": "0" },        // Influencer: 0
      { "participant": "0x5CbDd8...", "amount": "0" },        // Judge: 0
      { "participant": "0x756410...", "amount": "0" }         // Fee: 0
    ],
    "version": 0
  }
}
```

**Notas**:
- Judge y Fee Treasury se agregan automáticamente
- Judge y Fee usan las keys de `.env` (YELLOW_JUDGE_PK, YELLOW_FEE_PK)
- El token `"ytest.usd"` está hardcodeado (Yellow test token)

---

### POST /api/yellow/app-sessions/payout

Aplica un payout al influencer (off-chain).

**Body**:
```json
{
  "appSessionId": "session_1707331200000_abc123",
  "earnedUsdc": "250000",
  "feeBps": 200
}
```

**Campos**:
- `appSessionId`: ID de la sesión (del create)
- `earnedUsdc`: Cantidad ganada (units, 6 decimales)
  - Ejemplo: `"250000"` = 0.25 USDC
- `feeBps`: Fee en basis points (200 = 2%)

**Cálculo automático**:
```javascript
fee = (earnedUsdc * feeBps) / 10000
total = earnedUsdc + fee

// Ejemplo con 250,000 y 2% fee:
fee = (250000 * 200) / 10000 = 5000 (0.005 USDC)
total = 250000 + 5000 = 255000

// Cambios:
Manager: -= 255000 (1,000,000 → 745,000)
Influencer: += 250000 (0 → 250,000)
Fee: += 5000 (0 → 5,000)
```

**Request**:
```bash
curl -X POST http://localhost:3003/api/yellow/app-sessions/payout \
  -H "Content-Type: application/json" \
  -d '{
    "appSessionId": "session_1707331200000_abc123",
    "earnedUsdc": "250000",
    "feeBps": 200
  }'
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "appSessionId": "session_1707331200000_abc123",
    "version": 1,
    "allocations": [
      { "participant": "0x742d35...", "amount": "745000" },   // Manager
      { "participant": "0x5B38Da...", "amount": "250000" },   // Influencer
      { "participant": "0x5CbDd8...", "amount": "0" },        // Judge
      { "participant": "0x756410...", "amount": "5000" }      // Fee
    ]
  },
  "message": "Payout applied: 250000 earned, 200 BPS fee"
}
```

---

### POST /api/yellow/app-sessions/claim

Retira fondos de la sesión (WITHDRAW).

**Body**:
```json
{
  "appSessionId": "session_1707331200000_abc123",
  "participant": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "amountUsdc": "100000"
}
```

**Campos**:
- `appSessionId`: ID de la sesión
- `participant`: Wallet que retira (debe ser participant)
- `amountUsdc`: Cantidad a retirar (units)

**Request**:
```bash
curl -X POST http://localhost:3003/api/yellow/app-sessions/claim \
  -H "Content-Type: application/json" \
  -d '{
    "appSessionId": "session_1707331200000_abc123",
    "participant": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "amountUsdc": "100000"
  }'
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "version": 2,
    "allocations": [
      { "participant": "0x742d35...", "amount": "745000" },
      { "participant": "0x5B38Da...", "amount": "150000" },  // Era 250k, retiró 100k
      { "participant": "0x5CbDd8...", "amount": "0" },
      { "participant": "0x756410...", "amount": "5000" }
    ]
  },
  "message": "Claim executed: 100000 withdrawn by 0x5B38Da..."
}
```

---

### GET /api/yellow/app-sessions/:id

Consulta estado de una sesión.

**Request**:
```bash
curl http://localhost:3003/api/yellow/app-sessions/session_1707331200000_abc123
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "session": {
      "appSessionId": "session_1707331200000_abc123",
      "version": 2,
      "allocations": [
        { "participant": "0x742d35...", "amount": "745000" },
        { "participant": "0x5B38Da...", "amount": "150000" },
        { "participant": "0x5CbDd8...", "amount": "0" },
        { "participant": "0x756410...", "amount": "5000" }
      ],
      "definition": {
        "asset": "ytest.usd",
        "protocol": "growi-campaign-v1",
        ...
      }
    },
    "summary": {
      "totalAllocated": "900000",
      "currentVersion": 2
    }
  }
}
```

---

## 🔥 Channel Close & Settle

### POST /api/yellow/channel/prepare-close

Prepara el cierre cooperativo.

**Body**:
```json
{
  "chainId": 84532,
  "channelId": "0x1234567890abcdef...",
  "wallet": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB"
}
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "signIntent": {
      "kind": "EIP191_PERSONAL_SIGN",
      "wallet": "0x742d35...",
      "messageToSign": "0xabcdef123456...",  // ← Debes firmar esto
      "description": "Sign FINALIZE packedState for cooperative close"
    },
    "serverPart": {
      "packedState": "0x...",
      "clearnodeSig": "0x...",
      "channelId": "0x..."
    }
  },
  "message": "Sign the messageToSign with your wallet..."
}
```

**Siguiente paso**: Firmar el `messageToSign` con tu wallet.

---

### POST /api/yellow/channel/close-intent

Genera la TX para cerrar el canal.

**Body**:
```json
{
  "chainId": 84532,
  "channelId": "0x1234567890abcdef...",
  "wallet": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB",
  "userSig": "0x9876543210fedcba..."  // ← Tu firma del paso anterior
}
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "txIntent": {
      "chainId": 84532,
      "to": "0x9f5314FB00C98Eb274B83001e37902c91b332e8A",  // Custody contract
      "data": "0x123abc...",  // ← Calldata para Custody.close()
      "value": "0x0",
      "description": "Custody.close cooperative FINALIZE"
    }
  },
  "message": "Send this transaction from your wallet..."
}
```

**Siguiente paso**: Enviar esta TX desde tu wallet.

---

### POST /api/yellow/demo/happy-path

Demo end-to-end automático (SOLO testnet).

**Request**:
```bash
curl -X POST http://localhost:3003/api/yellow/demo/happy-path
```

**Response**:
```json
{
  "ok": true,
  "data": {
    "steps": [
      {
        "step": 1,
        "name": "Create Channel (INITIALIZE)",
        "status": "success",
        "txHash": "0xabc123..."
      },
      {
        "step": 2,
        "name": "Off-chain Payout (OPERATE)",
        "status": "success"
      },
      {
        "step": 3,
        "name": "Close Channel (FINALIZE)",
        "status": "success",
        "txHash": "0xdef456..."
      }
    ],
    "summary": {
      "channelId": "0x...",
      "createTxHash": "0xabc123...",
      "closeTxHash": "0xdef456...",
      "totalPayouts": "0.3 USDC",
      "finalBalances": {
        "manager": "0.7 USDC",
        "influencer": "0.3 USDC"
      }
    }
  }
}
```

**Este endpoint**:
- Usa las wallets de test de `.env`
- Ejecuta TODO el flujo automáticamente
- Hace 2 TXs on-chain reales en Base Sepolia
- Perfecto para demo en hackathon

---

## 💡 Preguntas Frecuentes

### ¿De dónde sale el budget?

**Respuesta**: El budget es un número que TÚ decides cuando creas la sesión.

```json
{
  "budgetUsdc": "1000000"  // ← TÚ defines esto (1 USDC virtual)
}
```

Es como decir: "Esta campaña tiene un presupuesto de 1 USDC para payouts".

**NO necesitas**:
- ❌ Tener 1 USDC real en tu wallet
- ❌ Depositar fondos antes
- ❌ Aprobar tokens

**Es contabilidad off-chain**: Solo números que se trackean en memoria.

### ¿Qué token se usa?

**Respuesta**: `"ytest.usd"` (Yellow test USDC)

Está definido aquí:
```typescript
// src/lib/yellow/appSessions/service.ts línea 37
asset: string = "ytest.usd"  // ← Token por defecto
```

**Para cambiar el token**:
1. Editar `src/lib/yellow/appSessions/service.ts`
2. Cambiar `"ytest.usd"` por otro (ej: `"usdc"`)
3. Reiniciar servidor

### ¿Cuándo necesito fondos reales?

**Solo para Channel Close & Settle** (on-chain):

1. **Create Channel** (INITIALIZE):
   - Necesitas USDC real en la wallet
   - Se bloquea en Custody contract

2. **Close Channel** (FINALIZE):
   - Se distribuye según allocations
   - Necesitas ETH para gas

**Para App Sessions** (testing básico): NO necesitas fondos reales.

### ¿Cómo cambio el budget?

Simplemente cambia el número en el request:

```json
// Budget de 10 USDC
{ "budgetUsdc": "10000000" }

// Budget de 0.5 USDC
{ "budgetUsdc": "500000" }

// Budget de 100 USDC
{ "budgetUsdc": "100000000" }
```

---

## 📊 Ejemplo Completo: Flujo con 3 Wallets

### Escenario

```
Manager: Crea campaña con 1 USDC
Influencer: Genera contenido
Sistema: Aplica 3 payouts
Influencer: Retira 0.2 USDC
```

### Paso 1: Create Session

```bash
curl -X POST http://localhost:3003/api/yellow/app-sessions/create \
  -H "Content-Type: application/json" \
  -d '{
    "budgetUsdc": "1000000",
    "managerAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB",
    "influencerAddress": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
  }'
```

**Resultado**:
```
✅ Session creada
Version: 0
Manager: 1,000,000 (1 USDC)
Influencer: 0
```

### Paso 2: Payout #1 (Click - 0.25 USDC)

```bash
curl -X POST http://localhost:3003/api/yellow/app-sessions/payout \
  -H "Content-Type: application/json" \
  -d '{
    "appSessionId": "session_...",
    "earnedUsdc": "250000",
    "feeBps": 200
  }'
```

**Resultado**:
```
✅ Payout aplicado
Version: 1
Manager: 745,000 (perdió 255k: 250k + 5k fee)
Influencer: 250,000 (ganó 250k)
Fee: 5,000 (2% de 250k)
```

### Paso 3: Payout #2 (View - 0.15 USDC)

```bash
curl -X POST http://localhost:3003/api/yellow/app-sessions/payout \
  -H "Content-Type: application/json" \
  -d '{
    "appSessionId": "session_...",
    "earnedUsdc": "150000",
    "feeBps": 200
  }'
```

**Resultado**:
```
Version: 2
Manager: 592,000
Influencer: 400,000
Fee: 8,000
```

### Paso 4: Claim (0.2 USDC)

```bash
curl -X POST http://localhost:3003/api/yellow/app-sessions/claim \
  -H "Content-Type: application/json" \
  -d '{
    "appSessionId": "session_...",
    "participant": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "amountUsdc": "200000"
  }'
```

**Resultado**:
```
Version: 3
Manager: 592,000 (sin cambio)
Influencer: 200,000 (retiró 200k)
Fee: 8,000 (sin cambio)
Total: 800,000 (bajó por el withdrawal)
```

---

## 🎓 Conversión USDC

Tabla de referencia:

| USDC (display) | USDC (units) | String para API |
|----------------|--------------|-----------------|
| 1 USDC | 1,000,000 | `"1000000"` |
| 0.5 USDC | 500,000 | `"500000"` |
| 0.25 USDC | 250,000 | `"250000"` |
| 0.15 USDC | 150,000 | `"150000"` |
| 0.1 USDC | 100,000 | `"100000"` |
| 0.01 USDC | 10,000 | `"10000"` |

**Fórmula**: `units = USDC * 1,000,000`

---

## 🎯 Códigos de Error

| Código | HTTP | Causa |
|--------|------|-------|
| `VALIDATION_ERROR` | 400 | Body inválido (formato, valores) |
| `NOT_FOUND` | 404 | Session/Channel no existe |
| `UNAUTHORIZED` | 403 | Wallet no es participant |
| `UNSUPPORTED_CHAIN` | 400 | ChainId no soportado |
| `SESSION_CREATE_ERROR` | 500 | Error creando sesión |
| `PAYOUT_ERROR` | 500 | Error en payout (ej: balance insuficiente) |
| `CLAIM_ERROR` | 500 | Error en claim |

---

## 📚 Siguiente Paso

Lee **[TESTING.md](./TESTING.md)** para testear con Postman.
