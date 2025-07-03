# PRD: vy-person-identity

---

## 1. Service Overview

### 1.1 Name & Identifier

- **Service Name:** vy-person-identity
- **Code / Slug:** `person-identity`

### 1.2 Purpose & Scope

**Purpose:**  
Centralize creation, verification, and management of every “Person” in Vyarna—providers, consumers, co-sharers—and their mutable contact, role and KYC data.

**Scope:**

- **In-Scope:**
  - CRUD on Person profiles
  - Multi-valued Roles (`["Provider","Consumer","Admin",…]`)
  - ContactPoints: emails & phones (multiple, with `isPrimary`, `isVerified`)
  - PhysicalAddresses with full breakdown (street lines, city, state, postalCode, country, type, history)
  - KYC / identity-verification workflows (documents, status tracking)
  - Audit via ZTracking; event emission
- **Out-of-Scope:**
  - Milk testing, health logs, booster metadata
  - Fine-grained permission logic (delegated to ez-permissions)

---

## 2. Stakeholders & Actors

### 2.1 Internal Actors

| Actor / Service                      | Interaction                                                      |
| ------------------------------------ | ---------------------------------------------------------------- |
| **ez-waveflow-api**                  | Exposes REST endpoints, adds `traceId`, emits Kafka messages     |
| **vy-health-log**                    | Consumes `IdentityVerified` events to advance provider lifecycle |
| **ez-business-operator-permissions** | Consumes `PersonUpdated` to refresh permission profiles          |
| **vy-milk-giver**                    | Retrieves Person’s multi-role & verified contact/address data    |

### 2.2 External Actors

| Actor                | Role                                                                |
| -------------------- | ------------------------------------------------------------------- |
| **Provider**         | Registers, updates profile, uploads KYC documents                   |
| **Consumer**         | Registers, updates contact info                                     |
| **Co-Sharer (Baby)** | Profile auto-created/linked by Consumer                             |
| **Support / Admin**  | Reviews KYC queue, views audit trail, updates addresses or contacts |

## 2.3 Supported Roles

A single Person may hold one or more of these roles simultaneously. Each role unlocks specific workflows, UI surfaces, and downstream service behaviors.

| Role                    | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| **Provider**            | A milk‐provider who sells or shares breastmilk via Vyarna.               |
| **Consumer**            | A parent or caregiver who purchases or receives milk.                    |
| **Co‐Sharer**           | The infant or designated beneficiary of lactation.                       |
| **ApplicationUser**     | Any authenticated user of the Vyarna app (web/mobile/desktop).           |
| **Caregiver**           | A person authorized to care for a baby (parent, nanny, relative).        |
| **Nutritionist**        | A professional consultant who advises on infant nutrition.               |
| **LactationConsultant** | A specialist who supports breastfeeding technique and health.            |
| **Influencer**          | A community advocate who promotes Vyarna’s mission and products.         |
| **SupportAgent**        | Customer-support staff with permissions to view/modify profiles.         |
| **Administrator**       | System administrator with full configuration and user-management rights. |
| **Analyst**             | Business-intelligence or data-analytics user, reads aggregated data.     |
| **DevOpsEngineer**      | Platform engineer, manages deployments, monitoring, and scaling.         |

> **Note:** Additional roles (e.g. `Researcher`, `Marketing`) may be added in future; this list defines the baseline for our first release.

---

## 3. Domain Model

### 3.1 Core Entities

| Entity                   | Description                                            | Key Fields / Structure                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------- |
| **Person**               | Core user profile                                      | `personId: UUID` (PK), `roles: string[]`, `username`, `nameFirst`, `nameMiddle?`, `nameLastFirst`, `nameLastSecond?`, `isDeleted`, `createdAt`, `updatedAt`                                                            |
| **Email**                | Email address record                                   | `emailId: UUID` (PK), `personId: UUID` (FK), `email: string` (unique), `isVerified: boolean`, `isPrimary: boolean`, `createdAt`, `updatedAt`                                                                           |
| **Phone**                | Phone number record                                    | `phoneId: UUID` (PK), `personId: UUID` (FK), `type: PhoneType{MOBILE,HOME,WORK}`, `phoneNumber: string`, `isVerified`, `isPrimary`, `createdAt`, `updatedAt`                                                           |
| **PhysicalAddress**      | Detailed address record (multiple per person; history) | `addressId: UUID` (PK), `personId: UUID` (FK), `type: AddressType{HOME,WORK,BILLING,SHIPPING}`,<br>`addressLine1`, `addressLine2?`,<br>`city`, `state`, `postalCode`, `country`, `isPrimary`, `createdAt`, `updatedAt` |
| **IdentityVerification** | KYC application for Person                             | `verificationId: UUID` (PK), `personId: UUID` (FK), `status: "pending"                                                                                                                                                 | "approved" | "rejected"`, `submittedAt`, `reviewedAt` |
| **Document**             | Uploaded KYC documents                                 | `documentId: UUID` (PK), `verificationId: UUID` (FK), `type: string`, `url: string`, `uploadedAt`                                                                                                                      |

