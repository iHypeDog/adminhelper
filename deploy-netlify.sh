#!/bin/bash

echo "🚀 Preparando deploy para Netlify..."
echo ""

# Verificar se o Netlify CLI está instalado
if ! command -v netlify &> /dev/null; then
    echo "📦 Netlify CLI não encontrado. Instalando..."
    npm install -g netlify-cli
fi

# Fazer build
echo "🔨 Executando build..."
npm run build

# Verificar se está logado no Netlify
echo "🔑 Verificando autenticação Netlify..."
netlify status 2>/dev/null || {
    echo "❌ Não autenticado. Fazendo login..."
    netlify login
}

# Deploy
echo "🌐 Fazendo deploy..."
netlify deploy --prod

echo ""
echo "✅ Deploy concluído!"
echo "🌐 Sua aplicação está disponível na URL mostrada acima"
echo "👤 Login: slowtek / slowtekadmiro123"
echo ""