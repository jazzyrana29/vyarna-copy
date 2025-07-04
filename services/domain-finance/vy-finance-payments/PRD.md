# PRD: vy-finance-payments

---

## 1. Service Overview

### 1.1 Name & Identifier  
- **Service Name:** vy-finance-payments  
- **Code/Slug:** `finance-payments`

### 1.2 Purpose & Scope  
**Purpose:**  
Orchestrate payment gateway interactions—create and confirm Stripe (and other) PaymentIntents, record retries/failures, handle refunds, and process incoming webhooks—providing a reliable, idempotent, audited payment layer for all commerce services.

**In-Scope:**  
- Creation, confirmation, cancellation of PaymentIntents  
- Tracking of each payment attempt (retries, errors)  
- Issuance and lifecycle of Refunds  
- Ingesting and deduplicating gateway webhooks (Stripe, PayPal…)  
- Management of vaulted PaymentMethods for customers

**Out-of-Scope:**  
- Order or subscription business logic (vy-commerce)  
- Ledger entries, payouts, rewards (vy-finance-wallet)  
- User identity/KYC (vy-person-identity)  
- Cart/catalog logic (vy-sales-store)

---

## 2. Stakeholders & Actors

### 2.1 Internal Actors  
| Actor / Service            | Interaction                                                                          |
|----------------------------|--------------------------------------------------------------------------------------|
| **vy-commerce**            | Calls `/payment-intents` & `/refunds`; listens for payment events                    |
| **vy-finance-wallet**      | Consumes `PaymentSucceeded` & `RefundIssued` events to update ledger                 |
| **ez-waveflow-manager**    | Subscribes to payment events for notification flows                                  |
| **Analytics & BI**         | Ingests payment metrics & failure rates                                              |

### 2.2 External Actors  
| Actor / Service            | Role                                                                                 |
|----------------------------|--------------------------------------------------------------------------------------|
| **Stripe (or other gateway)** | External payment processor; sends webhooks                                          |
| **Support/Admin**          | Views payment history, retries failures, issues manual refunds                       |

---

## 3. Domain Model

### 3.1 Entity Definitions

| Entity                   | PK                  | FKs                                                   | Core Columns                                                                                                                                                                                                                 | Notes                                                                                    |
|--------------------------|---------------------|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| **payment_intent**       | `payment_intent_id` | `order_id?` → vy-commerce(order_id)<br>`subscription_id?` → vy-commerce(subscription_id) | `external_id: VARCHAR`<br>`amount_cents: INT`<br>`currency: VARCHAR(3)`<br>`status: ENUM{REQUIRES_PAYMENT_METHOD,REQUIRES_CONFIRMATION,PROCESSING,SUCCEEDED,REQUIRES_ACTION,FAILED,CANCELED}`<br>`metadata: JSON`<br>`next_retry_at: TIMESTAMP?`<br>`created_at`, `updated_at` | Tracks a single gateway PaymentIntent                                                   |
| **payment_attempt**      | `attempt_id`        | `payment_intent_id` → payment_intent(payment_intent_id) | `attempt_number: INT`<br>`status: ENUM{PENDING,SUCCESS,FAILED}`<br>`error_code: VARCHAR?`<br>`error_message: TEXT?`<br>`gateway_response: JSON`<br>`created_at`, `updated_at`                                                     | Records each gateway call & outcome; supports retry logic                               |
| **payment_refund**       | `refund_id`         | `payment_intent_id` → payment_intent(payment_intent_id) | `external_id: VARCHAR`<br>`amount_cents: INT`<br>`currency: VARCHAR(3)`<br>`status: ENUM{PENDING,SUCCEEDED,FAILED}`<br>`reason: ENUM{REQUESTED_BY_CUSTOMER,FRAUD,OTHER}`<br>`metadata: JSON`<br>`created_at`, `updated_at`          | Manages refund lifecycle                                                                |
| **payment_method**       | `payment_method_id` | `person_id?` → vy-person-identity(personId)             | `external_id: VARCHAR`<br>`type: ENUM{CARD,ACH,APPLE_PAY,GOOGLE_PAY,OTHER}`<br>`details: JSON`<br>`is_default: BOOLEAN`<br>`created_at`, `updated_at`                                                                       | Vaulted payment method references                                                       |
| **webhook_event**        | `webhook_id`        |                                                       | `gateway: ENUM{STRIPE,PAYPAL,OTHER}`<br>`external_event_id: VARCHAR UNIQUE`<br>`event_type: VARCHAR`<br>`payload: JSON`<br>`status: ENUM{PENDING,PROCESSED,FAILED}`<br>`received_at: TIMESTAMP`<br>`processed_at: TIMESTAMP?` | Idempotent ingestion of gateway webhooks                                                |
| **gateway_config**       | `gateway_id`        |                                                       | `name: ENUM{STRIPE,PAYPAL,OTHER}`<br>`credentials: JSON`<br>`active: BOOLEAN`<br>`created_at`, `updated_at`                                                                                                                   | Supports multiple payment gateways                                                      |

