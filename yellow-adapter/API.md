# 📡 API Reference

Documentación completa de los endpoints de Growi Campaign Manager.

---

## 🏥 Health Check

### GET /api/yellow/health

Verifica que el servidor está funcionando.

**Request:**
```bash
GET http://localhost:3000/api/yellow/health
```

**Response:**
```json
{
  "ok": true,
  "status": "healthy",
  "timestamp": "2026-02-08T00:00:00.000Z"
}
```

---

## 📝 App Sessions

### POST /api/yellow/app-sessions/create

Crea una nueva campaña (App Session).

**Request:**
```bash
POST http://localhost:3000/api/yellow/app-sessions/create
Content-Type: application/json

{
  "budgetUsdc": "1000000",
  "managerAddress": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "influencerAddress": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
}
```

**Fields:**
- `budgetUsdc`: Budget en USDC units (1,000,000 = 1 USDC)
- `managerAddress`: Wallet del manager
- `influencerAddress`: Wallet del influencer

**Response:**
```json
{
  "ok": true,
  "data": {
    "appSessionId": "session_1234567890",
    "definition": {
      "protocol": "growi-campaign-v1",
      "participants": [
        "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "0x...",
        "0x..."
      ],
      "weights": [0, 0, 100, 0],
      "quorum": 100,
      "asset": "ytest.usd"
    },
    "allocations": [
      {
        "participant": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        "amount": "1000000"
      },
      {
        "participant": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "amount": "0"
      },
      {
        "participant": "0x...",
        "amount": "0"
      },
      {
        "participant": "0x...",
        "amount": "0"
      }
    ],
    "version": 0,
    "createdAt": "2026-02-08T00:00:00.000Z"
  }
}
```

---

### GET /api/yellow/app-sessions/:id

Obtiene los detalles de una sesión.

**Request:**
```bash
GET http://localhost:3000/api/yellow/app-sessions/session_1234567890
```

**Response:**
```json
{
  "ok": true,
  "data": {
    "appSessionId": "session_1234567890",
    "definition": { ... },
    "allocations": [ ... ],
    "version": 1
  }
}
```

---

### POST /api/yellow/app-sessions/payout

Aplica un payout al influencer.

**Request:**
```bash
POST http://localhost:3000/api/yellow/app-sessions/payout
Content-Type: application/json

{
  "appSessionId": "session_1234567890",
  "earnedUsdc": "250000",
  "feeBps": 200
}
```

**Fields:**
- `appSessionId`: ID de la sesión
- `earnedUsdc`: Cantidad ganada en USDC units (250,000 = 0.25 USDC)
- `feeBps`: Fee en basis points (200 = 2%)

**Response:**
```json
{
  "ok": true,
  "data": {
    "appSessionId": "session_1234567890",
    "version": 1,
    "allocations": [
      {
        "participant": "0x...",
        "amount": "744900"
      },
      {
        "participant": "0x...",
        "amount": "250000"
      },
      {
        "participant": "0x...",
        "amount": "0"
      },
      {
        "participant": "0x...",
        "amount": "5100"
      }
    ]
  }
}
```

---

### POST /api/yellow/app-sessions/claim

Retira fondos de la sesión.

**Request:**
```bash
POST http://localhost:3000/api/yellow/app-sessions/claim
Content-Type: application/json

{
  "appSessionId": "session_1234567890",
  "participant": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "amountUsdc": "250000"
}
```

**Fields:**
- `appSessionId`: ID de la sesión
- `participant`: Wallet que retira fondos
- `amountUsdc`: Cantidad a retirar (250,000 = 0.25 USDC)

**Response:**
```json
{
  "ok": true,
  "data": {
    "appSessionId": "session_1234567890",
    "version": 2,
    "allocations": [
      {
        "participant": "0x...",
        "amount": "744900"
      },
      {
        "participant": "0x...",
        "amount": "0"
      },
      {
        "participant": "0x...",
        "amount": "0"
      },
      {
        "participant": "0x...",
        "amount": "5100"
      }
    ]
  }
}
```

---

## 💰 Faucet

### POST /api/yellow/faucet

Solicita ytest.usd de prueba.

