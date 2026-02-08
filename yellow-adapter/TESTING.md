# Testing con Postman

Guía simple para testear con Postman usando 3 wallets.

---

## 📥 Importar en Postman

### Paso 1: Importar 2 archivos

1. Abrir Postman
2. Click **"Import"**
3. Arrastrar estos archivos:
   ```
   postman/Yellow-Complete.postman_environment.json
   postman/Yellow-Complete-Testing.postman_collection.json
   ```
4. Click **"Import"**

### Paso 2: Activar Environment

En la esquina superior derecha:
```
Seleccionar: "Yellow Complete Environment"
```

✅ Listo! Las 3 wallets ya están configuradas automáticamente.

---

## 🔑 Las 3 Wallets

### Wallet 1 - Manager

```
Rol: Provee presupuesto (campaign creator)
Address: La que generaste y pusiste en .env como YELLOW_MANAGER_PK
```

### Wallet 2 - Influencer

```
Rol: Recibe payouts (content creator)
Address: La que generaste y pusiste en .env como YELLOW_INFLUENCER_PK
```

### Wallet 3 - Spectator

```
Rol: Observer (opcional)
Address: Cualquier wallet adicional que quieras usar
```

### 🔑 Wallet de Growi (Judge)

```
Rol: Controla TODOS los payouts (platform wallet)
Variable: YELLOW_JUDGE_PK en .env
Esta es LA WALLET MÁS IMPORTANTE - firma todos los updates de App Sessions
```

⚠️ **IMPORTANTE**: 
- Genera tus propias keys (ver SETUP.md)
- NUNCA uses keys de producción
- Los placeholders en GitHub son solo ejemplos

---

## 💧 Paso 0: Obtener Tokens (Solo para Happy Path)

Si vas a ejecutar **Happy Path Demo** (transacciones reales), primero necesitas tokens:

### 1. ETH para gas

Obtener de faucets externos:
- Alchemy: https://www.alchemy.com/faucets/base-sepolia
- Coinbase: https://portal.cdp.coinbase.com/products/faucet

Enviar ~0.01 ETH a:
- Manager: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB`
- Influencer: `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`

### 2. ytest.usd (Yellow test USDC)

Desde Postman, ejecutar:
```
POST /api/yellow/faucet/all
```

O desde terminal:
```bash
curl -X POST http://localhost:3003/api/yellow/faucet/all
```

**Esperar respuesta**:
```json
{
  "ok": true,
  "data": {
    "summary": {
      "successful": 4,
      "failed": 0
    }
  }
}
```

✅ **Ahora tus wallets tienen ytest.usd** y puedes ejecutar Happy Path.

⚠️ **Para App Sessions**: NO necesitas este paso (todo es off-chain).

---

## 🧪 Testing: App Sessions

### Ejecutar TODO (Más Fácil)

1. Expandir carpeta **"🎯 App Sessions (3 Wallets)"**
2. Click derecho → **"Run folder"**
3. Ver resultados en **Console** (abajo)

Esto ejecuta los 8 requests en orden automáticamente.

### O Ejecutar Uno por Uno

**Orden**:

1. **Create Session**
   - Crea sesión con Manager (Wallet 1) y Influencer (Wallet 2)
   - Budget: 1 USDC virtual

2. **Get Session (Initial State)**
   - Ver allocations iniciales
   - Manager: 1 USDC, Influencer: 0

3. **Payout #1 - Click (0.25 USDC)**
   - Influencer gana 0.25 USDC
   - Fee: 0.005 USDC (2%)

4. **Payout #2 - View (0.15 USDC)**
   - Influencer gana 0.15 USDC más
   - Fee: 0.003 USDC

5. **Payout #3 - Share (0.1 USDC)**
   - Influencer gana 0.1 USDC más
   - Total ganado: 0.5 USDC

6. **Get Session (After Payouts)**
   - Ver estado después de 3 payouts
   - Influencer: ~0.5 USDC

7. **Claim - Influencer retira 0.2 USDC**
   - Influencer retira parte de su balance

8. **Get Session (Final State)**
   - Ver estado final
   - Influencer: ~0.3 USDC restante

---

## 📊 Resultados Esperados

```
Estado Inicial:
├─ Manager: 1.00 USDC
└─ Influencer: 0.00 USDC

Después de 3 Payouts:
├─ Manager: 0.592 USDC
├─ Influencer: 0.398 USDC (ganó 0.5, pero perdió 0.102 en fees distribuidos)
└─ Fee: 0.01 USDC

