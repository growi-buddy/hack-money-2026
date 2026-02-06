#!/bin/bash
#
# Ejemplo de obtención de proof via curl
#
# Uso:
#   bash examples/get-proof-curl.sh [CAMPAIGN_CODE] [WALLET]
#

# Configuración
BASE_URL="${BASE_URL:-http://localhost:3000}"
CAMPAIGN_CODE="${1:-NIKE26}"
WALLET="${2:-0x70997970C51812dc3A010C7d01b50e0d17dc79C8}"

echo "🔍 Getting proof for wallet in campaign..."
echo "   Campaign: $CAMPAIGN_CODE"
echo "   Wallet:   $WALLET"
echo ""

# Hacer request
response=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/api/ens/campaigns/$CAMPAIGN_CODE/proof?wallet=$WALLET")

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
  echo "✅ Proof generated successfully!"
  
  # Extraer información
  amountMicros=$(echo "$body" | python3 -c "import sys, json; print(json.load(sys.stdin).get('amountMicros', ''))" 2>/dev/null)
  payoutRoot=$(echo "$body" | python3 -c "import sys, json; print(json.load(sys.stdin).get('payoutRoot', ''))" 2>/dev/null)
  proofLength=$(echo "$body" | python3 -c "import sys, json; print(len(json.load(sys.stdin).get('proof', [])))" 2>/dev/null)
  
  if [ -n "$amountMicros" ]; then
    echo ""
    echo "📍 Proof Details:"
    echo "   Amount:      $amountMicros micros"
    echo "   Payout Root: $payoutRoot"
    echo "   Proof Size:  $proofLength elements"
    echo ""
    echo "💡 To verify this proof locally:"
    echo "   1. Copy the response JSON"
    echo "   2. Use the verifyPayoutProof() function"
    echo "   3. Or run: pnpm tsx scripts/verify-proof.ts"
  fi
else
  echo "❌ Failed to generate proof"
  exit 1
fi
