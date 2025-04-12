# Gerador de Escalas Musicais

Aplicativo web para ensino e prática de escalas musicais em diferentes instrumentos.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/gerador-escalas-musicas.git
cd gerador-escalas-musicas
```

2. Instale as dependências:
```bash
npm install
```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npx vite
```

O aplicativo estará disponível em: [http://localhost:5173/](http://localhost:5173/)

### Comandos Disponíveis

- `npx vite` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a versão de produção
- `npm run lint` - Executa a verificação de código
- `npm run format` - Formata o código com Prettier
- `npm test` - Executa os testes
- `npm run test:coverage` - Executa os testes e gera relatório de cobertura

## 📋 Funcionalidades

- Seleção de instrumentos (violão, guitarra, baixo, teclado)
- Visualização de escalas musicais
- Metrônomo para prática
- Configurações personalizáveis
- Temas claro/escuro
- Suporte a múltiplos idiomas

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Vitest

## 📁 Estrutura do Projeto

```
src/
├── assets/       # Recursos estáticos (imagens, sons)
├── components/   # Componentes reutilizáveis
├── pages/        # Páginas da aplicação
├── store/        # Gerenciamento de estado (Redux)
├── styles/       # Estilos globais
├── types/        # Definições de tipos TypeScript
└── utils/        # Funções utilitárias
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
