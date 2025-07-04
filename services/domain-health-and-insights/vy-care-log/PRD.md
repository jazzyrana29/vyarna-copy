# PRD: vy-care-log

---

## 1. Service Overview

### 1.1 Name & Identifier

- **Service Name:** vy-care-log
- **Code/Slug:** `care-log`

### 1.2 Purpose & Scope

**Purpose:**  
Provide a single, authoritative back-end for logging all “care” events—diaper changes, medication administrations, temperature readings, and symptom reports—so that caregivers, health-tracking flows, and analytics can consume a consistent, event-driven stream of baby-care data.

**In-Scope:**

- **DiaperChange**: wet/soiled/both
- **MedicationAdministration**: drug name, dosage, route
- **TemperatureMeasurement**: temperature value, unit
- **SymptomReport**: symptom type, severity

**Out-of-Scope:**

- Feeding/pumping/solids (vy-nutrition-log)
- Sleep (vy-health-sleep)
- Growth & milestones (vy-health-growth-tracker)
- Cry analysis (vy-health-cry-analyzer)
- Free-form notes/photos (handled by AnnotationService)

---

## 2. Stakeholders & Actors

### 2.1 Internal Actors

| Actor/Service           | Interaction                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| **ez-waveflow-api**     | Receives REST/gRPC calls, attaches `traceId`, forwards to care-log |
| **vy-person-identity**  | Resolves `personId` and `babyId` on incoming calls                 |
| **ez-waveflow-manager** | Subscribes to care events for reminder/upsell flows                |
| **Analytics & BI**      | Subscribes to events for dashboarding and reports                  |

### 2.2 External Actors

| Actor                             | Role                                                   |
| --------------------------------- | ------------------------------------------------------ |
| **Parent/Caregiver**              | Uses UI to record diaper, meds, temperature, symptoms  |
| **Support/Admin**                 | Views & corrects care logs, escalates exceptions       |
| **Medical Professional (future)** | May ingest medication & symptom history for care plans |

---

## 3. Domain Model

### 3.1 Entity Definitions

Below are **all** the tables this service will own in its primary TiDB schema, with their key columns, primary keys, foreign keys, and any special flags:

| Entity                        | PK                 | FKs                                                                              | Core Columns                                                                                                        | Notes                                    |
| ----------------------------- | ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **diaper_change**             | `diaper_change_id` | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId) | `change_type` (WET/SOILED/BOTH)<br>`timestamp`<br>`notes` (TEXT)<br>`isDeleted` (BOOLEAN)<br>`created_at`           | Flags wet/soiled events; soft-deleteable |
| **medication_administration** | `med_admin_id`     | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId) | `medication_name`<br>`dosage` (FLOAT)<br>`unit`<br>`route`<br>`timestamp`<br>`notes`<br>`isDeleted`<br>`created_at` | Tracks drug, dose, route                 |
| **temperature_measurement**   | `temp_id`          | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId) | `temperature` (FLOAT)<br>`unit` (C/F)<br>`timestamp`<br>`notes`<br>`isDeleted`<br>`created_at`                      | Infant body‐temp readings                |
| **symptom_report**            | `symptom_id`       | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId) | `symptom_type`<br>`severity` (MILD/MODERATE/SEVERE)<br>`timestamp`<br>`notes`<br>`isDeleted`<br>`created_at`        | Logs health complaints                   |

> **Z-Tracking Tables** (for historical auditing, if enabled):
>
> - `ztracking_diaper_change`
> - `ztracking_medication_administration`
> - `ztracking_temperature_measurement`
> - `ztracking_symptom_report`
>
> Each mirrors its primary table’s columns plus a `versionDate` and `ztrackingVersion` PK.

---

### 3.2 Relationships & Constraints

- **Person → Events**
  - One **Person** (`personId` in vy-person-identity) can log many **DiaperChange**, **MedicationAdministration**, **TemperatureMeasurement**, and **SymptomReport** records.
  - Cascades on delete (if a person is removed, their care logs can be soft-deleted or cascaded).

- **Baby → Events**
  - One **Baby** (`babyId` in vy-person-baby) is the subject of many care-log events.
  - Enforced by FK constraints; ensures only authorized caregivers may log.
  - diaper_change(baby_id, person_id) → ensure valid caregiver & baby.
  - baby_medication(baby_id) → medication catalog per baby.
  - medication_administration(baby_medication_id) → enforce selection from catalog.

- **Soft-Delete**
  - Each table includes an `isDeleted` boolean.
  - Queries must filter `isDeleted = false` unless explicitly retrieving trashed records.

- **Timestamp Monotonicity**
  - Per baby, events of a given type should be non-backdated by more than 1 hour; enforced by a business-logic check.

- **Indexing Strategy**
  - Composite indexes on `(baby_id, timestamp)` for efficient timeline queries.
  - Index on `(person_id, created_at)` for audit and caregiver activity reports.


---

## 3.3 Enums & Value Sets

Below are all the enum types you’ll need in **vy-care-log**, analogous to the “Supported Roles” table in vy-person-identity.

