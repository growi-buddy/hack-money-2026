# Changelog

Registro de cambios importantes del proyecto.

---

## [v2.1.0] - 2026-02-07

### 🎨 Añadido - Tema Azul Growi

- **Tema visual azul completo**
  - Background: Gradiente azul (blue-950 → blue-900)
  - Cards: Glassmorphism (blue-900/30 + backdrop-blur)
  - Buttons: Gradientes con sombras (blue-500 → blue-600)
  - Inputs: Focus states con ring effects
  - Scrollbar custom azul

- **Logos Growi**
  - Header: `growi.png` (transparente, 40x40)
  - Landing: `growi_manager.png` (con fondo, 200x200)
  - Animación bounce en landing

- **Componentes actualizados**
  - Header: Logo + nav + login con gradientes
  - Landing: Cards con glassmorphism y hover effects
  - Manager: Tema azul con acentos
  - Influencer: Tema azul/verde
  - Admin: Tema azul/purple
  - Inputs: Focus states azules
  - Buttons: Gradientes y sombras

### 📚 Documentación

- Nuevo `FRONTEND_COMPLETE.md` - Guía completa del tema azul
- Actualizado `README.md` - Título "Growi Campaign Manager"
- Actualizado `CHANGELOG.md` - Historial visual

### 🎯 Mejoras de UX

- Animación bounce lenta para logo principal
- Hover effects con shadow-xl en cards
- Focus states con ring-2 en inputs
- Gradientes y sombras en botones primarios
- Scrollbar personalizada azul

---

## [v2.0.0] - 2026-02-07

### 🎉 Añadido

- **Frontend completo** con Next.js UI
  - Página Manager (crear campañas)
  - Página Influencer (ver payouts y claims)
  - Página Admin (aplicar payouts)
  - Landing page con overview

- **WAAP Integration** (Wallet as a Protocol)
  - Reemplaza RainbowKit/Wagmi
  - Múltiples métodos de login (Email, Social, Wallet)
  - No requiere API key ni dashboard
  - Docs: https://docs.waap.xyz/

### 🗑️ Eliminado

- `YELLOW_MANAGER_PK` del backend (ahora en frontend vía WAAP)
- `YELLOW_INFLUENCER_PK` del backend (ahora en frontend vía WAAP)
- Endpoints `/api/yellow/faucet/manager`
- Endpoints `/api/yellow/faucet/influencer`
- Endpoints `/api/yellow/faucet/all`
- RainbowKit y Wagmi dependencies

### ✅ Mantenido en Backend

- `YELLOW_JUDGE_PK` - Growi platform wallet (firma payouts)
- `YELLOW_FEE_PK` - Fee treasury wallet
- Todos los endpoints de App Sessions
- Endpoint genérico de faucet

### 🔄 Cambiado

- `.env.example` ahora solo incluye Judge y Fee keys
- Modelo ahora es **claramente no-custodial** para usuarios
- Usuarios conectan sus wallets desde frontend
- Backend solo firma con Judge (Growi platform)

### 📚 Documentación

- Nuevo `SETUP_WAAP.md` - Setup frontend con WAAP
- Actualizado `README.md` - Overview del nuevo stack
- Actualizado `SECURITY.md` - Modelo de seguridad actualizado
- Actualizado `.env.example` - Solo keys de plataforma

---

## [v1.0.0] - 2026-02-06

### Implementación inicial

- API completa con App Sessions
- Endpoints de faucet
- Happy Path demo
- Postman collections
- Documentación completa
- Testing en Postman
