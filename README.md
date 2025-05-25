# appadosal

Este projeto foi criado com [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), uma stack moderna de TypeScript que combina Next.js, Next, TRPC e mais.

## Funcionalidades

- **TypeScript** - Para segurança de tipos e melhor experiência do desenvolvedor
- **Next.js** - Framework React full-stack
- **TailwindCSS** - CSS utilitário para desenvolvimento rápido de interface
- **shadcn/ui** - Componentes de interface reutilizáveis
- **tRPC** - APIs tipo-seguras de ponta a ponta
- **Node.js** - Ambiente de execução
- **Drizzle** - ORM com foco em TypeScript
- **SQLite/Turso** - Motor de banco de dados
- **Autenticação** - Autenticação com email e senha usando Better Auth
- **Husky** - Hooks do Git para qualidade de código
- **PWA** - Suporte a Progressive Web App
- **Biome** - Linting e formatação

## Primeiros Passos

Primeiro, instale as dependências:

```bash
pnpm install
```

## Configuração do Banco de Dados

Este projeto usa SQLite com Drizzle ORM.

1. Inicie o banco de dados SQLite local:

```bash
cd apps/server && pnpm db:local
```

1. Atualize seu arquivo `.env` no diretório `apps/server` com os detalhes de conexão apropriados, se necessário.

1. Aplique o esquema ao seu banco de dados:

```bash
pnpm db:push
```

Em seguida, execute o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra [http://localhost:3001](http://localhost:3001) no seu navegador para ver a aplicação web.

A API está rodando em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```txt
appadosal/
├── apps/
│   ├── web/         # Aplicação frontend (Next.js)
│   └── server/      # API backend (Next, TRPC)
```

## Scripts Disponíveis

- `pnpm dev`: Inicia todas as aplicações em modo de desenvolvimento
- `pnpm build`: Compila todas as aplicações
- `pnpm dev:web`: Inicia apenas a aplicação web
- `pnpm dev:server`: Inicia apenas o servidor
- `pnpm check-types`: Verifica tipos TypeScript em todas as aplicações
- `pnpm db:push`: Aplica alterações do esquema ao banco de dados
- `pnpm db:studio`: Abre a interface do estúdio do banco de dados
- `cd apps/server && pnpm db:local`: Inicia o banco de dados SQLite local
- `pnpm check`: Executa formatação e linting com Biome
- `cd apps/web && pnpm generate-pwa-assets`: Gera recursos do PWA

## Documentação

- [Configuração de Testes](./docs/CONFIGURACAO_TESTES.md)
- [Estratégia de Testes](./docs/ESTRATEGIA_TESTES.md)
- [Melhorias](./docs/MELHORIAS.md)
- [Fluxo](./docs/FLUXO.md)
