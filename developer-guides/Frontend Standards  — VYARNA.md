# Front-End Standards — VYARNA

[Section 1: Purpose and Objectives](#section-1:-purpose-and-objectives)

[Core Objectives](#core-objectives)

[Fast to Load](#fast-to-load)

[Fast to Build](#fast-to-build)

[Reliable](#reliable)

[Section 2: High-Level Overview](#section-2:-high-level-overview)

[Stack Summary](#stack-summary)

[Monorepo Architecture](#monorepo-architecture)

[High-Level Architecture Diagram (Text Version)](#high-level-architecture-diagram-\(text-version\))

[Section 3: Technology Stack Breakdown](#section-3:-technology-stack-breakdown)

[Monorepo Tooling and Build Strategy](#monorepo-tooling-and-build-strategy)

[UI Framework](#ui-framework)

[Styling](#styling)

[State Management](#state-management)

[Application Assets](#application-assets)

[Build and Development Tooling](#build-and-development-tooling)

[UI Animation](#ui-animation)

[Hosting and CDN](#hosting-and-cdn)

[Error Tracking](#error-tracking)

[Asset Preloading and Progress](#asset-preloading-and-progress)

[i18n / l10n](#i18n-/-l10n)

[Business Unit Dynamic Config Loading](#business-unit-dynamic-config-loading)

[Content Security Policy (CSP)](#content-security-policy-\(csp\))

[Analytics and Telemetry](#analytics-and-telemetry)

[Cross-Device Testing](#cross-device-testing)

[Design System / Tokens](#design-system-/-tokens)

[Feature Flags](#feature-flags)

[Uptime Monitoring](#uptime-monitoring)

[Dynamic Business Unit Configs](#dynamic-business-unit-configs)

[Automated Asset Optimization Pipeline](#automated-asset-optimization-pipeline)

[Load/Performance Testing Scripts](#load/performance-testing-scripts)

[Repository Management](#repository-management)

[Deploy Management (CI/CD)](#deploy-management-\(ci/cd\))

[Section 4: Operational Practices](#section-4:-operational-practices)

[Repository Management](#repository-management-1)

[Deploy Management (CI/CD)](#deploy-management-\(ci/cd\)-1)

[Cross-Device and Cross-Browser Testing](#cross-device-and-cross-browser-testing)

[Analytics and Monitoring](#analytics-and-monitoring)

[Uptime and Heartbeat Monitoring](#uptime-and-heartbeat-monitoring)

[Section 5: Security and Compliance](#section-5:-security-and-compliance)

[Content Security Policy (CSP) and Secure Embedding](#content-security-policy-\(csp\)-and-secure-embedding)

[Error Tracking and Production Monitoring](#error-tracking-and-production-monitoring)

[Partner Data Isolation](#partner-data-isolation)

[Fraud Mitigation and Audit Readiness](#fraud-mitigation-and-audit-readiness)

[Section 6: Scalability and Future Considerations](#section-6:-scalability-and-future-considerations)

[Dynamic Business Unit Config API](#dynamic-business-unit-config-api)

[Real-Time Feature Flag Management](#real-time-feature-flag-management)

[Asset CDN and Multi-Region Optimization](#asset-cdn-and-multi-region-optimization)

[Load Testing and Resilience Automation](#load-testing-and-resilience-automation)

[Compliance and Audit Logging](#compliance-and-audit-logging)

[Dynamic Application Updates and Progressive Feature Deployment](#dynamic-application-updates-and-progressive-feature-deployment)

[Admin Tools for Business Unit Management](#admin-tools-for-business-unit-management)

[Multi-Application Orchestration and Virtualization](#multi-application-orchestration-and-virtualization)

[Section 7: Open Questions and Discussion Points](#section-7:-open-questions-and-discussion-points)

[1\. Dynamic Business Unit Config API Timeline](#1.-dynamic-business-unit-config-api-timeline)

[3\. Feature Flag Management UI](#3.-feature-flag-management-ui)

[4\. Staging and Preview Management](#4.-staging-and-preview-management)

[5\. Automated Load Testing Scope](#5.-automated-load-testing-scope)

[7\. Cross-Device Prioritization](#7.-cross-device-prioritization)

[8\. Monorepo Dependency Management and Orchestration](#8.-monorepo-dependency-management-and-orchestration)

# Section 1: Purpose and Objectives {#section-1:-purpose-and-objectives}

The purpose of this document is to clearly present the front-end architecture design for the VYARNA platform. It outlines the technologies, structures, and practices chosen to support rapid development, fast loading, reliable delivery, and long-term scalability of our real-money and skill-based applications.

## **Core Objectives** {#core-objectives}

### **Fast to Load** {#fast-to-load}

Ensure applications and UIs load extremely quickly on mobile and desktop, even under slow network conditions. Prioritize asset optimization, CDN delivery, lazy loading, and lightweight frameworks.

### **Fast to Build** {#fast-to-build}

Empower the team to iterate quickly, ship new applications, fix bugs, and customize partner configurations with minimal overhead. Minimize boilerplate, favor modularization, and ensure clear state and UI management practices.

### **Reliable** {#reliable}

Deliver production-grade, error-resilient, secure front-end applications. Integrate error tracking, health monitoring, uptime assurance, and secure to meet commercial-grade reliability and compliance standards.

## 

# Section 2: High-Level Overview {#section-2:-high-level-overview}

This project’s front-end architecture is designed to support lightweight, fast, scalable applications that can be embedded across multiple partner websites and mobile applications. It balances a high degree of flexibility with strong operational reliability.

### **Stack Summary** {#stack-summary}

| Layer | Technology / Strategy |
| ----- | ----- |
| UI Framework | React Native (via Expo \+ React Native Web) |
| Navigation | React Navigation |
| Styling | NativeWind (Tailwind for React Native) |
| State Management | Zustand |
| Application Assets | TexturePacker, Lottie, WebP |
| Build and Dev Tools | Metro \+ Expo CLI \+ Jest |
| UI Animation | React Native Reanimated |
| Hosting/CDN | Vercel / Cloudflare Pages |
| Error Tracking | Sentry |
| i18n / l10n | i18next or custom JSON dictionary |
| Business Unit Dynamic Config Loading | Query string/token-based theme/skin loading |
| Content Security Policy (CSP) | Sanitize postMessage |
| Analytics and Telemetry | Custom event tracking \+ PostHog/Amplitude (future phases) |
| Cross-Device Testing | BrowserStack or Playwright basic scripts |
| Design System / Tokens | Tailwind or MUI theme design tokens |
| Feature Flags | Zustand store, loaded via Partner Config JSON (/config/partnerX.json) |
| Uptime Monitoring | Heartbeat ping system |
| Dynamic Business Unit Configs | Business Unit Config API |
| Authentication & Authorization | Token-secured launch validated by backend |
| Automated Asset Optimization | sharp \+ squoosh-cli, lottie-minify, spritesheet.js |
| Load Testing | [k6.io](http://k6.io),  Cypress or Puppeteer |
| Repository Management | GitLab |
| Deploy Management | GitLab CI/CD |

#### **Monorepo Architecture** {#monorepo-architecture}

To support hundreds of applications efficiently, we use a structured monorepo layout:

bash

`/apps/`

  `...`

`/libs/`

  `/ui-components/`

  `/utils/`

  `/hooks/`

* Each application lives in its own folder under `/apps`.  
* Shared logic (e.g., hooks, UI kits, utilities) lives in `/libs`.  
* Each application is fully isolated, versioned, and independently testable and deployable.

  ### **High-Level Architecture Diagram (Text Version)** {#high-level-architecture-diagram-(text-version)}

| \[GitLab Repository\]        ↓ \[GitLab CI/CD Pipeline\]        ↓ \[Expo Metro Build (React Native Web)\]       ↓ \[Vercel / Cloudflare Pages Hosting\]       ↓ \[Applications running:      \- React UI Shell     \- Zustand State Mgmt     \- Feature Flags & Partner Config     \- Sentry error tracking     \- Heartbeat monitoring to parent site \] |
| :---- |

## 

# Section 3: Technology Stack Breakdown {#section-3:-technology-stack-breakdown}

Each major technology layer has been selected based on speed, reliability, scalability, and developer efficiency. Below is a detailed breakdown.

## **Monorepo Tooling and Build Strategy** {#monorepo-tooling-and-build-strategy}

To manage builds efficiently across hundreds of applications, we use a monorepo orchestrator (Turborepo):

* Detects and builds only changed applications using dependency graphs  
* Caches builds per application for CI/CD speed  
* Triggers deploys only for affected applications  
* Each application has its own `metro.config.js`, local assets, and independent versioning  
* Builds output to: `/dist/apps/<applicationId>/<version>/`

Preview URLs are auto-generated per commit (e.g., `https://staging.domain.com/apps/mines/preview-abc123`).

## **UI Framework** {#ui-framework}

* **Technology:** React Native \+ Expo

* **Rationale:**Metro bundler and Expo CLI provide the standard React Native dev experience. Hot reloading and platform-aware packaging are handled by Expo. Jest is used for unit and component testing.

* **Considerations/Future Enhancements:** Monitor plugin ecosystem for application-specific optimizations.

## **Styling** {#styling}

* **Technology:** MUI (Material UI) for business unit dashboards, Tailwind CSS for embedded applications

* **Rationale:** MUI accelerates building internal tools with strong accessibility and design defaults. Tailwind allows for faster, smaller UI implementations inside applications, improving initial load times.

* **Considerations/Future Enhancements:** Build a shared design token system for brand consistency.

## 

## **State Management** {#state-management}

* **Technology:** Zustand

* **Rationale:** Zustand offers a simple, lightweight, and fast state management solution without the boilerplate of Redux. Ideal for managing cross-component state like balances, feature flags, and UI states.

* **Considerations/Future Enhancements:** Ensure state resets cleanly between application sessions for security.

## **Application Assets** {#application-assets}

* **Technology:** TexturePacker (spritesheets), WebP (images), Lottie (animations)

* **Rationale:** Using optimized asset formats dramatically reduces application load times and memory footprint, crucial for mobile applications.

* **Considerations/Future Enhancements:** Automate asset optimization fully during CI builds.

## **Build and Development Tooling** {#build-and-development-tooling}

* **Technology:** Metro \+ Expo CLI \+ Jest

* **Rationale:** Metro bundler and Expo CLI provide the standard React Native dev experience. Hot reloading and platform-aware packaging are handled by Expo. Jest is used for unit and component testing.

* **Considerations/Future Enhancements:** Add Playwright for end-to-end application flow testing.

## **UI Animation** {#ui-animation}

* **Technology:** Framer Motion

* **Rationale:** Provides smooth, performant animations with intuitive React API integration. Ideal for transitions, loaders, and in-application animations.

* **Considerations/Future Enhancements:** Profile animation FPS on lower-end devices.

## 

## **Hosting and CDN** {#hosting-and-cdn}

* **Technology:** Vercel / Cloudflare Pages

* **Rationale:** These platforms offer instant global edge deployment, ensuring low-latency delivery of application builds across all major regions.

* **Considerations/Future Enhancements:** Explore multi-region fallback if latency optimization becomes critical.

## **Error Tracking** {#error-tracking}

* **Technology:** Sentry

* **Rationale:** Real-time error monitoring across applications and business unit dashboards. Critical for embedded applications where issues must be detected immediately without user reports.

* **Considerations/Future Enhancements:** Expand Sentry tagging to capture business unit ID, application version, and device details.

## **Asset Preloading and Progress** {#asset-preloading-and-progress}

* **Technology:** React Animated Loaders

* **Rationale:** React manages UI loading indicators and pre-application UX screens.

* **Considerations/Future Enhancements:** Fine-tune preload groups (critical vs secondary assets) to optimize perceived load speed.

## **i18n / l10n** {#i18n-/-l10n}

* **Technology:** i18next or Custom JSON Dictionary

* **Rationale:** Structured translation management ensures easy expansion into new languages and locales. JSON dictionaries allow lightweight integration with business unit-specific branding and content.

* **Considerations/Future Enhancements:** Add dynamic language switching at runtime for flexible deployments.

## **Business Unit Dynamic Config Loading** {#business-unit-dynamic-config-loading}

* **Technology:** Query String / Token-Based Theme and Config Loading

* **Rationale:** Passing business unit-specific parameters at application launch enables dynamic theming, feature toggles, and business logic adaptation without requiring separate application builds.

* **Considerations/Future Enhancements:** Cache config locally to reduce startup latency on repeated sessions.

## **Content Security Policy (CSP)** {#content-security-policy-(csp)}

* **Technology:** Secure implementation with strict postMessage sanitization

* **Rationale:** CSP headers and sandboxed environments prevent script injection, clickjacking, and data leaks. Sanitizing `postMessage` content protects cross-domain communication.

* **Considerations/Future Enhancements:** Continuously monitor CSP violations in production environments via Sentry or server logs.

## **Analytics and Telemetry** {#analytics-and-telemetry}

* **Technology:** Custom Event Tracking \+ PostHog/Amplitude (later phases)

* **Rationale:** Tracking user journeys, spin events, win/loss patterns, and application engagement metrics is critical for optimizing application designs and monetization strategies.

* **Considerations/Future Enhancements:** Include partner-specific event enrichment (e.g., businessUnitId, applicationId) in telemetry payloads.

## **Cross-Device Testing** {#cross-device-testing}

* **Technology:** BrowserStack or Playwright (basic scripts)

* **Rationale:** Ensures compatibility across iOS, Android, various browsers, and desktop devices. Detects layout, performance, or WebGL rendering issues early.

* **Considerations/Future Enhancements:** Automate regression runs after each production build for faster QA cycles.

## 

## **Design System / Tokens** {#design-system-/-tokens}

* **Technology:** Tailwind or MUI Theme Design Tokens

* **Rationale:** Defining base colors, spacing, typography, and component styles ensures brand consistency across all applications and dashboards, while allowing fast visual adaptation for different business units.

* **Considerations/Future Enhancements:** Centralize and version control design tokens separately for easier updates.

## **Feature Flags** {#feature-flags}

* **Technology:** Zustand Store \+ Business Unit Config JSON

* **Rationale:** Allows safe toggling of features per business unit without redeploying applications. Essential for A/B testing, soft launches, and emergency kill-switches.

* **Considerations/Future Enhancements:** Build a lightweight internal dashboard to control feature flags without engineering intervention.

## **Uptime Monitoring** {#uptime-monitoring}

* **Technology:** Heartbeat Ping System

* **Rationale:** Applications embedded via send regular heartbeat `postMessage` pings back to the parent website. Partners can monitor health and automatically detect and recover from crashes or lost sessions.

* **Considerations/Future Enhancements:** Standardize heartbeat intervals and responses in partner documentation.

## **Dynamic Business Unit Configs** {#dynamic-business-unit-configs}

* **Technology:** Business Unit Config API

* **Rationale:** Serving configuration files dynamically via API enables real-time updates to application settings, themes, feature flags, and permissions without forcing a rebuild or redeploy.

* **Considerations/Future Enhancements:** Add cache busting strategies and config signature validation for enhanced security.

## **Automated Asset Optimization Pipeline** {#automated-asset-optimization-pipeline}

* **Technology:** sharp \+ squoosh-cli \+ lottie-minify \+ spritesheet.js

* **Rationale:** Assets are automatically compressed and optimized during the build process, reducing total bundle size, improving initial load times, and minimizing bandwidth usage across all devices.

* **Considerations/Future Enhancements:** Add visual regression tests to detect accidental asset corruption during optimization.

## **Load/Performance Testing Scripts** {#load/performance-testing-scripts}

* **Technology:** k6.io

* **Rationale:** Simulates thousands of concurrent application sessions, tests backend resilience, asset loading speeds, and application launch latency under stress conditions, preparing for heavy production loads.

* **Considerations/Future Enhancements:** Automate k6 tests post-deploy before pushing production tags.

## **Repository Management** {#repository-management}

* **Technology:** GitLab

* **Rationale:** Centralized source control management for all application and dashboard projects. Supports branch protection, merge request workflows, and secure CI/CD secrets management.

* **Considerations/Future Enhancements:** Enable code owners for key modules (e.g., core engine, UI libraries) for quality assurance.

All applications and shared libraries are housed in a single GitLab monorepo. We use:

* Per-application folders under /apps/  
* Centralized management of /libs/ for shared code  
* Code owners for core libraries (e.g., application engine adapters, UI kits)  
* Branch protection and MR approvals enforced at the monorepo level  
* Commit filtering to enable scoped CI runs

## **Deploy Management (CI/CD)** {#deploy-management-(ci/cd)}

Deployment is fully automated through GitLab CI using Turborepo:

* Detects and builds only changed applications  
* Deploys application builds to Vercel or Cloudflare Pages  
* Outputs placed under `/apps/<applicationId>/<version>/`  
* Preview environments generated for each feature branch  
* Production deploys only occur from `main` or `release/*` branches

All deploys include a application manifest for tracking versions, feature flags, and partner assignments.

## 

# Section 4: Operational Practices {#section-4:-operational-practices}

This section outlines the operational foundations that support fast, reliable, and secure development, deployment, and monitoring of the front-end applications and dashboards.

## **Repository Management** {#repository-management-1}

* **Technology:** GitLab

* **Practice:**

  * Centralized version control for all front-end projects (applications, business unit dashboards, shared libraries).

  * Enforced branch protection for `main` and `production` branches.

  * Merge Request (MR) reviews required before merging code.

  * Secure storage of environment variables and API tokens.

## **Deploy Management (CI/CD)** {#deploy-management-(ci/cd)-1}

* **Technology:** GitLab CI

* **Practice:**

  * **Stages:** test → build → deploy.

  * Automatic build artifact creation (Expo export output or Metro bundle)

  * Deployment to Vercel / Cloudflare Pages through CLI scripts post-successful build and tests.

  * Automatic staging previews for feature branches.

  * Production deployment only from the `main` or `release` branches with controlled approvals.

## 

## **Cross-Device and Cross-Browser Testing** {#cross-device-and-cross-browser-testing}

* **Technology:** BrowserStack, Playwright Scripts

* **Practice:**

  * Manual smoke tests on major devices/browsers.

  * Automated test scripts for critical user flows (application launch, spin action, win/loss state).

  * Regression tests triggered on staging environments before production deployment.

## **Analytics and Monitoring** {#analytics-and-monitoring}

* **Technology:** Custom Event Tracking \+ PostHog or Amplitude (future phase)

* **Practice:**

  * Track key user behaviors (application starts, feature usage).

  * Attribute events to specific Business Units.

  * Monitor crash rates and error trends via Sentry.

  * Monitor asset load times and page performance metrics via Vercel/Cloudflare analytics.

## **Uptime and Heartbeat Monitoring** {#uptime-and-heartbeat-monitoring}

* **Technology:** Heartbeat Ping System (postMessage)

* **Practice:**

  * Applications send periodic heartbeat messages to parent sites.

  * Missing heartbeats trigger partner-side session recovery or reload mechanisms.

  * Heartbeat failures logged in Sentry for operational visibility.

# Section 5: Security and Compliance {#section-5:-security-and-compliance}

Security and compliance are critical pillars for any real-money and skill-based gaming platform. This architecture prioritizes safe embedding, secure session management, and robust error monitoring.

## **Content Security Policy (CSP) and Secure Embedding** {#content-security-policy-(csp)-and-secure-embedding}

* **Technology:** CSP Headers \+ Sandbox Attributes

* **Practice:**

  * Strict CSP rules applied to hosting domains, limiting script, and asset sources.

  * `sandbox` attribute set with only necessary permissions (e.g., `allow-scripts`, `allow-same-origin` if needed).

  * All cross-domain messaging (`postMessage`) is sanitized and validated on both sender and receiver sides.

## 

## **Error Tracking and Production Monitoring** {#error-tracking-and-production-monitoring}

* **Technology:** Sentry

* **Practice:**

  * Real-time tracking of JavaScript errors, crashes, asset load failures, and unexpected application terminations.

  * Error logs enriched with metadata:

    * Business Unit ID

    * Application Version

    * Device Type / Browser Info

    * Config Version

  * Alerts configured to notify engineering team on critical failures.

## **Partner Data Isolation** {#partner-data-isolation}

* **Practice:**

  * No cross-business-unit data leakage.

  * Each application instance runs fully isolated from other sessions.

  * Configurations, feature flags, and tokens are always loaded and applied per session, scoped to the correct business unit.

## **Fraud Mitigation and Audit Readiness** {#fraud-mitigation-and-audit-readiness}

* **Practice:**

  * All critical user actions optionally signed or logged for backend verification (future phase).

  * Heartbeat monitoring ensures detection of abnormal application crashes or reloads that could hint at manipulation attempts.

  * Secure asset delivery to prevent asset-swapping attacks.

# Section 6: Scalability and Future Considerations {#section-6:-scalability-and-future-considerations}

While the current architecture is optimized for fast initial delivery and reliability, it is also designed with future growth in mind. Below are key areas where the platform can be expanded or enhanced as the business and technical needs evolve.

## **Dynamic Business Unit Config API** {#dynamic-business-unit-config-api}

* **Current:** Static JSON configs per business unit, loaded at application launch.

* **Future Enhancement:**

  * Implement a fully dynamic Config API to allow real-time updates to application parameters, feature flags, and UI theming without needing redeployments.

  * Support for caching, ETag validation, and secure signature verification.

## **Real-Time Feature Flag Management** {#real-time-feature-flag-management}

* **Current:** Feature flags loaded at session start from config.

* **Future Enhancement:**

  * Enable dynamic feature flag updates mid-session through WebSocket or polling mechanisms.

  * Build a lightweight internal admin UI for business owners to toggle features without engineering deployment.

## **Asset CDN and Multi-Region Optimization** {#asset-cdn-and-multi-region-optimization}

* **Current:** Hosting via Vercel / Cloudflare Pages (global edge networks).

* **Future Enhancement:**

  * Expand multi-region redundancy with Cloudflare Workers Sites or R2 Storage for assets.

  * Minimize latency for regions with slower access by dynamically selecting nearest asset locations.

## 

## **Load Testing and Resilience Automation** {#load-testing-and-resilience-automation}

* **Current:** Manual k6.io performance scripts.

* **Future Enhancement:**

  * Integrate automated load testing into CI/CD pipelines before production deploys.

  * Trigger resilience simulations (heavy load, slow networks) during staging testing.

## **Compliance and Audit Logging** {#compliance-and-audit-logging}

* **Current:** Critical events tracked internally (future phase).

* **Future Enhancement:**

  * Formalize structured audit logs for applicationplay outcomes, errors, and session management.

  * Prepare audit reporting templates for potential regulatory requirements (depending on business jurisdictions).

## **Dynamic Application Updates and Progressive Feature Deployment** {#dynamic-application-updates-and-progressive-feature-deployment}

* **Current:** New features tied to new application versions.

* **Future Enhancement:**

  * Support Progressive Rollouts: feature flags \+ dynamic config to gradually release features to specific business units or users.

  * Allow instant rollback of problematic features without full redeployment.

## **Admin Tools for Business Unit Management** {#admin-tools-for-business-unit-management}

* **Current:** Manual configuration and deployment flows.

* **Future Enhancement:**

  * Create a central admin dashboard to:

    * View active applications per business unit

    * Push config changes

    * Toggle feature flags

    * Monitor real-time application status and analytics

  * Empower non-engineers to manage business units at scale.

## **Multi-Application Orchestration and Virtualization** {#multi-application-orchestration-and-virtualization}

To ensure long-term scalability, the front-end monorepo will support:

* **Application Index Manifest** — JSON or GraphQL endpoint listing all applications, versions, partner flags

* **Scoped Lazy Loading** — Applications loaded on demand via dynamic imports

* **Shared Runtime Libraries** — Common chunks (wallet, auth, UI) extracted and reused across applications

* **Central UI Component Registry** — All applications reuse components from `/libs/ui-components` to ensure brand consistency and minimize duplication

# 

# Section 7: Open Questions and Discussion Points {#section-7:-open-questions-and-discussion-points}

The following areas are intentionally left open for further input, discussion, or team decision-making to ensure the architecture meets all business, technical, and operational needs at launch and beyond.

## **1\. Dynamic Business Unit Config API Timeline** {#1.-dynamic-business-unit-config-api-timeline}

* When should we prioritize moving from static JSON configs to a fully dynamic Config API?

* Would a hybrid approach (static fallback, dynamic override) make sense for early scaling?

## **3\. Feature Flag Management UI** {#3.-feature-flag-management-ui}

* Should we invest in building a lightweight internal tool for feature flag control before MVP launch?

* Or should manual config file edits be sufficient for initial partners?

## **4\. Staging and Preview Management** {#4.-staging-and-preview-management}

* Should every Business Unit application have a dedicated staging subdomain for partner previews?

* (e.g., `staging.businessunit123.domain.com`)

* How should we manage preview vs production application IDs?

## **5\. Automated Load Testing Scope** {#5.-automated-load-testing-scope}

* Should load testing (k6.io) focus only on application load \+ asset load initially?

* Or should we expand to simulate application play actions (e.g., spin, win, bonus feature triggers)?

## **7\. Cross-Device Prioritization** {#7.-cross-device-prioritization}

* Which specific device/browser combos should we consider "critical" for launch day testing?

  * (e.g., iPhone 12 Safari, Samsung Galaxy S22 Chrome, Windows Chrome, Mac Safari)

## **8\. Monorepo Dependency Management and Orchestration** {#8.-monorepo-dependency-management-and-orchestration}

* How should we version shared libraries (`/libs/ui-components`, etc.)?

* Do we pin applications to specific versions of shared dependencies?

* Should we support isolated deploys of old application versions referencing legacy components?

* What tooling should enforce dependency constraints and testing?

