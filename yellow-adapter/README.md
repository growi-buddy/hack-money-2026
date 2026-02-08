# 🌱 Growi Campaign Manager

Sistema de pagos para campañas de influencer marketing usando Yellow Network.

![Growi](public/growi_blue.png)

---

## 🚀 Quick Start

```bash
# 1. Instalar
npm install

# 2. Configurar .env (solo 2 keys necesarias)
cp .env.example .env
# Edita: YELLOW_JUDGE_PK y YELLOW_FEE_PK

# 3. Levantar servidor
npm run dev

# 4. Abrir frontend
http://localhost:3000
```

---

## 🎯 ¿Qué Hace?

**Sistema de pagos off-chain super rápido:**

```
Manager    → Crea campaña con presupuesto
Admin      → Aplica payouts al influencer
Influencer → Retira sus earnings
```

**Características:**
- ⚡ Pagos instantáneos (sin gas fees)
- 🔐 No-custodial (usuarios controlan sus wallets)
- 🌐 Frontend moderno con WAAP
- 💰 Off-chain primero, on-chain después

---

## 📱 Usar el Frontend

### 1. Como Manager (Crear Campaña)

```
http://localhost:3000/manager

1. Click "Connect Wallet"
2. Elige: Email / Google / MetaMask
3. Llena el form:
   - Influencer Address: 0x...
   - Budget: 1000000 (= 1 USDC)
4. Click "Crear Campaña"
5. Copia el Session ID
```

### 2. Como Admin (Aplicar Payout)

```
http://localhost:3000/admin

1. Pega el Session ID
2. Click "Cargar"
3. Llena:
   - Earned: 250000 (= 0.25 USDC)
   - Fee: 200 (= 2%)
4. Click "Aplicar Payout"
```

### 3. Como Influencer (Retirar)

```
http://localhost:3000/influencer

1. Click "Connect Wallet"
2. Pega el Session ID
3. Cantidad: 250000 (= 0.25 USDC)
4. Click "Retirar Fondos"
```

---

## 🔧 Usar la API (Postman)

### Setup

```bash
# 1. Importar colección
postman/Growi-API.postman_collection.json

# 2. Importar environment
postman/Growi.postman_environment.json

# 3. Probar
Collection → "1. Create Session"
```

### Endpoints Principales

```bash
# Health check
GET /api/yellow/health

# Crear sesión
POST /api/yellow/app-sessions/create
{
  "budgetUsdc": "1000000",
  "managerAddress": "0x...",
  "influencerAddress": "0x..."
}

# Aplicar payout
POST /api/yellow/app-sessions/payout
{
  "appSessionId": "session_...",
  "earnedUsdc": "250000",
  "feeBps": 200
}

# Claim
POST /api/yellow/app-sessions/claim
{
  "appSessionId": "session_...",
  "participant": "0x...",
  "amountUsdc": "250000"
}
```

---

## ⚙️ Configuración (.env)

**Solo necesitas 2 keys:**

```bash
# Platform keys (Growi)
YELLOW_JUDGE_PK=0x...    # Firma payouts
YELLOW_FEE_PK=0x...      # Recibe fees

# Generar keys:
node -e "console.log('0x' + require('crypto').randomBytes(32).toString('hex'))"
```

**Ya NO necesitas:**
- ❌ `YELLOW_MANAGER_PK` → Conecta desde frontend
- ❌ `YELLOW_INFLUENCER_PK` → Conecta desde frontend

---

## 🎨 Stack Tecnológico

```
Frontend:
- Next.js 16 + React 19
- Tailwind CSS 4
- WAAP SDK (wallet connection)
- TypeScript

Backend:
- Next.js API Routes
- Yellow Network SDK
- Viem (Ethereum)
- Zod (validation)

Blockchain:
- Base Sepolia (testnet)
- Yellow Network (state channels)
```

---

## 📚 Documentación

### Esenciales

1. **[README.md](.)** - Esta página (Quick Start)
2. **[SETUP.md](./SETUP.md)** - Configuración detallada
3. **[API.md](./API.md)** - Referencia completa de API
4. **[ONCHAIN_VS_OFFCHAIN.md](./ONCHAIN_VS_OFFCHAIN.md)** - ¿Virtual o real?

### Extra

5. **[SECURITY.md](./SECURITY.md)** - Manejo de keys
6. **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios

---

## 🔍 Off-Chain vs On-Chain

### Actualmente: Off-Chain (Virtual)

```
✓ Instantáneo
✓ Sin gas fees
✓ Perfecto para testing
✗ No hay fondos reales en blockchain
```

### Futuro: On-Chain (Real)

```
✓ Fondos reales
✓ Transacciones verificables
✗ Necesita ETH y USDC
✗ Más lento (15-30 seg)
```

**📖 Ver detalles**: `ONCHAIN_VS_OFFCHAIN.md`

---

## 💰 Conversión USDC

```
1 USDC = 1,000,000 units

Ejemplos:
0.25 USDC = 250,000 units
0.5 USDC  = 500,000 units
1 USDC    = 1,000,000 units
10 USDC   = 10,000,000 units
```

---

## 🔐 Modelo de Seguridad

### No-Custodial para Usuarios

```
Manager    → Conecta su wallet (MetaMask/Email)
Influencer → Conecta su wallet (MetaMask/Email)

❌ Sin private keys en el servidor
✅ Usuarios controlan sus fondos
```

### Platform Wallet (Growi)

```
Judge (Growi) → Firma payouts con YELLOW_JUDGE_PK
Fee Treasury  → Recibe fees con YELLOW_FEE_PK

✅ Quorum 100% (Growi tiene control total)
⚠️ Trade-off: UX rápida vs total descentralización
```

---

## 🐛 Troubleshooting

### "Platform wallets not configured"

```bash
# Falta configurar .env
# Añade estas 2 keys:
YELLOW_JUDGE_PK=0x...
YELLOW_FEE_PK=0x...
```

### "Connect Wallet" no funciona

```bash
# Revisa que WAAP esté instalado:
npm install @human.tech/waap-sdk
```

### Puerto en uso

```bash
# Cambiar puerto en package.json:
"dev": "next dev --port 3001"
```

---

## 📞 Soporte

- **Docs Yellow**: https://docs.yellow.org
- **WAAP SDK**: https://docs.waap.xyz
- **Base Sepolia Faucet**: https://www.alchemy.com/faucets/base-sepolia

---

## 📝 Licencia

MIT

---

**¿Listo para empezar?** 🚀

```bash
npm run dev
# Abre: http://localhost:3000
```
