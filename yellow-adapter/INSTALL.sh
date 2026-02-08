#!/bin/bash

echo "🚀 Yellow Adapter - Instalación Completa"
echo "========================================"
echo ""

# Install dependencies
echo "📦 Instalando dependencias..."
npm install

# Install WAAP SDK
echo "🔧 Instalando WAAP SDK..."
npm install @human.tech/waap-sdk

# Create .env if not exists
if [ ! -f .env ]; then
    echo "⚙️  Creando .env desde .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANTE: Edita .env y configura:"
    echo "   - YELLOW_JUDGE_PK (Growi platform wallet)"
    echo "   - YELLOW_FEE_PK (Fee treasury wallet)"
    echo ""
else
    echo "✅ .env ya existe"
fi

echo ""
echo "✅ Instalación completa!"
echo ""
echo "📚 Siguiente paso:"
echo "   1. Edita .env con tus keys (solo Judge y Fee)"
echo "   2. npm run dev"
echo "   3. Abre http://localhost:3003"
echo ""
echo "📖 Ver documentación:"
echo "   - README.md - Overview"
echo "   - SETUP_WAAP.md - Frontend setup"
echo "   - MIGRATION_WAAP.md - Qué cambió"
echo ""

