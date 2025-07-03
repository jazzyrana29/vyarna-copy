# PRD: vy-development-log

---

## 1. Service Overview

### 1.1 Name & Identifier

- **Service Name:** vy-development-log
- **Code / Slug:** `development-log`

### 1.2 Purpose & Scope

**Purpose:**  
Capture and persist all child development events—growth measurements, developmental milestones, teething events, and special “moments”—so that caregivers, clinicians, and analytics can track progress over time.

**In-Scope:**

- **GrowthMeasurement**: height, weight, head circumference, etc.
- **Milestone**: first roll, first sit, first crawl, first word, first smile, etc.
- **TeethingEvent**: tooth identification and eruption date.
- **DevelopmentMoment**: free-form “moments” with title, description, optional photo.

**Out-of-Scope:**

- Feeding/pumping/solids (vy-nutrition-log)
- Care events (vy-care-log)
- Sleep (vy-health-sleep)
- Cry-analysis (vy-health-cry-analyzer)
- Free-form notes/photos outside development context (AnnotationService)

---

## 2. Stakeholders & Actors

### 2.1 Internal Actors

| Actor / Service         | Interaction                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| **ez-waveflow-api**     | Receives REST calls, attaches `traceId`, forwards to development-log              |
| **vy-person-identity**  | Validates `personId` and `babyId` on incoming requests                            |
| **ez-waveflow-manager** | Subscribes to development events to trigger notifications (e.g., “Baby Crawled!”) |
| **Analytics & BI**      | Consumes development events and summaries for reporting                           |

### 2.2 External Actors

| Actor                       | Role                                                               |
| --------------------------- | ------------------------------------------------------------------ |
| **Parent / Caregiver**      | Logs growth, milestones, teething, and special development moments |
| **Pediatrician** _(future)_ | Views growth curves and milestone history                          |
| **Support / Admin**         | Corrects erroneous entries, assists with data issues               |

---

## 3. Domain Model

### 3.1 Entity Definitions

| Entity                       | PK                | FKs                                                                                                                                       | Core Columns                                                                                                                                                                                             | Notes                                                                          |
| ---------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **development_session**      | `session_id`      | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId)                                                          | `session_type: ENUM{CHECKUP,JOURNAL,PLAYDATE}`<br>`start_time: TIMESTAMP`<br>`end_time: TIMESTAMP`<br>`notes: TEXT`<br>`isDeleted: BOOLEAN`<br>`created_at`, `updated_at`                                | Optional grouping of development events (e.g. doctor visit, milestone cluster) |
| **growth_measurement**       | `growth_id`       | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId)                                                          | `measurement_type: ENUM{HEIGHT,WEIGHT,HEAD_CIRCUMFERENCE}`<br>`value: DECIMAL(6,2)`<br>`unit: ENUM{CM,IN,KG,LB}`<br>`event_time: TIMESTAMP`<br>`notes: TEXT`<br>`isDeleted`<br>`created_at`,`updated_at` | Height/weight/head circumference readings                                      |
| **growth_percentile_cache**  | `cache_id`        | `growth_id` → growth_measurement(growth_id)                                                                                               | `percentile: FLOAT`<br>`z_score: FLOAT`<br>`computed_at: TIMESTAMP`                                                                                                                                      | Cached percentiles/Z-scores for fast UI rendering                              |
| **milestone_definition**     | `definition_id`   | `created_by` → vy-person-identity(personId)                                                                                               | `milestone_key: VARCHAR(50)`<br>`label: VARCHAR(100)`<br>`description: TEXT`<br>`isDefault: BOOLEAN`<br>`created_at`,`updated_at`                                                                        | Configurable/custom milestone types                                            |
| **milestone**                | `milestone_id`    | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId)<br>`definition_id` → milestone_definition(definition_id) | `achieved_at: TIMESTAMP`<br>`notes: TEXT`<br>`isDeleted: BOOLEAN`<br>`created_at`,`updated_at`                                                                                                           | Instances of milestones achieved                                               |
| **teething_event**           | `teething_id`     | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId)                                                          | `tooth_name: ENUM{UPPER_CENTRAL_INCISOR,...}`<br>`eruption_date: DATE`<br>`notes: TEXT`<br>`isDeleted: BOOLEAN`<br>`created_at`,`updated_at`                                                             | Tracks tooth eruption                                                          |
| **development_moment**       | `moment_id`       | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId)<br>`session_id?` → development_session(session_id)       | `title: VARCHAR(255)`<br>`description: TEXT`<br>`event_time: TIMESTAMP`<br>`notes: TEXT`<br>`isDeleted: BOOLEAN`<br>`created_at`,`updated_at`                                                            | Free-form “moments” (e.g. “first laugh”)                                       |
| **development_moment_photo** | `photo_id`        | `moment_id` → development_moment(moment_id)                                                                                               | `url: TEXT`<br>`caption: VARCHAR(255)`<br>`created_at: TIMESTAMP`                                                                                                                                        | Supports multiple photos per moment                                            |
| **asset**                    | `asset_id`        | _none_ (generic media)                                                                                                                    | `url: TEXT`<br>`type: ENUM{IMAGE,VIDEO,AUDIO,OTHER}`<br>`metadata: JSON`<br>`created_at`,`updated_at`                                                                                                    | Generic media storage for any service                                          |
| **notification**             | `notification_id` | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId)<br>`event_id?` → generic event FK                        | `event_type: VARCHAR(50)`<br>`target_id: UUID`<br>`channel: ENUM{PUSH,EMAIL,SMS}`<br>`status: ENUM{PENDING,SENT,FAILED}`<br>`sent_at: TIMESTAMP?`<br>`created_at`,`updated_at`                           | Tracks downstream notifications sent to caregivers                             |

