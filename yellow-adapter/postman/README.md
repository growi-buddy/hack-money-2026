# 📮 Postman Collections

Colecciones de Postman para probar la API de Growi.

---

## 📥 Importar

### 1. Abrir Postman

### 2. Importar Colección

```
File → Import → Seleccionar:
postman/Growi-API.postman_collection.json
```

### 3. Importar Environment

```
File → Import → Seleccionar:
postman/Growi.postman_environment.json
```

### 4. Activar Environment

```
En Postman, arriba a la derecha:
"No Environment" → Seleccionar "Growi Environment"
```

---

## 🚀 Probar Endpoints

### Orden Recomendado

```
1. Health Check      → Verifica servidor
2. Create Session    → Crea campaña (guarda Session ID automáticamente)
3. Get Session       → Ve detalles de la sesión
4. Apply Payout      → Aplica earnings al influencer
5. Claim Funds       → Influencer retira fondos
```

### Variables

El environment tiene variables pre-configuradas:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `baseUrl` | `http://localhost:3000` | URL del servidor |
| `sessionId` | (auto) | Se guarda automáticamente |
| `managerAddress` | `0x742d...` | Wallet del manager |
| `influencerAddress` | `0x7099...` | Wallet del influencer |
| `budget` | `1000000` | 1 USDC |
| `earnedAmount` | `250000` | 0.25 USDC |
| `claimAmount` | `250000` | 0.25 USDC |
| `feeBps` | `200` | 2% |

---

## 🔄 Flujo Completo

### 1. Health Check

```
GET /api/yellow/health
```

Verifica que el servidor funciona.

### 2. Create Session

```
POST /api/yellow/app-sessions/create

Body:
{
  "budgetUsdc": "1000000",
  "managerAddress": "0x742d35...",
  "influencerAddress": "0x70997..."
}
```

**El Session ID se guarda automáticamente** en la variable `{{sessionId}}`.

### 3. Get Session

```
GET /api/yellow/app-sessions/{{sessionId}}
```

Ve los detalles y allocations de la sesión.

### 4. Apply Payout

```
POST /api/yellow/app-sessions/payout

Body:
{
  "appSessionId": "{{sessionId}}",
  "earnedUsdc": "250000",
  "feeBps": 200
}
```

Mueve fondos de Manager a Influencer (+ fee).

### 5. Claim Funds

```
POST /api/yellow/app-sessions/claim

Body:
{
  "appSessionId": "{{sessionId}}",
  "participant": "{{influencerAddress}}",
  "amountUsdc": "250000"
}
```

Influencer retira sus fondos.

---

## 🧪 Testing

### Cambiar Valores

Para probar diferentes escenarios, edita las variables del environment:

```
Click en "Growi Environment" → Edit

Cambia:
- budget: "2000000" (2 USDC)
- earnedAmount: "500000" (0.5 USDC)
- feeBps: "500" (5%)
```

### Múltiples Sesiones

Para crear varias sesiones:

1. Run "Create Session" → Copia el nuevo Session ID
2. Edita variable `sessionId` manualmente
3. Run "Apply Payout" / "Claim Funds"

---

## 💡 Tips

### Auto-Save Session ID

El request "Create Session" tiene un script que guarda automáticamente el Session ID:

```javascript
// En Tests tab del request:
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set('sessionId', response.data.appSessionId);
}
```

### Ver Console

Para ver logs:
```
View → Show Postman Console (Ctrl+Alt+C)
```

### Cambiar Puerto

Si tu servidor corre en otro puerto:
```
Edit Environment → baseUrl → http://localhost:3001
```

---

## 📚 Ver También

- [README.md](../README.md) - Quick Start
- [API.md](../API.md) - Documentación completa de endpoints
- [SETUP.md](../SETUP.md) - Configuración del servidor