### **DiaperChangeType**

| Value    | Description         |
| -------- | ------------------- |
| `WET`    | Wet diaper only     |
| `SOILED` | Dirty diaper only   |
| `BOTH`   | Both wet and soiled |

### **PooTexture**
VERY_RUNNY, RUNNY, MUSHY, MUCOUSY, SOLID, LITTLE_BALLS

### **PooColor**
GREEN, YELLOW, BROWN, BLACK, RED, WHITE

---

### **MedicationRoute**

| Value        | Description                        |
| ------------ | ---------------------------------- |
| `ORAL`       | Oral ingestion (e.g. syrup, drops) |
| `TOPICAL`    | Applied to skin (cream, ointment)  |
| `INJECTION`  | IM or SC injection (syringe, pen)  |
| `INHALATION` | Inhaled (nebulizer, inhaler)       |

---

### **TemperatureUnit**

| Value | Description |
| ----- | ----------- |
| `C`   | Celsius     |
| `F`   | Fahrenheit  |

---

### **SymptomSeverity**

| Value      | Description       |
| ---------- | ----------------- |
| `MILD`     | Mild symptoms     |
| `MODERATE` | Moderate severity |
| `SEVERE`   | Severe symptoms   |

---

### **CareEventType**

| Value                       | Description                        |
| --------------------------- | ---------------------------------- |
| `DIAPER_CHANGE`             | Diaper-change event                |
| `MEDICATION_ADMINISTRATION` | Medication administration event    |
| `TEMPERATURE_MEASUREMENT`   | Body-temperature measurement event |
| `SYMPTOM_REPORT`            | Symptom-report event               |

## 4. Business Processes & Use Cases

### 4.1 Use Case Flow Examples

#### 4.1.1 Record Diaper Change

1. **Trigger:** User taps “Log Diaper Change” in app
2. **Action:**
   - POST `/care/diaper-changes` with `{ babyId, changeType, timestamp }`
   - Create `DiaperChange` record, emit `DiaperChangeLogged`
3. **Outcome:** 201 + `{ diaperChangeId }`

#### 4.1.2 Record Medication Administration

1. **Trigger:** Caregiver logs medicine
2. **Action:**
   - POST `/care/medications` with `{ babyId, medicationName, dosage, unit, route, timestamp }`
   - Create `MedicationAdministration`, emit `MedicationAdministered`
3. **Outcome:** 201 + `{ medAdminId }`

#### 4.1.3 Record Temperature Measurement

1. **Trigger:** Caregiver logs temp reading
2. **Action:**
   - POST `/care/temperatures` with `{ babyId, temperature, unit, timestamp }`
   - Create `TemperatureMeasurement`, emit `TemperatureLogged`
3. **Outcome:** 201 + `{ tempId }`

#### 4.1.4 Report Symptom

1. **Trigger:** Caregiver selects a symptom (e.g. “Rash”)
2. **Action:**
   - POST `/care/symptoms` with `{ babyId, symptomType, severity, timestamp }`
   - Create `SymptomReport`, emit `SymptomReported`
3. **Outcome:** 201 + `{ symptomId }`

---

## 5. API Specification

### 5.1 REST Endpoints

| Method | Path                                      | Request Body                                                         | Response                     | Codes       | Auth   |
| ------ | ----------------------------------------- | -------------------------------------------------------------------- | ---------------------------- | ----------- | ------ |
| POST   | `/care/diaper-changes`                    | `{ babyId, changeType, timestamp, notes? }`                          | `{ diaperChangeId }`         | 201,400,404 | OAuth2 |
| GET    | `/care/diaper-changes?babyId&dateFrom&to` | —                                                                    | `[DiaperChange]`             | 200,400     | OAuth2 |
| POST   | `/care/medications`                       | `{ babyId, medicationName, dosage, unit, route, timestamp, notes? }` | `{ medAdminId }`             | 201,400,404 | OAuth2 |
| GET    | `/care/medications?babyId&dateFrom&to`    | —                                                                    | `[MedicationAdministration]` | 200,400     | OAuth2 |
| POST   | `/care/temperatures`                      | `{ babyId, temperature, unit, timestamp, notes? }`                   | `{ tempId }`                 | 201,400,404 | OAuth2 |
| GET    | `/care/temperatures?babyId&dateFrom&to`   | —                                                                    | `[TemperatureMeasurement]`   | 200,400     | OAuth2 |
| POST   | `/care/symptoms`                          | `{ babyId, symptomType, severity, timestamp, notes? }`               | `{ symptomId }`              | 201,400,404 | OAuth2 |
| GET    | `/care/symptoms?babyId&dateFrom&to`       | —                                                                    | `[SymptomReport]`            | 200,400     | OAuth2 |

### 5.2 Event Interfaces

- **Emitted:**
  - `DiaperChangeLogged { diaperChangeId, babyId, personId, changeType, timestamp }`
  - `MedicationAdministered { medAdminId, babyId, personId, medicationName, dosage, unit, route, timestamp }`
  - `TemperatureLogged { tempId, babyId, personId, temperature, unit, timestamp }`
  - `SymptomReported { symptomId, babyId, personId, symptomType, severity, timestamp }`