Después de Claim (0.2 USDC):
├─ Manager: 0.592 USDC
├─ Influencer: 0.198 USDC (retiró 0.2)
└─ Fee: 0.01 USDC
```

---

## 🎯 Ver Console en Postman

Después de ejecutar un request:

1. Abrir **Console** (abajo en Postman)
2. Ver logs detallados:

```
✅ Session created
📊 Session ID: session_1707331200000_abc123
Participants: [...]
Initial Allocations:
  [0] 0x742d35...: 1.00 USDC (Manager)
  [1] 0x5B38Da...: 0.00 USDC (Influencer)
  [2] 0x5CbDd8...: 0.00 USDC (Judge)
  [3] 0x756410...: 0.00 USDC (Fee)
```

---

## 🔥 Demo End-to-End (Happy Path)

Para demo rápido con TXs on-chain:

1. Expandir carpeta **"🔥 Channel Close & Settle"**
2. Ejecutar **"0. [DEMO] Happy Path (Full Flow)"**
3. Esperar ~20 segundos
4. Ver output con TX hashes

**Output**:
```json
{
  "steps": [...],
  "summary": {
    "createTxHash": "0x...",
    "closeTxHash": "0x...",
    "channelId": "0x..."
  }
}
```

5. **Verificar en Explorer**:
   ```
   https://sepolia.basescan.org/tx/<txHash>
   ```

---

## 🐛 Troubleshooting

### Error: "Session not found"

**Causa**: No ejecutaste "Create Session" primero

**Solución**:
1. Ejecutar "Create Session"
2. Verificar en Variables que `app_session_id` tiene valor
3. Reintentar

### Error: "Validation failed"

**Causa**: Formato incorrecto en el body

**Solución**:
- Addresses deben tener formato: `0x` + 40 caracteres hex
- Amounts deben ser strings: `"1000000"` (no números)
- ChainId debe ser número: `84532` (no string)

### Error: "Insufficient manager balance"

**Causa**: El budget del manager no alcanza para el payout + fee

**Ejemplo**:
```
Manager tiene: 100,000
Intentas payout: 200,000
→ Error
```

**Solución**: Reduce el `earnedUsdc` o crea una sesión con más budget.

### Error: "NitroRPC not connected"

**Causa**: Servidor no puede conectar con Yellow

**Solución**:
1. Verificar que `npm run dev` está corriendo
2. Ejecutar "Health Check" para ver detalles
3. Verificar `.env` tiene `YELLOW_WS_URL` correcto

---

## 📝 Ver Variables Actualizadas

En Postman, click en el **ojo** 👁️ (arriba derecha) para ver:

```
✅ app_session_id: session_1707331200000_abc123
✅ wallet1_address: 0x742d35...
✅ wallet2_address: 0x5B38Da...
✅ base_url: http://localhost:3003
```

Estas variables se actualizan automáticamente cuando ejecutas los requests.

---

## 🎓 Entender el Flujo

### Flujo Simple (App Sessions)

```
1. CREATE
   Manager dice: "Tengo 1 USDC para esta campaña"
   Sistema crea sesión con ese budget VIRTUAL

2. PAYOUT (3 veces)
   Influencer gana: 0.25 + 0.15 + 0.1 = 0.5 USDC
   Fee: 2% de 0.5 = 0.01 USDC
   Total deducido del manager: 0.51 USDC

3. CLAIM
   Influencer retira 0.2 USDC de su balance

4. GET SESSION
   Ver estado final:
   - Manager: 0.49 USDC restante
   - Influencer: 0.3 USDC restante
```

### Flujo Avanzado (Channel Close)

```
1. CREATE CHANNEL (on-chain)
   TX en Base Sepolia → Fondos bloqueados

2. PAYOUTS (off-chain)
   Sin gas, instantáneos

3. CLOSE CHANNEL (on-chain)
   TX en Base Sepolia → Settlement final
```

---

## 🎯 Para el Demo

**Mejor opción**: Ejecutar "Happy Path Demo"

1. En Postman, ir a carpeta "Channel Close & Settle"
2. Ejecutar "[DEMO] Happy Path (Full Flow)"
3. Mostrar TX hashes en Base Sepolia Explorer
4. Explicar: "3 payouts off-chain, 2 TXs on-chain"

**Perfecto para pitch** porque muestra TXs reales verificables.

---

## 🛠️ Scripts Auxiliares

Si quieres hacer el flujo **manual** de Channel Close:

```bash
# 1. Firmar mensaje
node scripts/sign-message.js <messageHash> <privateKey>

# 2. Enviar TX
node scripts/send-tx.js <to> <data> <privateKey>
```

Ver **[scripts/README.md](./scripts/README.md)** para más detalles.

---

## 📚 Más Info

- **[API.md](./API.md)** - Referencia completa de endpoints
- **[SETUP.md](./SETUP.md)** - Setup detallado
- **[scripts/README.md](./scripts/README.md)** - Scripts auxiliares

---

**🚀 Listo para testear!**

Importa los archivos de `postman/` y ejecuta la carpeta "App Sessions".
