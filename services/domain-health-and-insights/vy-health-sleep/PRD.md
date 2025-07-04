# PRD: vy-health-sleep

---

## 1. Service Overview

### 1.1 Name & Identifier
- **Service Name:** vy-health-sleep  
- **Code/Slug:** `health-sleep`

### 1.2 Purpose & Scope  
**Purpose:**  
Provide complete lifecycle tracking of infant sleep sessions—naps and overnight—with events, environment data, interruptions, subjective ratings, schedules, notifications and summary analytics.

**In-Scope:**  
- Sleep session management (start, wake, resume, end)  
- Sleep interruption reasons  
- Environmental metrics (temperature, humidity, noise, light)  
- Subjective sleep ratings (quality, mood)  
- Notifications/reminders around sleep windows  
- Recurring sleep schedules/goals  
- Session summaries and periodic pattern summaries  

**Out-of-Scope:**  
- Nutrition (vy-nutrition-log)  
- Care events (vy-care-log)  
- Development milestones (vy-development-log)  
- Cry analysis (vy-health-cry-analyzer)  
- Free-form notes/photos (AnnotationService)

---

## 2. Stakeholders & Actors

### 2.1 Internal Actors  
| Actor / Service               | Interaction                                                                |
|-------------------------------|----------------------------------------------------------------------------|
| **ez-waveflow-api**           | REST → attaches `traceId` → forwards to health-sleep                       |
| **vy-person-identity**        | Validates `personId`, `babyId`                                             |
| **ez-waveflow-manager**       | Subscribes to session-ended events for reminders and next-step flows       |
| **Analytics & BI**            | Consumes all sleep events & summaries for dashboards                       |

### 2.2 External Actors  
| Actor                         | Role                                                                       |
|-------------------------------|----------------------------------------------------------------------------|
| **Parent/Caregiver**          | Logs sleep sessions, interruptions, ratings, schedules, reminders          |
| **Support/Admin**             | Views/corrects sleep logs, manages schedules and notifications             |
| **Pediatrician (future)**     | Views historical sleep patterns and environment data                      |

---

## 3. Domain Model

### 3.1 Entity Definitions

