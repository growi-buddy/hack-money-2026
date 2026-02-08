# 🌱 Growi Campaign Manager

Servicio Next.js con API + Frontend moderno para integración con Yellow Network.

🎨 **Tema Azul**: UI moderna con glassmorphism, gradientes y branding Growi  
🆕 **Frontend WAAP**: Wallet as a Protocol para Manager, Influencer y Admin

---

## 🚀 Quick Start

```bash
# 1. Instalar
npm install
npm install @human.tech/waap-sdk  # Frontend SDK

# 2. Configurar backend (.env)
cp .env.example .env
# Solo necesitas configurar Judge y Fee keys (ver SETUP.md)

# 3. Levantar
npm run dev

# 4. Usar
# Frontend: http://localhost:3003
# API: curl http://localhost:3003/api/yellow/health
```

---

## 📖 Documentación

1. **README.md** (este archivo) - Overview
2. **[FRONTEND_COMPLETE.md](./FRONTEND_COMPLETE.md)** - 🎨 Tema azul y UI completa
3. **[SETUP.md](./SETUP.md)** - Instalación backend
4. **[SETUP_WAAP.md](./SETUP_WAAP.md)** - 🆕 Frontend con WAAP
5. **[API.md](./API.md)** - Todos los endpoints con ejemplos
6. **[TESTING.md](./TESTING.md)** - Testing con Postman
7. **[SECURITY.md](./SECURITY.md)** - 🔐 Wallets y private keys
8. **[MIGRATION_WAAP.md](./MIGRATION_WAAP.md)** - Migración a WAAP
9. **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios

---

## 🎯 Qué hace

### App Sessions (Off-chain Payouts)

Crea campañas con payouts instantáneos sin gas:

```
POST /api/yellow/app-sessions/create
Body: {
  "budgetUsdc": "1000000",     ← Budget VIRTUAL (no necesitas fondos reales)
  "managerAddress": "0x...",   ← Wallet 1
  "influencerAddress": "0x..." ← Wallet 2
}

→ Sistema crea sesión con 1 USDC virtual
→ Puedes hacer payouts off-chain
→ Influencer puede hacer claims
```

**¿De dónde sale el budget?**
- Es un número que TÚ defines (virtual, off-chain)
- NO necesitas tener fondos reales
- Es como contabilidad interna

**¿Qué token se usa?**
- `"ytest.usd"` (Yellow test USDC)
- Definido en el código (hardcoded)
- Para cambiar: editar `src/lib/yellow/appSessions/service.ts` línea 37

### Channel Close & Settle (On-chain)

Cierra canales con settlement on-chain verificable:

```
1. Create channel → TX on-chain
2. Payouts off-chain → Sin gas
3. Close channel → TX on-chain (settlement)
```

---

## 🧪 Testing

### Postman (Recomendado)

```bash
# Importar:
postman/Yellow-Complete.postman_environment.json
postman/Yellow-Complete-Testing.postman_collection.json

# Ejecutar carpeta: "App Sessions (3 Wallets)"
```

Ver **[TESTING.md](./TESTING.md)** para instrucciones detalladas.

---

## 🔐 Seguridad: NO Custodial

El adapter **NO custodia keys de usuarios**:

- ✅ Solo genera "intents" (qué firmar, qué enviar)
- ✅ Usuario firma desde su wallet
- ✅ Usuario controla fondos
- ❌ Adapter NUNCA tiene acceso a keys

Las wallets en `.env` son **SOLO para testing local**.

---

## 📊 Endpoints

### Health & Config
- `GET /api/yellow/health`
- `GET /api/yellow/config`

### Faucet (Obtener ytest.usd)
- `POST /api/yellow/faucet/all`
- `POST /api/yellow/faucet/manager`
- `POST /api/yellow/faucet/influencer`
- `POST /api/yellow/faucet`

### App Sessions
- `POST /api/yellow/app-sessions/create`
- `POST /api/yellow/app-sessions/payout`
- `POST /api/yellow/app-sessions/claim`
- `GET /api/yellow/app-sessions/:id`

### Channel Close
- `POST /api/yellow/channel/prepare-close`
- `POST /api/yellow/channel/close-intent`
- `POST /api/yellow/demo/happy-path`

Ver **[API.md](./API.md)** para detalles y ejemplos.

---

## 🎓 Conceptos Clave

### Budget Virtual

```json
{ "budgetUsdc": "1000000" }  // 1 USDC virtual
```

- Es contabilidad off-chain
- NO necesitas tener fondos reales
- Solo para tracking de payouts

### Formato USDC

USDC usa **6 decimales**:

```
"1000000"  = 1 USDC
"500000"   = 0.5 USDC
"250000"   = 0.25 USDC
```

### Off-chain vs On-chain

| Operación | Gas | Speed | Tipo |
|-----------|-----|-------|------|
| Payout | $0 | <100ms | Off-chain |
| Claim | $0 | <100ms | Off-chain |
| Channel Create | ~$0.50 | 15s | On-chain |
| Channel Close | ~$0.50 | 15s | On-chain |

---

## 🏗️ Tech Stack

- Next.js 16.1.6
- TypeScript
- Viem
- Yellow Network SDK
- Zod

---

## 📁 Estructura

```
yellow-adapter/
├── app/api/yellow/       # API endpoints
├── src/lib/yellow/       # Yellow integration
├── src/yellow/           # Channel management
├── postman/              # Postman collections (2 archivos)
│   ├── Yellow-Complete-Testing.postman_collection.json
│   └── Yellow-Complete.postman_environment.json
└── scripts/              # Scripts auxiliares (sign, send TX)
    ├── sign-message.js
    └── send-tx.js
```

---

## 🚀 Siguiente Paso

**Lee [SETUP.md](./SETUP.md)** para configuración detallada.

O **[TESTING.md](./TESTING.md)** para empezar a testear con Postman.
