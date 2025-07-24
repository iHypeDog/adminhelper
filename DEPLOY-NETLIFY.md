# 🌐 Guia de Deploy no Netlify

## 🚀 Sua aplicação está pronta para o Netlify!

### ✅ **O que foi configurado:**

1. **Netlify Functions** - Servidor Express rodando como função serverless
2. **Arquivos de configuração** - `netlify.toml` configurado
3. **Build script** - Copia arquivos necessários automaticamente
4. **Redirecionamentos** - Todas as rotas apontam para a função

---

## 📋 **Opções de Deploy**

### **Opção 1: GitHub + Netlify (Mais Fácil)**

1. **Suba o código para o GitHub:**
   ```bash
   git add .
   git commit -m "Aplicação Slowtek Counter pronta para Netlify"
   git push origin main
   ```

2. **Acesse [netlify.com](https://netlify.com)**

3. **Clique em "New site from Git"**

4. **Conecte o GitHub e escolha o repositório**

5. **Configurações automáticas:**
   - ✅ Build command: `npm run build`
   - ✅ Publish directory: `public`
   - ✅ Functions directory: `netlify/functions`

6. **Deploy automático!** 🎉

---

### **Opção 2: Netlify CLI (Deploy Direto)**

```bash
# 1. Executar script automatizado
./deploy-netlify.sh

# OU manualmente:

# 2. Instalar Netlify CLI
npm install -g netlify-cli

# 3. Fazer login
netlify login

# 4. Build da aplicação
npm run build

# 5. Deploy
netlify deploy --prod
```

---

## ⚙️ **Configurações do Netlify**

Se configurar manualmente, use estas configurações:

| Campo | Valor |
|-------|--------|
| **Build command** | `npm run build` |
| **Publish directory** | `public` |
| **Functions directory** | `netlify/functions` |
| **Node version** | `18.x` |

---

## 🔧 **Estrutura para Netlify**

```
projeto/
├── netlify.toml           ← Configuração principal
├── netlify/functions/     ← Suas funções serverless
│   ├── server.js         ← Aplicação Express completa
│   ├── views/            ← Templates (copiados no build)
│   └── *.json           ← Dados (copiados no build)
├── public/               ← Arquivos estáticos
│   ├── index.html       ← Redirecionamento inicial
│   ├── css/
│   └── js/
└── package.json         ← Dependências
```

---

## 🌐 **Após o Deploy**

1. **URL gerada:** `https://nome-random.netlify.app`
2. **Login:** `slowtek` / `slowtekadmiro123`
3. **Funcionalidades:** Todas funcionando igual ao local!

---

## 🛠️ **Comandos Úteis**

```bash
# Ver status do site
netlify status

# Abrir site no navegador
netlify open

# Ver logs em tempo real
netlify functions:log

# Deploy de teste (draft)
netlify deploy

# Deploy em produção
netlify deploy --prod
```

---

## 🔍 **Verificação Pós-Deploy**

✅ **Teste estas funcionalidades:**

1. **Login** com `slowtek` / `slowtekadmiro123`
2. **Dashboard** - Contadores funcionando
3. **Incrementar** contadores (chamado, ticket, devolução)
4. **Criar relatório** com formulário completo
5. **Ver relatórios** listados
6. **Gerenciar usuários** (se admin)

---

## ❗ **Importante sobre Dados**

⚠️ **No Netlify, os arquivos JSON são temporários:**
- Dados resetam a cada novo deploy
- Para produção real, considere usar:
  - **Netlify Forms** para formulários
  - **FaunaDB** para banco de dados
  - **Firebase** para dados persistentes

---

## 🆘 **Troubleshooting**

### **Erro: Function não carrega**
```bash
# Verificar se o build funcionou
npm run build
ls netlify/functions/
```

### **Erro: Redirecionamentos**
- Verifique se `netlify.toml` está na raiz
- Confirme as configurações de redirect

### **Erro: Dependências**
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 **Resultado Final**

Após seguir este guia, você terá:

✅ **Aplicação web completa no Netlify**  
✅ **URL pública funcionando**  
✅ **Todas as funcionalidades do Discord bot**  
✅ **Interface moderna e responsiva**  
✅ **HTTPS automático**  
✅ **Deploy automático via GitHub**  

---

## 🚀 **Deploy Agora!**

**Método rápido:**
```bash
./deploy-netlify.sh
```

**Seu Slowtek Counter estará online em minutos!** 🎉

---

*Desenvolvido com ❤️ para Slowtek - Otimizado para Netlify Functions!*