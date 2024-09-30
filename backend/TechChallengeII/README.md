# 📚 TechChallengeII - Blogging Dinâmico

## 📝 Descrição

Este projeto é uma aplicação de blogging dinâmica criada para professores da rede pública de educação. A aplicação permite a criação, edição, visualização e exclusão de posts, além de busca de posts por palavras-chave.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker
- **CI/CD:** GitHub Actions

## 📂 Estrutura de Diretórios

```plaintext
TechChallengeII/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── usuarioController.js
│   │   └── postagemController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── usuarioModel.js
│   │   └── postagemModel.js
│   ├── routes/
│   │   ├── usuarioRoutes.js
│   │   └── postagemRoutes.js
│   ├── test/
│   │   ├── controllers/
│   │   │   └── postagemController.test.js
│   │   ├── models/
│   │   │   ├── postagemModel.test.js
│   │   │   └── usuarioModel.test.js
│   └── server.js
├── Dockerfile
├── docker-compose.yml
├── .env
├── .dockerignore
├── .gitignore
├── jest.config.js
├── package.json
├── package-lock.json
└── wait-for-it.sh
```

## 🚀 Configuração do Ambiente

### 📋 Pré-requisitos

- Node.js e npm instalados
- Docker e Docker Compose instalados

### 🛠️ Passo a Passo

1. **Clone o repositório do projeto:**
   ```bash
   git clone https://github.com/FellGMS/TechChallengeII.git
   cd TechChallengeII
   ```

2. **Configure as variáveis de ambiente no arquivo `.env`:**
   ```plaintext
   JWT_SECRET=seu-segredo-aqui
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Suba os contêineres Docker:**
   ```bash
   docker-compose up --build
   ```

5. **Execute as migrações do banco de dados:**
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Inicie a aplicação:**
   ```bash
   npm start
   ```

7. **Execute os testes:**
   ```bash
   npm test
   ```

## 🔗 Endpoints da API

### 🧑‍🏫 Cadastro de Usuário

- **POST /api/usuarios/signup**

### 🔑 Login de Usuário

- **POST /api/usuarios/login**

### ✍️ Criação de Postagem

- **POST /api/postagens**

### 🔍 Busca de Postagens

- **GET /api/postagens/search?pesquisa=termo**

### 📰 Listar Postagens

- **GET /api/postagens**

### 📖 Obter Postagem por ID

- **GET /api/postagens/:id**

### 📝 Atualizar Postagem

- **PUT /api/postagens/:id**

### ❌ Deletar Postagem

- **DELETE /api/postagens/:id**

## 🤖 Configuração do GitHub Actions

Crie um arquivo `.github/workflows/ci-cd.yml` no repositório:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    - name: Build Docker image
      run: docker build -t techchallengeii-app .

    - name: Push Docker image
      run: docker push your-docker-repo/techchallengeii-app
```
