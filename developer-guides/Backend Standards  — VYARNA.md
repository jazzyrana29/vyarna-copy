# Backend Standards — VYARNA

[Section 1: Purpose and Objectives](#section-1:-purpose-and-objectives)

[Objectives](#objectives)

[Event-Driven by Default](#event-driven-by-default)

[Traceable Across Systems](#traceable-across-systems)

[Low-Code Enabled via WaveFlow](#low-code-enabled-via-waveflow)

[Resilient and Scalable](#resilient-and-scalable)

[Secure and Auditable](#secure-and-auditable)

[Section 2: High-Level Overview](#section-2:-high-level-overview)

[Core Architectural Components](#core-architectural-components)

[API Layer (ez-waveflow-api)](#api-layer-\(ez-waveflow-api\))

[Flow Manager (WaveFlow)](#flow-manager-\(waveflow\))

[Domain Services (e.g. ez-operator, ez-business-unit)](#domain-services-\(e.g.-ez-operator,-ez-business-unit\))

[Kafka Event Bus](#kafka-event-bus)

[ZTracking Layer](#ztracking-layer)

[Logging (ez-logger)](#logging-\(ez-logger\))

[Permissions Microservice (ez-business-operator-permissions)](#permissions-microservice-\(ez-business-operator-permissions\))

[Typical Flow Example](#typical-flow-example)

[Section 3: Core Domain and Service Breakdown](#section-3:-core-domain-and-service-breakdown)

[API Layer: ez-waveflow-api](#api-layer:-ez-waveflow-api)

[Responsibilities](#responsibilities)

[Key Notes](#key-notes)

[Flow Manager: WaveFlow](#flow-manager:-waveflow)

[Responsibilities](#responsibilities-1)

[Flow Trigger Path](#flow-trigger-path)

[Domain Services](#domain-services)

[ez-operator](#ez-operator)

[ez-business-unit](#ez-business-unit)

[ez-permissions (ez-business-operator-permissions)](#ez-permissions-\(ez-business-operator-permissions\))

[ez-session](#ez-session)

[ez-logger](#ez-logger)

[ZTracking Model](#ztracking-model)

[TraceId Handling](#traceid-handling)

[Section 4: Kafka Event Bus](#section-4:-kafka-event-bus)

[Topic Naming Strategy](#topic-naming-strategy)

[Message Schema](#message-schema)

[Synchronous Response Model](#synchronous-response-model)

[Partitioning and Scalability](#partitioning-and-scalability)

[Error Handling and DLQs](#error-handling-and-dlqs)

[Observability](#observability)

[Section 5: API Gateway and Entry Points](#section-5:-api-gateway-and-entry-points)

[Responsibilities](#responsibilities-2)

[Endpoint Structure](#endpoint-structure)

[TraceId Injection](#traceid-injection)

[Security and Token Validation](#security-and-token-validation)

[Partner Quotas and Abuse Prevention](#partner-quotas-and-abuse-prevention)

[Extensibility](#extensibility)

[Section 6: Security and Compliance](#section-6:-security-and-compliance)

[Authentication and Session Integrity](#authentication-and-session-integrity)

[Authorization via Permissions Microservice](#authorization-via-permissions-microservice)

[Kafka Access Control](#kafka-access-control)

[ZTracking and Audit Trails](#ztracking-and-audit-trails)

[Data Isolation and Multi-Tenancy](#data-isolation-and-multi-tenancy)

[CSP and Embedded Application Security](#csp-and-embedded-application-security)

[Logging and Incident Forensics](#logging-and-incident-forensics)

[Section 7: Observability and Monitoring](#section-7:-observability-and-monitoring)

[Logging (ez-logger)](#logging-\(ez-logger\)-1)

[Example:](#example:)

[Tracing with traceId](#tracing-with-traceid)

[Service Health Monitoring](#service-health-monitoring)

[Kafka Monitoring](#kafka-monitoring)

[Dead-Letter Queues (DLQs)](#dead-letter-queues-\(dlqs\))

[ZTracking Audit Logs](#ztracking-audit-logs)

[Sentry (Optional)](#sentry-\(optional\))

[Basic Admin Debug Console (Dev Mode)](#basic-admin-debug-console-\(dev-mode\))

[Section 8: CI/CD and Deployment Pipeline](#section-8:-ci/cd-and-deployment-pipeline)

[Repository Structure](#repository-structure)

[GitLab CI Pipeline](#gitlab-ci-pipeline)

[Deployment Strategy](#deployment-strategy)

[Environment Configuration](#environment-configuration)

[Versioning and Tags](#versioning-and-tags)

[Rollback and Resilience](#rollback-and-resilience)

[Flow Deployment (WaveFlow)](#flow-deployment-\(waveflow\))

[Section 9: Scalability and Entity Partitioning](#section-9:-scalability-and-entity-partitioning)

[Stateless Microservices](#stateless-microservices)

[Partitioning Strategy](#partitioning-strategy)

[Flow Execution Concurrency](#flow-execution-concurrency)

[Database Design for Sharding](#database-design-for-sharding)

[Session and Permission Isolation](#session-and-permission-isolation)

[Load-Based Scaling](#load-based-scaling)

[Flow and Config Overrides](#flow-and-config-overrides)

[Section 10: Trace ID and ZTracking Policy](#section-10:-trace-id-and-ztracking-policy)

[Trace ID Design and Usage](#trace-id-design-and-usage)

[Generation](#generation)

[Propagation](#propagation)

[Format](#format)

[Required in:](#required-in:)

[ZTracking Policy](#ztracking-policy)

[Purpose](#purpose)

[Tracked Entities](#tracked-entities)

[Record Fields](#record-fields)

[Triggering](#triggering)

[Read Access](#read-access)

[Policy Enforcement](#policy-enforcement)

[Retention Strategy](#retention-strategy)

[Section 11: Open Questions and Design Decisions](#section-11:-open-questions-and-design-decisions)

[1\. Flow State Management](#1.-flow-state-management)

[2\. Response Timeout Handling](#2.-response-timeout-handling)

[3\. ZTracking Mutation Rules](#3.-ztracking-mutation-rules)

[4\. Flow Versioning and Locking](#4.-flow-versioning-and-locking)

[5\. Retry and Dead-Letter Strategy](#5.-retry-and-dead-letter-strategy)

[6\. Partner Config Governance](#6.-partner-config-governance)

[7\. Observability Limits](#7.-observability-limits)

[8\. Schema Enforcement and Shared Types](#8.-schema-enforcement-and-shared-types)

[Appendix A: Developer Workflow and Local Tooling](#appendix-a:-developer-workflow-and-local-tooling)

[1\. Local Service Development](#1.-local-service-development)

[Repository Structure](#repository-structure-1)

[tsconfig.base.json and Path Aliases](#tsconfig.base.json-and-path-aliases)

[2\. Local Kafka Message Testing](#2.-local-kafka-message-testing)

[3\. TraceId Debugging](#3.-traceid-debugging)

[4\. Running Full End-to-End Flow Locally](#4.-running-full-end-to-end-flow-locally)

[5\. Writing a New Kafka Handler](#5.-writing-a-new-kafka-handler)

[6\. Local Test Strategy](#6.-local-test-strategy)

[7\. CI Integration](#7.-ci-integration)

[8\. Helpful Tools](#8.-helpful-tools)

[Appendix B: RFC \- Schema Governance for Kafka Payloads and Domain Models](#appendix-b:-rfc---schema-governance-for-kafka-payloads-and-domain-models)

[Purpose](#purpose-1)

[Motivation](#motivation)

[Scope](#scope)

[Governance Strategy](#governance-strategy)

[1\. Shared Schema Definitions](#1.-shared-schema-definitions)

[2\. Validation on Emit and Consume](#2.-validation-on-emit-and-consume)

[3\. Naming and File Organization](#3.-naming-and-file-organization)

[4\. Versioning](#4.-versioning)

[5\. Type Inference and Sharing](#5.-type-inference-and-sharing)

[Optional Future Enhancements](#optional-future-enhancements)

[Compliance](#compliance)

[Open Questions](#open-questions)

[Conclusion](#conclusion)

---

# **Section 1: Purpose and Objectives** {#section-1:-purpose-and-objectives}

This document defines the backend architecture for the VYARNA platform. It outlines the structure, patterns, and technologies that support a scalable, event-driven ecosystem of business services built around embedded applications and low-code business flows.

The system is designed to be modular, asynchronous by default, traceable across services, and governed by a low-code orchestration engine (WaveFlow) that enables dynamic business logic without redeploying core services.

## **Objectives** {#objectives}

### **Event-Driven by Default** {#event-driven-by-default}

All backend services communicate through Kafka topics. Each business interaction—such as creating an operator or updating a configuration—emits an event. This allows asynchronous processing, decoupled service design, and real-time responsiveness.

### **Traceable Across Systems** {#traceable-across-systems}

A unique `traceId` is generated for each incoming request. It is included in all Kafka messages, logs, and ZTracking records, enabling full end-to-end traceability across services.

### **Low-Code Enabled via WaveFlow** {#low-code-enabled-via-waveflow}

WaveFlow is our internal flow manager. It orchestrates service calls by consuming Kafka messages and executing flows defined by non-developer roles. This enables fast iteration and custom business logic without changing microservice code.

### **Resilient and Scalable** {#resilient-and-scalable}

The architecture uses stateless services, partitioned Kafka topics, and fail-safe response patterns. Dead-letter queues and timeout handling ensure that the system can absorb errors without global failures.

### **Secure and Auditable** {#secure-and-auditable}

Session-based authentication and centralized permissions are enforced through dedicated services. ZTracking ensures that all changes to key business entities are versioned, attributable, and reviewable.

# **Section 2: High-Level Overview** {#section-2:-high-level-overview}

The backend is built as a distributed microservice system coordinated by an event bus (Kafka) and orchestrated by an internal low-code platform called **WaveFlow**. External clients (apps, admin panels, partner APIs) interact through a central API layer, which routes business actions as events into the system.

Each major component is designed to be stateless, observable, and isolated by function or domain. Kafka ensures decoupled message exchange. Flow execution, traceability, and business logic customization are handled dynamically by WaveFlow.

## **Core Architectural Components** {#core-architectural-components}

### **API Layer (`ez-waveflow-api`)** {#api-layer-(ez-waveflow-api)}

Receives HTTP(S) requests from external sources. For each incoming request, it:

* Generates a unique `traceId`  
* Identifies the target flow (via `flowType`)  
* Emits a Kafka message to trigger the corresponding WaveFlow execution  
* Waits for a synchronous-style response, handled via internal Kafka listeners

### **Flow Manager (WaveFlow)** {#flow-manager-(waveflow)}

The core orchestrator. Listens to Kafka events and triggers the appropriate steps in a flow based on the flow definition and context. Each flow may call one or more downstream services via domain-specific Kafka topics. The final response is emitted back through Kafka and routed to the waiting API process.

### **Domain Services (e.g. `ez-operator`, `ez-business-unit`)** {#domain-services-(e.g.-ez-operator,-ez-business-unit)}

Responsible for domain logic such as managing operators, business units, devices, sessions, etc. They:

* Subscribe to clearly defined Kafka topics (e.g. `create-operator-entity`)  
* Emit response events with results or errors  
* Do not need to know about WaveFlow—only about the topics they consume

### **Kafka Event Bus** {#kafka-event-bus}

All service communication flows through Kafka. Topic names follow a consistent naming strategy defined in `ez-utils`, such as:

* `create-operator-entity`  
* `get-history-operator-entity`  
* `Create-permission-profile`

Kafka is also used for return messaging, often using the same `traceId` to pair responses with their originating request.

### **ZTracking Layer** {#ztracking-layer}

Each key entity has an associated ZTracking table (e.g., `ztracking-operator`). Any change—create, update, or delete—is versioned and stored. All ZTracking records include the original `traceId`, enabling forensic traceability and audit compliance.

### **Logging (`ez-logger`)** {#logging-(ez-logger)}

All logs are handled through the shared `ez-logger` service. It supports:

* TraceId injection into all messages  
* Structured logs compatible with centralized logging and APM tools  
* Standardized severity levels and formats

### **Permissions Microservice (`ez-business-operator-permissions`)** {#permissions-microservice-(ez-business-operator-permissions)}

A dedicated service that controls access to system features using:

* Mechanisms  
* Permits  
* Permission Profiles

Operators inherit permissions through their assigned profiles. Permission lookups are enforced at both API and service levels and are fully ZTracked.

## **Typical Flow Example** {#typical-flow-example}

1. Client sends `POST /operators`  
2. API generates `traceId` and emits a Kafka message to `create-operator-entity`  
3. Flow Manager receives and executes the flow definition for this action  
4. `ez-operator` creates the new record and emits a response with the same `traceId`  
5. The API layer receives the response and returns the result to the client

# **Section 3: Core Domain and Service Breakdown** {#section-3:-core-domain-and-service-breakdown}

This section outlines the major services and entities within the backend architecture. Each service is designed to own a specific bounded context, communicate via Kafka, and remain stateless. Business logic is triggered through WaveFlow orchestration and tracked using `traceId` and ZTracking.

## **API Layer: `ez-waveflow-api`** {#api-layer:-ez-waveflow-api}

### **Responsibilities** {#responsibilities}

* Entry point for all external HTTP requests  
* Generates a `traceId` for each call  
* Determines `flowType` and emits message to Kafka  
* Waits for a synchronous Kafka response using an in-memory listener map

### **Key Notes** {#key-notes}

* Routes are grouped by domain (`/operators`, `/business-units`, etc.)  
* Controllers delegate to Kafka services and return structured responses  
* Uses `ez-logger` for consistent, traceable logging

## **Flow Manager: WaveFlow** {#flow-manager:-waveflow}

### **Responsibilities** {#responsibilities-1}

* Executes business logic defined in low-code flows  
* Each flow step emits or listens to Kafka events  
* Supports conditional branching, parallel actions, retries, and async completion  
* Ensures `traceId` persists across all flow nodes

### **Flow Trigger Path** {#flow-trigger-path}

1. Receives message from `ez-waveflow-api` (e.g., `create-operator-entity`)  
2. Identifies correct flow by `flowType`  
3. Executes node by node, calling services and awaiting their responses  
4. Emits final result message, which completes the original API request

## **Domain Services** {#domain-services}

### **`ez-operator`** {#ez-operator}

* Manages creation, update, and history of Operator entities  
* Consumes topics like `create-operator-entity`, `update-operator-entity`  
* Emits result topics keyed by `traceId`  
* All mutations are ZTracked (`ztracking-operator`)

### **`ez-business-unit`** {#ez-business-unit}

* Manages hierarchical business unit structures  
* Supports parent-child nesting  
* All config and metadata are versioned via `ztracking-business-unit`

### **`ez-permissions` (`ez-business-operator-permissions`)** {#ez-permissions-(ez-business-operator-permissions)}

* Resolves access by Mechanism → Permit → Profile → Operator  
* Used during login/session validation and in service authorization checks  
* All profile mutations and assignments are tracked via `ztracking-permission-profile`

### **`ez-session`** {#ez-session}

* Tracks device sessions and operator logins  
* Supports linking operators to devices via `OperatorSession`  
* Mutations to sessions are stored in `ztracking-device-session` and `ztracking-operator-session`

### **`ez-logger`** {#ez-logger}

* Central structured logging service  
* Accepts injected `traceId` and formats logs for external observability tools  
* Shared across all services

## **ZTracking Model** {#ztracking-model}

Each key entity has a parallel ZTracking table. These tables capture:

* Entity snapshot at each mutation (create/update/delete)  
* Timestamps and actor session reference  
* Associated `traceId` for full context  
* Examples:

  * `ztracking-operator`  
  * `ztracking-business-unit`  
  * `ztracking-permission-profile`

This structure enables compliance, auditing, and rollback capabilities.

## **TraceId Handling** {#traceid-handling}

* All services accept `traceId` as part of the Kafka payload  
* Each Kafka response includes the original `traceId`  
* All logs and ZTracking records must contain it  
* Generated in API layer using `generateTraceId(context)`

# **Section 4: Kafka Event Bus** {#section-4:-kafka-event-bus}

Apache Kafka is the central event bus for the backend architecture. All services publish and subscribe to Kafka topics, and message-based communication is the default pattern for both synchronous and asynchronous actions.

The event bus enables decoupled service design, real-time flows, and replayable business logic. It is also the mechanism used by WaveFlow to orchestrate and route business processes.

## **Topic Naming Strategy** {#topic-naming-strategy}

All Kafka topics follow a consistent naming convention defined in the shared `ez-utils` package. The structure is typically:

php-template

CopyEdit

`<action>-<domain>-entity`

Examples:

* `create-operator-entity`  
* `update-business-unit-entity`  
* `get-many-permission-profiles`  
* `get-history-operator-entity`

Return topics follow the same pattern and include `traceId` to correlate requests with responses.

## **Message Schema** {#message-schema}

Every Kafka message includes:

* `traceId`: Unique identifier for the lifecycle of the business request  
* `flowType`: Optional, if routed through WaveFlow  
* `payload`: Main data structure for the operation  
* `context`: Optional metadata (e.g., user, session, business unit)

Standard structure (example):

ts

CopyEdit

`{`

  `traceId: string;`

  `flowType?: string;`

  `payload: Record<string, any>;`

  `context?: {`

    `operatorId?: string;`

    `businessUnitId?: string;`

  `};`

`}`

All services must include `traceId` in outgoing Kafka messages and must log it using `ez-logger`.

## **Synchronous Response Model** {#synchronous-response-model}

For flows initiated via HTTP:

* The `ez-waveflow-api` layer emits a message with `traceId`  
* A listener (responder service) awaits a matching Kafka response  
* When the response arrives, it is matched by `traceId` and returned to the original caller

Timeouts, orphaned `traceId`s, and memory management for pending responses are handled within the internal `kafka-responder.service.ts`.

## **Partitioning and Scalability** {#partitioning-and-scalability}

Topics can be partitioned by logical keys:

* `businessUnitId`  
* `operatorId`  
* `deviceId`

This allows horizontal scale-out of consumers while preserving order where needed.

## **Error Handling and DLQs** {#error-handling-and-dlqs}

Each critical service supports:

* Try/catch wrapping of Kafka handlers  
* Graceful rejection of invalid payloads  
* Emission of `*.error` topics or logging to Dead Letter Queues (DLQ) when:  
  * Invalid data is received  
  * A downstream dependency fails  
  * Timeouts occur

Optional retry strategies can be implemented by WaveFlow for idempotent steps.

## **Observability** {#observability}

All Kafka handlers:

* Log incoming and outgoing messages via `ez-logger`  
* Include `traceId` in every message  
* Optionally record to ZTracking (for mutation events)

This ensures complete traceability for every business action, even across multiple services.

# **Section 5: API Gateway and Entry Points** {#section-5:-api-gateway-and-entry-points}

The central access point for external clients is the `ez-waveflow-api` service. It serves HTTP(S) requests from embedded application clients, back-office dashboards, and third-party partner integrations.

Rather than handling business logic directly, this layer converts HTTP requests into traceable Kafka messages that trigger WaveFlow-based flows. This design ensures that the API surface remains thin, stable, and decoupled from domain implementation.

## **Responsibilities** {#responsibilities-2}

* Parse and validate incoming requests  
* Generate a unique `traceId` for each transaction  
* Emit structured Kafka messages to initiate flow execution  
* Wait for synchronous Kafka response messages and return the result to the caller  
* Log all actions using `ez-logger` with full trace metadata

## **Endpoint Structure** {#endpoint-structure}

Routes are grouped by domain and flow type. For example:

pgsql

CopyEdit

`POST /operators              → create-operator-entity`

`GET  /business-units        → get-many-business-units`

`PATCH /permission-profiles  → update-permission-profile`

The controller layer does not contain domain logic—it emits events based on the route and delegates flow execution to WaveFlow via Kafka.

## **TraceId Injection** {#traceid-injection}

Each incoming request triggers:

ts

CopyEdit

`const traceId = generateTraceId('createOperator');`

The `traceId` is passed to:

* The outgoing Kafka message  
* The logs  
* The in-memory response resolver (Kafka → HTTP)  
* ZTracking entries if the action mutates state

This enables precise correlation between the originating HTTP request and all downstream effects.

## **Security and Token Validation** {#security-and-token-validation}

All external requests must include a signed JWT or session token. The API gateway layer validates tokens and attaches business context to the Kafka message (e.g., operatorId, businessUnitId).

Authentication is session-based and supports:

* Operator login  
* Device identification  
* Session expiration and forced logout flows

## **Partner Quotas and Abuse Prevention** {#partner-quotas-and-abuse-prevention}

Each business unit can be assigned:

* Rate limits (requests per minute)  
* Quota enforcement (API usage tracking)  
* Logging hooks to detect abnormal use patterns

These controls are applied at the gateway level and can emit events to Kafka for telemetry and abuse monitoring.

## **Extensibility** {#extensibility}

The API layer is intentionally decoupled from core domain logic. New flows can be introduced without changing controller implementations by:

* Adding new routes mapped to existing flow types  
* Updating flow definitions in WaveFlow  
* Deploying config changes without service redeploys

# **Section 6: Security and Compliance** {#section-6:-security-and-compliance}

The backend system is designed to operate in regulated, multi-tenant environments where auditability, traceability, and fine-grained access control are essential. Security responsibilities are distributed across the API Gateway, Kafka communication, and domain services, with central enforcement via session management, permission validation, and trace tracking.

## **Authentication and Session Integrity** {#authentication-and-session-integrity}

* All requests must include a signed JWT or session token  
* Tokens are issued per login and tied to an OperatorSession and DeviceSession  
* Tokens are validated at the API layer before Kafka message emission  
* Session IDs are included in context metadata for downstream service awareness

## **Authorization via Permissions Microservice** {#authorization-via-permissions-microservice}

The service `ez-business-operator-permissions` controls what actions an operator may perform.

* Operators are assigned to Permission Profiles  
* Profiles are composed of Mechanism Permits  
* Permits are linked to System Mechanisms (e.g., “can-create-operator”, “can-edit-balance”)  
* Each request is checked against the current session's permission graph  
* Permission changes are stored in `ztracking-permission-profile` for audit

## **Kafka Access Control** {#kafka-access-control}

* All Kafka messages must include a valid `traceId`  
* Internal consumers must validate message schemas before processing  
* Kafka topic access is organized by domain; services only consume and produce what they are permitted to  
* Topic ACLs can be applied at the infrastructure level if needed (e.g., in Confluent or Redpanda)

## **ZTracking and Audit Trails** {#ztracking-and-audit-trails}

All entity mutations (create, update, delete) are mirrored into dedicated ZTracking tables. These include:

* `traceId`  
* timestamp of the action  
* previous and new values  
* reference to the triggering OperatorSession  
* optional flow metadata (if triggered via WaveFlow)

This structure provides a tamper-proof audit trail for every business action.

## **Data Isolation and Multi-Tenancy** {#data-isolation-and-multi-tenancy}

* All entities are scoped to a `businessUnitId`  
* Services must enforce filtering and permissions based on the active business unit  
* No cross-business-unit access is permitted at the data layer  
* Admin tools and superuser roles must still use scoped APIs and sessions

## **CSP and Embedded Application Security** {#csp-and-embedded-application-security}

* Applications are loaded in iframes with strict `Content-Security-Policy` headers  
* `postMessage` communication is sanitized and origin-restricted  
* JWTs passed to embedded applications are short-lived and context-bound

## **Logging and Incident Forensics** {#logging-and-incident-forensics}

* All logs are generated through `ez-logger`  
* Each log line includes the `traceId`, request context, and severity  
* Logs are structured and can be routed to a SIEM or APM provider  
* Unexpected behavior (e.g., permission denial, invalid Kafka schema) is logged with high severity and optional alerts

# **Section 7: Observability and Monitoring** {#section-7:-observability-and-monitoring}

Observability is a first-class concern in the platform. Every service is designed to be traceable, log-rich, and capable of surfacing actionable metrics. Together, `traceId`, `ez-logger`, ZTracking, and structured Kafka events provide full visibility into system behavior.

## **Logging (`ez-logger`)** {#logging-(ez-logger)-1}

* All services use the shared `ez-logger` utility  
* Each log line includes:  
  * `traceId`  
  * log level (debug, info, warn, error)  
  * service and method  
  * structured payload (e.g., userId, sessionId)  
* Logs are output in JSON format and can be consumed by centralized tools (e.g., Datadog, Loki, Elastic)

### **Example:** {#example:}

json

CopyEdit

`{`

  `"level": "info",`

  `"traceId": "operator-create-2d04a7",`

  `"service": "ez-operator",`

  `"message": "Operator created successfully",`

  `"operatorId": "abc123",`

  `"businessUnitId": "bu789"`

`}`

## **Tracing with `traceId`** {#tracing-with-traceid}

* Every HTTP request begins with a `traceId`  
* The `traceId` is injected into:  
  * Kafka messages  
  * Logs  
  * ZTracking entries  
  * Flow state (if triggered by WaveFlow)  
* This allows end-to-end tracing across API → Flow → Service → Result

## **Service Health Monitoring** {#service-health-monitoring}

Each service exposes:

* `/health` endpoint for Kubernetes or Docker probes  
* Readiness and liveness checks  
* Optional `/metrics` endpoint for Prometheus-style export

Uptime checks (heartbeat pings) ensure that all critical services are reachable and operational.

## **Kafka Monitoring** {#kafka-monitoring}

* Consumer lag is tracked for each service/topic combination  
* Alerts can be configured for high lag, failed deserialization, or DLQ overflow  
* Topic throughput and error rates are metrics available per domain

## **Dead-Letter Queues (DLQs)** {#dead-letter-queues-(dlqs)}

* Malformed or failed messages are optionally routed to a DLQ  
* DLQs are monitored and inspected regularly  
* Messages include full context for replay or debugging

## **ZTracking Audit Logs** {#ztracking-audit-logs}

* Every mutation to tracked entities is recorded in a corresponding ZTracking table  
* These tables can be queried for:  
  * Change history  
  * User responsibility  
  * Flow execution tracing

ZTracking forms the basis of both observability and compliance.

## **Sentry (Optional)** {#sentry-(optional)}

* Services may be instrumented with Sentry or a similar service to track:  
  * Uncaught exceptions  
  * API-level errors  
  * Kafka handler errors  
* `traceId` is included in all Sentry events

## **Basic Admin Debug Console (Dev Mode)** {#basic-admin-debug-console-(dev-mode)}

* Applications and admin interfaces can expose a debug console in development mode  
* Includes last `traceId`, recent Kafka messages, and simplified logs

# **Section 8: CI/CD and Deployment Pipeline** {#section-8:-ci/cd-and-deployment-pipeline}

All backend services are deployed independently using a standardized GitLab CI/CD pipeline. The architecture supports frequent iteration, modular rollout of services, and versioned delivery of business logic changes.

## **Repository Structure** {#repository-structure}

Each domain service lives within a **shared monorepo**, organized as follows:

`/services/`

  `├── operator/`

  `├── business-unit/`

  `├── permissions/`

  `└── session/`

`/libs/`

  `├── ez-utils/`

  `├── ez-logger/`

  `└── ez-ztracking/`

Each service maintains its own entrypoint, Dockerfile, and CI pipeline logic. Shared utilities and schemas reside under `/libs`.

Each service should include Kubernetes deployment configuration in a consistent folder structure.

/services/operator/

  ├── Dockerfile

  └── k8s/

      ├── deployment.yaml

      └── service.yaml

CI pipelines reference these paths to deploy independently.

#### **GitLab CI Pipeline** {#gitlab-ci-pipeline}

The monorepo includes CI workflows that support **path-based triggers** to only build and deploy affected services:

1. **Lint & Type Check**  
2. **Unit Tests**  
3. **Build**  
4. **Dockerize**  
5. **Deploy**

You may use Nx, Turborepo, or GitHub Actions filters to detect changed scopes (e.g., only run operator build when `services/operator/**` or `libs/ez-utils/**` changes).

#### **Deployment Strategy** {#deployment-strategy}

* Microservices are deployed independently from the monorepo.  
* Each service has its own Dockerfile (e.g. `Dockerfile.operator`) and `k8s/` manifests.

/services/operator/

  └── k8s/

      ├── deployment.yaml

      └── service.yaml

For Example

/k8s/operator/

* WaveFlow logic can be updated without redeploying services.  
* Rollbacks use Git tags or image digests.  
* Config and flow overrides are dynamically loaded per Business Unit.

#### **Environment Configuration** {#environment-configuration}

* Each service loads config from scoped `.env` files or secrets injected at deploy time.  
* Shared `.env` files and Kubernetes secrets are defined globally but scoped per service.

## **Versioning and Tags** {#versioning-and-tags}

* Services use **Semantic Versioning** (e.g., `v2.1.0`)  
* Each deploy is tagged with a Git reference and container image label  
* Configs and flow definitions are versioned separately to allow rollback without service changes

## **Rollback and Resilience** {#rollback-and-resilience}

* Docker image rollbacks are instant via GitLab UI or CLI  
* Kafka topic replay is possible via traceId filtering  
* Flow-level versioning allows soft rollback of business logic without reverting service code

## **Flow Deployment (WaveFlow)** {#flow-deployment-(waveflow)}

* Flow definitions are managed in WaveFlow via YAML or visual builder  
* Changes are pushed to the Flow Manager in real time via Kafka or API  
* Flow versions can be locked per business unit or tagged as “default”

# **Section 9: Scalability and Entity Partitioning** {#section-9:-scalability-and-entity-partitioning}

The platform is designed for horizontal scalability at both the service and infrastructure levels. Stateless microservices, Kafka-based messaging, and Business Unit–scoped data models allow for elastic growth, isolation, and tenant-specific control.

## **Stateless Microservices** {#stateless-microservices}

Each domain service is stateless and independently deployable. This enables:

* Horizontal scaling based on demand  
* Independent service restarts and rollouts  
* Resilience to single-service failures  
* Scale-up of critical services (e.g., `ez-operator`) without affecting others

All state is stored in external databases or transmitted through Kafka.

## **Partitioning Strategy** {#partitioning-strategy}

Kafka topics can be partitioned to improve performance and concurrency. Key partitioning strategies include:

* **Per Business Unit (`businessUnitId`)** — default partition key for operator, config, permission messages  
* **Per Session or Device (`deviceId`, `operatorSessionId`)** — for high-volume player sessions  
* **Per Flow (`traceId`)** — ensures traceable, linear event handling within a given flow

Services consume partitions in parallel, which allows high throughput even under load.

## **Flow Execution Concurrency** {#flow-execution-concurrency}

WaveFlow is capable of running multiple flow instances concurrently across flows and business units. Each flow:

* Is identified by `flowType`  
* Can be versioned per business unit  
* Is isolated by `traceId` and does not share memory between executions

Concurrency is bounded only by Kafka throughput and node resources.

## **Database Design for Sharding** {#database-design-for-sharding}

The entity structure supports future sharding if needed:

* All tables include `businessUnitId` as a foreign key  
* Table indexes are scoped to businessUnit-aware queries  
* ZTracking tables are partitionable by `businessUnitId` and time

## **Session and Permission Isolation** {#session-and-permission-isolation}

Operator sessions, permission profiles, and business logic flows are scoped per business unit. This prevents:

* Cross-tenant data leakage  
* Resource starvation between units  
* Overhead from global joins or filtering

## **Load-Based Scaling** {#load-based-scaling}

Services can be scaled based on:

* Kafka lag per topic  
* API request volume  
* Flow instance count per business unit  
* Operator session concurrency

Auto-scaling policies can be implemented using Kubernetes, Nomad, or ECS, based on infrastructure provider.

## **Flow and Config Overrides** {#flow-and-config-overrides}

Business units can override:

* Flow versions (`flowType` remapping)  
* Permission profiles  
* Feature flags  
* Localized content or behavior

These overrides are loaded dynamically from a Partner Config API or `/config/business-unit-X.json`.

# **Section 10: Trace ID and ZTracking Policy** {#section-10:-trace-id-and-ztracking-policy}

Traceability and audit integrity are foundational to the backend system. Every request, event, and mutation is tagged with a unique `traceId`, and all entity changes are recorded in structured ZTracking tables. This enables full forensic reconstruction of business activity and supports debugging, monitoring, and compliance.

## **Trace ID Design and Usage** {#trace-id-design-and-usage}

### **Generation** {#generation}

Each HTTP request to the platform generates a new `traceId` at the API layer:

ts

CopyEdit

`const traceId = generateTraceId('createOperator');`

The prefix indicates the action or flow type, making trace logs more readable during debugging.

### **Propagation** {#propagation}

Once created, the `traceId` is:

* Injected into all Kafka messages

* Passed to WaveFlow for step-level execution

* Embedded in logs via `ez-logger`

* Stored in ZTracking tables for entity changes

* Returned in the final HTTP response for developer visibility

### **Format** {#format}

`traceId` follows a standard pattern:

php-template

CopyEdit

`<action>-<uuid>`

`e.g., createOperator-2d04a7fa-5ac8-43cb`

This enables both human readability and uniqueness.

### **Required in:** {#required-in:}

* Every Kafka message (payload or headers)

* Every service log

* Every ZTracking record

* Every permission mutation

* All error/exception reports

## **ZTracking Policy** {#ztracking-policy}

### **Purpose** {#purpose}

ZTracking tables serve as append-only audit logs for critical entity types. They capture:

* What changed

* When it changed

* Who triggered the change (via session)

* What the data looked like before and after

This provides transparency, rollback support, and legal-grade auditability.

### **Tracked Entities** {#tracked-entities}

Each core entity has a matching ZTracking table:

* `Operator` → `ztracking-operator`

* `BusinessUnit` → `ztracking-business-unit`

* `PermissionProfile` → `ztracking-permission-profile`

* `DeviceSession` → `ztracking-device-session`

* `OperatorSession` → `ztracking-operator-session`

### **Record Fields** {#record-fields}

Each ZTracking entry contains:

* `id` (PK)

* `traceId`

* `changeType` (create, update, delete)

* `snapshotBefore`

* `snapshotAfter`

* `createdAt`

* `operatorSessionId` or `deviceSessionId`

### **Triggering** {#triggering}

ZTracking is triggered manually within services, typically in mutation handlers after validations pass. Example:

ts

CopyEdit

`await this.ztrackingService.recordChange({`

  `traceId,`

  `changeType: 'update',`

  `snapshotBefore: previousEntity,`

  `snapshotAfter: updatedEntity,`

  `operatorSessionId`

`});`

### **Read Access** {#read-access}

* Read-only access is available for internal admin panels and forensics tools

* Queries must always be scoped by `businessUnitId`

## **Policy Enforcement** {#policy-enforcement}

* All service mutations must call the appropriate ZTracking repository

* No entity should be updated without emitting a traceable audit entry

* ZTracking errors must not block core flows but must be logged and monitored

* Records are immutable; updates to ZTracking entries are not permitted

## **Retention Strategy** {#retention-strategy}

* ZTracking tables may be periodically archived or moved to cold storage

* Default retention policy: 12–36 months, depending on regulatory needs

* Long-term export (e.g., CSV/Parquet) is supported via batch jobs if needed

# **Section 11: Open Questions and Design Decisions** {#section-11:-open-questions-and-design-decisions}

This section documents known architectural questions, strategic trade-offs, and pending decisions that may impact future stability, performance, or developer workflows. It should be reviewed regularly and updated as the platform evolves.

## **1\. Flow State Management** {#1.-flow-state-management}

**Question:**  
 Should WaveFlow persist flow execution state across restarts?

**Current State:**  
 Flow Manager is assumed to be stateless. If interrupted, the flow must be retriggered.

**Considerations:**

* Stateless flows are simpler and faster to scale  
* Persistent flow state would enable manual restarts, long-lived flows, and audit traces for partial execution  
* A Redis or Postgres-backed state store could be introduced selectively

## **2\. Response Timeout Handling** {#2.-response-timeout-handling}

**Question:**  
 What is the default timeout window for synchronous Kafka responses initiated from the API?

**Current State:**  
 Handled in memory by the `kafka-responder.service`, with implicit timeout logic.

**Considerations:**

* Long flows may exceed 5–10 seconds  
* Should we standardize timeouts per flow type?  
* What should the API return to the caller on timeout (generic error, partial progress, retry token)?

## **3\. ZTracking Mutation Rules** {#3.-ztracking-mutation-rules}

**Question:**  
 Should ZTracking record all internal changes, including idempotent updates and retry scenarios?

**Current State:**  
 ZTracking records every mutation, even if fields do not change.

**Considerations:**

* Pros: maximum auditability  
* Cons: noisy logs, performance cost, ZTracking table bloat  
* Possible solution: hash-based diffing or version increment checks

## **4\. Flow Versioning and Locking** {#4.-flow-versioning-and-locking}

**Question:**  
 Should flows be version-locked per business unit?

**Current State:**  
 Flows are referenced by `flowType`, which resolves to a default definition.

**Considerations:**

* Locking flow versions allows controlled change per business unit  
* Could support “flow upgrade” paths with rollback support  
* WaveFlow must support per-business-unit flow registry

## **5\. Retry and Dead-Letter Strategy** {#5.-retry-and-dead-letter-strategy}

**Question:**  
 Should services retry failed Kafka messages internally, or should retries be managed by WaveFlow or Kafka itself?

**Current State:**  
 Retries and DLQs are manually managed or not yet implemented.

**Considerations:**

* Complex retries may belong to Flow Manager (e.g., wait \+ retry 3 times)  
* DLQs must log original payload, traceId, and reason  
* Retry logic should be idempotent and observable

## **6\. Partner Config Governance** {#6.-partner-config-governance}

**Question:**  
 How are dynamic `/config/business-unit-X.json` files validated and versioned?

**Current State:**  
 Loaded dynamically from Partner Config API or static CDN path.

**Considerations:**

* Should there be schema validation?  
* Should Partner Config changes be ZTracked or loggable?  
* Are breaking changes to config entries allowed at runtime?

## **7\. Observability Limits** {#7.-observability-limits}

**Question:**  
 What observability strategy should be used when:

* Kafka lag is high  
* No response is received  
* A flow partially fails?

**Current State:**  
 Sentry and `ez-logger` track errors, but no unified dashboard for flow health exists.

**Considerations:**

* Flow Manager could emit health metrics per flow  
* Integration with PostHog, Datadog, or Prometheus might be required

## **8\. Schema Enforcement and Shared Types** {#8.-schema-enforcement-and-shared-types}

**Question:**  
 Should all Kafka payloads use strongly typed schemas enforced by shared libraries?

**Current State:**  
 Shared `ez-utils` defines topic names and types, but enforcement is manual.

**Considerations:**

* Zod or class-validator could enforce runtime shape  
* Schema registry (e.g., Avro or JSON Schema) could support producer/consumer guarantees  
* Might improve integration safety and dev onboarding

This section will grow over time as additional design decisions are surfaced. All new services should consider these questions before being finalized.

**9\. Monorepo Scope Management**  
 **Question**: How do we isolate build and deployment scopes within a single monorepo?  
 **Current State**: Services are being migrated to a structured monorepo.  
 **Considerations**:

* Use `nx`, `turborepo`, or `changesets` to track dependency graphs.  
* Path-based CI triggers using GitHub Actions or GitLab.  
* Scoped Dockerfiles and Kubernetes manifests.  
* Shared schema and utility governance centralized in `/libs`.

# 

# **Appendix A: Developer Workflow and Local Tooling** {#appendix-a:-developer-workflow-and-local-tooling}

This section describes the expected local development workflow for backend engineers working on RTPLUX microservices. It ensures consistency across services, supports rapid iteration, and maintains architectural guarantees such as traceability, schema validation, and Kafka compatibility.

## **1\. Local Service Development** {#1.-local-service-development}

### **Repository Structure** {#repository-structure-1}

Monorepo structure:

bash

Copy code

`/services/`

  `/operator/`

    `├── src/`

    `├── main.ts`

    `├── kafka/`

    `├── controllers/`

    `└── services/`

`/libs/`

  `/ez-utils/`

  `/ez-logger/`

#### **`tsconfig.base.json` and Path Aliases** {#tsconfig.base.json-and-path-aliases}

Each service includes a `tsconfig.json` that extends from a shared root `tsconfig.base.json`. This enables:

* Centralized compiler options

* Stable and readable imports

* IDE navigation across all services

Example `tsconfig.base.json`:

jsonc

`{`

  `"compilerOptions": {`

    `"baseUrl": ".",`

    `"paths": {`

      `"@utils/*": ["libs/ez-utils/src/*"],`

      `"@logger": ["libs/ez-logger/src/*"],`

      `"@ztrack/*": ["libs/ez-ztracking/src/*"]`

    `},`

    `"target": "ES2021",`

    `"module": "CommonJS",`

    `"moduleResolution": "Node"`

  `}`

`}`

In your service code:

ts

`import { createKafkaTopic } from '@utils/kafka';`

`import { getLogger } from '@logger';`

* `tsconfig.json` extending from  \`/tsconfig.base.json\`, which defines:  
  * \- Path aliases (e.g., \`@utils/\*\`)  
  * \- Shared compiler options  
  * \- Monorepo-wide build scope

// tsconfig.base.json

{

  "compilerOptions": {

    "baseUrl": ".",

    "paths": {

      "@utils/\*": \["libs/ez-utils/src/\*"\],

      "@logger": \["libs/ez-logger/src"\]

    }

  }

}

* `.env.example`  
* Dockerfile  
* Dev script using `ts-node-dev` or similar

Start local development via:

bash

Copy code

`pnpm dev --filter=services/operator`

or

bash

Copy code

`nx serve operator`

## **2\. Local Kafka Message Testing** {#2.-local-kafka-message-testing}

All services are run from the monorepo. Use `kcat` or `kafka-cli` for quick local topic inspection:

bash

CopyEdit

`kcat -b localhost:9092 -t create-operator-entity -C`

Or send manual test events:

bash

CopyEdit

`kcat -b localhost:9092 -t create-operator-entity -P <<EOF`

`{"traceId":"dev-test-1","payload":{"name":"TestOp"}}`

`EOF`

Use the `traceId` in logs to track full flow behavior.

## **3\. TraceId Debugging** {#3.-traceid-debugging}

Every request, message, and log should propagate the `traceId`:

ts

CopyEdit

`const traceId = generateTraceId('devTest')`

Use it in:

* Kafka message headers or payload  
* All `ez-logger` calls  
* ZTracking entries

For manual tracing:

bash

CopyEdit

`grep "traceId=devTest" logs/app.log`

## **4\. Running Full End-to-End Flow Locally** {#4.-running-full-end-to-end-flow-locally}

* Start the system from the monorepo root:  
  * bash  
  * Copy code  
  * `docker-compose up -d kafka postgres`  
  * `pnpm dev --filter=services/operator`  
  * `pnpm dev --filter=services/flow-manager`  
  * `pnpm dev --filter=services/api`

## **5\. Writing a New Kafka Handler** {#5.-writing-a-new-kafka-handler}

Steps to follow:

Define new topic in `ez-utils`:

 ts  
CopyEdit  
`export const KT_DEACTIVATE_OPERATOR = 'deactivate-operator-entity';`

1. 

Add Kafka consumer handler:

 ts  
CopyEdit  
`this.kafkaService.on(KT_DEACTIVATE_OPERATOR, async ({ traceId, payload }) => {`

  `this.logger.info({ traceId, message: 'Deactivating operator...' });`

  `const result = await this.operatorService.deactivate(payload);`

  `return { traceId, result };`

`});`

2.   
3. Log, ZTrack, and return result:  
   * Include `operatorSessionId`  
   * Validate payload  
   * Return shape that matches schema contract

## **6\. Local Test Strategy** {#6.-local-test-strategy}

* Use **Vitest** for unit and integration tests  
* Mock Kafka using `testcontainers` or `kafka-mock` lib  
* Add `__test__/` folder with:  
  * Service-level tests  
  * Kafka round-trip mocks  
  * Schema validation tests

## **7\. CI Integration** {#7.-ci-integration}

* CI checks must pass before merge:  
  * `lint`, `typecheck`, `test`, `build`  
* Commits must follow semantic versioning labels  
* Feature branches deploy to isolated preview environments if needed

## **8\. Helpful Tools** {#8.-helpful-tools}

| Tool | Use |
| ----- | ----- |
| `kcat` | Inspect Kafka messages |
| `pgAdmin` | DB snapshot comparison |
| `Postman` or `Insomnia` | API testing |
| `Zod` or `class-validator` | Schema enforcement |
| `ez-logger` | Consistent traceable logging |
| `docker-compose.override.yml` | Dev overrides |

# 

# 

# **Appendix B: RFC \- Schema Governance for Kafka Payloads and Domain Models** {#appendix-b:-rfc---schema-governance-for-kafka-payloads-and-domain-models}

**Version**: 1.0  
 **Status**: Proposed  
 **Author**: \[Your Name or Team\]  
 **Applies To**: All backend services emitting or consuming Kafka messages  
 **Last Updated**: \[Insert Date\]

## **Purpose** {#purpose-1}

To define a consistent, enforceable strategy for managing the shape and evolution of Kafka payloads, request/response structures, and shared domain models across services. This ensures safety, version compatibility, and a better developer experience as the platform scales.

## **Motivation** {#motivation}

* Kafka payloads are currently defined in code but not strictly validated  
* Inconsistent message shapes can lead to runtime crashes and silent errors  
* As team size and service count grow, shared contract enforcement becomes essential  
* We want to enable contract-first development, traceable debugging, and future auto-codegen

## **Scope** {#scope}

This RFC applies to:

* All Kafka messages (inbound and outbound)  
* All Flow Manager payloads and `traceId`\-based responses  
* ZTracking structures (where applicable)  
* Partner Config validation (optional future phase)

## **Governance Strategy** {#governance-strategy}

### **1\. Shared Schema Definitions** {#1.-shared-schema-definitions}

`Schemas are stored in:`

`pgsql`  
`Copy code`  
`/libs/ez-utils/topics/<domain>/`  
  `├── create-operator.schema.ts`  
  `├── update-operator.schema.ts`  
  `└── index.ts`

`They are defined using Zod or class-validator and exported from ez-utils.`

### **2\. Validation on Emit and Consume** {#2.-validation-on-emit-and-consume}

* All producers must **validate before emitting**  
* All consumers must **validate before handling**

ts  
CopyEdit  
`// emit`  
`CreateOperatorSchema.parse(payload);`

`// consume`  
`const validated = CreateOperatorSchema.parse(incoming.payload);`

* Invalid messages should throw and log via `ez-logger`  
* Optional: route to DLQ with `reason: "schema_validation_failed"`

### **3\. Naming and File Organization** {#3.-naming-and-file-organization}

Schemas should be colocated with their topic definition:

 pgsql  
CopyEdit  
`ez-utils/`  
  `└── topics/`  
      `└── operator/`  
          `├── create-operator.schema.ts`  
          `├── update-operator.schema.ts`  
          `└── index.ts`

* 

Expose via index:

 ts  
CopyEdit  
`export * from './create-operator.schema';`

* 

### **4\. Versioning** {#4.-versioning}

* Breaking schema changes must result in:  
  * A **new schema version** (e.g., `CreateOperatorV2Schema`)  
  * A **new topic name** (e.g., `create-operator-v2-entity`)  
  * Or strict negotiation inside the Flow Manager  
* Services may support multiple versions in parallel temporarily

### **5\. Type Inference and Sharing** {#5.-type-inference-and-sharing}

* Schemas also generate TypeScript types (via `z.infer`)  
* These types should be reused in service method signatures

ts  
CopyEdit  
`export async function handleCreateOperator(data: CreateOperatorPayload) {`  
  `// ...`  
`}`

## **Optional Future Enhancements** {#optional-future-enhancements}

* Introduce a **Schema Registry** (e.g., Confluent, Redpanda, or AsyncAPI tooling)  
* Auto-generate:  
  * TypeScript types  
  * OpenAPI endpoints  
  * Partner integration docs  
* Real-time schema diff tooling for CI validation

## **Compliance** {#compliance}

Each team must:

* Define schemas for all new Kafka topics before usage  
* Validate both emitted and consumed messages  
* Maintain schema documentation in `ez-utils`  
* Migrate old unvalidated topics to schema-based flows over time

## **Open Questions** {#open-questions}

* Should schemas be registered at runtime (dynamic loading)?  
* Should ZTracking enforce snapshot schema versions as well?  
* Do we enforce schemas in Partner Configs too?

## **Conclusion** {#conclusion}

Formalizing schema governance ensures cross-team safety, faster onboarding, easier debugging, and future automation. This RFC is a proposal to align all RTPLUX backend services on schema-first development.