> **Z-Tracking Tables** _(optional audit/history)_  
> For each primary table above, a corresponding `ztracking_*` table exists with identical columns plus `ztrackingVersion: UUID` (PK) and `versionDate: TIMESTAMP`.

---

### 3.2 Relationships & Constraints

- **Person & Baby Ownership**
  - All events reference `person_id` (the caregiver) and `baby_id` (the subject).
  - FK constraints ensure only authorized persons and valid babies are used.

- **Session Grouping**
  - `development_moment.session_id` may link to `development_session` to group related events.

- **Cascade & Soft-Delete**
  - Soft-deletion via `isDeleted` or `deleted_at` flag; physical deletion only by purge jobs.
  - Deleting a session optionally cascades to its child moments/photos.

- **Indexing**
  - Composite indexes on `(baby_id, event_time)` or `(baby_id, timestamp)` for each table.
  - Index on `(moment_id)` in `development_moment_photo` and on `(event_type, target_id)` in `notification`.

---

### 3.3 Enums & Value Sets

#### SessionType

| Value      | Description                     |
| ---------- | ------------------------------- |
| `CHECKUP`  | Doctor/clinic visit             |
| `JOURNAL`  | Parent-created session grouping |
| `PLAYDATE` | Social/learning session         |

#### GrowthMeasurementType

| Value                | Description                    |
| -------------------- | ------------------------------ |
| `HEIGHT`             | Length / height                |
| `WEIGHT`             | Weight                         |
| `HEAD_CIRCUMFERENCE` | Head circumference measurement |

#### GrowthUnit

| Value | Description |
| ----- | ----------- |
| `CM`  | Centimeters |
| `IN`  | Inches      |
| `KG`  | Kilograms   |
| `LB`  | Pounds      |

#### MilestoneKey

| Value                                 | Description       |
| ------------------------------------- | ----------------- |
| `ROLL`                                | Rolls over        |
| `SIT`                                 | Sits unassisted   |
| `CRAWL`                               | Crawls            |
| `FIRST_WORD`                          | Utters first word |
| `FIRST_SMILE`                         | Smiles first time |
| _(+ custom via milestone_definition)_ |                   |

#### ToothName

