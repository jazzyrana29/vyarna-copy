# Vyarna Nucleus

This repository houses **all** of Vyarna’s code—front-ends (web site, admin portal, mobile app), back-end microservices, shared packages, and infra scripts—organized as a single Git monorepo with workspaces. It’s designed for:

- **Developer DX**: share code, types, components, configs
- **LLM/AI tooling**: point at one repo, see _every_ module
- **CI/CD** and **Docker builds**: each workspace installs only what it needs

---

## 📂 Top-Level Structure

```text
vyarna-nucleus/
├── repo.js                 # cross-workspace helper script
├── docker-compose.yml      # local overrides
├── example.env.local
├── example.env.production
├── example.env.staging
├── global.env.local-example
├── apps/                   # front-end & mobile workspaces
│   ├── admin-portal/
│   ├── ez-waveflow-admin/
│   ├── mobile-app/
│   ├── web-app/
│   └── website-foundation-scg/
├── services/               # back-end microservices by domain
│   ├── domain-emotional-and-engagement/
│   ├── domain-ezflow/
│   ├── domain-finance/
│   ├── domain-health-and-insights/
│   ├── domain-infrastructure/
│   ├── domain-milk/
│   ├── domain-multitenant/
│   ├── domain-person-and-identity/
│   ├── domain-privacy-and-consent/
│   └── domain-sales-and-commerce/
├── libs/                    # shared libraries
│   ├── ez-kafka-producer/
│   ├── ez-logger/
│   └── ez-utils/
├── developer-guides/        # repo standards and guides
└── (packages/ and other folders may appear in future)
```

---

## 🔧 Key Configs

### 1. `repo.js`

A lightweight Node helper script that scans each
workspace for a `package.json` and forwards common npm commands.

```bash
node repo.js install [names...]        # install packages (apps use --legacy-peer-deps)
node repo.js clean-install [names...]  # remove dist & node_modules directories
node repo.js start <names...>          # run apps (npm start) or services (npm start:dev)
                                       # each launches in its own terminal window
node repo.js lint [names...]           # npm run lint in apps and services
node repo.js lint:fix [names...]       # npm run lint:fix in apps and services
node repo.js prettier:check [names...] # npm run prettier:check in apps and services
node repo.js prettier:fix [names...]   # npm run prettier:fix in apps and services
node repo.js build-libs <lib...>       # npm run build in libs
node repo.js test <service...>         # npm run test in services
node repo.js fill-env                  # generate .env files for services
node repo.js list [names...]           # list packages (all types)
node repo.js run <script> [names...]   # run an npm script in packages
node repo.js update-libs <lib...> [--in name]   # rebuild libs and reinstall them in packages
node repo.js update-migrations [names...]       # run migration:init and migration:run
node repo.js stripe <args...>          # run the Stripe CLI inside Docker (uses STRIPE_SECRET_KEY)
```

- **clean-install** removes each workspace's `node_modules` and `dist` folders.
- **update-libs** rebuilds libraries and reinstalls them in every dependent package.
- **update-migrations** runs TypeORM migrations for services.
- **stripe** wraps the Stripe CLI in Docker using your `STRIPE_SECRET_KEY` from `global.env.local`.

### 2. `tsconfig.base.json`

Shared TypeScript settings and path aliases:

```jsonc
{
  "compilerOptions": {
    "target": "es2022",
    "module": "esnext",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@vyarna/ui": ["packages/ui/src"],
      "@vyarna/api-client": ["packages/api-client/src"],
      "@vyarna/models": ["packages/models/src"],
    },
    "strict": true,
  },
}
```

### 3. Root config files

Baseline project settings live in the repo root:

- `.npmrc` – hoisting rules and registry overrides
- `docker-compose.yml` – local service overrides
- `example.env.*` – sample environment files
- `global.env.local-example` – template for shared service variables

Each workspace keeps its own copies of these files so it can be used on its own
without pulling in unrelated configs.

## 📚 Developer Guides

The `developer-guides/` directory contains in-depth documentation on how we build Vyarna:

- [**Frontend Standards — VYARNA**](developer-guides/Frontend%20Standards%20%20%E2%80%94%20VYARNA.md) – coding conventions and build practices for web and mobile apps.
- [**Backend Standards — VYARNA**](developer-guides/Backend%20Standards%20%20%E2%80%94%20VYARNA.md) – guidance on service architecture and API development.
- [**UI_UX Standards — VYARNA**](developer-guides/UI_UX%20Standards%20%20%E2%80%94%20VYARNA.md) – design principles and user‑experience best practices.

These documents outline the standards and best practices that keep all workspaces consistent.

## 🚀 Getting Started

1. **Clone & install**

   ```bash
   git clone git@github.com:vyarna/monorepo.git
   cd monorepo
   node repo.js install    # install all packages (apps use --legacy-peer-deps, libs build automatically)
   # or install specific ones
   node repo.js install vy-person-identity website-foundation-scg  # example
   # ensure a modern npm version
   # older npm releases can error with "Invalid Version"
   ```

   > **Requires Node 18+ and npm 9+** – older versions may fail with `npm ERR! Invalid Version`.

   Create a `global.env.local` file at the repo root using `global.env.local-example` as a starting point. This file stores shared database credentials and other secrets like `STRIPE_SECRET_KEY`, and is ignored by Git.

2. **Develop a service or app**

   ```bash
   node repo.js start Vyarna website-foundation-scg vy-person-identity
   # Vyarna and website-foundation-scg are apps; vy-person-identity is a service
   ```

