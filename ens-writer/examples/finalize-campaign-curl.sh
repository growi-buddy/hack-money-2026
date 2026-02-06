#!/bin/bash
#
# Ejemplo de finalización de campaña via curl
#
# Uso:
#   1. Configura las variables de entorno
#   2. Ejecuta: bash examples/finalize-campaign-curl.sh [CAMPAIGN_CODE]
#

# Configuración
BASE_URL="${BASE_URL:-http://localhost:3000}"
API_KEY="${ENS_WRITER_API_KEY}"
CAMPAIGN_CODE="${1:-NIKE26}"

# Validar que API_KEY esté configurada
if [ -z "$API_KEY" ]; then
  echo "❌ Error: ENS_WRITER_API_KEY no está configurada"
  echo "Ejecuta: export ENS_WRITER_API_KEY=tu-api-key"
  exit 1
fi

# Request body (ejemplo con 3 payouts)
REQUEST_BODY='{
  "settlementTx": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "payouts": [
    ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "12000000"],
    ["0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "3000000"],
    ["0x90F79bf6EB2c4f870365E785982E1f101E93b906", "5000000"]
  ]
}'

echo "🏁 Finalizing campaign: $CAMPAIGN_CODE"
echo ""

# Hacer request
response=$(curl -s -w "\n%{http_code}" -X PATCH "$BASE_URL/api/ens/campaigns/$CAMPAIGN_CODE/finalize" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d "$REQUEST_BODY")

# Separar body y status code
http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

# Mostrar respuesta formateada
echo "Status: $http_code"
echo ""
echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
echo ""

# Validar resultado
if [ "$http_code" = "200" ]; then
  echo "✅ Campaign finalized successfully!"
  
  # Extraer payoutRoot
  payoutRoot=$(echo "$body" | python3 -c "import sys, json; print(json.load(sys.stdin).get('payoutRoot', ''))" 2>/dev/null)
  
  if [ -n "$payoutRoot" ]; then
    echo ""
    echo "📍 Finalization Details:"
    echo "   Payout Root: $payoutRoot"
    echo ""
    echo "💡 Next steps:"
    echo "   1. Verify in Supabase: SELECT * FROM campaigns WHERE code = '$CAMPAIGN_CODE';"
    echo "   2. Verify payouts: SELECT * FROM campaign_payouts WHERE campaign_code = '$CAMPAIGN_CODE';"
    echo "   3. Verify on ENS: curl -H 'x-api-key: \$ENS_WRITER_API_KEY' $BASE_URL/api/ens/campaigns/$CAMPAIGN_CODE"
  fi
else
  echo "❌ Failed to finalize campaign"
  exit 1
fi
