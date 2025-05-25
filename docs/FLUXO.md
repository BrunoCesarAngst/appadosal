# Fluxo do Usuário na Aplicação

## Visão Geral

Este documento descreve o fluxo de navegação e interação do usuário na aplicação appadosal, incluindo as ferramentas e tecnologias utilizadas em cada etapa.

## Fluxo Principal

### 1. Página Inicial (/)

**Ferramentas Utilizadas:**

- **Next.js**: Framework React para renderização da página
- **TailwindCSS**: Estilização da interface
- **tRPC**: Verificação do status da API
- **next-themes**: Gerenciamento de temas claro/escuro
- **shadcn/ui**: Componentes de interface reutilizáveis

- O usuário acessa a página inicial
- Pode verificar o status da API
- Tem acesso ao menu de navegação com opções para Home e Dashboard
- Pode alternar entre tema claro e escuro
- Pode acessar o menu do usuário

### 2. Autenticação (/login)

**Ferramentas Utilizadas:**

- **Better Auth**: Sistema de autenticação
- **@tanstack/react-form**: Gerenciamento de formulários
- **Zod**: Validação de dados dos formulários
- **Sonner**: Notificações toast para feedback
- **Next.js Router**: Redirecionamento após autenticação

- O usuário pode escolher entre:
  - **Cadastro (Sign Up)**
    - Preencher nome
    - Preencher email
    - Criar senha (mínimo 8 caracteres)
    - Após cadastro bem-sucedido, é redirecionado para o Dashboard

  - **Login (Sign In)**
    - Inserir email
    - Inserir senha
    - Após login bem-sucedido, é redirecionado para o Dashboard

### 3. Painel de Controle (/dashboard)

**Ferramentas Utilizadas:**

- **tRPC**: Comunicação com o backend para dados privados
- **@tanstack/react-query**: Gerenciamento de estado e cache
- **Next.js Middleware**: Proteção de rotas
- **Better Auth**: Verificação de sessão do usuário

- Área protegida que requer autenticação
- Exibe mensagem de boas-vindas com o nome do usuário
- Mostra dados privados do usuário
- Se o usuário não estiver autenticado, é redirecionado para a página de login

## Recursos Adicionais

### Tema

**Ferramentas Utilizadas:**

- **next-themes**: Gerenciamento de temas
- **TailwindCSS**: Estilos condicionais baseados no tema
- **CSS Variables**: Definição de cores e variáveis de tema

### Notificações

**Ferramentas Utilizadas:**

- **Sonner**: Sistema de notificações toast
- **React Query**: Gerenciamento de estados de carregamento/erro

### Responsividade

**Ferramentas Utilizadas:**

- **TailwindCSS**: Classes responsivas
- **CSS Grid/Flexbox**: Layout adaptativo
- **Next.js**: Otimização de imagens e recursos

### Segurança

**Ferramentas Utilizadas:**

- **Better Auth**: Autenticação segura
- **Zod**: Validação de dados
- **HTTP-only Cookies**: Armazenamento seguro de tokens
- **tRPC**: Comunicação tipo-segura com o backend

## Navegação

**Ferramentas Utilizadas:**

- **Next.js Link**: Navegação entre páginas
- **shadcn/ui**: Componentes de navegação
- **React Context**: Gerenciamento de estado global
- **Better Auth**: Gerenciamento de sessão do usuário

## Backend

**Ferramentas Utilizadas:**

- **tRPC**: API tipo-segura
- **Drizzle ORM**: Gerenciamento do banco de dados
- **SQLite/Turso**: Banco de dados
- **Better Auth**: Backend de autenticação
