📚 **TechChallengeIII - Blogging Dinâmico com Integração Full Stack**

📝 **Descrição**  
Este projeto é uma aplicação de blogging dinâmica criada para professores e alunos da rede pública de educação. A aplicação permite a criação, edição, visualização e exclusão de postagens, além de gerenciamento de usuários com autenticação. Professores têm acesso a uma área administrativa para gerenciar conteúdo e usuários.

🛠️ **Tecnologias Utilizadas**  
- Frontend: React.js  
- Backend: Node.js, Express.js  
- Banco de Dados: PostgreSQL  
- Autenticação: JWT (JSON Web Token)  
- Containerização: Docker  
- CI/CD: GitHub Actions  

📂 **Estrutura de Diretórios**  
```
TechChallengeIII/
├── backend/
├────TechChallengeII
│     ├── config/
│     │   └── db.js
│     ├── controllers/
│     │   ├── usuarioController.js
│     │   └── postagemController.js
│     ├── middleware/
│     │   └── authMiddleware.js
│     ├── models/
│     │   ├── usuarioModel.js
│     │   └── postagemModel.js
│     ├── routes/
│     ├── usuarioRoutes.js
│     │   └── postagemRoutes.js
│     └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── PostItem.js
│   │   │   └── PostList.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── AdminPage.js
│   │   │   ├── LoginPage.js
│   │   │   └── CriarPostPage.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── postService.js
│   │   ├── css/
│   │   │   └── estilos.css
│   │   ├── App.js
│   │   └── index.js
│   └── Dockerfile
├── .env
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

🚀 **Configuração do Ambiente**

📋 **Pré-requisitos**  
- Node.js e npm instalados  
- Docker e Docker Compose instalados  

🛠️ **Passo a Passo**  

1. **Clone o repositório do projeto:**
```bash
git clone https://github.com/SeuUsuario/TechChallengeIII.git
cd TechChallengeIII
```

2. **Configure as variáveis de ambiente no arquivo `.env`:**
```plaintext
JWT_SECRET=sua-chave-secreta
DB_HOST=db
DB_USER=postgres
DB_PASS=password
DB_NAME=techchallenge
```

3. **Instale as dependências do backend e frontend:**  
No diretório backend:
```bash
cd backend/TechChallengeII
npm install
```
No diretório frontend:
```bash
cd ../frontend
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

6. **Inicie a aplicação manualmente (opcional):**  
No diretório backend:
```bash
npm start
```
No diretório frontend:
```bash
npm start
```

7. **Execute os testes (opcional):**
```bash
npx jest
```

🔗 **Endpoints da API**

### 🧑‍🏫 Cadastro de Usuário  
- POST /api/usuarios/signup  

### 🔑 Login de Usuário  
- POST /api/usuarios/login  

### ✍️ Criação de Postagem  
- POST /api/postagens  

### 🔍 Busca de Postagens  
- GET /api/postagens/search?pesquisa=termo  

### 📰 Listar Postagens  
- GET /api/postagens  

### 📖 Obter Postagem por ID  
- GET /api/postagens/:id  

### 📝 Atualizar Postagem  
- PUT /api/postagens/:id  

### ❌ Deletar Postagem  
- DELETE /api/postagens/:id  