---

### 3.2 Relationships & Indexes

- **FKs:**  
  - `payment_intent.order_id` and `payment_intent.subscription_id` link back to commerce-core.  
  - `payment_attempt.payment_intent_id` → `payment_intent`.  
  - `payment_refund.payment_intent_id` → `payment_intent`.  

- **Indexes:**  
  - `(external_id)` unique on `payment_intent` & `payment_refund` for idempotency.  
  - `(payment_intent_id, attempt_number)` unique on `payment_attempt`.  
  - `(gateway, external_event_id)` unique on `webhook_event`.  
  - `(person_id, is_default)` on `payment_method`.  

---

## 4. Business Processes & Use Cases

### 4.1 Create PaymentIntent  
1. **Trigger:** POST `/payment-intents` (from commerce-core)  
2. **Action:**  
   - Validate `amount_cents`, `currency`, and link (`order_id` or `subscription_id`)  
   - Generate a local `payment_intent` record with status `REQUIRES_PAYMENT_METHOD`  
   - Call Stripe API to create PaymentIntent (`external_id`)  
   - Update status per Stripe response; schedule retry if needed  
3. **Outcome:** 201 + `{ payment_intent_id, client_secret }`

### 4.2 Confirm / Capture Payment  
1. **Trigger:** Stripe webhook `payment_intent.succeeded` or manual confirm API  
2. **Action:**  
   - Update `payment_intent.status = SUCCEEDED`  
   - Record a final `payment_attempt` with `status=SUCCESS`  
   - Emit `PaymentSucceeded { payment_intent_id, order_id?, subscription_id? }`  
3. **Outcome:** 200  

### 4.3 Handle Payment Failure & Retries  
1. **Trigger:** Stripe webhook `payment_intent.payment_failed` or attempt API  
2. **Action:**  
   - Record `payment_attempt` with `status=FAILED` and error details  
   - If retryable, set `next_retry_at` per backoff policy  
3. **Outcome:** 200  

### 4.4 Issue Refund  
1. **Trigger:** POST `/refunds` with `{ payment_intent_id, amount_cents, reason }`  
2. **Action:**  
   - Create `payment_refund` record with `status=PENDING`  
   - Call Stripe Refund API  
   - Update `payment_refund.status` per response; emit `RefundSucceeded` or `RefundFailed`  
3. **Outcome:** 201 + `{ refund_id, status }`

### 4.5 Vault Payment Method  
1. **Trigger:** POST `/payment-methods` with tokenized PM from frontend  
2. **Action:**  
   - Create `payment_method` record  
   - Optionally attach to Stripe Customer  
3. **Outcome:** 201 + `{ payment_method_id }`

### 4.6 Ingest Webhooks  
1. **Trigger:** Incoming POST from Stripe or PayPal  
2. **Action:**  
   - Log raw payload in `webhook_event`  
   - Deduplicate on `external_event_id`  
   - Route to process handlers (e.g., mark intents succeeded/failed, process refunds)  
   - Update `webhook_event.status` to `PROCESSED` or `FAILED`  
3. **Outcome:** 200

---

## 5. API Specification

### 5.1 REST Endpoints

| Method | Path                         | Request Body                                              | Response                                             | Status Codes      | Auth    |
|--------|------------------------------|-----------------------------------------------------------|------------------------------------------------------|-------------------|---------|
| POST   | `/payment-intents`           | `{ order_id?, subscription_id?, amount_cents, currency, metadata? }` | `{ payment_intent_id, client_secret }`                | 201,400,404       | OAuth2  |
| GET    | `/payment-intents/{id}`      | —                                                         | `payment_intent` record                              | 200,404           | OAuth2  |
| POST   | `/payment-attempts/{id}/retry` | —                                                       | `{ attempt_id, next_retry_at }`                      | 200,400           | OAuth2  |
| POST   | `/refunds`                   | `{ payment_intent_id, amount_cents, reason, metadata? }` | `{ refund_id, status }`                              | 201,400,404       | OAuth2  |
| GET    | `/refunds/{id}`              | —                                                         | `payment_refund` record                              | 200,404           | OAuth2  |
| POST   | `/payment-methods`           | `{ person_id, token, type, details? }`                    | `{ payment_method_id }`                              | 201,400           | OAuth2  |
| GET    | `/payment-methods`           | `?person_id`                                              | `[payment_method]`                                   | 200,400           | OAuth2  |
| DELETE | `/payment-methods/{id}`      | —                                                         | 204                                                  | 204,404           | OAuth2  |

