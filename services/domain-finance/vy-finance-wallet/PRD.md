# PRD: vy-finance-wallet

---

## 1. Service Overview

### 1.1 Name & Identifier  
- **Service Name:** vy-finance-wallet  
- **Code/Slug:** `finance-wallet`

### 1.2 Purpose & Scope  
**Purpose:**  
Maintain an auditable ledger of all platform credits and debits—provider payouts, consumer rewards, affiliate commissions, and internal charges—and expose account/balance APIs for downstream services and UI.

**In-Scope:**  
- Wallet account creation and balance tracking  
- Ledger transactions (credits/debits) with immutable audit trail  
- Scheduled provider payouts  
- Issuance and redemption of consumer rewards  
- Calculation and reservation of affiliate commissions  
- One-off internal charges or adjustments  

**Out-of-Scope:**  
- Payment gateway orchestration (vy-finance-payments)  
- Order/subscription management (vy-commerce)  
- User identity/KYC (vy-person-identity)  
- Analytics/reporting (Analytics & BI consumes events)

---

## 2. Stakeholders & Actors

### 2.1 Internal Actors  
| Actor / Service          | Interaction                                                        |
|--------------------------|--------------------------------------------------------------------|
| **vy-commerce**          | Emits `OrderPaid`, `SubscriptionRenewed`, `RefundSucceeded` events  |
| **vy-finance-payments**  | Emits `PaymentSucceeded`, `RefundSucceeded`                       |
| **vy-affiliate-service** | Emits `AffiliateCommissionCreated`                                 |
| **ez-waveflow-manager**  | Subscribes to wallet events for notifications                    |
| **Analytics & BI**       | Consumes ledger transactions and balances for reporting           |

### 2.2 External Actors  
| Actor / Role             | Responsibility                                                      |
|--------------------------|---------------------------------------------------------------------|
| **Provider**             | Earns payouts; views balance                                       |
| **Consumer**             | Earns/redeems rewards; views balance                               |
| **Affiliate Partner**    | Earns commissions; views owed balance                              |
| **Finance/Admin**        | Reviews transactions, triggers manual adjustments or reversals     |

---

## 3. Domain Model

### 3.1 Entity Definitions

| Entity                 | PK               | FKs                                                                                 | Core Columns                                                                                                                                                         | Notes                                                     |
|------------------------|------------------|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **wallet_account**     | `account_id`     | `person_id` → vy-person-identity(personId)                                          | `type: ENUM{PROVIDER,CONSUMER,AFFILIATE,INTERNAL}`<br>`currency: CHAR(3)`<br>`balance_cents: BIGINT`<br>`created_at`, `updated_at`                                     | One account per person or internal entity                 |
| **ledger_transaction** | `transaction_id` | `account_id` → wallet_account(account_id)                                           | `amount_cents: BIGINT` (+: credit, -: debit)<br>`transaction_type: ENUM{PAYOUT,REWARD,COMMISSION,REFUND,ADJUSTMENT}`<br>`related_type: VARCHAR`<br>`related_id: UUID`<br>`status: ENUM{PENDING,COMPLETED,FAILED}`<br>`description: TEXT`<br>`created_at`, `updated_at` | Immutable ledger entries                                  |
| **provider_payout**    | `payout_id`      | `provider_id` → vy-person-identity(personId)<br>`account_id` → wallet_account(account_id) | `period_start: DATE`<br>`period_end: DATE`<br>`amount_cents: BIGINT`<br>`status: ENUM{SCHEDULED,PROCESSING,PAID,FAILED}`<br>`scheduled_at: TIMESTAMP`<br>`paid_at: TIMESTAMP?`<br>`created_at`, `updated_at`              | Batch payouts to providers                                |
| **consumer_reward**    | `reward_id`      | `consumer_id` → vy-person-identity(personId)<br>`account_id` → wallet_account(account_id) | `source_type: ENUM{ORDER,REFERRAL,PROMOTION}`<br>`source_id: UUID`<br>`amount_cents: BIGINT`<br>`status: ENUM{ISSUED,REDEEMED,EXPIRED}`<br>`issued_at: TIMESTAMP`<br>`redeemed_at: TIMESTAMP?`<br>`expired_at: TIMESTAMP?`<br>`created_at`, `updated_at` | Rewards ledger for consumers                             |
| **affiliate_commission**| `commission_id`  | `partner_id` → affiliate_partner(partner_id)<br>`account_id` → wallet_account(account_id)<br>`order_id` → vy-commerce(order_id) | `amount_cents: BIGINT`<br>`status: ENUM{PENDING,PAID,FAILED}`<br>`earned_at: TIMESTAMP`<br>`paid_at: TIMESTAMP?`<br>`created_at`, `updated_at`                                                              | Commission owed to affiliates                             |
| **internal_charge**    | `charge_id`      | `account_id` → wallet_account(account_id)                                           | `amount_cents: BIGINT`<br>`description: TEXT`<br>`charge_time: TIMESTAMP`<br>`created_at`, `updated_at`                                                               | Manual adjustments or platform fees                       |
| **ztracking_***        | *varies*         | Mirrors each mutable table’s PK                                                     | All columns + `ztrackingVersion: UUID` (PK) and `versionDate: TIMESTAMP`                                                                                              | Audit/version history                                      |

