# 📮 Postman - Guía Rápida

Colección actualizada para probar Growi Campaign Manager.

---

## 🚀 Setup (2 minutos)

### 1. Importar Archivos

En Postman:

```
Import → Seleccionar archivos:
✅ Growi-API.postman_collection.json
✅ Growi.postman_environment.json
```

### 2. Activar Environment

```
Arriba a la derecha:
"No Environment" → "Growi Environment" ✓
```

### 3. Cambiar Puerto (si es necesario)

Si tu servidor corre en otro puerto:

```
Environments → Growi Environment → Edit
baseUrl: http://localhost:3002 (o el puerto que uses)
```

---

## 🎯 Probar (5 minutos)

### Ejecutar en orden:

```
✅ 1. Health Check          → Verifica servidor
🆕 2. Create Session        → Crea campaña (guarda Session ID auto)
📊 3. Get Session Details   → Ve balances actuales
💰 4. Apply Payout          → Admin aplica earnings
💸 5. Claim Funds           → Influencer retira fondos
```

### Expected Flow:

```
1. Health Check
   Response: { "ok": true, "status": "healthy" }

2. Create Session
   Request: Manager + Influencer addresses, budget
   Response: { "ok": true, "data": { "appSessionId": "session_..." } }
   ✅ Session ID se guarda automáticamente

3. Get Session
   Request: usa {{sessionId}}
   Response: Allocations actuales

4. Apply Payout
   Request: earnedUsdc + feeBps
   Response: Allocations actualizadas (version++)

5. Claim Funds
   Request: participant + amountUsdc
   Response: Allocations finales (influencer balance = 0)
```

---

## 🔧 Variables Configuradas

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `baseUrl` | `http://localhost:3000` | URL servidor |
| `sessionId` | (auto) | Se guarda automáticamente |
| `managerAddress` | `0x742d...` | Hardhat account #0 |
| `influencerAddress` | `0x7099...` | Hardhat account #1 |
| `budget` | `1000000` | 1 USDC = 1M units |
| `earnedAmount` | `250000` | 0.25 USDC |
| `claimAmount` | `250000` | 0.25 USDC |
| `feeBps` | `200` | 2% fee |

### Cambiar Valores

Para probar diferentes escenarios:

```
Environments → Growi Environment → Edit

Ejemplos:
- budget: "2000000" (2 USDC)
- earnedAmount: "500000" (0.5 USDC)
- feeBps: "500" (5%)
```

---

## 💡 Tips

### Auto-Save Session ID

El request "Create Session" guarda automáticamente el Session ID:

```javascript
// Ya está configurado en Tests tab:
if (pm.response.code === 200) {
    pm.environment.set('sessionId', response.data.appSessionId);
}
```

### Ver Console

Para ver los logs:

```
View → Show Postman Console (Ctrl+Alt+C o Cmd+Alt+C)
```

### Múltiples Sesiones

Para crear varias campañas:

```
1. Run "Create Session" → Nota el nuevo Session ID
2. Environments → Edit → sessionId → Pega el nuevo ID
3. Run los demás requests con el nuevo ID
```

### Verificar Balances

Después de cada operación:

```
Run "Get Session Details" para ver allocations actualizadas
```

---

## 📊 Conversión Rápida

```
USDC → Units (multiplicar × 1,000,000)
0.1 USDC   = 100,000
0.25 USDC  = 250,000
0.5 USDC   = 500,000
1 USDC     = 1,000,000
10 USDC    = 10,000,000

Units → USDC (dividir ÷ 1,000,000)
250,000 units    = 0.25 USDC
1,000,000 units  = 1 USDC
```

---

## 🔢 Cálculo de Fees

```
Fee (BPS) → Porcentaje
100 BPS = 1%
200 BPS = 2%
500 BPS = 5%
1000 BPS = 10%

Formula:
fee = (amount × feeBps) / 10,000

Ejemplo:
amount = 250,000 units
feeBps = 200 (2%)
fee = (250,000 × 200) / 10,000 = 5,000 units
```

---

## 🧪 Ejemplo Completo

### Escenario: Manager paga 0.25 USDC al Influencer

```
1. CREATE SESSION
   Manager: 1 USDC (1,000,000 units)
   Influencer: 0 USDC

2. APPLY PAYOUT
   Earned: 0.25 USDC (250,000 units)
   Fee: 2% (200 BPS) = 0.005 USDC (5,000 units)
   
   Resultado:
   Manager: 0.745 USDC (745,000 units)
   Influencer: 0.25 USDC (250,000 units)
   Fee: 0.005 USDC (5,000 units)

3. CLAIM FUNDS
   Influencer retira: 0.25 USDC (250,000 units)
   
   Resultado:
   Manager: 0.745 USDC
   Influencer: 0 USDC ✅
   Fee: 0.005 USDC
```

---

## ⚠️ OFF-CHAIN (Virtual)

**IMPORTANTE:** Estos endpoints son **OFF-CHAIN**.

```
✓ Sin gas fees
✓ Instantáneo
✓ No requiere fondos reales
✗ No hay transacciones en blockchain
✗ No se abre MetaMask
```

Es perfecto para:
- Testing rápido
- MVP sin costos
- Prototipar UX

Para transacciones reales on-chain, ver: `ONCHAIN_VS_OFFCHAIN.md`

---

## 🐛 Troubleshooting

### Error 400: Validation Error

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR"
  }
}
```

**Solución:** Revisar que:
- `budgetUsdc` sea string numérico
- Addresses sean formato 0x... (40 hex chars)
- Session ID sea correcto

### Error 404: Session Not Found

```json
{
  "ok": false,
  "error": {
    "code": "SESSION_NOT_FOUND"
  }
}
```

**Solución:** 
- Verificar que Session ID sea correcto
- Ejecutar "Create Session" primero

### Error 500: Platform Wallets Not Configured

```json
{
  "ok": false,
  "error": {
    "code": "SERVER_ERROR",
    "message": "Platform wallets not configured..."
  }
}
```

**Solución:** 
- Revisar que `.env` tenga `YELLOW_JUDGE_PK` y `YELLOW_FEE_PK`
- Reiniciar servidor: `npm run dev`

### Error 400: Insufficient Balance

```json
{
  "ok": false,
  "error": {
    "code": "INSUFFICIENT_BALANCE"
  }
}
```

**Solución:** 
- Manager no tiene suficiente balance
- Reducir `earnedAmount` o crear nueva sesión con más budget

---

## 📚 Ver También

- [README.md](../README.md) - Quick Start
- [API.md](../API.md) - Documentación completa
- [ONCHAIN_VS_OFFCHAIN.md](../ONCHAIN_VS_OFFCHAIN.md) - Virtual vs Real
