# PRD: vy-nutrition-log

---

## 1. Service Overview

### 1.1 Name & Identifier

- **Service Name:** vy-nutrition-log
- **Code/Slug:** `nutrition-log`

### 1.2 Purpose & Scope

**Purpose:**
Track every aspect of milk and solid feeding sessions—from breast and bottle to solids and pumping—so downstream services (milk-batches, post-session flows, analytics) receive a consistent, event-driven feed of nutritional data.

**In-Scope:**

- **Breastfeeding events:** start/stop per side
- **Bottle feeding events:** start/switch/end, with content type (formula, breastmilk, mixed) and volumes
- **Solids feeding events:** foods, servings, reactions
- **Pumping events:** start/stop/volume, breast side, bag labeling, storage status, expiration
- **Session summaries:** durations, total intake broken down by source and content type

**Out-of-Scope:**

- Identity/KYC (vy-person-identity)
- Milk batch management (vy-milk-batches) — consumes pumped-milk events
- Post-session recommendations (ez-waveflow-manager)
- Free-form notes/photos (AnnotationService)

---

## 2. Stakeholders & Actors

### 2.1 Internal Actors

| Actor / Service         | Interaction                                                  |
| ----------------------- | ------------------------------------------------------------ |
| **ez-waveflow-api**     | REST façade → attaches `traceId` → forwards to nutrition-log |
| **vy-person-identity**  | Validates `milkGiverId` and `babyId`                         |
| **vy-milk-batches**     | Subscribes to pumping events to create/manage milk batches   |
| **ez-waveflow-manager** | Subscribes to session-ended events for post-session flows    |
| **Analytics & BI**      | Consumes all feeding events & summaries                      |

### 2.2 External Actors

| Actor                     | Role                                                      |
| ------------------------- | --------------------------------------------------------- |
| **Provider (Milk Giver)** | Logs breast, bottle, solids, and pumping sessions via app |
| **Consumer (Parent)**     | Same as above when feeding own child                      |
| **Co-Sharer (Baby)**      | Subject of all feeding events                             |

---

## 3. Domain Model

### 3.1 Entity Definitions

| Entity                | PK           | FKs                                                                                  | Core Columns                                                                                                                                                                                                                                                                                     | Notes                                                   |
| --------------------- | ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| **nutrition_session** | `session_id` | `milk_giver_id` → vy-person-identity(personId)<br>`baby_id` → vy-person-baby(babyId) | `type: ENUM{BREAST,BOTTLE,SOLIDS,PUMP}`<br>`started_at: TIMESTAMP`<br>`ended_at: TIMESTAMP`<br>`status: ENUM{IN_PROGRESS,COMPLETED}`<br>`created_at`, `updated_at`                                                                                                                               | Top-level container for a feeding or pumping session    |
| **breast_event**      | `event_id`   | `session_id` → nutrition_session(session_id)                                         | `side: ENUM{LEFT,RIGHT}`<br>`action: ENUM{START,STOP}`<br>`event_time: TIMESTAMP`                                                                                                                                                                                                                | Start/stop logs per breast                              |
| **bottle_event**      | `event_id`   | `session_id` → nutrition_session(session_id)                                         | `action: ENUM{START,SWITCH,END}`<br>`content_type: ENUM{FORMULA,BREASTMILK,MIXED}`<br>`volume_start_ml: INT`<br>`volume_end_ml: INT`<br>`event_time: TIMESTAMP`                                                                                                                                  | Logs bottle feeding, distinguishes content and volumes  |
| **solids_event**      | `event_id`   | `session_id` → nutrition_session(session_id)                                         | `food_ids: UUID[]`<br>`servings: JSON[]`<br>`reaction: ENUM{LOVED,LIKED,DISLIKED,ALLERGIC}`<br>`event_time: TIMESTAMP`                                                                                                                                                                           | Records foods, optional serving sizes and reactions     |
| **pumping_event**     | `event_id`   | `session_id` → nutrition_session(session_id)                                         | `action: ENUM{START,STOP,VOLUME_RECORDED}`<br>`pump_type: ENUM{MANUAL,ELECTRIC}`<br>`side: ENUM{LEFT,RIGHT,BOTH}`<br>`volume_ml: INT`<br>`bag_label: VARCHAR(100)`<br>`storage_status: ENUM{FRESH,REFRIGERATED,FROZEN}`<br>`expiration_date: DATE`<br>`event_time: TIMESTAMP`<br>`notes: TEXT`   | Tracks pumping workflow, bag labeling, storage & expiry |
| **session_summary**   | `session_id` | `session_id` → nutrition_session(session_id)                                         | `duration_secs: INT`<br>`breast_intake_ml: INT`<br>`bottle_formula_intake_ml: INT`<br>`bottle_breastmilk_intake_ml: INT`<br>`bottle_mixed_intake_ml: INT`<br>`solids_summary: JSON`<br>`total_pumped_ml: INT`<br>`breast_switch_count: INT`<br>`events_count: INT`<br>`created_at`, `updated_at` | Computed totals per session                             |
| **ztracking\_**\*     | _varies_     | Mirrors each primary table’s PK(s)                                                   | All columns from corresponding primary table + `ztrackingVersion: UUID` (PK) and `versionDate: TIMESTAMP`                                                                                                                                                                                        | Optional audit/version history                          |

