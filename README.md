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

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd slowtek-counter-app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

4. Acesse a aplicação em: `http://localhost:3000`

## 👤 Login Padrão

**Usuário:** `slowtek`  
**Senha:** `slowtekadmiro123`

## 📁 Estrutura do Projeto

```
├── server.js              # Servidor principal
├── package.json           # Dependências e scripts
├── views/                 # Templates EJS
│   ├── login.ejs         # Página de login
│   ├── dashboard.ejs     # Dashboard principal
│   ├── reports.ejs       # Página de relatórios
│   ├── users.ejs         # Gerenciamento de usuários
│   └── partials/
│       └── navbar.ejs    # Barra de navegação
├── public/               # Arquivos estáticos
│   ├── css/
│   │   └── style.css     # Estilos customizados
│   └── js/
│       ├── dashboard.js  # JavaScript do dashboard
│       ├── reports.js    # JavaScript dos relatórios
│       └── users.js      # JavaScript dos usuários
└── *.json               # Arquivos de dados
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

## 🚀 Deploy

Para produção, configure:

1. Variáveis de ambiente para segurança
2. Banco de dados (opcional, atualmente usa JSON)
3. HTTPS com certificados SSL
4. Process manager (PM2)

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe Slowtek.

---

**Desenvolvido com ❤️ para Slowtek**