### 3.2 Relationships & Constraints

- **Person.roles[]** supports multiple concurrent roles
- **One Person → many Emails, many Phones, many PhysicalAddresses, many IdentityVerifications**
- **PhysicalAddress.isPrimary** marks the active address; others are historical
- **Email.isPrimary / Phone.isPrimary** designate default contact methods
- **IdentityVerification → multiple Documents**

---

## 4. Business Processes & Use Cases

### 4.1 Process Flows

#### 4.1.1 Create / Update Person Profile

1. **Trigger:**
   - `POST /persons` (create)
   - `PATCH /persons/{id}` (update)
2. **Action:**
   - Validate via Zod schemas
   - Create / update Person, emit `PersonCreated` / `PersonUpdated`
3. **Outcome:**
   - 201/200 + Person JSON

#### 4.1.2 Manage ContactPoints (Email & Phone)

1. **Trigger:**
   - `POST /persons/{id}/emails` / `/phones`
   - `PATCH /persons/{id}/emails/{emailId}` / `/phones/{phoneId}`
2. **Action:**
   - CRUD on Email/Phone, emit `ContactCreated` / `ContactUpdated`
3. **Outcome:**
   - 201/200 + Contact JSON

#### 4.1.3 Manage PhysicalAddresses

1. **Trigger:** `POST /persons/{id}/addresses`
2. **Action:**
   - Mark existing `isPrimary=false`, create new with `isPrimary=true`, emit `AddressUpdated`
3. **Outcome:** 201 + Address JSON

#### 4.1.4 KYC Onboarding & Review

- **Start KYC:**
  - `POST /persons/{id}/verifications` + docs → create IdentityVerification (`pending`), store Documents, emit `KYCStarted`
- **Review KYC:**
  - Admin UI or rule → update `status` to `approved`/`rejected`, emit `IdentityVerified` / `IdentityRejected`

---

## 5. API Specification

### 5.1 REST Endpoints

| Method | Path                                                 | Request Body                                                                          | Response                     | Status Codes  | Auth   |
| ------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------- | ------------- | ------ |
| POST   | `/persons`                                           | `{ username, nameFirst, nameLastFirst, roles[] }`                                     | `{ personId }`               | 201, 400, 409 | OAuth2 |
| GET    | `/persons/{personId}`                                | —                                                                                     | `Person` JSON                | 200, 404      | OAuth2 |
| PATCH  | `/persons/{personId}`                                | Partial Person fields                                                                 | `Person` JSON                | 200, 400, 404 | OAuth2 |
| POST   | `/persons/{personId}/emails`                         | `{ email, isPrimary? }`                                                               | `{ emailId }`                | 201, 400, 404 | OAuth2 |
| PATCH  | `/persons/{personId}/emails/{emailId}`               | `{ isVerified?, isPrimary? }`                                                         | `Email` JSON                 | 200, 400, 404 | OAuth2 |
| POST   | `/persons/{personId}/phones`                         | `{ type, phoneNumber, isPrimary? }`                                                   | `{ phoneId }`                | 201, 400, 404 | OAuth2 |
| PATCH  | `/persons/{personId}/phones/{phoneId}`               | `{ isVerified?, isPrimary? }`                                                         | `Phone` JSON                 | 200, 400, 404 | OAuth2 |
| POST   | `/persons/{personId}/addresses`                      | `{ type, addressLine1, addressLine2?, city, state, postalCode, country, isPrimary? }` | `{ addressId }`              | 201, 400, 404 | OAuth2 |
| GET    | `/persons/{personId}/verifications`                  | —                                                                                     | `[IdentityVerification]`     | 200           | OAuth2 |
| POST   | `/persons/{personId}/verifications`                  | Multipart `documents[]`                                                               | `{ verificationId, status }` | 202, 400, 404 | OAuth2 |
| GET    | `/persons/{personId}/verifications/{verificationId}` | —                                                                                     | `IdentityVerification`       | 200, 404      | OAuth2 |

### 5.2 Events

- **Emitted:**
  - `PersonCreated { personId }`
  - `PersonUpdated { personId, changedFields[] }`
  - `ContactCreated { contactId, personId }`
  - `ContactUpdated { contactId, personId }`
  - `AddressUpdated { addressId, personId }`
  - `KYCStarted { verificationId, personId }`
  - `IdentityVerified { verificationId, personId }`
  - `IdentityRejected { verificationId, personId }`