### 3.2 Relationships & Constraints

- **One nutrition_session → many** feeding or pumping events
- **status** prevents event logging after a session is `COMPLETED`
- **Foreign-key constraints** enforce valid `personId`/`babyId` and cascade or soft-delete as configured
- **Indexing:**
  - `(baby_id, started_at)` on `nutrition_session`
  - `(session_id, event_time)` on each event table

### 3.3 Enums & Value Sets

#### SessionType

`BREAST`, `BOTTLE`, `SOLIDS`, `PUMP`

#### BreastAction

`START`, `STOP`

#### BottleAction

`START`, `SWITCH`, `END`

#### BottleContentType

`FORMULA`, `BREASTMILK`, `MIXED`

#### SolidsReaction

`LOVED`, `LIKED`, `DISLIKED`, `ALLERGIC`

#### PumpingAction

`START`, `STOP`, `VOLUME_RECORDED`

#### StorageStatus

`FRESH`, `REFRIGERATED`, `FROZEN`

---

## 4. Business Processes & Use Cases

### 4.1 Start Session

1. **Trigger:** POST `/nutrition/sessions`
2. **Action:** Validate IDs & `type`, create `nutrition_session` (`IN_PROGRESS`, `started_at=now`), emit `NutritionSessionCreated`
3. **Outcome:** 201 + `{ session_id }`

### 4.2 Log Event

1. **Trigger:** POST `/nutrition/sessions/{session_id}/events` with event payload
2. **Action:** Validate `session` exists & is `IN_PROGRESS`; insert into relevant event table; emit `NutritionEventLogged{ session_id, event_type, event_id }`
3. **Outcome:** 200 + event record

### 4.3 End Session

1. **Trigger:** POST `/nutrition/sessions/{session_id}/end`
2. **Action:** Update `ended_at=now`, `status=COMPLETED`; compute `session_summary`; emit `NutritionSessionEnded{ session_id, summary }`
3. **Outcome:** 200 + summary payload

### 4.4 Query Session

- **GET** `/nutrition/sessions/{session_id}` → full session, all events, summary

---

## 5. API Specification

### 5.1 REST Endpoints

| Method | Path                                     | Request Body                    | Response                     | Status Codes  | Auth   |
| ------ | ---------------------------------------- | ------------------------------- | ---------------------------- | ------------- | ------ |
| POST   | `/nutrition/sessions`                    | `{ milkGiverId, babyId, type }` | `{ sessionId }`              | 201, 400, 404 | OAuth2 |
| GET    | `/nutrition/sessions/{sessionId}`        | —                               | `Session + events + summary` | 200, 404      | OAuth2 |
| POST   | `/nutrition/sessions/{sessionId}/events` | `{ eventType, payload... }`     | `{ eventId }`                | 200, 400, 404 | OAuth2 |
| POST   | `/nutrition/sessions/{sessionId}/end`    | —                               | `session_summary`            | 200, 400, 404 | OAuth2 |