### 3.2 Relationships & Constraints

- **FK constraints** enforce valid `person_id`, `account_id`, `provider_id`, `consumer_id`, `partner_id`, `order_id`.  
- **Soft-delete** via `deleted_at TIMESTAMP` can be added if required.  
- **Indexes:**  
  - `(account_id, created_at)` on `ledger_transaction`  
  - `(provider_id, period_start)` on `provider_payout`  
  - `(consumer_id, status)` on `consumer_reward`  
  - `(partner_id, status)` on `affiliate_commission`  

### 3.3 Enums & Value Sets

#### AccountType  
`PROVIDER`, `CONSUMER`, `AFFILIATE`, `INTERNAL`

#### TransactionType  
`PAYOUT`, `REWARD`, `COMMISSION`, `REFUND`, `ADJUSTMENT`

#### PayoutStatus  
`SCHEDULED`, `PROCESSING`, `PAID`, `FAILED`

#### RewardStatus  
`ISSUED`, `REDEEMED`, `EXPIRED`

#### CommissionStatus  
`PENDING`, `PAID`, `FAILED`

---

## 4. Business Processes & Use Cases

### 4.1 Create Wallet Account  
1. **Trigger:** On user signup or role change  
2. **Action:** Insert `wallet_account` with `balance_cents=0`  
3. **Outcome:** 201 + `{ account_id }`

### 4.2 Record Ledger Transaction  
1. **Trigger:** Emitted events (`OrderPaid`, `RefundSucceeded`, etc.)  
2. **Action:**  
   - Create `ledger_transaction` (credit or debit)  
   - Update `wallet_account.balance_cents` atomically  
3. **Outcome:** 200 + `{ transaction_id }`

### 4.3 Schedule Provider Payout  
1. **Trigger:** Periodic job (e.g. nightly)  
2. **Action:**  
   - Aggregate `ledger_transaction` of type `PAYOUT` for each provider over period  
   - Create `provider_payout` with `status=SCHEDULED` and total amount  
3. **Outcome:** Payouts queued for processing

### 4.4 Process Payout  
1. **Trigger:** Admin/API call or payout job  
2. **Action:**  
   - Mark `provider_payout.status=PROCESSING`  
   - Invoke finance-payments to transfer funds  
   - On success, mark `status=PAID`, `paid_at=now`, record ledger entries  
3. **Outcome:** Provider receives funds; account balances updated

### 4.5 Issue Consumer Reward  
1. **Trigger:** On order or referral  
2. **Action:**  
   - Create `consumer_reward` with `status=ISSUED`, `amount_cents`  
   - Create corresponding `ledger_transaction`  
3. **Outcome:** Reward visible in user wallet

### 4.6 Redeem Consumer Reward  
1. **Trigger:** User applies reward at checkout  
2. **Action:**  
   - Mark `consumer_reward.status=REDEEMED`, `redeemed_at=now`  
   - Create `ledger_transaction` debit  
3. **Outcome:** Wallet balance updated

### 4.7 Allocate Affiliate Commission  
1. **Trigger:** On `affiliate_attribution` event  
2. **Action:**  
   - Create `affiliate_commission` with `status=PENDING`  
   - Create `ledger_transaction` credit hold  
3. **Outcome:** Commission reserved

---

## 5. API Specification

### 5.1 REST Endpoints