- **Consumed:** _none_

---

## 6. Data Persistence

### 6.1 Schema Snippets

```sql
CREATE TABLE person (
  person_id      UUID PRIMARY KEY,
  username       VARCHAR(50) NULL,
  name_first     VARCHAR(50) NOT NULL,
  name_middle    VARCHAR(50) NULL,
  name_last_first VARCHAR(50) NOT NULL,
  name_last_second VARCHAR(50) NULL,
  roles          TEXT[]     NOT NULL,
  is_deleted     BOOLEAN    DEFAULT FALSE,
  created_at     TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email (
  email_id     UUID PRIMARY KEY,
  person_id    UUID REFERENCES person(person_id) ON DELETE CASCADE,
  email        VARCHAR(255) UNIQUE NOT NULL,
  is_verified  BOOLEAN      DEFAULT FALSE,
  is_primary   BOOLEAN      DEFAULT FALSE,
  created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE phone (
  phone_id     UUID PRIMARY KEY,
  person_id    UUID REFERENCES person(person_id) ON DELETE CASCADE,
  type         VARCHAR(10) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  is_verified  BOOLEAN     DEFAULT FALSE,
  is_primary   BOOLEAN     DEFAULT FALSE,
  created_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE physical_address (
  address_id    UUID PRIMARY KEY,
  person_id     UUID REFERENCES person(person_id) ON DELETE CASCADE,
  type          VARCHAR(20) NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city          VARCHAR(100) NOT NULL,
  state         VARCHAR(100) NOT NULL,
  postal_code   VARCHAR(20)  NOT NULL,
  country       VARCHAR(100) NOT NULL,
  is_primary    BOOLEAN      DEFAULT FALSE,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

## 6.2 Retention & Archival
- **Soft-delete Person** (flag), cascades to contacts & addresses
- **KYC documents** retained for 7 years (compliance)

---

## 7. Integration & Dependencies

### 7.1 Upstream Dependencies
- **ez-waveflow-api**
  - Exposes REST endpoints, attaches `traceId`, emits Kafka messages
- **Authentication Service**
  - Validates JWT tokens for all endpoints

### 7.2 Downstream Effects
- **vy-health-log**
  - Subscribes to `IdentityVerified` events
- **ez-business-operator-permissions**
  - Subscribes to `PersonUpdated` events

---

## 8. Non-Functional Requirements

| Category       | Requirement                                                         |
| -------------- | ------------------------------------------------------------------- |
| **Event-Driven** | All operations emit Kafka events with `traceId`                   |
| **Traceable**    | 100% ZTracking on Person, ContactPoint, Address                    |
| **Performance**  | p95 latency < 200 ms                                               |
| **Availability** | 99.9% uptime; auto-retry on Kafka DLQs                             |
| **Security**     | OAuth2; PII encrypted at rest & in transit; GDPR compliant         |
| **Scalability**  | Support 500 CRUD ops/sec; partition topics by business unit        |

---

## 9. Monitoring & Alerting
- **Metrics:**
  - REST QPS
  - Error rates (4xx/5xx)
  - Average KYC pending count
- **Alerts:**
  - 5xx rate > 2% → PagerDuty
  - Avg. KYC pending time > 1 hour → Slack alert

---

## 10. Testing Strategy
- **Unit tests:** 100% coverage on validation & domain logic
- **Contract tests:** Kafka schema & REST API contracts
- **Integration tests:** Real TiDB + Kafka container
- **E2E smoke tests:** Through API → WaveFlow → event loop

---

## 11. Deployment & Configuration
- **CI/CD:** Monorepo pipeline (lint → test → build → deploy)
- **Infrastructure:** Kubernetes Deployment & Service; Vault-managed secrets
- **Feature Flags:** KYC flows gated via WaveFlow toggle

---

## 12. Rollout & Back-out Plan
- **Blue/Green deployment** with feature toggle
- **Rollback:** disable toggle & redeploy previous image
- **Kafka topic replay** via `traceId` if reprocessing needed

---

## 13. Open Questions & Risks

| Question / Risk                                       | Owner    | Mitigation                                  |
| ----------------------------------------------------- | -------- | ------------------------------------------- |
| Multi-role consistency across consuming services      | Arch     | Shared schema library + contract tests      |
| Conflicting primary flags on Contacts or Addresses    | Dev      | DB constraints + pre-save validation        |
| GDPR “right to be forgotten” for Person data          | Legal    | Soft-delete + secure purge pipeline         |
| Secure storage of KYC document URLs                   | Security | S3 + KMS encryption + audit logging        |
```
