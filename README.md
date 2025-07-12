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
├── tsconfig.base.json      # shared TS config, path aliases
├── .npmrc                  # hoisting / registry overrides
├── docker-compose.yml      # local-dev overrides
├── ci/                     # GitHub Actions workflows
│   └── workflows/
├── infrastructure/         # k8s/helm/scripts/templates
│   └── scripts/
├── packages/               # shareable libraries & models
│   ├── ui/                 # React components & design tokens
│   ├── api-client/         # generated OpenAPI / GraphQL clients
│   └── models/             # TS types & validation schemas
├── apps/                   # front-end & mobile workspaces
│   ├── web-app/            # Next.js universal marketing + app site
│   ├── admin-portal/       # internal admin UI
│   └── mobile-app/         # React Native / Expo consumer/provider app
└── services/               # back-end microservices by domain
    ├── domain-emotional-and-engagement/
    ├── domain-ezflow/
    ├── domain-finance/
    ├── domain-health-and-insights/
    ├── domain-infrastructure/
    ├── domain-milk/
    ├── domain-multitenant/
    ├── domain-person-and-identity/
    │   ├── vy-person-identity/
    │   ├── vy-person-email/
    │   ├── vy-person-roles/
    │   └── …
    ├── domain-privacy-and-consent/
    └── domain-sales-and-commerce/
```

---

## 🔧 Key Configs

### 1. `repo.js`

A lightweight Node helper script that scans each
workspace for a `package.json` and forwards common npm commands.

```bash
node repo.js install [names...] # install packages (apps use --legacy-peer-deps, libs auto-build)
node repo.js start <names...>   # run one or more apps or services
node repo.js build-libs lib     # build a shared library
node repo.js list               # show all workspaces
node repo.js run script name    # run an npm script in one or more packages
node repo.js stripe <args...>   # run the Stripe CLI (requires STRIPE_SECRET_KEY)
```

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

   ```bash
   node repo.js stripe customers list
   node repo.js stripe listen --forward-to http://localhost:4040/webhooks/process-stripe-webhook
   node repo.js stripe listen --print-secret            # print your local webhook signing secret
   node repo.js stripe trigger checkout.session.completed
   ```

---

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
