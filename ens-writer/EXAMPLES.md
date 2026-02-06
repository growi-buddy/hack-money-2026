# Ejemplos de Uso - ENS Writer API

Ejemplos completos de cómo usar los endpoints de la API.

## Variables

```bash
API_KEY="tu-api-key-aqui"
BASE_URL="http://localhost:3000"
CODE="DEMO123"
```

## 1. Crear Campaña

Crea un subdominio ENS y escribe los text records iniciales.

```bash
curl -X POST $BASE_URL/api/ens/campaigns \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "code": "DEMO123",
    "termsURI": "ipfs://QmTest123456789abcdef",
    "termsHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "yellowChannelId": "channel-test-123"
  }'
```

**Response:**
```json
{
  "ok": true,
  "code": "DEMO123",
  "fqdn": "demo123.growi.eth",
  "node": "0xabc...123",
  "txHashes": [
    "0x...",
    "0x...",
    "0x..."
  ]
}
```

## 2. Verificar Campaña

Lee los text records desde la blockchain (ENS).

```bash
curl -X GET $BASE_URL/api/ens/campaigns/DEMO123 \
  -H "x-api-key: $API_KEY"
```

**Response:**
```json
{
  "ok": true,
  "fqdn": "demo123.growi.eth",
  "records": {
    "termsURI": "ipfs://QmTest123456789abcdef",
    "termsHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "yellowChannelId": "channel-test-123",
    "settlementTx": null,
    "payoutRoot": null
  }
}
```

## 3. Finalizar Campaña

Escribe los text records de settlement y payout.

```bash
curl -X PATCH $BASE_URL/api/ens/campaigns/DEMO123/finalize \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "settlementTx": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "payoutRoot": "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba"
  }'
```

**Response:**
```json
{
  "ok": true,
  "code": "DEMO123",
  "fqdn": "demo123.growi.eth",
  "node": "0xabc...123",
  "txHashes": [
    "0x...",
    "0x..."
  ]
}
```

## 4. Verificar Campaña Finalizada

Lee todos los records incluyendo settlement y payout.

```bash
curl -X GET $BASE_URL/api/ens/campaigns/DEMO123 \
  -H "x-api-key: $API_KEY"
```

**Response:**
```json
{
  "ok": true,
  "fqdn": "demo123.growi.eth",
  "records": {
    "termsURI": "ipfs://QmTest123456789abcdef",
    "termsHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "yellowChannelId": "channel-test-123",
    "settlementTx": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "payoutRoot": "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba"
  }
}
```

## Flujo Completo con Script

```bash
#!/bin/bash

API_KEY="tu-api-key-aqui"
BASE_URL="http://localhost:3000"
CODE="TEST$(date +%s)"  # Código único con timestamp

echo "🚀 Creando campaña $CODE..."
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/api/ens/campaigns \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d "{
    \"code\": \"$CODE\",
    \"termsURI\": \"ipfs://QmTest123\",
    \"termsHash\": \"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef\",
    \"yellowChannelId\": \"channel-123\"
  }")

echo $CREATE_RESPONSE | jq .

# Esperar un poco para que se confirmen las transacciones
echo ""
echo "⏳ Esperando 10 segundos para confirmación..."
sleep 10

echo ""
echo "🔍 Verificando records..."
VERIFY_RESPONSE=$(curl -s -X GET $BASE_URL/api/ens/campaigns/$CODE \
  -H "x-api-key: $API_KEY")

echo $VERIFY_RESPONSE | jq .

echo ""
echo "🏁 Finalizando campaña..."
FINALIZE_RESPONSE=$(curl -s -X PATCH $BASE_URL/api/ens/campaigns/$CODE/finalize \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "settlementTx": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "payoutRoot": "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba"
  }')

echo $FINALIZE_RESPONSE | jq .

# Esperar un poco
echo ""
echo "⏳ Esperando 10 segundos para confirmación..."
sleep 10

echo ""
echo "🔍 Verificación final..."
FINAL_VERIFY=$(curl -s -X GET $BASE_URL/api/ens/campaigns/$CODE \
  -H "x-api-key: $API_KEY")

echo $FINAL_VERIFY | jq .

echo ""
echo "✅ Flujo completo finalizado!"
```

## Manejo de Errores

### Error 401 - No autorizado
```bash
curl -X GET $BASE_URL/api/ens/campaigns/DEMO123
# Sin header x-api-key
```

**Response:**
```json
{
  "ok": false,
  "error": "UNAUTHORIZED"
}
```

### Error 400 - Validación
```bash
curl -X POST $BASE_URL/api/ens/campaigns \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "code": "invalid-code-with-lowercase",
    "termsURI": "",
    "termsHash": "invalid"
  }'
```

**Response:**
```json
{
  "ok": false,
  "error": "VALIDATION_ERROR",
  "details": [
    {
      "field": "code",
      "message": "Code must be uppercase alphanumeric"
    },
    {
      "field": "termsURI",
      "message": "termsURI cannot be empty"
    },
    {
      "field": "termsHash",
      "message": "termsHash must start with 0x"
    }
  ]
}
```

### Error 500 - Error interno
```json
{
  "ok": false,
  "error": "INTERNAL_ERROR"
}
```

## Verificación en Blockchain

Después de crear una campaña, puedes verificar las transacciones en Etherscan:

**Sepolia:**
```
https://sepolia.etherscan.io/tx/[TX_HASH]
```

**Mainnet:**
```
https://etherscan.io/tx/[TX_HASH]
```

## Leer Records desde otro lugar

Los text records son públicos y pueden leerse desde cualquier lugar:

**Usando viem:**
```typescript
import { publicClient } from './client';

const termsURI = await publicClient.getEnsText({
  name: 'demo123.growi.eth',
  key: 'growi:termsURI'
});
```

**Usando ENS App:**
```
https://app.ens.domains/demo123.growi.eth
```

## Tips

1. **Códigos únicos:** Usa códigos únicos para evitar conflictos
2. **Tiempo de confirmación:** Las transacciones pueden tardar 10-30 segundos en confirmarse
3. **Gas:** Asegúrate de tener suficiente ETH para gas en tu wallet
4. **Idempotencia:** Crear la misma campaña dos veces no falla, solo actualiza records
