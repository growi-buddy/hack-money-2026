# On-Chain vs Off-Chain: ¿Qué Estoy Usando?

Guía para entender qué es real (on-chain) y qué es virtual (off-chain).

---

## 🔍 Dos Modos de Operación

### 1️⃣ App Sessions (OFF-CHAIN) - Actual

**Lo que estás usando ahora**

```
✓ Super rápido (sin gas)
✓ Sin confirmaciones
✓ Sin MetaMask
✗ No es "real" en blockchain
✗ No transfiere fondos reales
```

#### Flujo:
```bash
1. Manager crea sesión
   → Se guarda en memoria del servidor
   → Budget es VIRTUAL (no necesitas fondos)

2. Admin aplica payout
   → Actualiza balances locales
   → Judge (Growi) firma off-chain

3. Influencer hace claim
   → Reduce su balance virtual
   → No hay TX on-chain
```

#### Cuándo Usar:
- Testing rápido
- MVP sin fondos reales
- Prototipo de UX

---

### 2️⃣ State Channels (ON-CHAIN + OFF-CHAIN)

**Para transacciones reales**

```
✓ Fondos reales en blockchain
✓ Seguridad on-chain
✓ Payouts final on-chain
✗ Necesitas ETH para gas
✗ Necesitas USDC real
✗ Confirmaciones más lentas
```

#### Flujo:
```bash
1. Create Channel (ON-CHAIN)
   → TX en Base Sepolia
   → Deposita USDC real en contrato
   → MetaMask se abre para firmar

2. Payouts (OFF-CHAIN)
   → Múltiples payouts sin gas
   → Firmas criptográficas

3. Close Channel (ON-CHAIN)
   → TX en Base Sepolia
   → Distribuye fondos reales
   → MetaMask se abre para firmar
```

#### Cuándo Usar:
- Producción con fondos reales
- Necesitas garantías on-chain
- Settlement final verificable

---

## 📊 Comparación

| Feature | App Sessions | State Channels |
|---------|-------------|----------------|
| MetaMask | ❌ No | ✅ Sí |
| Gas fees | ❌ $0 | ✅ ~$0.50 |
| Fondos reales | ❌ No | ✅ Sí |
| Velocidad | ⚡ Instantáneo | 🐢 15-30 seg |
| Seguridad | 🔒 Confianza en Growi | 🔐 Blockchain |
| Testing | ✅ Perfecto | ❌ Necesitas fondos |

---

## 🚀 Cómo Hacer Transacciones REALES

### Paso 1: Conseguir Fondos de Test

```bash
# 1. ETH en Base Sepolia (para gas)
https://www.alchemy.com/faucets/base-sepolia

# 2. Yellow test USDC (ytest.usd)
POST http://localhost:3002/api/yellow/faucet
Body: {
  "userAddress": "0xTU_WALLET_ADDRESS"
}

# Respuesta:
{
  "ok": true,
  "data": {
    "amount": "1000000",  // 1 USDC
    "txHash": "0x..."
  }
}
```

### Paso 2: Aprobar Contrato

Antes de crear un canal, necesitas aprobar que el contrato de custody pueda gastar tus USDC:

```bash
# En tu wallet (MetaMask), aprobar:
Contract: 0x019B65A265EB3363822f2752141b3dF16131b262
Token: ytest.usd
Amount: 1000000 (o más)
```

### Paso 3: Crear Canal On-Chain

```bash
# Opción A: Usar endpoint legacy
POST http://localhost:3002/api/yellow/demo/happy-path

# Necesitas añadir temporalmente a .env:
YELLOW_MANAGER_PK=0x...
YELLOW_INFLUENCER_PK=0x...

# Opción B: Implementar en frontend (futuro)
# Manager conecta MetaMask
# Frontend llama a custody.create(channel, signatures)
# MetaMask pide firma
```

---

## 🔧 Estado Actual del Proyecto

### ✅ Implementado (Off-Chain)

```
✓ App Sessions API
✓ Frontend con WAAP
✓ Create Session
✓ Apply Payout
✓ Claim
✓ Balance tracking
```

### 🚧 Pendiente (On-Chain)

```
⏳ Channel creation desde frontend
⏳ Deposit USDC real
⏳ Channel closure
⏳ On-chain settlement
⏳ Dispute resolution
```

---

## 💡 Recomendación

### Para Testing MVP:
**Usa App Sessions (actual)**
- Rápido
- Sin costos
- Fácil de iterar

### Para Producción:
**Implementa State Channels**
- Fondos reales
- Seguridad on-chain
- Settlement verificable

---

## 🎯 Próximos Pasos

Si quieres implementar transacciones reales:

1. **Implementar Channel Creation en Frontend**
   ```typescript
   // Manager conecta MetaMask
   // Firma channel creation
   // Deposita USDC real
   ```

2. **Implementar Channel Closure**
   ```typescript
   // Admin cierra canal
   // Distribuye fondos on-chain
   // MetaMask firma TX
   ```

3. **Añadir Approve USDC Flow**
   ```typescript
   // Antes de crear canal
   // Aprobar custody contract
   ```

4. **Integrar con Contratos**
   ```typescript
   // custody.create()
   // custody.close()
   // adjudicator.dispute()
   ```

---

## 🔐 Seguridad

### App Sessions (Off-Chain)
```
✓ Rápido y barato
✗ Confías en que Growi no manipule balances
✗ No hay prueba criptográfica on-chain
```

### State Channels (On-Chain)
```
✓ Fondos en contrato on-chain
✓ Pruebas criptográficas
✓ Dispute resolution si algo falla
✗ Más complejo de implementar
```

---

**¿Estás listo para implementar transacciones reales?**

Ver `SETUP.md` para más detalles sobre faucets y configuración.
