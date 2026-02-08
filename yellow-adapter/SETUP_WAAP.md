# Setup Frontend con WAAP

Guía rápida para configurar el frontend con WAAP (Wallet as a Protocol).

---

## 🎯 Qué es WAAP

WAAP (Wallet as a Protocol) by Human.tech es una solución de wallet connect que:

✅ No requiere API key
✅ No requiere dashboard
✅ Soporta múltiples métodos de login:
  - Email
  - Social (Google, Twitter, etc.)
  - Wallets (MetaMask, WalletConnect)
✅ Dark mode incluido

Docs: https://docs.waap.xyz/

---

## 📦 Instalación

```bash
npm install @human.tech/waap-sdk
```

---

## ✅ Ya está configurado

El proyecto YA tiene WAAP configurado:

```
src/
├── lib/waap.ts           # Configuración de WAAP
├── components/
    ├── WaapProvider.tsx  # Context provider
    └── Header.tsx        # Header con login button

app/
├── layout.tsx            # Root layout con WaapProvider
├── manager/page.tsx      # Usa useWaap()
├── influencer/page.tsx   # Usa useWaap()
└── admin/page.tsx        # Admin (no requiere wallet)
```

---

## 🚀 Cómo funciona

### 1. Inicialización (ya hecho)

```typescript
// src/lib/waap.ts
import { initWaaP } from '@human.tech/waap-sdk';

export const waap = initWaaP({
  authMethods: ['email', 'social', 'wallet'],
  socialProviders: ['google', 'twitter'],
  styles: {
    darkMode: true,
  },
});
```

### 2. Provider (ya hecho)

```typescript
// app/layout.tsx
<WaapProvider>
  <Header />
  <main>{children}</main>
</WaapProvider>
```

### 3. Usar en páginas (ya hecho)

```typescript
// app/manager/page.tsx
'use client';

import { useWaap } from '@/src/components/WaapProvider';

export default function ManagerPage() {
  const { address, isConnected, login, logout } = useWaap();

  return (
    <div>
      {isConnected ? (
        <p>Connected: {address}</p>
      ) : (
        <button onClick={login}>Connect</button>
      )}
    </div>
  );
}
```

---

## 🎨 Customización

Puedes customizar WAAP editando `src/lib/waap.ts`:

```typescript
export const waap = initWaaP({
  // Métodos de auth
  authMethods: ['email', 'social', 'wallet', 'phone'],
  
  // Providers sociales
  socialProviders: [
    'google',
    'twitter',
    'discord',
    'linkedin',
    'apple',
    'coinbase',
    'github',
  ],
  
  // Estilos
  styles: {
    darkMode: true,
    primaryColor: '#FACC15', // yellow-400
  },
});
```

Ver playground: https://docs.waap.xyz/guides/customize#playground

---

## 🧪 Testing

```bash
# 1. Levantar servidor
npm run dev

# 2. Abrir en navegador
http://localhost:3003

# 3. Click "Connect Wallet"
# 4. Seleccionar método de login (Email, Social, Wallet)
# 5. Ver address conectada en header
```

---

## 🔐 Seguridad

### Usuario controla su wallet:

```
✅ WAAP genera wallet para usuario
✅ Usuario firma desde su wallet
✅ Backend NO tiene acceso a private keys de usuarios
✅ Solo Judge (Growi) key en servidor
```

### Backend limpio:

```bash
# .env - SOLO keys de plataforma
YELLOW_JUDGE_PK=0x...   ← Growi platform
YELLOW_FEE_PK=0x...     ← Fee treasury

# ❌ NO hay:
# YELLOW_MANAGER_PK      ← Usuario conecta con WAAP
# YELLOW_INFLUENCER_PK   ← Usuario conecta con WAAP
```

---

## 📚 Documentación WAAP

- Docs: https://docs.waap.xyz/
- Customize: https://docs.waap.xyz/guides/customize
- Methods: https://docs.waap.xyz/guides/methods
- Examples: https://docs.waap.xyz/examples

---

## 🎯 Ventajas vs RainbowKit/Wagmi

| Feature | WAAP | RainbowKit |
|---------|------|------------|
| API Key | ❌ No requiere | ✅ Requiere WalletConnect ID |
| Dashboard | ❌ No requiere | ✅ Requiere setup |
| Email login | ✅ Sí | ❌ No |
| Social login | ✅ Sí | ❌ No |
| Setup | 🟢 Simple | 🟡 Complejo |

---

**🚀 Listo para usar!**

Solo ejecuta `npm install @human.tech/waap-sdk` y `npm run dev`.