| Entity                          | PK                  | FKs                                                                                                   | Core Columns                                                                                                                                                                                                                       | Notes                                                    |
|---------------------------------|---------------------|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| **sleep_session**               | `session_id`        | `person_id` → vy-person-identity(personId)<br>`baby_id` → vy-person-baby(babyId)                     | `type: ENUM{NAP,NIGHT}`<br>`status: ENUM{IN_PROGRESS,COMPLETED}`<br>`start_time: TIMESTAMP`<br>`end_time: TIMESTAMP`<br>`created_at: TIMESTAMP`<br>`updated_at: TIMESTAMP`<br>`deleted_at: TIMESTAMP?`                                  | Top-level container for a sleep period                   |
| **sleep_event**                 | `event_id`          | `session_id` → sleep_session(session_id)                                                              | `event_type: ENUM{START,WAKE,RESUME,END}`<br>`event_time: TIMESTAMP`<br>`notes: TEXT`<br>`created_at`, `updated_at`, `deleted_at?`                                                                                                    | Logs intra-session state transitions                     |
| **sleep_interruption_reason**   | `reason_id`         | `session_id` → sleep_session(session_id)                                                              | `reason_type: ENUM{HUNGER,DIAPER,NOISE,DISCOMFORT,OTHER}`<br>`event_time: TIMESTAMP`<br>`notes: TEXT`<br>`created_at`, `updated_at`, `deleted_at?`                                                                                   | Rich reason tagging for WAKE events                     |
| **sleep_environment**           | `env_id`            | `session_id` → sleep_session(session_id)                                                              | `temperature_c: DECIMAL(4,1)`<br>`humidity_pct: DECIMAL(5,2)`<br>`noise_db: INT`<br>`light_level: INT`<br>`recorded_at: TIMESTAMP`<br>`created_at`, `updated_at`, `deleted_at?`                                                      | Periodic snapshots of environment during sleep          |
| **sleep_rating**                | `rating_id`         | `session_id` → sleep_session(session_id)<br>`person_id` → vy-person-identity(personId)                 | `rating_type: ENUM{QUALITY,MOOD}`<br>`rating_value: INT`<br>`rating_time: TIMESTAMP`<br>`notes: TEXT`<br>`created_at`, `updated_at`, `deleted_at?`                                                                                   | Subjective post-session ratings                          |
| **sleep_schedule**              | `schedule_id`       | `baby_id` → vy-person-baby(babyId)                                                                      | `day_of_week: INT`<br>`window_start: TIME`<br>`window_end: TIME`<br>`created_at`, `updated_at`, `deleted_at?`                                                                                                                       | Recurring sleep windows/goals per baby                   |
| **sleep_notification**          | `notification_id`   | `baby_id` → vy-person-baby(babyId)<br>`person_id` → vy-person-identity(personId)<br>`session_id?` → sleep_session(session_id) | `channel: ENUM{PUSH,EMAIL,SMS}`<br>`scheduled_for: TIMESTAMP`<br>`sent_at: TIMESTAMP?`<br>`status: ENUM{PENDING,SENT,FAILED}`<br>`created_at`, `updated_at`                                                                       | Reminder/alert records                                    |
| **sleep_summary**               | `session_id`        | `session_id` → sleep_session(session_id)                                                              | `total_sleep_secs: INT`<br>`total_interruptions: INT`<br>`avg_interruption_secs: INT`<br>`longest_block_secs: INT`<br>`sleep_efficiency: FLOAT`<br>`created_at`, `updated_at`<br>`deleted_at?`                                          | Per-session derived metrics                               |
| **sleep_pattern_summary**       | `summary_id`        | `baby_id` → vy-person-baby(babyId)                                                                      | `period_type: ENUM{DAILY,WEEKLY}`<br>`period_start: DATE`<br>`avg_duration_s: INT`<br>`avg_interruptions: FLOAT`<br>`sleep_efficiency: FLOAT`<br>`created_at`, `updated_at`                                                          | Cached periodic aggregates                                |
| **ztracking_***                  | *varies*            | Mirrors each mutable primary table’s PK                                                               | All columns + `ztrackingVersion: UUID` (PK), `versionDate: TIMESTAMP`                                                                                                                                                                 | Audit/version history                                     |

### 3.2 Relationships & Constraints
- **sleep_session → sleep_event|sleep_interruption_reason|sleep_environment|sleep_rating|sleep_summary**  
  - One-to-many as appropriate; cascade or soft-delete on session deletion.  
- **sleep_session → sleep_schedule (no direct FK)**; schedules apply per baby, not per session.  
- **sleep_session → sleep_notification** (optional reference)  
- **Soft-delete**: use `deleted_at` rather than boolean flag for all primary tables.  
- **Indexes:**  
  - `(baby_id, start_time)` on `sleep_session`  
  - `(session_id, event_time)` on event tables  
  - `(baby_id, period_type, period_start)` on `sleep_pattern_summary`

### 3.3 Enums & Value Sets

#### SleepType  
`NAP`, `NIGHT`

#### SleepStatus  
`IN_PROGRESS`, `COMPLETED`

#### SleepEventType  
`START`, `WAKE`, `RESUME`, `END`

#### InterruptionReasonType  
`HUNGER`, `DIAPER`, `NOISE`, `DISCOMFORT`, `OTHER`

#### SleepRatingType  
`QUALITY`, `MOOD`

#### NotificationChannel  
`PUSH`, `EMAIL`, `SMS`

#### NotificationStatus  
`PENDING`, `SENT`, `FAILED`

#### PeriodType  
`DAILY`, `WEEKLY`

---

## 4. Business Processes & Use Cases

### 4.1 Start Sleep Session
1. **Trigger:** POST `/sleep/sessions`  
2. **Action:** Create `sleep_session` (`IN_PROGRESS`, `start_time=now`), emit `SleepSessionStarted`  
3. **Outcome:** 201 + `{ session_id }`

### 4.2 Log Sleep Event
1. **Trigger:** POST `/sleep/sessions/{session_id}/events`  
2. **Action:** Validate session; insert `sleep_event`; emit `SleepEventLogged`  
3. **Outcome:** 200 + event record

