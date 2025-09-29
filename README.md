# L0gik — Lead Manager

### Sistema completo de gerenciamento de leads, com formulário público, painel administrativo, Dark Theme e integração via API REST.
- Frontend: Next.js + Material UI + Tailwind CSS
- Backend: Node.js + Express + Prisma + MySQL

---

## 🔹 Tecnologias

### Frontend
- Next.js 13 (App Router / React Server Components)
- React 18+
- Material UI 5
- Tailwind CSS (dark theme)
- Fetch API para comunicação com o backend

### Backend
- Node.js 18+
- Express 4
- Prisma ORM + MySQL
- CORS, Body-parser
- Basic Auth para proteção de rotas administrativas
- CSV export

---

## 🔹 Estrutura do Projeto

```bash
l0gik/
├─ frontend/
│  ├─ app/
│  │  ├─ index.js             # Página pública do formulário
│  │  ├─ thanks.js            # Página de agradecimento
│  │  └─ admin/
│  │     ├─ login.js          # Tela de login admin
│  │     ├─ leads/
│  │     │  ├─ index.js       # Listagem de leads
│  │     │  └─ [id].js        # Detalhes de lead
│  ├─ components/
│  │  ├─ Header.js
│  │  ├─ AdminLayout.js
│  │  └─ LeadForm.js
│  ├─ services/
│  │  └─ api.js               # Funções de requisição API (get, post, put, delete)
│  ├─ public/
│  ├─ styles/
│  ├─ .env.local
│  └─ package.json
│
├─ backend/
│  ├─ src/
│  │  ├─ index.js             # Servidor Express
│  │  ├─ routes/
│  │  │  └─ leads.js
│  │  ├─ middleware/
│  │  │  └─ basicAuth.js
│  │  └─ utils/
│  │     └─ exportCsv.js
│  ├─ prisma/
│  │  └─ schema.prisma
│  ├─ .env
│  └─ package.json
│
└─ README.md
```

---

## 🔹 Configuração do Backend

1. Criar .env na raiz do backend:
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/leads_db"
ADMIN_USER=admin
ADMIN_PASS=admin
PORT=4000
```

2. Instalar dependências
```bash
cd backend
npm install
```

3. Gerar cliente Prisma
```bash
npx prisma generate
```

4. Criar banco e aplicar migrations
```bash
npx prisma migrate dev --name init
```

5. Rodar servidor
```bash
npm run dev
```

---

## 🔹 Endpoints Backend

| Método | Rota                | Protegido | Descrição             |
| ------ | ------------------- | --------- | --------------------- |
| POST   | `/leads`            | ❌ Público | Criar lead            |
| GET    | `/leads`            | ✅ Sim     | Listar leads          |
| GET    | `/leads/:id`        | ✅ Sim     | Detalhe de um lead    |
| PUT    | `/leads/:id`        | ✅ Sim     | Atualizar lead        |
| DELETE | `/leads/:id`        | ✅ Sim     | Deletar lead          |
| GET    | `/leads/export/csv` | ✅ Sim     | Exportar leads em CSV |

---

## 🔹 Configuração do Frontend

1. Criar .env na raiz do frontend
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

2. Instalar dependências
```bash
cd frontend
npm install
```

3. Rodar aplicação em desenvolvimento
```bash
npm run dev
```

---

## 🔹 Funcionalidades do Frontend

1️⃣ Formulário Público
- Captura informações do lead: nome, email, telefone, cargo, data de nascimento e mensagem
- Captura parâmetros de campanha (UTM, GCLID, FBCLID)
- Envia via POST para /leads
- Redireciona para /thanks após envio

2️⃣ Painel Administrativo
- Autenticação via login admin
- Sidebar fixa com links (Leads, Logout)
- Layout moderno dark theme
- Responsivo:
- Desktop → tabela
- Mobile → cards
- Visualização de leads detalhada
- Logout limpa localStorage e redireciona para login
