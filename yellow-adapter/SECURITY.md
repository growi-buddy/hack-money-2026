# 🔐 Seguridad y Private Keys

Guía sobre qué wallets necesitas y cómo protegerlas.

---

## 🎯 Wallets en el Sistema

### 1. Manager Wallet (YELLOW_MANAGER_PK)

**Qué es**: Wallet que crea campañas y provee presupuesto.

**Dónde se usa**:
- Crea App Sessions
- Provee el budget inicial
- Puede ser cualquier wallet de test

**Nivel de control**: Bajo (solo provee fondos)

---

### 2. Influencer Wallet (YELLOW_INFLUENCER_PK)

**Qué es**: Wallet que recibe payouts por contenido.

**Dónde se usa**:
- Recibe payouts en App Sessions
- Claims/withdrawals

**Nivel de control**: Bajo (solo recibe fondos)

---

### 3. 🔑 Growi Judge Wallet (YELLOW_JUDGE_PK)

**Qué es**: **LA WALLET DE LA PLATAFORMA GROWI** que controla TODO.

**Dónde se usa**:
- Firma TODOS los updates de App Sessions
- Tiene quorum 100% (control absoluto)
- Aprueba todos los payouts
- Firma todos los claims

**Nivel de control**: ⚠️ **MÁXIMO** - Esta wallet CONTROLA toda la lógica de payouts.

**Código**:
```typescript
// src/lib/yellow/appSessions/service.ts línea 24-40
export function createGrowiAppDefinition(...) {
  return {
    participants: [manager, influencer, judgeAddress, feeTreasury],
    weights: [0, 0, 100, 0],  // ← Judge tiene TODO el peso
    quorum: 100,               // ← Judge decide todo
  };
}
```

**En producción**:
- Esta debe ser una wallet ULTRA SEGURA
- Idealmente en un hardware wallet o HSM
- Con multi-sig si es posible
- NUNCA exponerla públicamente

---

### 4. Fee Treasury Wallet (YELLOW_FEE_PK)

**Qué es**: Wallet que recibe fees de la plataforma.

**Dónde se usa**:
- Recibe el % de fee de cada payout

**Nivel de control**: Bajo (solo recibe fees)

---

## ⚠️ Qué NO Subir a GitHub

### ❌ NUNCA en GitHub:

```bash
# .env (ya está en .gitignore)
YELLOW_MANAGER_PK=0xREAL_KEY_HERE
YELLOW_INFLUENCER_PK=0xREAL_KEY_HERE
YELLOW_JUDGE_PK=0xREAL_KEY_HERE  # ← ESPECIALMENTE ESTA
YELLOW_FEE_PK=0xREAL_KEY_HERE
```

### ✅ SÍ en GitHub:

```bash
# .env.example (con placeholders)
YELLOW_MANAGER_PK=0xYOUR_MANAGER_PRIVATE_KEY_HERE
YELLOW_INFLUENCER_PK=0xYOUR_INFLUENCER_PRIVATE_KEY_HERE
YELLOW_JUDGE_PK=0xYOUR_GROWI_JUDGE_PRIVATE_KEY_HERE
YELLOW_FEE_PK=0xYOUR_FEE_TREASURY_PRIVATE_KEY_HERE
```

**Verificar .gitignore**:
```bash
# Debe incluir:
.env*
!.env.example
```

---

## 🛡️ Niveles de Seguridad

### Testing/Development

```
Manager: Wallet de test, fondos de faucet
Influencer: Wallet de test, fondos de faucet
Judge: Wallet de test, fondos de faucet
Fee: Wallet de test, fondos de faucet
```

**Riesgo**: Bajo (son testnets)

### Staging

```
Manager: Wallet real con fondos limitados
Influencer: Wallet real con fondos limitados
Judge: Wallet en servidor seguro con firewall
Fee: Wallet corporativa
```

**Riesgo**: Medio

### Production

