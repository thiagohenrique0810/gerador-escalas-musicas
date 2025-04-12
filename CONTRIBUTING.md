# Guia de Contribuição

Obrigado pelo seu interesse em contribuir com o Gerador de Escalas Musicais! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Documentação](#documentação)
- [Perguntas Frequentes](#perguntas-frequentes)

## Código de Conduta

Ao participar deste projeto, você concorda em seguir nosso [Código de Conduta](CODE_OF_CONDUCT.md). Por favor, leia-o antes de contribuir.

## Como Contribuir

1. **Fork do Repositório**: Faça um fork do repositório para sua conta no GitHub.
2. **Clone do Repositório**: Clone seu fork para sua máquina local.
   ```bash
   git clone https://github.com/seu-usuario/gerador-escalas-musicas.git
   cd gerador-escalas-musicas
   ```
3. **Crie uma Branch**: Crie uma branch para sua feature ou correção.
   ```bash
   git checkout -b feature/nova-feature
   ```
4. **Faça Alterações**: Implemente suas alterações seguindo os padrões de código.
5. **Teste suas Alterações**: Execute os testes para garantir que tudo funciona corretamente.
   ```bash
   npm test
   ```
6. **Commit suas Alterações**: Faça commit das suas alterações com mensagens descritivas.
   ```bash
   git commit -m "Adiciona nova feature: descrição detalhada"
   ```
7. **Push para seu Fork**: Envie suas alterações para seu fork no GitHub.
   ```bash
   git push origin feature/nova-feature
   ```
8. **Abra um Pull Request**: Crie um Pull Request do seu fork para o repositório principal.

## Processo de Desenvolvimento

### Fluxo de Trabalho Git

- **main**: Branch principal, contém código estável e pronto para produção.
- **develop**: Branch de desenvolvimento, contém código em desenvolvimento.
- **feature/**: Branches para novas funcionalidades.
- **bugfix/**: Branches para correções de bugs.
- **release/**: Branches para preparação de releases.

### Ciclo de Desenvolvimento

1. Crie uma branch a partir de `develop`.
2. Desenvolva e teste sua feature.
3. Abra um Pull Request para `develop`.
4. Após revisão e aprovação, o código será mesclado em `develop`.
5. Periodicamente, `develop` será mesclado em `main` para releases.

## Padrões de Código

### TypeScript

- Use tipos explícitos para parâmetros e retornos de funções.
- Evite `any` sempre que possível.
- Use interfaces para definir contratos.
- Documente funções e classes com comentários JSDoc.

### React

- Use componentes funcionais com hooks.
- Mantenha componentes pequenos e focados.
- Use props para passar dados e callbacks para ações.
- Evite estado global quando possível.

### Estilização

- Use Tailwind CSS para estilização.
- Siga o padrão de classes do Tailwind.
- Mantenha a consistência visual.

### Nomenclatura

- **Arquivos**: Use PascalCase para componentes React, camelCase para outros arquivos.
- **Componentes**: Use PascalCase.
- **Funções e Variáveis**: Use camelCase.
- **Constantes**: Use UPPER_SNAKE_CASE.
- **Interfaces e Types**: Use PascalCase.

## Testes

- Escreva testes para todas as novas funcionalidades.
- Mantenha a cobertura de testes acima de 80%.
- Use mocks para dependências externas.
- Teste comportamentos, não implementações.

### Executando Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## Documentação

- Documente novas funcionalidades.
- Atualize o README quando necessário.
- Adicione comentários para código complexo.
- Mantenha a documentação de API atualizada.

## Perguntas Frequentes

### Como posso começar a contribuir?

Comece explorando as issues abertas no GitHub. Procure por issues marcadas como "good first issue" ou "help wanted".

### Como reportar um bug?

1. Verifique se o bug já foi reportado nas issues.
2. Se não, crie uma nova issue com:
   - Título descritivo
   - Descrição detalhada do problema
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots (se aplicável)
   - Ambiente (navegador, sistema operacional, etc.)

### Como solicitar uma nova funcionalidade?

1. Verifique se a funcionalidade já foi solicitada nas issues.
2. Se não, crie uma nova issue com:
   - Título descritivo
   - Descrição detalhada da funcionalidade
   - Casos de uso
   - Benefícios esperados

### Como posso melhorar a documentação?

1. Identifique áreas da documentação que precisam de melhorias.
2. Faça as alterações necessárias.
3. Abra um Pull Request com suas melhorias.

---

Obrigado por contribuir com o Gerador de Escalas Musicais! Suas contribuições são muito apreciadas. 