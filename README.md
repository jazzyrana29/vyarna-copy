# Vyarna Nucleus

This repository houses **all** of Vyarna’s code—front-ends (web site, admin portal, mobile app), back-end microservices, shared packages, and infra scripts—organized as a single Git monorepo with workspaces. It’s designed for:

* **Developer DX**: share code, types, components, configs
* **LLM/AI tooling**: point at one repo, see *every* module
* **CI/CD** and **Docker builds**: each workspace installs only what it needs

---

## 📂 Top-Level Structure

```text
vyarna-nucleus/
├── package.json            # root workspace config & scripts
├── package-lock.json       # lockfile for all workspaces
├── pnpm-workspace.yaml     # (or "workspaces" in package.json)
├── turbo.json              # Turborepo / Nx task pipelines & caching
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
    ├── person/
    │   ├── vy-person-identity/
    │   ├── vy-person-roles/
    │   └── …  
    ├── milk/
    ├── sales/
    └── …  
```

---

## 🔧 Key Configs

### 1. Root `package.json`

Defines workspaces, dev-dependencies, and top-level scripts:

```jsonc
{
  "name": "vyarna-nucleus",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*",
    "services/*/*"
  ],
  "scripts": {
    "dev":   "turbo run dev",
    "build": "turbo run build",
    "lint":  "turbo run lint",
    "test":  "turbo run test"
  },
  "devDependencies": {
    "turbo": "^1.8.0",
    "typescript": "^5.0.0"
  }
}
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
      "@vyarna/ui":          ["packages/ui/src"],
      "@vyarna/api-client":  ["packages/api-client/src"],
      "@vyarna/models":      ["packages/models/src"]
    },
    "strict": true
  }
}
```

### 3. `turbo.json`

High-level pipeline for builds, tests, linting, and dev:

```jsonc
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev":   { "cache": false },
    "lint":  { "outputs": [] },
    "test":  { "outputs": [] }
  }
}
```

---

## 🚀 Getting Started

1. **Clone & install**

   ```bash
   git clone git@github.com:vyarna/monorepo.git
   cd monorepo
   npm install
   ```

2. **Develop everything**

   ```bash
   npm run dev
   ```

   * Spins up all `dev` scripts in every workspace in parallel
   * Web-app: [http://localhost:3000](http://localhost:3000)
   * Admin portal: [http://localhost:3001](http://localhost:3001)
   * Mobile-app: Metro bundler on its own port
   * Backend services on their configured ports

3. **Build all**

   ```bash
   npm run build
   ```

   * Runs each workspace’s `build` script in the correct dependency order
   * Artifacts end up in each workspace’s `dist/` or `.next/`

4. **Lint & Test**

   ```bash
   npm run lint
   npm run test
   ```

---

## 🧱 Workspace Conventions

### **`packages/`**

Shared libraries *only*.

* **ui/**: React components, design tokens
* **api-client/**: auto-generated OpenAPI or GraphQL SDKs
* **models/**: TS interfaces, Zod/Yup schemas

Each has its own `package.json` and `tsconfig.json`. No direct runnable apps here.

### **`apps/`**

User-facing front-ends: must be marked `"private": true`.

* **web-app/**: Next.js universal site (marketing + embedded app features)
* **admin-portal/**: internal dashboards
* **mobile-app/**: React Native / Expo

Each workspace:

* Has normal React/Next or Expo CLI structure
* Defines its own `Dockerfile` for filtered installs (`npm ci --workspace=...`)
* Imports code from `@vyarna/ui`, `@vyarna/api-client`, and TS models

### **`services/`**

Each microservice lives in `services/<domain>/<service-name>/`.

* Uses Node.js + your framework of choice (Express, Nest, Fastify, etc.)
* Has its own `package.json`, `tsconfig.json`, and `Dockerfile`
* Imports shared models & validation from `@vyarna/models`

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

* **Shared logic & types** live side-by-side with apps & services.
* **LLMs / Codex** see all code without juggling multiple repos.
* **Turbo/NX** orchestrates cross-workspace builds/tests/lints.
* **Filtered Dockerfiles** keep container images lean.

> When micro-frontends or radically independent stacks become necessary, you can always split a workspace into its own repo—but for now, this monorepo maximizes code-sharing and developer velocity.

---

> *This README is your single source of truth for repo layout, conventions, and workflows. Whenever in doubt, refer back here—both human devs and AI assistants alike.*
