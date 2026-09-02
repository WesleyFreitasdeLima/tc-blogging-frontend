# 🚀 TC Blogging Frontend

Front-end para um sistema de blog, desenvolvido como parte do Tech Challenge da FIAP. Construído com React, TypeScript e Vite, consumindo a API REST do [tc-blogging-backend](https://github.com/WesleyFreitasdeLima/tc-blogging-backend).

![Screenshot](./public/cover.png)

## Arquitetura do Sistema

A aplicação segue uma arquitetura em camadas, separando regras de negócio e comunicação com a API (`shared`) da camada de apresentação (`view`). O roteamento é feito com React Router, com suporte a rotas públicas, protegidas por autenticação e restritas a administradores. O consumo e cache de dados da API é gerenciado pelo TanStack React Query, e a construção de formulários utiliza React Hook Form com validação via Zod.

### Tecnologias Principais

- **React**: Biblioteca para construção da interface.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Bundler e dev-server.
- **React Router**: Gerenciador de rotas do React.
- **TanStack React Query**: Gerenciamento de estado assíncrono e cache de dados da API.
- **Tailwind CSS**: Framework CSS utilitário.
- **Shadcn/UI e Radix UI**: Componentes de interface acessíveis e customizáveis.
- **Lucide**: Biblioteca de ícones.
- **React Hook Form + Zod**: Construção e validação de formulários.
- **TipTap**: Editor de texto rico usado na criação/edição de posts.
- **AOS (Animate On Scroll)**: Animações de rolagem.
- **ESLint + Prettier + Husky + lint-staged**: Padronização e qualidade de código.
- **Docker e Docker Compose**: Containerização da aplicação.

### Estrutura do Projeto

A estrutura de pastas separa código de domínio/infra (`shared`) da camada visual (`view`), promovendo modularidade e reuso:

```bash
src/
├── shared/
│   ├── config/        # Configuração do React Query
│   ├── erros/         # Classes de erro customizadas
│   ├── lib/           # Cliente HTTP e utilitários
│   ├── models/        # Modelos de domínio (Post, User)
│   ├── routes/        # Definição das rotas da aplicação
│   ├── services/      # Serviços de acesso à API (auth, post, users)
│   └── types/         # Tipos compartilhados
├── view/
│   ├── components/ui/ # Componentes de UI (Shadcn/UI)
│   ├── layouts/        # Layouts (ex: layout principal com header)
│   └── pages/          # Páginas da aplicação
│       ├── admin/      # Painel administrativo de posts
│       ├── auth/       # Login
│       ├── home/       # Listagem/busca de posts
│       ├── new-post/   # Criação de post
│       ├── post/       # Visualização de um post
│       └── user/       # Painel administrativo de usuários
├── App.tsx
└── main.tsx
```

## Configuração de Ambiente

1.  Crie um arquivo `.env` na raiz do projeto.
2.  Copie o conteúdo abaixo e preencha com suas configurações.

```env
# URL da aplicação Backend
API_URL=http://localhost:3000/api
```

> **⚠️ Aviso de Segurança:**
>
> - Não exponha o `.env` em repositórios públicos.
> - `API_URL` deve apontar para uma instância confiável do backend, evitando URLs de origem desconhecida.

## Como Executar

### Pré-Requisitos

Antes de começar você vai precisar ter instalado na sua máquina as ferramentas [Git](https://git-scm.com/) e [Node.js](https://nodejs.org/).

Siga também as instruções do projeto backend para subir a API consumida por este frontend:

```
https://github.com/WesleyFreitasdeLima/tc-blogging-backend
```

### Ambiente de Desenvolvimento (Local)

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/WesleyFreitasdeLima/tc-blogging-frontend.git
    ```
2.  **Instalar dependências:**
    ```bash
    npm install
    ```
3.  **Configurar o arquivo `.env`** conforme a seção [Configuração de Ambiente](#configuração-de-ambiente).
4.  **Iniciar a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  **Acessar pelo navegador:**
    ```
    http://localhost:5173
    ```

### Com Docker

O Docker Compose sobe o container do frontend em modo de desenvolvimento, com hot-reload via volumes.

```bash
npm run docker:up
```

Acesse em `http://localhost:5173`.

## Scripts Disponíveis

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento (Vite dev-server).
- `npm run build`: Compila o TypeScript e gera o build de produção no diretório `dist/`.
- `npm run preview`: Sobe um servidor local para pré-visualizar o build de produção.
- `npm run lint`: Executa o ESLint para checar a qualidade do código.
- `npm run format`: Formata todo o código com Prettier.
- `npm run format:check`: Verifica se o código está formatado corretamente.
- `npm run docker:up`: Sobe o container da aplicação via Docker Compose.
- `npm run docker:down`: Derruba o container da aplicação.
- `npm run docker:logs`: Exibe os logs do container em tempo real.

## Funcionalidades e Rotas

A aplicação consome a API do backend para autenticação e gerenciamento de posts e usuários.

### Rotas Públicas

- `/`: Página inicial, com listagem e busca de posts.
- `/posts/:id`: Visualização de um post específico.
- `/auth`: Login.

### Rotas Autenticadas

- `/posts/new`: Criação de um novo post.
- `/admin/posts`: Painel administrativo de posts (criar, editar, remover).
- `/admin/users/:id`: Edição do próprio perfil de usuário.

### Rotas Restritas a Administradores

- `/admin/users`: Painel administrativo de usuários (listar, criar, editar).

### Autenticação

- O login é feito em `/auth` com `login` (usuário ou e-mail) e senha, retornando um `accessToken`.
- O token e os dados do usuário são armazenados em `localStorage`.
- Requisições autenticadas enviam o token no cabeçalho `Authorization: Bearer TOKEN`.
- Respostas `401` disparam logout automático e redirecionamento para o login.
- **Perfis de usuário:** `admin` e `teacher`, com acesso diferenciado às rotas administrativas.

## CI/CD (Integração e Entrega Contínua)

O pipeline de CI/CD deste projeto é orquestrado via **GitHub Actions**, estruturado para garantir qualidade e segurança em cada etapa. O fluxo é dividido em jobs sequenciais:

1. **Build**
   - Clona o repositório e configura o ambiente Node.js.
   - Instala as dependências de forma limpa (`npm ci`).
   - Executa lint e compila o projeto (TypeScript + Vite).

2. **Deploy** (Restrito à branch principal e executado após o build)
   - Constrói a imagem Docker da aplicação e faz o push para o registro de containers.
   - Aciona o deploy automático da nova versão na plataforma de hospedagem.

## Relato de Experiências e Desafios

Durante o desenvolvimento deste projeto, a equipe enfrentou e superou diversos desafios técnicos que contribuíram para o amadurecimento da solução:

- **Divisão de tarefas**: Para organizar a divisão de tarefas e as implementações do projeto de forma profissional, adotamos o controle de versão com Git e a gestão de issues no GitHub. Isso garantiu que a adição de novas features e as correções ocorressem de maneira estruturada, incremental e sempre com a revisão de toda a equipe.

- **Integração com o backend e autenticação**: A definição de um cliente HTTP centralizado, com injeção automática do token e tratamento padronizado de erros (incluindo logout automático em respostas `401`), foi essencial para simplificar o consumo da API em todas as páginas da aplicação.

- **Editor de texto rico**: A criação e edição de posts exigiu a integração de um editor de texto rico (TipTap), garantindo a formatação do conteúdo HTML de forma consistente entre a criação, edição e exibição dos posts.

- **Controle de acesso por perfil**: A aplicação precisou lidar com diferentes níveis de acesso (público, autenticado e administrador), o que levou à criação de rotas protegidas reutilizáveis que verificam autenticação e papel do usuário antes de renderizar as páginas.

## Autores

- **RM371918** - Carlos Eduardo Mendonça da Silva
- **RM371258** - Douglas Lacerda da Conceíção
- **RM372690** - Henrique Paulucci Vieira
- **RM371313** - Paulo Henrique Lopes
- **RM372340** - Wesley Freitas de Lima