```
Manager: Wallets de usuarios (NO custodial)
Influencer: Wallets de usuarios (NO custodial)
Judge: Hardware wallet o HSM multi-sig
Fee: Hardware wallet corporativo
```

**Riesgo**: Alto si Judge se compromete

---

## 🔍 Dónde Están las Keys en el Código

### Uso de YELLOW_JUDGE_PK:

```typescript
// src/lib/yellow/appSessions/service.ts
const judgePk = process.env.YELLOW_JUDGE_PK;
const judgeAccount = privateKeyToAccount(judgePk);

// La Judge wallet firma TODOS los updates:
const signature = await judgeAccount.signMessage({
  message: packedState
});
```

### Búsqueda rápida:

```bash
# Buscar dónde se usa Judge wallet:
grep -r "YELLOW_JUDGE_PK" --include="*.ts"

# Resultado esperado:
# src/lib/yellow/appSessions/service.ts
# src/yellow/env.ts
# app/api/yellow/faucet/all/route.ts
```

---

## 🎓 FAQ de Seguridad

### ¿Por qué Judge tiene 100% de control?

Es el modelo "Trusted Judge" de Growi:
- Growi actúa como juez confiable
- Firma todos los payouts automáticamente
- Elimina necesidad de firmas de usuarios
- Payouts instantáneos sin esperas

**Trade-off**: Centralización vs UX

### ¿Qué pasa si Judge wallet se compromete?

Un atacante podría:
- ❌ Aprobar payouts falsos
- ❌ Mover fondos a addresses incorrectas
- ❌ Manipular el estado de sesiones

**Mitigación**:
- Hardware wallet en producción
- Multi-sig para Judge
- Monitoring de transacciones
- Rate limits en API

### ¿Las wallets de usuarios están seguras?

**SÍ**, porque:
- Manager y Influencer son addresses reales de usuarios
- NO guardas sus private keys
- Solo firman con sus propias wallets (MetaMask)
- El adapter solo genera "intents" (qué firmar)

### ¿Dónde guardo Judge key en producción?

Opciones recomendadas:
1. AWS Secrets Manager
2. HashiCorp Vault
3. Google Cloud Secret Manager
4. Hardware wallet con API
5. HSM (Hardware Security Module)

**NUNCA**:
- ❌ En código
- ❌ En .env versionado
- ❌ En logs
- ❌ En variables de entorno públicas

---

## 📋 Checklist de Seguridad

Antes de subir a GitHub:

```bash
# 1. Verificar .gitignore
cat .gitignore | grep ".env"
# Debe mostrar: .env*

# 2. Buscar private keys hardcodeadas
grep -r "0x[a-f0-9]{64}" --include="*.ts" --include="*.js" --include="*.json"
# Solo debería aparecer en:
# - .env (local, no se sube)
# - .env.example (placeholders)

# 3. Verificar que .env NO está tracked
git status
# .env NO debe aparecer en la lista

# 4. Verificar archivos a subir
git diff --staged
# Revisar que no hay private keys reales
```

---

## 🚨 Si Expones una Key Accidentalmente

**Pasos inmediatos**:

1. **Rotar la key**:
   ```bash
   # Generar nueva key
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Actualizar .env con nueva key
   YELLOW_JUDGE_PK=0xNEW_KEY_HERE
   ```

2. **Mover fondos** (si tenía balance):
   ```bash
   # Transferir fondos a nueva wallet
   ```

3. **Revisar logs**:
   ```bash
   # Buscar si la key se usó
   git log -p | grep "0xOLD_KEY"
   ```

4. **Limpiar historial** (si es necesario):
   ```bash
   # Usar git-filter-branch o BFG Repo-Cleaner
   ```

---

## 📚 Referencias

- **[SETUP.md](./SETUP.md)** - Cómo generar wallets de test
- **[API.md](./API.md)** - Endpoints del API
- **.env.example** - Template de configuración

---

**🔑 Resumen**: YELLOW_JUDGE_PK es la wallet de Growi que controla TODO. Protégela como oro.
