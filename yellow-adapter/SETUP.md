# ⚙️ Setup Completo

Guía de instalación y configuración de Growi Campaign Manager.

---

## 📦 Instalación

```bash
# Clonar repo
git clone <repo-url>
cd yellow-adapter

# Instalar dependencias
npm install
```

---

## 🔧 Configuración

### 1. Copiar .env

```bash
cp .env.example .env
```

### 2. Generar Private Keys

```bash
# Generar 2 keys para la plataforma:
node -e "console.log('YELLOW_JUDGE_PK=0x' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('YELLOW_FEE_PK=0x' + require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Editar .env

```bash
# Solo necesitas configurar estas 2 líneas:
YELLOW_JUDGE_PK=
YELLOW_FEE_PK=

# El resto ya está configurado correctamente ✓
```

---

## 🚀 Levantar Servidor

```bash
npm run dev
```

Abre: **http://localhost:3000**

---

## 🎨 Frontend

### Manager (http://localhost:3000/manager)

1. Click "Connect Wallet"
2. Elige tu método de autenticación:
   - 📧 Email
   - 🔗 Google / Twitter
   - 🦊 MetaMask
3. Crea una campaña

### Influencer (http://localhost:3000/influencer)

1. Click "Connect Wallet"
2. Ingresa el Session ID
3. Retira fondos

### Admin (http://localhost:3000/admin)

1. Ingresa Session ID
2. Aplica payouts
3. La plataforma (Judge) firma automáticamente

---

## 📡 API (Postman)

### Importar Colección

```bash
# 1. Importar archivo:
postman/Growi-API.postman_collection.json

# 2. Importar environment:
postman/Growi.postman_environment.json

# 3. Probar endpoint "Health Check"
```

### Probar Flujo Completo

```bash
1. Health Check       → Verifica que el servidor funciona
2. Create Session     → Crea una campaña
3. Get Session        → Ve los detalles
4. Apply Payout       → Aplica earnings al influencer
5. Claim              → Influencer retira fondos
```

---

## 💰 Faucets (Para On-Chain)

Si quieres hacer transacciones reales on-chain:

### 1. ETH en Base Sepolia

```
URL: https://www.alchemy.com/faucets/base-sepolia
Cantidad: ~0.05 ETH (para gas)
```

### 2. Yellow test USDC

```bash
curl -X POST http://localhost:3000/api/yellow/faucet \
  -H "Content-Type: application/json" \
  -d '{"userAddress": "0xTU_WALLET_ADDRESS"}'

# Te da: 1 ytest.usd (= 1,000,000 units)
```

---

## 🔐 Modelo de Seguridad

### Keys en el Servidor (.env)

```bash
YELLOW_JUDGE_PK    # Growi platform (firma payouts)
YELLOW_FEE_PK      # Fee treasury (recibe fees)
```

### Keys en el Frontend (WAAP)

```bash
Manager Address     → Wallet conectada en /manager
Influencer Address  → Wallet conectada en /influencer
```

**❌ NUNCA pongas las private keys de usuarios en .env**

---

## 🧪 Testing

### Opción 1: Frontend

```
1. http://localhost:3000/manager
2. Conectar wallet
3. Crear campaña
4. Copiar Session ID
5. Ir a /admin y aplicar payout
6. Ir a /influencer y hacer claim
```

### Opción 2: Postman

```
1. Importar colección
2. Ejecutar requests en orden:
   - Create Session
   - Apply Payout
   - Claim
```

### Opción 3: cURL

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
```

---

## 🐛 Troubleshooting

### Error: "Platform wallets not configured"

```bash
# Solución: Revisa que .env tenga:
YELLOW_JUDGE_PK=0x...
YELLOW_FEE_PK=0x...
```

### Error: "WAAP SDK not found"

```bash
# Solución: Instalar WAAP
npm install @human.tech/waap-sdk
```

### Error: "Port 3000 in use"

```bash
# Opción 1: Cambiar puerto
PORT=3001 npm run dev

# Opción 2: Matar proceso
lsof -ti:3000 | xargs kill -9
```

### Frontend se ve roto

```bash
# Limpiar cache de Tailwind
rm -rf .next
npm run dev
```

---

## 📂 Estructura del Proyecto

```
yellow-adapter/
├── app/                  # Frontend Next.js
│   ├── api/             # API routes
│   ├── manager/         # Manager dashboard
│   ├── influencer/      # Influencer dashboard
│   └── admin/           # Admin dashboard
├── src/
│   ├── lib/             # Utilidades
│   │   └── yellow/      # Yellow SDK integration
│   └── components/      # React components
├── public/              # Assets estáticos
├── postman/             # Postman collections
└── .env                 # Configuración
```

---

## 🎯 Próximos Pasos

1. ✅ Levantar servidor: `npm run dev`
2. ✅ Probar frontend: `http://localhost:3000`
3. ✅ Importar Postman
4. ✅ Crear primera campaña

**¿Dudas?** Ver [README.md](./README.md) o [API.md](./API.md)