- **Consumed:** _none_

---

## 6. Data Persistence

### 6.1 Schema Snippets

```sql
CREATE TABLE diaper_change (
  diaper_change_id UUID PRIMARY KEY,
  baby_id          UUID NOT NULL,
  person_id        UUID NOT NULL,
  change_type      VARCHAR(10) NOT NULL,    -- ENUM: PEE, POO, BOTH
  event_time       TIMESTAMP NOT NULL,       -- when the change actually occurred
  poo_texture      VARCHAR(20),              -- ENUM: VERY_RUNNY, RUNNY, MUSHY, MUCOUSY, SOLID, LITTLE_BALLS
  poo_color        VARCHAR(10),              -- ENUM: GREEN, YELLOW, BROWN, BLACK, RED, WHITE
  notes            TEXT,
  photo_url        TEXT,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at       TIMESTAMP
);

CREATE TABLE medication_administration (
  med_admin_id     UUID PRIMARY KEY,
  baby_id          UUID NOT NULL,
  person_id        UUID NOT NULL,
  baby_medication_id UUID REFERENCES baby_medication(baby_medication_id),
  dosage           DECIMAL(6,2) NOT NULL,
  unit             VARCHAR(10)       NOT NULL,    -- fallback if no `baby_medication_id`
  route            VARCHAR(50)       NOT NULL,    -- ENUM: ORAL, TOPICAL, INJECTION, INHALATION
  event_time       TIMESTAMP         NOT NULL,
  notes            TEXT,
  photo_url        TEXT,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at       TIMESTAMP
);

CREATE TABLE baby_medication (
  baby_medication_id UUID PRIMARY KEY,
  baby_id            UUID NOT NULL,
  name               VARCHAR(100) NOT NULL,
  form               VARCHAR(50),           -- e.g. 'liquid', 'tablet'
  default_dosage     DECIMAL(6,2),
  dosage_unit        VARCHAR(10),           -- e.g. 'mL', 'mg'
  instructions       TEXT,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at         TIMESTAMP
);

CREATE TABLE temperature_measurement (
  temp_id         UUID PRIMARY KEY,
  baby_id         UUID NOT NULL,
  person_id       UUID NOT NULL,
  temperature     FLOAT NOT NULL,
  unit            CHAR(1) NOT NULL,  -- 'C' or 'F'
  timestamp       TIMESTAMP NOT NULL,
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE symptom_report (
  symptom_id      UUID PRIMARY KEY,
  baby_id         UUID NOT NULL,
  person_id       UUID NOT NULL,
  symptom_type    VARCHAR(50) NOT NULL,
  severity        VARCHAR(10) NOT NULL, -- 'MILD','MODERATE','SEVERE'
  timestamp       TIMESTAMP NOT NULL,
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.2 Retention & Archival

Retain all care events for 12 months in TiDB.

Monthly archival of older data to cold storage.

Soft-delete support via isDeleted flag if needed.

## 7. Integration & Dependencies

### 7.1 Upstream Dependencies

ez-waveflow-api for REST → Kafka ingress

vy-person-identity for personId & babyId validation

### 7.2 Downstream Effects

ez-waveflow-manager subscribes to care events for reminder & insights flows

Analytics & BI consumes all care events for reporting

## 8. Non-Functional Requirements

Category Requirement
Latency p95 API latency < 200 ms
Throughput ≥ 200 care events/sec
Availability 99.9 % uptime; auto-retry on Kafka DLQs
Security OAuth2 auth; PII encrypted at rest & in transit; GDPR compliant
Scalability Horizontally scalable via partitioning on babyId
Observability Structured logs with traceId, metrics per endpoint/event type

## 9. Monitoring & Alerting

Metrics:

REST QPS & latencies

Event ingestion rate (per event type)

Error rate (4xx/5xx)

Alerts:

5xx rate > 2 % → PagerDuty

Event backlog in Kafka > 5 min → Slack channel

## 10. Testing Strategy

Unit tests: domain validation, enumerations, error cases

Contract tests: REST + Kafka schema conformity

Integration tests: real TiDB + Kafka container

E2E smoke tests: simulate caregiver flows → API → events → WaveFlow

## 11. Deployment & Configuration

CI/CD: Monorepo pipeline (lint → test → build → deploy)

Infrastructure: Kubernetes Deployment & Service; secrets in Vault

Feature Flags: Toggle new event types without redeploy

## 12. Rollout & Back-out Plan

Canary deploy to 5 % of traffic initially

Rollback: disable canary flag & revert to prior image

Reprocessing: replay Kafka topics by timestamp if necessary

## 13. Open Questions & Risks

Question / Risk Owner Mitigation
Consistency of timestamp across time zones Eng Arch Enforce UTC storage & client conversion
Incomplete or duplicate event submissions Dev Idempotency key support on POST endpoints
GDPR “right to be forgotten” for care data Legal Soft-delete + secure purge job
High cardinality in event-type fan-out for analytics Ops