### 4.3 Log Interruption
1. **Trigger:** POST `/sleep/sessions/{session_id}/interruptions`  
2. **Action:** Insert `sleep_interruption_reason`; emit `SleepInterrupted`  
3. **Outcome:** 200 + `{ reason_id }`

### 4.4 Record Environment
1. **Trigger:** POST `/sleep/sessions/{session_id}/environment`  
2. **Action:** Insert `sleep_environment`; emit `SleepEnvironmentRecorded`  
3. **Outcome:** 200 + `{ env_id }`

### 4.5 Rate Sleep
1. **Trigger:** POST `/sleep/sessions/{session_id}/ratings`  
2. **Action:** Insert `sleep_rating`; emit `SleepRated`  
3. **Outcome:** 200 + `{ rating_id }`

### 4.6 End Sleep Session
1. **Trigger:** POST `/sleep/sessions/{session_id}/end`  
2. **Action:** Update session (`status=COMPLETED`, `end_time=now`); compute `sleep_summary`; emit `SleepSessionEnded`  
3. **Outcome:** 200 + summary payload

### 4.7 Manage Schedules & Notifications
- **Schedules:** CRUD `/sleep/schedules` → `sleep_schedule`  
- **Notifications:** CRUD `/sleep/notifications` → `sleep_notification`

### 4.8 Query Patterns
- **GET** `/sleep/sessions/{session_id}` → full session + events + summary  
- **GET** `/sleep/patterns?babyId&periodType&periodStart` → returns `sleep_pattern_summary`

---

## 5. API Specification

### 5.1 REST Endpoints

| Method | Path                                               | Request Body                          | Response                         | Codes         | Auth   |
|--------|----------------------------------------------------|---------------------------------------|----------------------------------|---------------|--------|
| POST   | `/sleep/sessions`                                  | `{ babyId, personId, type }`          | `{ sessionId }`                  | 201,400       | OAuth2 |
| POST   | `/sleep/sessions/{sessionId}/events`               | `{ eventType, eventTime, notes? }`    | `{ eventId }`                    | 200,400,404   | OAuth2 |
| POST   | `/sleep/sessions/{sessionId}/interruptions`        | `{ reasonType, eventTime, notes? }`   | `{ reasonId }`                   | 200,400,404   | OAuth2 |
| POST   | `/sleep/sessions/{sessionId}/environment`          | `{ temperatureC, humidityPct, noiseDb, lightLevel, recordedAt }` | `{ envId }` | 200,400,404   | OAuth2 |
| POST   | `/sleep/sessions/{sessionId}/ratings`              | `{ ratingType, ratingValue, ratingTime, notes? }` | `{ ratingId }`   | 200,400,404   | OAuth2 |
| POST   | `/sleep/sessions/{sessionId}/end`                  | —                                     | `sleep_summary`                  | 200,400,404   | OAuth2 |
| GET    | `/sleep/sessions/{sessionId}`                      | —                                     | `session + events + summary`     | 200,404       | OAuth2 |
| GET    | `/sleep/schedules?babyId`                          | —                                     | `[sleep_schedule]`               | 200,400       | OAuth2 |
| POST   | `/sleep/schedules`                                 | `{ babyId, dayOfWeek, windowStart, windowEnd }` | `{ scheduleId }` | 201,400       | OAuth2 |
| GET    | `/sleep/notifications?babyId`                      | —                                     | `[sleep_notification]`           | 200,400       | OAuth2 |
| POST   | `/sleep/notifications`                             | `{ babyId, channel, scheduledFor, sessionId? }` | `{ notificationId }` | 201,400       | OAuth2 |
| GET    | `/sleep/patterns?babyId&periodType&periodStart`    | —                                     | `[sleep_pattern_summary]`        | 200,400       | OAuth2 |

### 5.2 Event Interfaces

- **Emitted:**  
  - `SleepSessionStarted { sessionId, babyId, personId, type, startTime }`  
  - `SleepEventLogged { sessionId, eventId, eventType, eventTime }`  
  - `SleepInterrupted { sessionId, reasonId, reasonType, eventTime }`  
  - `SleepEnvironmentRecorded { envId, sessionId, metrics… }`  
  - `SleepRated { ratingId, sessionId, ratingType, ratingValue }`  
  - `SleepSessionEnded { sessionId, summary }`  