| Method | Path                                  | Request Body                                 | Response                         | Notes                                 |
|--------|---------------------------------------|----------------------------------------------|----------------------------------|---------------------------------------|
| POST   | `/accounts`                           | `{ personId, type, currency }`               | `{ accountId }`                  | Create wallet account                 |
| GET    | `/accounts/{accountId}`               | —                                            | `wallet_account`                 | Fetch account & balance               |
| GET    | `/accounts/{accountId}/transactions`  | `?limit&offset`                              | `[ledger_transaction]`           | List ledger entries                   |
| POST   | `/provider-payouts/schedule`          | `{ periodStart, periodEnd }`                 | `[payout_id]`                    | Trigger payout scheduling             |
| GET    | `/provider-payouts/{payoutId}`        | —                                            | `provider_payout`                | Fetch payout record                   |
| POST   | `/provider-payouts/{payoutId}/pay`    | —                                            | `{ status }`                     | Execute payout                        |
| POST   | `/consumer-rewards`                   | `{ consumerId, amountCents, sourceType, sourceId }` | `{ rewardId }`           | Issue reward                          |
| POST   | `/consumer-rewards/{rewardId}/redeem` | —                                            | `{ status }`                     | Redeem reward                         |
| GET    | `/affiliate-commissions`              | `?partnerId`                                 | `[affiliate_commission]`         | List commissions                      |
| POST   | `/internal-charges`                   | `{ accountId, amountCents, description }`    | `{ chargeId }`                   | Create manual adjustment              |

### 5.2 Event Interfaces

- **Emitted:**  
  - `WalletAccountCreated`, `TransactionRecorded`, `ProviderPayoutScheduled`, `ProviderPayoutPaid`, `ConsumerRewardIssued`, `ConsumerRewardRedeemed`, `AffiliateCommissionCreated`  
- **Consumed:**  
  - `OrderPaid`, `SubscriptionRenewed`, `RefundSucceeded`, `AffiliateCommissionCreated`

---

## 6. Data Persistence

### 6.1 Schema Snippets

```sql
CREATE TABLE wallet_account (
  account_id     UUID PRIMARY KEY,
  person_id      UUID NOT NULL,
  type           VARCHAR(20) NOT NULL,
  currency       CHAR(3) NOT NULL,
  balance_cents  BIGINT NOT NULL DEFAULT 0,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ledger_transaction (
  transaction_id   UUID PRIMARY KEY,
  account_id       UUID REFERENCES wallet_account(account_id),
  amount_cents     BIGINT NOT NULL,
  transaction_type VARCHAR(20) NOT NULL,
  related_type     VARCHAR(30),
  related_id       UUID,
  description      TEXT,
  status           VARCHAR(10) NOT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Additional tables for provider_payout, consumer_reward, affiliate_commission, internal_charge...
```

### 6.2 Retention & Archival
Ledger transactions: retain 7 years for financial audit

Accounts, payouts, rewards, commissions: retain 7 years; GDPR-compliant purge on request

### 7. Integration & Dependencies

7.1 Upstream
vy-commerce (OrderPaid, SubscriptionRenewed)

vy-finance-payments (PaymentSucceeded, RefundSucceeded)

vy-affiliate-service (AffiliateCommissionCreated)

7.2 Downstream
ez-waveflow-manager (notifications)

Analytics & BI (financial reporting, KPIs)

### 8. Non-Functional Requirements

Category	Requirement
Latency	p95 API < 200 ms
Throughput	≥ 1000 transactions/sec
Availability	99.9% uptime; auto-retry on transient DB failures
Security	OAuth2; PII & financial data encrypted at rest & in transit; PCI scope minimal
Scalability	Partition by account_id; horizontally autoscale
Observability	Structured logs (traceId), metrics per transaction type

### 9. Monitoring & Alerting
Metrics:

Transactions/sec by type

Account balance drift

Payout success vs. failure rates

Alerts:

Failed transaction rate > 1% → PagerDuty

Payout backlog > 1 hour → Slack channel

10. Testing Strategy
Unit tests: validations on amounts, status transitions

Contract tests: event payloads and downstream expectations

Integration tests: end-to-end flow with finance-payments & commerce-core

E2E smoke tests: simulate order → payment → ledger update → payout

### 11. Deployment & Configuration
CI/CD: Monorepo pipeline (lint → test → build → deploy)

Infra: Kubernetes Deployment & Service; Vault for secrets

Feature Flags: Toggle new transaction types or payout logic

### 12. Rollout & Back-out Plan
Canary to 10% of traffic

Monitor balances and transaction rates

Ramp to 100% if stable

Rollback: disable feature flag + revert image

Reprocessing: replay missed events from event store

### 13. Open Questions & Risks
Question / Risk	Owner	Mitigation
Race conditions on concurrent balance updates	Engineering	DB transactions + row-level locking
Large payout batch processing latency	Ops	Chunked processing; parallel workers
GDPR “right to be forgotten” for financial history	Legal	Anonymize or purge per policy
Dispute handling for consumer rewards or commissions	Support	Manual adjustment APIs; audit logs
Currency fluctuation for multi-currency accounts	Finance	FX service integration; currency conversion logs

