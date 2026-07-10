# NerdCode Studio — Site Oficial

Site oficial da **NerdCode Studio**, um estúdio de desenvolvimento focado em softwares, bots para Discord, automações e soluções digitais.

Construído com **React + Vite + Tailwind CSS**.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/) v9 ou superior (ou yarn/pnpm)

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nerdcode-studio.git
cd nerdcode-studio

# Instale as dependências
npm install
```

---

## Execução local

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## Build de produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/`. Para testar o build localmente:

```bash
npm run preview
```

---

## Painel administrativo (`/admin`)

O site tem um painel privado em `/admin` para gerenciar os projetos exibidos na seção "Projetos", sem precisar editar código.

### Variáveis de ambiente necessárias

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | String de conexão do PostgreSQL (dados dos projetos) |
| `SESSION_SECRET` | Chave usada para assinar o token de sessão do admin |
| `ADMIN_EMAIL` | Email autorizado a logar no painel |
| `ADMIN_PASSWORD` | Senha do painel |

No Replit, essas variáveis já estão configuradas. **Na Vercel**, adicione as mesmas em *Project Settings → Environment Variables* antes do deploy.

### Rodando localmente

`npm run dev` inicia dois processos: o servidor Vite (frontend) e um servidor Express local (`server/dev-server.ts`) que espelha as funções serverless de `api/` para desenvolvimento.

Em produção na Vercel, cada arquivo em `api/` vira automaticamente uma função serverless.

---

## Deploy na Vercel

### Opção 1 — Via interface da Vercel (recomendado)

1. Faça push do projeto para o GitHub.
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**.
3. Importe o repositório do GitHub.
4. A Vercel detecta automaticamente o Vite. Confirme as configurações:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**.

### Opção 2 — Via Vercel CLI

```bash
# Instale a CLI da Vercel
npm install -g vercel

# Faça login
vercel login

# Deploy
vercel --prod
```

---

## Estrutura do projeto

```
nerdcode-studio/
├── api/                # Funções serverless da Vercel (auth + CRUD de projetos)
├── server/             # Lógica de backend compartilhada + servidor Express p/ dev local
├── public/             # Assets estáticos (favicon)
├── src/
│   ├── components/
│   │   ├── layout/     # Navbar
│   │   ├── sections/   # Hero, About, Services, Projects, Team, Manifesto, Contact
│   │   └── ui/         # Componentes shadcn/ui
│   ├── hooks/          # Hooks utilitários
│   ├── lib/            # Utilitários (cn, api client)
│   ├── pages/          # Painel admin (login + dashboard)
│   ├── App.tsx         # Composição principal
│   ├── main.tsx        # Entry point
│   └── index.css       # Estilos globais + tokens de design
├── vercel.json         # Configuração de deploy na Vercel
├── vite.config.ts      # Configuração do Vite
├── tsconfig.json       # Configuração do TypeScript
└── package.json
```

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | Interface |
| Vite 7 | Build e dev server |
| Tailwind CSS 4 | Estilização |
| shadcn/ui | Componentes base |
| Lucide React | Ícones |
| TypeScript | Tipagem |

---

## Licença

© 2025 NerdCode Studio. Todos os direitos reservados.