- **Consumed:** _none_

---

## 6. Data Persistence

### 6.1 Schema Snippets

```sql
CREATE TABLE sleep_session (
  session_id   UUID PRIMARY KEY,
  person_id    UUID NOT NULL,
  baby_id      UUID NOT NULL,
  type         VARCHAR(10) NOT NULL,
  status       VARCHAR(12) NOT NULL,
  start_time   TIMESTAMP NOT NULL,
  end_time     TIMESTAMP,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at   TIMESTAMP
);

CREATE TABLE sleep_event (
  event_id     UUID PRIMARY KEY,
  session_id   UUID REFERENCES sleep_session(session_id),
  event_type   VARCHAR(10) NOT NULL,
  event_time   TIMESTAMP NOT NULL,
  notes        TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at   TIMESTAMP
);

CREATE TABLE sleep_interruption_reason (
  reason_id    UUID PRIMARY KEY,
  session_id   UUID REFERENCES sleep_session(session_id),
  reason_type  VARCHAR(20) NOT NULL,
  event_time   TIMESTAMP NOT NULL,
  notes        TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at   TIMESTAMP
);

-- ...snippets for sleep_environment, sleep_rating, sleep_schedule, sleep_notification, sleep_summary, sleep_pattern_summary...
````

### 6.2 Retention & Archival

* Retain all sleep data for **18 months** in TiDB
* **Quarterly archival** of older data to cold storage
* **Soft-delete** via `deleted_at` for GDPR compliance

---

## 7. Integration & Dependencies

### 7.1 Upstream Dependencies

* **ez-waveflow-api** (REST → Kafka ingress)
* **vy-person-identity** (validates IDs)

### 7.2 Downstream Effects

* **ez-waveflow-manager** subscribes to `SleepSessionEnded` for flows
* **Analytics & BI** consumes all sleep events & summaries

---

## 8. Non-Functional Requirements

| Category          | Requirement                                                        |
| ----------------- | ------------------------------------------------------------------ |
| **Latency**       | p95 API latency < 200 ms                                           |
| **Throughput**    | ≥ 100 sleep events/sec                                             |
| **Availability**  | 99.9% uptime; automatic Kafka retries on DLQs                      |
| **Security**      | OAuth2; PII encrypted at rest & in transit; GDPR compliant         |
| **Scalability**   | Partition by `baby_id` and `session_id`; autoscale on event volume |
| **Observability** | Structured logs with `traceId`; metrics per endpoint/event type    |

---

## 9. Monitoring & Alerting

**Metrics:**

* REST QPS & latencies
* Event ingestion rate by type
* Session completion vs start ratio

**Alerts:**

* 5xx rate > 2% → PagerDuty
* Kafka consumer lag > 5 min → Slack channel

---

## 10. Testing Strategy

* **Unit tests:** validation of enums, session rules, interruption logic
* **Contract tests:** REST & event schema conformity
* **Integration tests:** TiDB + Kafka containerized environment
* **E2E smoke tests:** simulate full sleep workflow → API → events → summary

---

## 11. Deployment & Configuration

* **CI/CD:** Monorepo pipeline (lint → test → build → deploy)
* **Infrastructure:** Kubernetes Deployment + Service; Vault-managed secrets
* **Feature Flags:** Toggle new event types or schedules without redeploy

---

## 12. Rollout & Back-out Plan

* **Canary deploy** to 10% of users initially
* **Rollback:** disable feature flags & revert image
* **Data reprocessing:** replay Kafka topics by timestamp if needed

---

## 13. Open Questions & Risks

| Question / Risk                                         | Owner   | Mitigation                                    |
| ------------------------------------------------------- | ------- | --------------------------------------------- |
| Incomplete/missing environment data from caregivers     | Dev     | Graceful defaults; UI warnings                |
| Complexity of schedule management vs caregiver adoption | Product | UX research; iterate simple patterns first    |
| GDPR “right to be forgotten” on sleep history           | Legal   | Soft-delete + purge pipeline                  |
| Device integration variability and scaling              | Ops     | Rate-limit device events; autoscale consumers |

