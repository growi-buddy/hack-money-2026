#!/bin/bash
#
# Ejemplo de listado de campañas por wallet
#
# Uso:
#   bash examples/list-campaigns-curl.sh [WALLET]
#

# Configuración
BASE_URL="${BASE_URL:-http://localhost:3000}"
WALLET="${1:-0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266}"

echo "📋 Listing campaigns for wallet..."
echo "   Wallet: $WALLET"
echo ""

# Hacer request
response=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/api/campaigns?wallet=$WALLET")

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
  count=$(echo "$body" | python3 -c "import sys, json; print(json.load(sys.stdin).get('count', 0))" 2>/dev/null)
  echo "✅ Found $count campaign(s)"
else
  echo "❌ Failed to list campaigns"
  exit 1
fi