3. **Rebuild libraries**

   ```bash
   node repo.js build-libs ez-utils
   ```
   Libraries are usually built automatically after installing, but you can run this to rebuild as needed.

4. **Lint & Test**

   ```bash
   node repo.js lint                               # lint all apps and services
   node repo.js lint web-app vy-person-identity    # targeted lint
    node repo.js lint:fix web-app vy-person-identity
    node repo.js prettier:check Vyarna      # run Prettier checks for apps/services
    node repo.js prettier:fix Vyarna        # auto-format apps/services
   node repo.js test vy-person-identity
   ```

5. **List & Run Scripts**

   ```bash
   node repo.js list
   node repo.js run build vy-person-identity
   ```

6. **Run the Stripe CLI**

   The command runs the Stripe CLI inside a Docker container and passes your
   `STRIPE_SECRET_KEY` from `global.env.local`.

   ```bash
   node repo.js stripe customers list
   node repo.js stripe listen --forward-to http://localhost:4040/webhooks/process-stripe-webhook
   node repo.js stripe listen --print-secret            # print your local webhook signing secret
   node repo.js stripe trigger checkout.session.completed
   ```

---

## 🛠️ Setup with `repo.js`

1. **Create env files**

   ```bash
   cp global.env.local-example global.env.local
   # edit global.env.local and add credentials
   node repo.js fill-env              # generate .env for all services
   # or target one service
   node repo.js fill-env vy-person-identity
   ```

2. **Install dependencies**

   ```bash
   node repo.js install                       # install every workspace
   node repo.js install web-app vy-finance-payments  # install specific ones
   ```

3. **Update shared libraries**

   ```bash
   node repo.js update-libs                   # rebuild all libs
   node repo.js update-libs ez-utils --in web-app  # update one app/service
   ```

4. **Run migrations**

   ```bash
   node repo.js update-migrations
   ```

5. **Docker setup**

   Build images using each workspace's Dockerfile or the compose file:

   ```bash
   docker compose build
   docker compose up
   ```

6. **Run apps and services**

   ```bash
   node repo.js list                   # show all workspace names
   node repo.js start web-app          # start an app
   node repo.js start vy-person-identity  # start a service
   node repo.js start web-app vy-person-identity  # multiple targets
   ```


## 🧱 Workspace Conventions

### **`packages/`**

Shared libraries _only_.

- **ui/**: React components, design tokens
- **api-client/**: auto-generated OpenAPI or GraphQL SDKs
- **models/**: TS interfaces, Zod/Yup schemas

Each has its own `package.json` and `tsconfig.json`. No direct runnable apps here.

### **`apps/`**

User-facing front-ends: must be marked `"private": true`.

- **web-app/**: Next.js universal site (marketing + embedded app features)
- **admin-portal/**: internal dashboards
- **mobile-app/**: React Native / Expo

Each workspace:

- Has normal React/Next or Expo CLI structure
- Defines its own `Dockerfile` for filtered installs (`npm ci --workspace=...`)
- Imports code from `@vyarna/ui`, `@vyarna/api-client`, and TS models

### **`services/`**

Each microservice lives in `services/<domain>/<service-name>/`.

- Uses Node.js + your framework of choice (Express, Nest, Fastify, etc.)
- Has its own `package.json`, `tsconfig.json`, and `Dockerfile`
- Imports shared models & validation from `@vyarna/models`

### **`infrastructure/`**

Kubernetes manifests, Helm charts, Terraform, or helper scripts for deployment.

### **`ci/`**

Your CI/CD workflows (e.g. `.github/workflows/ci.yml`, `deploy.yml`).

## 📦 Adding a New Workspace

1. **Create folder** under the correct root (`packages/`, `apps/`, or `services/`).
2. **Scaffold** with your preferred starter (e.g. `create-next-app`, `npm init @nestjs/...`, or manual).
3. **Add** a local `package.json` with its own `name`, `version`, and `scripts` (`dev`, `build`, …).
4. **Wire** into root’s `workspaces` (`apps/*` or `services/*/*`).
5. **Run** `npm install` at the monorepo root to pick up the new workspace.

---

## 🐳 Docker & Filtered Installs

Each workspace that needs a Docker image should include a `Dockerfile` like:

The root `docker-compose.yml` provides a few common services for development:

| Service | Ports | Purpose |
| ------- | ----- | ------- |
| **Redis** | `6379` | Key/value store |
| **Kafka + Zookeeper** | `2181` (Zookeeper), `9092` (Kafka) | Local event streaming |
| **Kafka-UI** | `8080` | Web interface for Kafka |

All containers join the default `my_network` network.

```dockerfile
# 1. deps
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web-app/package.json ./apps/web-app/
RUN npm ci --workspace=apps/web-app --omit=dev

# 2. build
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build --workspace=apps/web-app

# 3. prod
FROM nginx:alpine
COPY --from=builder /app/apps/web-app/.next /usr/share/nginx/html
```

This ensures **only** that workspace’s dependencies end up in its image—keeping container sizes small.

---

## 🎯 Why One Repo?

- **Shared logic & types** live side-by-side with apps & services.
- **LLMs / Codex** see all code without juggling multiple repos.
- **`repo.js`** orchestrates cross-workspace installs, builds and tests.
- **Filtered Dockerfiles** keep container images lean.

> When micro-frontends or radically independent stacks become necessary, you can always split a workspace into its own repo—but for now, this monorepo maximizes code-sharing and developer velocity.

---

> _This README is your single source of truth for repo layout, conventions, and workflows. Whenever in doubt, refer back here—both human devs and AI assistants alike._
