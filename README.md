# SposiTech - Sistema de Suporte e Atendimento

Sistema web moderno para suporte técnico, atendimento ao cliente e gerenciamento de serviços de informática.

## 🚀 Recursos Principais

- **Chatbot Inteligente**: Atendimento automatizado com integração para suporte humano quando necessário
- **Painel Administrativo**: Dashboard completo para gerenciamento de atendimentos
- **Interface Responsiva**: Compatível com dispositivos desktop e móveis
- **Integração com Socket.io**: Comunicação em tempo real entre usuários e atendentes

## 📋 Pré-requisitos

- Node.js 14+ instalado
- NPM ou Yarn

## 🔧 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/sposito88/spositech.git
cd spositech
npm install

# Criar arquivo .env.local com as seguintes variáveis
NEXT_PUBLIC_ADMIN_EMAIL=seu_email@exemplo.com
NEXT_PUBLIC_ADMIN_PASSWORD=sua_senha_segura
PORT=3000

# Iniciar o servidor de desenvolvimento
npm run dev
```

## 🖥️ Execução

### Modo Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento:

```bash
# Usando npm
npm run dev

# Ou utilizando o script auxiliar
dev.bat
```

### Modo Produção

Para iniciar o servidor em modo de produção:

```bash
# Usando npm
npm run build
npm start

# Ou utilizando o script auxiliar
start.bat
```

## 🌐 Acesso

- Site principal: http://localhost:3000
- Painel administrativo: http://localhost:3000/admin

### Credenciais do Painel Administrativo
- **Usuário**: admin
- **Senha**: spositech2024

## 📚 Estrutura do Projeto

```
spositech/
├── public/                # Arquivos estáticos
├── src/
│   ├── components/        # Componentes React
│   ├── pages/             # Páginas da aplicação
│   │   ├── admin/         # Páginas administrativas
│   │   └── api/           # Endpoints da API
│   ├── hooks/             # Hooks personalizados
│   └── styles/            # Arquivos CSS
├── server.js              # Servidor com Socket.io
└── package.json           # Dependências
```

## 🔧 Tecnologias Utilizadas

- **Frontend**: React, Next.js, Bootstrap, TailwindCSS
- **Backend**: Node.js, Socket.io
- **Estilização**: CSS Modules, Bootstrap
- **Ícones**: React Icons

## 📝 Funcionalidades do Painel Administrativo

- **Dashboard**: Visão geral com estatísticas em tempo real
- **Gerenciamento de Usuários**: Cadastro e manutenção de usuários
- **Atendimento**: Interface para atendimento de clientes
- **Relatórios**: Análise de desempenho e estatísticas

## 📞 Suporte

Para suporte, entre em contato através de support@spositech.com.

## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Configuração do Acesso Administrativo

Para configurar o acesso ao painel administrativo com segurança:

1. Crie um arquivo `.env.local` na raiz do projeto (se ainda não existir)
2. Adicione as seguintes variáveis:
   ```
   NEXT_PUBLIC_ADMIN_EMAIL=seu_email@exemplo.com
   NEXT_PUBLIC_ADMIN_PASSWORD=sua_senha_segura
   ```
3. Estas credenciais serão usadas para acessar o painel administrativo em `/admin/login`
4. Em produção, recomenda-se implementar um sistema de autenticação mais robusto usando JWT e armazenamento em banco de dados

## Funcionalidades

- Painel administrativo com chat ao vivo para atendimento de clientes
- Gerenciamento de projetos e serviços
- Integração com WhatsApp para comunicação com clientes
- Dashboard com métricas e relatórios

## Segurança

- Nunca exponha as credenciais do administrador no código-fonte
- Sempre use HTTPS em ambiente de produção
- Mantenha as dependências atualizadas com `npm audit` e `npm update`
- Implemente autenticação JWT para maior segurança
- Configure o CORS adequadamente para evitar acessos não autorizados

---

Desenvolvido com ❤️ por SposiTech 