### 5.2 Event Interfaces

- **Emitted:**  
  - `PaymentIntentCreated { payment_intent_id, order_id?, subscription_id?, amount_cents, currency }`  
  - `PaymentSucceeded { payment_intent_id, order_id?, subscription_id? }`  
  - `PaymentFailed { payment_intent_id, error_code, error_message }`  
  - `RefundCreated { refund_id, payment_intent_id, amount_cents }`  
  - `RefundSucceeded { refund_id, payment_intent_id }`  
  - `RefundFailed { refund_id, payment_intent_id, error_code }`  

- **Consumed:**  
  - `OrderCreated`, `SubscriptionRenewalRequested` (from commerce-core)

---

## 6. Data Persistence

### 6.1 Schema Snippets

```sql
CREATE TABLE payment_intent (
  payment_intent_id UUID PRIMARY KEY,
  order_id          UUID,
  subscription_id   UUID,
  external_id       VARCHAR(100) UNIQUE,
  amount_cents      INT NOT NULL,
  currency          CHAR(3) NOT NULL,
  status            VARCHAR(30) NOT NULL,
  metadata          JSON,
  next_retry_at     TIMESTAMP,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_attempt (
  attempt_id        UUID PRIMARY KEY,
  payment_intent_id UUID REFERENCES payment_intent(payment_intent_id),
  attempt_number    INT NOT NULL,
  status            VARCHAR(10) NOT NULL,
  error_code        VARCHAR(50),
  error_message     TEXT,
  gateway_response  JSON,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- and similarly for refunds, payment_methods, webhook_event...
```

### 6.2 Retention & Archival
PaymentIntents & Attempts: retain 12 months, then archive to cold storage.

Refunds: retain 5 years for financial audit.

Webhooks: retain 3 months.

PaymentMethods: retain until user deletion; purge vaulted tokens per PCI policy.

### 7. Integration & Dependencies

#### 7.1 Upstream
vy-commerce (orders/subscriptions to bill)

vy-person-identity (customer identity)

#### 7.2 Downstream
vy-finance-wallet (ledger entries on PaymentSucceeded, RefundSucceeded)

ez-waveflow-manager (notifications: “Payment received”, “Refund issued”)

Analytics & BI (payment KPIs, failure rates)

### 8. Non-Functional Requirements
Category	Requirement
Latency	p95 API < 250 ms
Throughput	≥ 1000 intents/sec
Availability	99.95% uptime; auto-retry on webhook processing failures
Security	PCI-DSS scope limited; PII & secrets encrypted at rest & in transit
Scalability	Horizontally scalable; partition by order_id or subscription_id
Observability	Structured logs (traceId), metrics per endpoint & webhook type

### 9. Monitoring & Alerting
Metrics:

PaymentIntent creation rate

Payment attempt success/failure rates

Refund rate & errors

Webhook processing latency

Alerts:

Failure rate > 1% (intents or attempts) → PagerDuty

Webhook backlog > 5 min → Slack channel

### 10. Testing Strategy
Unit tests: validate status transitions, retry logic, error mappings

Contract tests: Stripe & commerce-core API contracts

Integration tests: against Stripe test mode & local webhook simulator

E2E smoke tests: full checkout → PaymentIntent → webhook → success flow

### 11. Deployment & Configuration
CI/CD: monorepo pipeline (lint → test → build → deploy)

Infra: Kubernetes Deployment & Service; secrets in Vault; webhook endpoint secured

Feature Flags: enable new gateways or retry strategies without redeploy

### 12. Rollout & Back-out Plan
Canary to 5% of traffic

Verify success/failure rates vs. baseline

Ramp gradually to 100%

Rollback: disable new gateway feature flag + revert image

Reprocessing: replay failed webhooks from backlog if needed

13. Open Questions & Risks
Question / Risk	Owner	Mitigation
Idempotency key conflicts	Engineering	enforce unique external_id; handle duplicates gracefully
Stripe API version upgrades	Engineering	maintain version pinning; smoke-test on staging
PCI-DSS compliance drift	Security	regular audits; minimize in-scope code
Currency conversion & multi-currency settlements	Product	clarify supported currencies; integrate FX service
Retry storm on webhook failure	Ops	backoff & DLQ; circuit breaker on webhook ingestion