**Request:**
```bash
POST http://localhost:3000/api/yellow/faucet
Content-Type: application/json

{
  "userAddress": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
}
```

**Response:**
```json
{
  "ok": true,
  "data": {
    "amount": "1000000",
    "asset": "ytest.usd",
    "recipient": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "txHash": "0x..."
  }
}
```

---

## 🔢 Conversión USDC

```
1 USDC = 1,000,000 units

Ejemplos de conversión:
0.1 USDC   = 100,000 units
0.25 USDC  = 250,000 units
0.5 USDC   = 500,000 units
1 USDC     = 1,000,000 units
10 USDC    = 10,000,000 units
100 USDC   = 100,000,000 units
```

---

## 📐 Cálculo de Fees

### Basis Points (BPS)

```
100 BPS = 1%
200 BPS = 2%
500 BPS = 5%
1000 BPS = 10%

Formula:
fee = (amount × feeBps) / 10000
```

### Ejemplos

```
Earned: 250,000 units (0.25 USDC)
Fee: 200 BPS (2%)

Cálculo:
fee = (250,000 × 200) / 10,000 = 5,000 units (0.005 USDC)
total = 250,000 + 5,000 = 255,000 units (0.255 USDC)

Distribución:
- Influencer: 250,000 (0.25 USDC)
- Fee Treasury: 5,000 (0.005 USDC)
- Manager paga: 255,000 (0.255 USDC)
```

---

## ⚠️ Errores Comunes

### 400 Bad Request - Validation Error

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "errors": [...]
    }
  }
}
```

**Causa**: Body del request inválido
**Solución**: Revisar campos requeridos

---

### 404 Not Found - Session Not Found

```json
{
  "ok": false,
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "Session not found"
  }
}
```

**Causa**: Session ID no existe
**Solución**: Verificar que el ID sea correcto

---

### 500 Internal Server Error - Platform Wallets Not Configured

```json
{
  "ok": false,
  "error": {
    "code": "SERVER_ERROR",
    "message": "Platform wallets not configured..."
  }
}
```

**Causa**: Faltan `YELLOW_JUDGE_PK` o `YELLOW_FEE_PK` en .env
**Solución**: Configurar las keys en .env

---

### 400 Bad Request - Insufficient Balance

```json
{
  "ok": false,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient manager balance: 500000 < 1000000"
  }
}
```

**Causa**: Manager no tiene suficiente balance
**Solución**: Reducir el monto del payout

---

## 🔐 Autenticación

Actualmente **NO hay autenticación** en la API.

**Razones:**
- Sistema en desarrollo (testnet)
- App Sessions son off-chain (sin fondos reales)
- Frontend maneja la autenticación con WAAP

**Para producción:**
- Implementar JWT tokens
- Rate limiting
- API keys por usuario

---

## 📊 Rate Limits

Actualmente **sin límites**.

**Para producción:**
- Implementar rate limiting (ej: 100 req/min)
- Usar Redis para tracking
- Headers: `X-RateLimit-*`

---

## 🧪 Testing

### cURL Examples

```bash
# Health check
curl http://localhost:3000/api/yellow/health

# Create session
curl -X POST http://localhost:3000/api/yellow/app-sessions/create \
  -H "Content-Type: application/json" \
  -d '{
    "budgetUsdc": "1000000",
    "managerAddress": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "influencerAddress": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  }'

# Get session
curl http://localhost:3000/api/yellow/app-sessions/session_1234567890

# Apply payout
curl -X POST http://localhost:3000/api/yellow/app-sessions/payout \
  -H "Content-Type: application/json" \
  -d '{
    "appSessionId": "session_1234567890",
    "earnedUsdc": "250000",
    "feeBps": 200
  }'

# Claim
curl -X POST http://localhost:3000/api/yellow/app-sessions/claim \
  -H "Content-Type: application/json" \
  -d '{
    "appSessionId": "session_1234567890",
    "participant": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "amountUsdc": "250000"
  }'
```

---

## 📚 Ver También

- [README.md](./README.md) - Quick Start
- [SETUP.md](./SETUP.md) - Configuración
- [ONCHAIN_VS_OFFCHAIN.md](./ONCHAIN_VS_OFFCHAIN.md) - Virtual vs Real
