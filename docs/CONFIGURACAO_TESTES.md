# Configuração do Ambiente de Testes

## 1. Instalação das Dependências

Primeiro, vamos instalar as dependências necessárias:

```bash
pnpm add -D jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
```

## 2. Configuração do Jest

### 2.1 Criar arquivo `jest.config.js` na raiz do projeto

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.stub.{ts,tsx}',
    '!src/**/index.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

### 2.2 Criar arquivo `jest.setup.js`

```javascript
import '@testing-library/jest-dom'

// Mock do next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn()
    }
  }
}))

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    }
  },
  usePathname() {
    return ''
  }
}))

// Mock do next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn()
  })
}))
```

### 2.3 Criar arquivo `__mocks__/fileMock.js`

```javascript
module.exports = 'test-file-stub'
```

## 3. Configuração do TypeScript

### 3.1 Atualizar `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"],
    "esModuleInterop": true,
    "jsx": "react-jsx"
  }
}
```

## 4. Configuração dos Scripts

### 4.1 Atualizar `package.json`

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage",
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand"
  }
}
```

## 5. Configuração do ESLint

### 5.1 Instalar dependências adicionais

```bash
pnpm add -D eslint-plugin-jest eslint-plugin-testing-library
```

### 5.2 Atualizar `.eslintrc.js`

```javascript
module.exports = {
  extends: [
    // ... outras extensões
    'plugin:jest/recommended',
    'plugin:testing-library/react'
  ],
  plugins: [
    // ... outros plugins
    'jest',
    'testing-library'
  ],
  env: {
    // ... outros ambientes
    'jest/globals': true
  },
  rules: {
    // ... outras regras
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'testing-library/await-async-query': 'error',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/no-container': 'error',
    'testing-library/no-debugging-utils': 'warn',
    'testing-library/no-dom-import': 'error',
    'testing-library/no-node-access': 'error',
    'testing-library/no-render-in-setup': 'error',
    'testing-library/no-unnecessary-act': 'error',
    'testing-library/no-wait-for-empty-callback': 'error',
    'testing-library/prefer-find-by': 'error',
    'testing-library/prefer-presence-queries': 'error',
    'testing-library/prefer-query-by-disappearance': 'error',
    'testing-library/prefer-screen-queries': 'error'
  }
}
```

## 6. Estrutura de Pastas

Criar a seguinte estrutura de pastas:

```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── __mocks__/
├── __mocks__/
└── test-utils/
    └── render.tsx
```

## 7. Utilitários de Teste

### 7.1 Criar `src/test-utils/render.tsx`

```typescript
import { render as rtlRender } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

function render(ui: React.ReactElement, options = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    ),
    ...options,
  })
}

export * from '@testing-library/react'
export { render }
```

## 8. Verificação da Configuração

1. Criar um teste simples para verificar a configuração:

```typescript
// src/__tests__/setup.test.ts
describe('Configuração de Testes', () => {
  it('deve estar funcionando corretamente', () => {
    expect(true).toBe(true)
  })
})
```

2. Executar os testes:

```bash
pnpm test
```

## 9. Próximos Passos

1. [ ] Implementar testes para componentes existentes
2. [ ] Configurar mocks para chamadas de API
3. [ ] Adicionar testes de integração
4. [ ] Configurar relatórios de cobertura
5. [ ] Integrar com CI/CD

## 10. Troubleshooting

### Problemas Comuns e Soluções

1. **Erro de módulo não encontrado**
   - Verificar `moduleNameMapper` no `jest.config.js`
   - Confirmar caminhos nos imports

2. **Erro de tipo TypeScript**
   - Verificar `tsconfig.json`
   - Confirmar tipos instalados

3. **Erro de ambiente jsdom**
   - Verificar `testEnvironment` no `jest.config.js`
   - Confirmar instalação do `jest-environment-jsdom`

4. **Erro de mock**
   - Verificar configuração do mock
   - Confirmar ordem dos mocks
