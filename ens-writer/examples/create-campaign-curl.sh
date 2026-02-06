#!/bin/bash
#
# Ejemplo de creación de campaña via curl
#
# Uso:
#   1. Configura las variables de entorno
#   2. Ejecuta: bash examples/create-campaign-curl.sh
#

# Configuración
BASE_URL="${BASE_URL:-http://localhost:3000}"
API_KEY="${ENS_WRITER_API_KEY}"

# Validar que API_KEY esté configurada
if [ -z "$API_KEY" ]; then
  echo "❌ Error: ENS_WRITER_API_KEY no está configurada"
  echo "Ejecuta: export ENS_WRITER_API_KEY=tu-api-key"
  exit 1
fi

# Request body
REQUEST_BODY='{
  "code": "NIKE26",
  "campaignId": "camp_clz8p9k4j0001js0g12345678",
  "campaignName": "Nike February Rewards",
  "description": "Earn rewards for every Nike purchase during February 2026",
  "startDate": 1738800000,
  "endDate": 1739404800,
  "campaignManager": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "yellowChannelId": "channel-nike-feb-2026"
}'

echo "🚀 Creating campaign..."
echo ""

# Hacer request
response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/ens/campaigns" \
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
  echo "✅ Campaign created successfully!"
  
  # Extraer FQDN y node
  fqdn=$(echo "$body" | python3 -c "import sys, json; print(json.load(sys.stdin).get('fqdn', ''))" 2>/dev/null)
  node=$(echo "$body" | python3 -c "import sys, json; print(json.load(sys.stdin).get('node', ''))" 2>/dev/null)
  
  if [ -n "$fqdn" ]; then
    echo ""
    echo "📍 Campaign Details:"
    echo "   FQDN: $fqdn"
    echo "   Node: $node"
  fi
else
  echo "❌ Failed to create campaign"
  exit 1
fi