| Value                       | Description             |
| --------------------------- | ----------------------- |
| `UPPER_CENTRAL_INCISOR`     | First upper front tooth |
| `LOWER_CENTRAL_INCISOR`     | First lower front tooth |
| _(… other primary teeth …)_ |                         |

#### AssetType

| Value   | Description          |
| ------- | -------------------- |
| `IMAGE` | Static photo         |
| `VIDEO` | Video clip           |
| `AUDIO` | Audio recording      |
| `OTHER` | Any other media type |

#### NotificationChannel & Status

| Channel    | Description      | Status     | Description            |
| ---------- | ---------------- | ---------- | ---------------------- |
| `PUSH`     | Native push      | `PENDING`  | Queued for delivery    |
| `EMAIL`    | Email            | `SENT`     | Successfully delivered |
| `SMS`      | SMS/Text message | `FAILED`   | Delivery failed        |
| _(others)_ |                  | `RETRYING` | In retry queue         |

---

---

## 4. Business Processes & Use Cases

### 4.1 Use Case Flows

#### 4.1.1 Record Growth Measurement

1. **Trigger:** POST `/development/growth`
2. **Action:**
   - Validate `measurement_type`, `value`, `unit`
   - Create `growth_measurement`, emit `GrowthMeasured` event
3. **Outcome:** 201 + `{ growthId }`

#### 4.1.2 Log Milestone

1. **Trigger:** POST `/development/milestones`
2. **Action:**
   - Validate `milestone_type`, `achieved_at`
   - Create `milestone`, emit `MilestoneLogged` event
3. **Outcome:** 201 + `{ milestoneId }`

#### 4.1.3 Record Teething Event

1. **Trigger:** POST `/development/teething`
2. **Action:**
   - Validate `tooth_name`, `eruption_date`
   - Create `teething_event`, emit `TeethingEventLogged`
3. **Outcome:** 201 + `{ teethingId }`

#### 4.1.4 Capture Development Moment

1. **Trigger:** POST `/development/moments`
2. **Action:**
   - Accept `title`, `description`, optional `photo_url`
   - Create `development_moment`, emit `MomentCaptured`
3. **Outcome:** 201 + `{ momentId }`

---

## 5. API Specification

### 5.1 REST Endpoints

| Method | Path                            | Request Body                                                    | Response              | Codes       | Auth   |
| ------ | ------------------------------- | --------------------------------------------------------------- | --------------------- | ----------- | ------ |
| POST   | `/development/growth`           | `{ babyId, measurementType, value, unit, timestamp?, notes? }`  | `{ growthId }`        | 201,400,404 | OAuth2 |
| GET    | `/development/growth?babyId...` | —                                                               | `[GrowthMeasurement]` | 200,400     | OAuth2 |
| POST   | `/development/milestones`       | `{ babyId, milestoneType, achievedAt, notes? }`                 | `{ milestoneId }`     | 201,400,404 | OAuth2 |
| GET    | `/development/milestones?...`   | —                                                               | `[Milestone]`         | 200,400     | OAuth2 |
| POST   | `/development/teething`         | `{ babyId, toothName, eruptionDate, notes? }`                   | `{ teethingId }`      | 201,400,404 | OAuth2 |
| GET    | `/development/teething?...`     | —                                                               | `[TeethingEvent]`     | 200,400     | OAuth2 |
| POST   | `/development/moments`          | `{ babyId, title, description, photoUrl?, timestamp?, notes? }` | `{ momentId }`        | 201,400,404 | OAuth2 |
| GET    | `/development/moments?...`      | —                                                               | `[DevelopmentMoment]` | 200,400     | OAuth2 |

### 5.2 Event Interfaces

- **Emitted:**
  - `GrowthMeasured { growthId, babyId, personId, measurementType, value, unit, timestamp }`
  - `MilestoneLogged { milestoneId, babyId, personId, milestoneType, achievedAt }`
  - `TeethingEventLogged { teethingId, babyId, personId, toothName, eruptionDate }`
  - `MomentCaptured { momentId, babyId, personId, title, timestamp }`
