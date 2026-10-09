# appadosal

> **Status: projeto independente histórico, em estágio parcial e sem manutenção ativa.** É um laboratório de arquitetura, não um produto concluído nem uma aplicação comercial em funcionamento.

**Origem e contribuição:** iniciado a partir do gerador open source [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack). O repositório documenta a configuração, experimentação e evolução desse ponto de partida; não reivindica a autoria integral do scaffolding ou de suas bibliotecas.

**O que pode ser avaliado:** [configuração de autenticação](apps/server/src/lib/auth.ts), [API tRPC de exemplo](apps/server/src/routers/index.ts), [scripts do monorepo](package.json) e [documentação de evolução](MELHORIAS.md). Os endpoints de negócio e testes completos não foram demonstrados.

Experimento full-stack em TypeScript organizado como monorepo, voltado a estudar contratos tipo-seguros, autenticação, persistência e fundamentos de experiência web.

O projeto funciona como um laboratório de engenharia de produto: front-end, servidor e banco de dados evoluem no mesmo workspace, mas mantêm responsabilidades explícitas.

## Em um minuto: problema, solução e evidências

- **Problema:** coordenar frontend, servidor e persistência reduzindo divergências entre contratos de API e tipos.
- **Escopo do projeto:** laboratório público de arquitetura full-stack; não é apresentado como produto comercial em produção.
- **Solução documentada:** monorepo com aplicações web/servidor, integração tRPC, autenticação e modelagem de dados com migrações.
- **Tecnologias:** React, Next.js, TypeScript, tRPC, Better Auth, Drizzle, SQLite/Turso e pnpm.
- **Resultado verificável:** scripts de build, verificação de tipos, testes e migração estão definidos em [package.json](package.json). A existência desses scripts não equivale a execução validada ou cobertura comprovada.

**Como verificar:** consulte [package.json](package.json), `apps/` e [docs/](docs/), e reproduza o ambiente descrito abaixo.

## Evidências no código (inspeção de outubro de 2026)

| Implementação identificada | Onde conferir | Limite da evidência |
| --- | --- | --- |
| Configuração de autenticação por e-mail e senha com Better Auth e adapter Drizzle/SQLite | [auth.ts](apps/server/src/lib/auth.ts) | Configuração presente; funcionamento completo não testado |
| Cliente de autenticação React apontando para URL do servidor | [auth-client.ts](apps/web/src/lib/auth-client.ts) | Integração configurada, não prova de fluxo ponta a ponta |
| API tRPC com `healthCheck` público e `privateData` protegida por sessão | [routers/index.ts](apps/server/src/routers/index.ts) | **Escopo observado:** endpoints de exemplo; não atribuir funcionalidades de domínio inexistentes |
| Teste básico de configuração com asserção simples | [setup.test.ts](src/__tests__/setup.test.ts) | Não mede cobertura do negócio nem robustez dos fluxos |

**Resultado demonstrável:** esqueleto de arquitetura full-stack com autenticação e contratos tipados. **Não demonstrado:** produto pronto, implantação operacional ou redução mensurada de erros.

## Objetivos técnicos

- compartilhar tipos entre cliente e servidor;
- reduzir divergências entre chamadas de API e implementação;
- estruturar autenticação por e-mail e senha;
- modelar persistência com migrações reproduzíveis;
- oferecer experiência PWA;
- manter validação, testes e formatação automatizados;
- permitir evolução futura para outros clientes dentro do monorepo.

## Arquitetura

```mermaid
flowchart LR
    U[Usuário] --> W[Web — Next.js e React]
    W --> Q[Cliente tRPC]
    Q --> A[API tipo-segura]
    A --> S[Servidor Next.js]
    S --> B[Better Auth]
    S --> O[Drizzle ORM]
    O --> D[SQLite / Turso]
```

## Organização do workspace

```text
appadosal/
├── apps/
│   ├── web/          # aplicação Next.js e experiência PWA
│   └── server/       # API, autenticação e persistência
├── packages/         # espaço para contratos e módulos compartilhados
├── docs/             # decisões, testes e fluxo do sistema
├── package.json
└── pnpm-workspace.yaml
```

## Stack

**Web**  
`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Radix UI` · `TanStack Query` · `TanStack Form` · `Zod`

**Integração**  
`tRPC` · contratos tipo-seguros de ponta a ponta

**Servidor e dados**  
`Next.js` · `Better Auth` · `Drizzle ORM` · `SQLite` · `Turso`

**Qualidade**  
`Jest` · `Testing Library` · `Biome` · `Markdownlint` · `Husky` · `lint-staged`

## Execução local

### Requisitos

- Node.js compatível com as aplicações;
- `pnpm 10.11.0`;
- Turso CLI para execução local do banco.

### Instalação

```bash
git clone https://github.com/BrunoCesarAngst/appadosal.git
cd appadosal
pnpm install
```

### Banco de dados

```bash
cd apps/server
pnpm db:local
```

Em outro terminal, na raiz:

```bash
pnpm db:push
pnpm dev
```

Aplicação web: `http://localhost:3001`  
Servidor: `http://localhost:3000`

## Comandos principais

```bash
pnpm dev             # inicia os workspaces
pnpm build           # compila as aplicações
pnpm check-types     # verifica tipos
pnpm test            # executa testes
pnpm test:coverage   # mede cobertura
pnpm check           # valida e formata com Biome
pnpm db:generate     # gera artefatos de migração
pnpm db:migrate      # aplica migrações
pnpm db:studio       # abre o Drizzle Studio
```

## Decisões de engenharia demonstradas

- monorepo com execução coordenada por workspaces;
- fronteira tipo-segura entre cliente e servidor;
- persistência modelada por schema e migrações;
- autenticação tratada como capacidade transversal;
- comandos distintos para desenvolvimento, build, tipos e banco;
- documentação técnica mantida junto ao código;
- hooks de Git para reduzir regressões antes do commit.

## Documentação

- [Configuração de testes](./docs/CONFIGURACAO_TESTES.md)
- [Estratégia de testes](./docs/ESTRATEGIA_TESTES.md)
- [Fluxo do sistema](./docs/FLUXO.md)
- [Melhorias planejadas](./docs/MELHORIAS.md)

## Estado do projeto

Projeto histórico interrompido. Seu valor está no exercício de integração e estruturação full-stack, não na demonstração de um produto comercial, sistema completo ou serviço oficial.

---

[Perfil de Bruno César Angst](https://github.com/BrunoCesarAngst) · [Site](https://brunoangst.com.br/)
