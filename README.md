# Slowtek Counter Web Application

Sistema web de gerenciamento de contadores e relatórios, convertido do bot Discord original para uma aplicação web moderna com autenticação e interface intuitiva.

## 🚀 Características

- **Autenticação segura** com criptografia de senhas
- **Contadores em tempo real** para Chamados, Tickets e Devoluções
- **Sistema de relatórios** com formulários dinâmicos
- **Gerenciamento de usuários** (apenas para administradores)
- **Interface moderna** com Bootstrap 5 e Font Awesome
- **Notificações toast** para feedback imediato
- **Responsivo** para desktop e mobile
- **Deploy no Netlify** com Netlify Functions

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Netlify (para deploy)

## 🛠️ Instalação Local

1. Clone o repositório:
```bash
git clone <repository-url>
cd slowtek-counter-app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor local:
```bash
npm start
```

4. Acesse a aplicação em: `http://localhost:3000`

## 🌐 Deploy no Netlify

### Método 1: GitHub + Netlify (Recomendado)

1. **Suba o código para o GitHub**
2. **Acesse o Netlify** e conecte o repositório
3. **Configurações de Build:**
   - **Build command:** `npm run build`
   - **Publish directory:** `public`
   - **Functions directory:** `netlify/functions`

### Método 2: Netlify CLI

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Fazer login
netlify login

# 3. Deploy
netlify deploy

# 4. Deploy em produção
netlify deploy --prod
```

### 📋 Configurações do Netlify

| Campo | Valor |
|-------|--------|
| **Build command** | `npm run build` |
| **Publish directory** | `public` |
| **Functions directory** | `netlify/functions` |
| **Node version** | `18` |

## 👤 Login Padrão

**Usuário:** `slowtek`  
**Senha:** `slowtekadmiro123`

## 📁 Estrutura do Projeto (Netlify)

```
├── netlify.toml            # Configurações do Netlify
├── netlify/functions/      # Netlify Functions
│   └── server.js          # Função serverless principal
├── server.js              # Servidor local (desenvolvimento)
├── package.json           # Dependências
├── views/                 # Templates EJS
├── public/                # Arquivos estáticos
│   ├── index.html         # Página de redirecionamento
│   ├── css/style.css      # Estilos
│   └── js/                # JavaScript frontend
└── *.json                 # Arquivos de dados
```

## 🔧 Funcionalidades

### Dashboard
- Visualização de contadores em tempo real
- Botões para incrementar contadores
- Formulário modal para relatórios
- Resumo estatístico

### Relatórios
- Listagem de todos os relatórios
- Criação de novos relatórios
- Visualização detalhada das informações

### Gerenciamento de Usuários (Admin)
- Criação de novos usuários
- Definição de roles (admin/user)
- Exclusão de usuários
- Indicador de força de senha

## 💾 Arquivos de Dados

A aplicação utiliza arquivos JSON para persistência:

- `contador.json` - Contador de chamados
- `contadort.json` - Contador de tickets
- `contadordev.json` - Contador de devoluções
- `users.json` - Dados dos usuários
- `reports.json` - Relatórios salvos

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Sessões seguras com express-session
- Proteção de rotas com middleware de autenticação
- Proteção contra exclusão do usuário admin principal

## 🌐 Netlify Functions

A aplicação usa **Netlify Functions** para rodar o servidor Express:

- **Serverless:** Escala automaticamente
- **Sem servidor:** Não precisa gerenciar infraestrutura
- **Gratuito:** Até 125.000 execuções/mês

## 🎨 Interface

- Design moderno com Bootstrap 5
- Ícones Font Awesome
- Gradientes e animações CSS
- Notificações toast interativas
- Layout responsivo

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop
- Tablets
- Smartphones

## 🔄 Migração do Discord Bot

Esta aplicação web mantém todas as funcionalidades do bot Discord original:

- ✅ Contadores de chamados, tickets e devoluções
- ✅ Sistema de relatórios com formulário
- ✅ Incremento automático de contadores
- ✅ Persistência de dados em arquivos JSON
- ✅ Interface amigável substituindo comandos Discord

## 🚀 URLs de Exemplo

Após o deploy no Netlify, sua aplicação estará disponível em:
- `https://seu-app-name.netlify.app`
- Domínio customizado (opcional)

## 🛠️ Desenvolvimento

Para desenvolvimento local:
```bash
npm run dev  # Servidor com auto-reload
npm start    # Servidor padrão
npm run build # Build para produção
```

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do Netlify Functions
2. Teste localmente primeiro
3. Entre em contato com a equipe Slowtek

## 🔧 Troubleshooting

### Problema: Função não carrega
- Verifique se `netlify.toml` está configurado
- Confirme que `serverless-http` está instalado
- Veja os logs no painel do Netlify

### Problema: Arquivos não persistem
- No Netlify, arquivos são efêmeros
- Para produção, considere usar banco de dados
- Os dados resetam a cada deploy

---

**Desenvolvido com ❤️ para Slowtek - Otimizado para Netlify! 🚀**