### 5.2 Event Interfaces

- **Emitted:**
  - `NutritionSessionCreated { sessionId, type, milkGiverId, babyId, startedAt }`
  - `NutritionEventLogged { sessionId, eventId, eventType, eventTime }`
  - `NutritionSessionEnded { sessionId, summary }`

- **Consumed:** _none_

---

## 6. Data Persistence

### 6.1 Schema Snippets

```sql
CREATE TABLE nutrition_session (
  session_id    UUID PRIMARY KEY,
  milk_giver_id UUID NOT NULL,
  baby_id       UUID NOT NULL,
  type          VARCHAR(10) NOT NULL,
  status        VARCHAR(12) NOT NULL,
  started_at    TIMESTAMP NOT NULL,
  ended_at      TIMESTAMP,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bottle_event (
  event_id          UUID PRIMARY KEY,
  session_id        UUID REFERENCES nutrition_session(session_id),
  action            VARCHAR(10) NOT NULL,
  content_type      VARCHAR(12) NOT NULL,
  volume_start_ml   INT,
  volume_end_ml     INT,
  event_time        TIMESTAMP NOT NULL,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Additional tables follow the patterns above for breast_event, solids_event, pumping_event, session_summary, etc.
```

### 6.2 Retention & Archival

- Retain all nutrition events & summaries for **12 months** in TiDB.
- **Monthly archival** of older data to cold storage.
- **Soft-delete** support via `isDeleted` flag if needed.

---

## 7. Integration & Dependencies

### 7.1 Upstream Dependencies

- **ez-waveflow-api** (REST → Kafka ingress)
- **vy-person-identity** (validates IDs)

### 7.2 Downstream Effects

- **vy-milk-batches** subscribes to `NutritionSessionEnded` and combined pumping events
- **ez-waveflow-manager** subscribes to session-ended for post-session flows
- **Analytics & BI** consumes all events & summaries for reporting

---

## 8. Non-Functional Requirements

| Category          | Requirement                                                     |
| ----------------- | --------------------------------------------------------------- |
| **Latency**       | p95 API latency < 200 ms                                        |
| **Throughput**    | ≥ 500 events/sec                                                |
| **Availability**  | 99.9% uptime; auto-retry on Kafka DLQs                          |
| **Security**      | OAuth2; PII encrypted at rest & in transit; GDPR compliant      |
| **Scalability**   | Partition by `baby_id` and `session_id` for horizontal scaling  |
| **Observability** | Structured logs with `traceId`, metrics per endpoint/event type |

---

## 9. Monitoring & Alerting

- **Metrics:**
  - REST QPS & latencies
  - Event ingestion rate by type
  - Session completion rate

- **Alerts:**
  - 5xx rate > 2% → PagerDuty
  - Kafka consumer lag > 5 min → Slack channel

---

## 10. Testing Strategy

- **Unit tests:** domain validation, enum enforcement
- **Contract tests:** REST & event schema conformity
- **Integration tests:** TiDB + Kafka containerized
- **E2E smoke tests:** simulate feeding flows → API → events → WaveFlow

---

## 11. Deployment & Configuration

- **CI/CD:** Monorepo pipeline (lint → test → build → deploy)
- **Infrastructure:** Kubernetes Deployment + Service; Vault-managed secrets
- **Feature Flags:** Toggle new feeding types or fields without redeploy

---

## 12. Rollout & Back-out Plan

- **Canary deploy** to 5% of traffic initially
- **Rollback:** disable canary flag & revert image
- **Reprocessing:** replay Kafka topics by timestamp if required

---

## 13. Open Questions & Risks

| Question / Risk                                    | Owner | Mitigation                                               |
| -------------------------------------------------- | ----- | -------------------------------------------------------- |
| Overlap of pumping data with vy-milk-batches logic | Arch  | Strict event contracts; single source for batch metadata |
| Complexity of solids servings schema               | Dev   | Iterate schema; use JSON field for flexibility           |
| Summary computation bottlenecks on session end     | Ops   | Offload to background workers; cache results             |
| GDPR “right to be forgotten” for nutrition data    | Legal | Soft-delete + purge pipeline                             |
