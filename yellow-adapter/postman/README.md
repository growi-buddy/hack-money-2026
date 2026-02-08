# Postman Collection - Yellow Adapter

Testing completo del API con Postman.

---

## 📦 Archivos

### 1. Yellow-Complete-Testing.postman_collection.json

Collection con TODOS los endpoints:
- 🏥 Health & Config
- 💧 Faucet (obtener ytest.usd)
- 🎯 App Sessions (3 wallets)
- 🔥 Channel Close & Settle
- 🚀 Demo Happy Path

**Features**:
- Tests automáticos
- Console logs
- Variables auto-actualizadas

### 2. Yellow-Complete.postman_environment.json

Environment con variables pre-configuradas:
- `base_url`: http://localhost:3003
- `chainId`: 84532 (Base Sepolia)
- `custody_contract`: 0x9f5314...
- Wallets: `wallet1`, `wallet2`, `wallet3`

⚠️ **IMPORTANTE**: Este archivo usa placeholders. Debes reemplazarlos con tus propias keys.

---

## 🚀 Setup

### 1. Importar en Postman

```
1. Abrir Postman
2. Click "Import"
3. Arrastrar estos 2 archivos:
   - Yellow-Complete-Testing.postman_collection.json
   - Yellow-Complete.postman_environment.json
4. Click "Import"
```

### 2. Configurar Environment

```
1. En Postman, click en el selector de environment (arriba derecha)
2. Seleccionar "Yellow Complete Environment"
3. Click en el ícono "👁️" (ojo) → "Edit"
4. Reemplazar los placeholders:

   wallet1_address: 0xTU_ADDRESS_MANAGER
   wallet1_pk: 0xTU_PRIVATE_KEY_MANAGER
   
   wallet2_address: 0xTU_ADDRESS_INFLUENCER
   wallet2_pk: 0xTU_PRIVATE_KEY_INFLUENCER
   
   wallet3_address: 0xTU_ADDRESS_SPECTATOR
   wallet3_pk: 0xTU_PRIVATE_KEY_SPECTATOR

5. Click "Save"
```

**¿Cómo obtener wallets de test?**

Ver: **[../SETUP.md](../SETUP.md)** sección "Generar Wallets de Test"

Opción rápida:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Sincronizar con .env

Las wallets en Postman deben ser las MISMAS que en tu `.env`:

```bash
# .env
YELLOW_MANAGER_PK=0xTU_KEY_1
YELLOW_INFLUENCER_PK=0xTU_KEY_2
YELLOW_JUDGE_PK=0xTU_KEY_3
```

```
# Postman environment
wallet1_pk=0xTU_KEY_1  (Manager)
wallet2_pk=0xTU_KEY_2  (Influencer)
wallet3_pk=0xTU_KEY_3  (opcional)
```

**Importante**: El `YELLOW_JUDGE_PK` del .env es la **wallet de Growi** que controla todos los payouts.

---

## 🧪 Testing

### Flujo Básico (App Sessions - Off-chain)

```
1. Ejecutar carpeta "🎯 App Sessions (3 Wallets)"
2. Ver resultados en Console (abajo en Postman)
3. Verificar que todos los tests pasen ✅
```

**No necesitas tokens** - Todo es off-chain.

### Flujo Avanzado (Happy Path - On-chain)

```
1. Obtener ETH de faucet:
   https://www.alchemy.com/faucets/base-sepolia
   
2. Ejecutar "💧 Faucet - Request Tokens All"
   → Obtiene ytest.usd para todas tus wallets
   
3. Ejecutar "🔥 Demo Happy Path"
   → Hace TXs reales en Base Sepolia
   
4. Ver TX hash en Basescan:
   https://sepolia.basescan.org/tx/0x...
```

**Necesitas tokens reales** - ETH para gas, ytest.usd para balance.

---

## 📊 Estructura de la Collection

```
Yellow Complete Testing
├── 🏥 Health & Config (2 requests)
│   ├── Health Check
│   └── Get Config
│
├── 💧 Faucet (4 requests)
│   ├── Request Tokens - All Wallets
│   ├── Request Tokens - Manager
│   ├── Request Tokens - Influencer
│   └── Request Tokens - Custom Address
│
├── 🎯 App Sessions (8 requests)
│   ├── Create Session
│   ├── Get Session (Initial)
│   ├── Payout #1 (0.25 USDC)
│   ├── Payout #2 (0.15 USDC)
│   ├── Payout #3 (0.1 USDC)
│   ├── Get Session (After Payouts)
│   ├── Claim (0.2 USDC)
│   └── Get Session (Final)
│
└── 🔥 Channel Close & Settle (1 request)
    └── Demo Happy Path
```

---

## 🔐 Seguridad

### ⚠️ NUNCA subas a GitHub:

- ❌ Private keys reales
- ❌ API keys de producción
- ❌ Wallets con fondos reales

### ✅ Solo usa en Postman:

- ✅ Wallets de testnet (Base Sepolia)
- ✅ Private keys de prueba
- ✅ Fondos de faucets gratuitos

**El archivo en GitHub tiene placeholders**. Cada desarrollador debe configurar sus propias keys localmente.

---

## 🐛 Troubleshooting

### Error: "wallet1_address is not defined"

**Causa**: No configuraste el environment.

**Solución**:
1. Click en selector de environment (arriba derecha)
2. Seleccionar "Yellow Complete Environment"
3. Editar y agregar tus addresses/keys

### Error: "VALIDATION_ERROR: Invalid Ethereum address"

**Causa**: Address mal formateada.

**Solución**:
- Address debe empezar con `0x`
- Debe tener 40 caracteres hex después del `0x`
- Ejemplo: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbB`

### Tests fallan con "Session not found"

**Causa**: No ejecutaste "Create Session" primero.

**Solución**:
- Ejecutar los requests en orden (de arriba a abajo)
- O ejecutar toda la carpeta con "Run folder"

---

## 📚 Más Info

- **[../SETUP.md](../SETUP.md)** - Setup y configuración
- **[../API.md](../API.md)** - Referencia de endpoints
- **[../TESTING.md](../TESTING.md)** - Guía de testing completa

---

**🚀 Ready to test!**

Importa los archivos, configura tus keys, y ejecuta la collection.
