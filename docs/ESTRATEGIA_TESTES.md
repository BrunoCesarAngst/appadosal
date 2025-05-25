# Estratégia de Testes Unitários

## Visão Geral

Este documento descreve a estratégia de testes unitários para a aplicação appadosal, utilizando Jest como framework principal.

## Estrutura de Testes

### 1. Testes de Componentes React

```typescript
// __tests__/components/Header.test.tsx
import { render, screen } from '@testing-library/react'
import Header from '@/components/header'

describe('Header', () => {
  it('deve renderizar os links de navegação', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('deve renderizar o botão de tema', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /tema/i })).toBeInTheDocument()
  })
})
```

### 2. Testes de Formulários

```typescript
// __tests__/components/SignInForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import SignInForm from '@/components/sign-in-form'

describe('SignInForm', () => {
  it('deve validar campos obrigatórios', async () => {
    render(<SignInForm onSwitchToSignUp={() => {}} />)

    const submitButton = screen.getByRole('button', { name: /entrar/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText(/email é obrigatório/i)).toBeInTheDocument()
    expect(await screen.findByText(/senha é obrigatória/i)).toBeInTheDocument()
  })

  it('deve validar formato de email', async () => {
    render(<SignInForm onSwitchToSignUp={() => {}} />)

    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } })

    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument()
  })
})
```

### 3. Testes de Hooks

```typescript
// __tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'

describe('useAuth', () => {
  it('deve retornar estado inicial não autenticado', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('deve atualizar estado após login bem-sucedido', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })

    expect(result.current.isAuthenticated).toBe(true)
  })
})
```

### 4. Testes de Utilitários

```typescript
// __tests__/utils/validation.test.ts
import { validateEmail, validatePassword } from '@/utils/validation'

describe('validation utils', () => {
  describe('validateEmail', () => {
    it('deve retornar true para email válido', () => {
      expect(validateEmail('test@example.com')).toBe(true)
    })

    it('deve retornar false para email inválido', () => {
      expect(validateEmail('invalid-email')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('deve retornar true para senha válida', () => {
      expect(validatePassword('Password123!')).toBe(true)
    })

    it('deve retornar false para senha muito curta', () => {
      expect(validatePassword('123')).toBe(false)
    })
  })
})
```

## Configuração do Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

## Scripts de Teste

Adicionar ao `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage"
  }
}
```

## Boas Práticas

1. **Organização**
   - Manter testes próximos aos componentes testados
   - Usar estrutura de pastas `__tests__`
   - Nomear arquivos com sufixo `.test.ts` ou `.test.tsx`

2. **Cobertura**
   - Manter cobertura mínima de 80%
   - Focar em testes de regras de negócio críticas
   - Testar casos de erro e edge cases

3. **Mocking**
   - Mockar chamadas de API
   - Mockar funções externas
   - Usar `jest.mock()` para módulos

4. **Assertions**
   - Usar assertions específicas
   - Testar comportamento, não implementação
   - Verificar estados e efeitos colaterais

## Exemplo de Mock

```typescript
// __tests__/services/api.test.ts
import { fetchUserData } from '@/services/api'

jest.mock('@/lib/trpc', () => ({
  trpc: {
    user: {
      query: jest.fn()
    }
  }
}))

describe('API Services', () => {
  it('deve buscar dados do usuário', async () => {
    const mockUserData = { id: 1, name: 'Test User' }
    trpc.user.query.mockResolvedValue(mockUserData)

    const result = await fetchUserData(1)
    expect(result).toEqual(mockUserData)
  })
})
```

## Integração com CI/CD

```yaml
# .github/workflows/test.yml
name: Testes
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm test:ci
```

## Próximos Passos

1. [X] Configurar ambiente de testes
2. [ ] Implementar testes básicos de componentes
3. [ ] Adicionar testes de formulários
4. [ ] Configurar cobertura de código
5. [ ] Integrar com pipeline CI/CD