- **Consumed:** _none_

---

## 6. Data Persistence

### 6.1 Schema Snippets

```sql
CREATE TABLE growth_measurement (
  growth_id        UUID PRIMARY KEY,
  baby_id          UUID NOT NULL,
  person_id        UUID NOT NULL,
  measurement_type VARCHAR(30) NOT NULL,
  value            FLOAT    NOT NULL,
  unit             VARCHAR(10) NOT NULL,
  timestamp        TIMESTAMP NOT NULL,
  notes            TEXT,
  isDeleted        BOOLEAN    DEFAULT FALSE,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE milestone (
  milestone_id   UUID PRIMARY KEY,
  baby_id        UUID NOT NULL,
  person_id      UUID NOT NULL,
  milestone_type VARCHAR(30) NOT NULL,
  description    TEXT,
  achieved_at    TIMESTAMP NOT NULL,
  notes          TEXT,
  isDeleted      BOOLEAN    DEFAULT FALSE,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teething_event (
  teething_id     UUID PRIMARY KEY,
  baby_id         UUID NOT NULL,
  person_id       UUID NOT NULL,
  tooth_name      VARCHAR(50) NOT NULL,
  eruption_date   DATE NOT NULL,
  notes           TEXT,
  isDeleted       BOOLEAN     DEFAULT FALSE,
  created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE development_moment (
  moment_id     UUID PRIMARY KEY,
  baby_id       UUID NOT NULL,
  person_id     UUID NOT NULL,
  title         VARCHAR(100) NOT NULL,
  description   TEXT,
  photo_url     TEXT,
  timestamp     TIMESTAMP NOT NULL,
  notes         TEXT,
  isDeleted     BOOLEAN       DEFAULT FALSE,
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

### 6.2 Retention & Archival

Retain all development events indefinitely in TiDB.

Annual archival of events older than 5 years to cold storage.

Soft-delete support via isDeleted flag.

### 7. Integration & Dependencies

#### 7.1 Upstream Dependencies

ez-waveflow-api (REST → Kafka ingress)

vy-person-identity (validates personId, babyId)

#### 7.2 Downstream Effects

ez-waveflow-manager subscribes to development events for UI notifications and milestone banners

Analytics & BI consumes events for growth curve plotting and developmental reports

### 8. Non-Functional Requirements

Category Requirement
Latency p95 API latency < 300 ms
Throughput ≥ 50 development events/sec
Availability 99.9% uptime; auto-retry on Kafka DLQs
Security OAuth2; PII encrypted at rest & in transit; GDPR compliant
Scalability Horizontally scalable; partition by babyId
Observability Structured logs with traceId, metrics per endpoint/event type

### 9. Monitoring & Alerting

Metrics:

REST QPS & latencies

Event ingestion rate (per event type)

Alerts:

5xx rate > 2 % → PagerDuty

Consumer lag > 5 min in Kafka → Slack channel

### 10. Testing Strategy

Unit tests: validation of enums, domain constraints

Contract tests: REST + Kafka schema adherence

Integration tests: TiDB + Kafka containerized setup

E2E smoke tests: simulate caregiver flows → API → events → WaveFlow

### 11. Deployment & Configuration

CI/CD: Monorepo Git pipeline (lint → test → build → deploy)

Infrastructure: Kubernetes Deployment + Service; Vault-managed secrets

Feature Flags: Enable new event types or data migrations without redeploy

### 12. Rollout & Back-out Plan

Canary deployment to 5% of traffic initially

Rollback: disable canary flag & revert to prior image

Data reprocessing: replay Kafka topics by timestamp if needed

### 13. Open Questions & Risks

Question / Risk Owner Mitigation
Variation in growth standards across populations Eng Arch Configurable growth percentiles by region
Overlapping milestone definitions across cultures Product Standardize core milestone types; allow custom ones
Privacy of moment photos & descriptions Security Encrypt URLs; enforce ACLs
Schema evolution for new development event types Eng Arch Versioned endpoints; backward-compatible migrations
