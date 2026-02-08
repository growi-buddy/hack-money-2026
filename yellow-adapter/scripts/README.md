# Scripts Auxiliares

Scripts Node.js para operaciones manuales con wallets.

---

## 📋 Contenido

### 1. sign-message.js

Firma un mensaje con una wallet de test.

**Uso**: Para firmar el `messageToSign` del endpoint `/prepare-close`

**Comando**:
```bash
node scripts/sign-message.js <messageHash> <privateKey>
```

**Ejemplo**:
```bash
# 1. Llamar a /prepare-close, copiar el "messageToSign"
# 2. Firmar con tu wallet

node scripts/sign-message.js \
  0xabc123... \
  0xYOUR_PRIVATE_KEY_HERE

# Output:
# === SIGNATURE ===
# 0x9876543210fedcba...
# ================
```

**Siguiente paso**: Copiar la signature a `/close-intent` body.

---

### 2. send-tx.js

Envía una transacción on-chain con una wallet de test.

**Uso**: Para enviar la TX del endpoint `/close-intent`

**Comando**:
```bash
node scripts/send-tx.js <to> <data> <privateKey> [rpcUrl]
```

**Ejemplo**:
```bash
# 1. Llamar a /close-intent, copiar el txIntent (to, data)
# 2. Enviar la TX

node scripts/send-tx.js \
  0x9f5314FB00C98Eb274B83001e37902c91b332e8A \
  0x123abc... \
  0xYOUR_PRIVATE_KEY_HERE

# Output:
# === TRANSACTION SENT ===
# TX Hash: 0xdef456...
# Explorer: https://sepolia.basescan.org/tx/0xdef456...
# =======================
```

**RPC URL**: Por defecto usa `https://sepolia.base.org` (Base Sepolia)

---

## 🎯 Cuándo usar estos scripts

### Opción 1: Demo Automático (Recomendado)

```bash
# Ejecutar desde Postman:
POST /api/yellow/demo/happy-path

# Todo se hace automáticamente (create + operate + close)
```

**Ventaja**: Rápido, perfecto para demos.

### Opción 2: Flujo Manual (Con estos scripts)

```bash
# 1. Preparar cierre
POST /api/yellow/channel/prepare-close
→ Devuelve messageToSign

# 2. Firmar (con este script)
node scripts/sign-message.js <messageToSign> <privateKey>
→ Devuelve signature

# 3. Generar TX
POST /api/yellow/channel/close-intent
Body: { userSig: "<signature>" }
→ Devuelve txIntent (to, data)

# 4. Enviar TX (con este script)
node scripts/send-tx.js <to> <data> <privateKey>
→ TX enviada a Base Sepolia
```

**Ventaja**: Control total, útil para testing avanzado.

---

## ⚠️ Importante

**Estas wallets son SOLO para testing**:
- NUNCA usar en producción
- NUNCA usar wallets con fondos reales
- Son para testnet (Base Sepolia)

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'viem'"

```bash
npm install
```

### Error: "Invalid private key"

- Debe empezar con `0x`
- Debe tener 64 caracteres hex después de `0x`
- Usa tus propias keys de test (ver SETUP.md)

### Error: "Insufficient funds"

Tu wallet necesita ETH en Base Sepolia:
- Faucet: https://www.alchemy.com/faucets/base-sepolia

---

## 📚 Ver También

- **[API.md](../API.md)** - Endpoints de Channel Close
- **[TESTING.md](../TESTING.md)** - Testing con Postman
