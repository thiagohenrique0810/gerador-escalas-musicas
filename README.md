# Gerador de Escalas Musicais

Uma aplicação web para ajudar músicos a aprender e praticar escalas musicais em diferentes instrumentos.

## 🚀 Funcionalidades

- **Múltiplos Instrumentos**: Suporte para guitarra, baixo, ukulele e teclado
- **Catálogo de Escalas**: Escalas maiores, menores, pentatônicas, blues e modos gregos
- **Visualização Interativa**: Diagramas interativos para cada instrumento
- **Reconhecimento de Notas**: Detecção de notas em tempo real
- **Reprodução de Áudio**: Tocar notas e escalas
- **Internacionalização**: Suporte para português, inglês e espanhol
- **Tema Escuro**: Interface adaptativa para diferentes condições de iluminação

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Vite
- **Estilização**: Tailwind CSS
- **Gerenciamento de Estado**: Redux Toolkit
- **Roteamento**: React Router
- **Internacionalização**: i18next
- **Testes**: Vitest, React Testing Library
- **Áudio**: Web Audio API
- **Reconhecimento de Notas**: Web Audio API, Pitch Detection

## 📋 Pré-requisitos

- Node.js 16.x ou superior
- NPM 7.x ou superior

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/gerador-escalas-musicas.git
   cd gerador-escalas-musicas
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação em `http://localhost:5173`

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

Para executar os testes com cobertura:

```bash
npm run test:coverage
```

## 📦 Build

Para criar uma versão de produção:

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist`.

## 🏗️ Arquitetura

A aplicação segue uma arquitetura baseada em componentes com as seguintes camadas:

- **Componentes**: Elementos de UI reutilizáveis
- **Páginas**: Componentes que representam rotas completas
- **Serviços**: Lógica de negócio e integração com APIs externas
- **Store**: Gerenciamento de estado global com Redux
- **Hooks**: Lógica reutilizável
- **Utilitários**: Funções auxiliares

### Estrutura de Pastas

```
src/
├── assets/         # Recursos estáticos (imagens, sons)
├── components/     # Componentes reutilizáveis
├── hooks/          # Hooks personalizados
├── i18n/           # Configuração e arquivos de tradução
├── pages/          # Componentes de página
├── services/       # Serviços e integrações
├── store/          # Configuração do Redux e slices
├── types/          # Definições de tipos TypeScript
└── utils/          # Funções utilitárias
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Tone.js](https://tonejs.github.io/) - Biblioteca de áudio para a web
- [React Icons](https://react-icons.github.io/react-icons/) - Ícones para React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
