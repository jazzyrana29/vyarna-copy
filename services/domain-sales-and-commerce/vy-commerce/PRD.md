# PRD: vy-commerce

---

## 1. Service Overview

### 1.1 Name & Identifier  
- **Service Name:** vy-commerce  
- **Code / Slug:** `commerce`

### 1.2 Purpose & Scope  
**Purpose:**  
Unify storefront, cart, order, subscription, promotions, and affiliate/referral attribution into one cohesive commerce backend. Provides a single API surface for all purchase and subscription needs, delegating payments to finance-payments and ledgering to finance-wallet.

**In-Scope:**  
- Product catalog (products, variants, categories, images)  
- Shopping cart lifecycle (add/remove items, promotions, affiliates)  
- One-off orders (creation, payment orchestration, state transitions, shipping)  
- Recurring subscriptions (plans, enrollments, renewals)  
- Promotion codes & redemptions  
- Affiliate & referral attribution  
- Order addresses & shipping information  

**Out-of-Scope:**  
- Low-level payment gateway logic (vy-finance-payments)  
- Wallet ledger & payouts (vy-finance-wallet)  
- User identity/KYC (vy-person-identity)  
- Fulfillment logistics integrations (will consume commerce events)  

---

## 2. Stakeholders & Actors

### 2.1 Internal Actors  
| Actor / Service           | Interaction                                                                  |
|---------------------------|------------------------------------------------------------------------------|
| **vy-sales-store (UI)**   | Calls commerce APIs for catalog, cart, checkout, order status                |
| **vy-finance-payments**   | Handles PaymentIntents, captures, refunds via Stripe                         |
| **vy-finance-wallet**     | Ingests `OrderPaid` and `SubscriptionRenewed` events to update ledger        |
| **vy-affiliate-service**  | Provides attribution data; consulted at cart and order creation              |
| **ez-waveflow-manager**   | Subscribes to order & subscription events for notifications                  |
| **Analytics & BI**        | Consumes commerce events for forecasting and reporting                       |

### 2.2 External Actors  
| Actor                    | Role                                                                          |
|--------------------------|-------------------------------------------------------------------------------|
| **Customer (Provider/Consumer)** | Browses products, manages cart, places orders or subscriptions         |
| **Affiliate Partner**    | Drives traffic or outbound referrals and earns commissions                   |
| **Support/Admin**        | Views and manages orders, subscriptions, promotions, and customer inquiries  |

---

## 3. Domain Model

### 3.1 Entity Definitions

| Entity                     | PK                   | FKs                                                                                                         | Core Columns                                                                                                                                                        | Notes                                                          |
|----------------------------|----------------------|-------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| **product**                | `product_id`         |                                                                                                             | `name`, `description`, `active`, `created_at`, `updated_at`                                                                                                          | Master catalog item                                           |
| **product_variant**        | `variant_id`         | `product_id` → product(product_id)                                                                          | `sku`, `price_cents`, `currency`, `inventory_source`, `created_at`, `updated_at`                                                                                     | SKU-level details                                             |
| **category**               | `category_id`        |                                                                                                             | `name`, `slug`, `parent_id?`, `created_at`, `updated_at`                                                                                                            | Hierarchical taxonomy                                         |
| **product_category**       | `id`                 | `product_id`, `category_id`                                                                                 | `created_at`                                                                                                                                                         | M-N link                                                    |
| **product_image**          | `image_id`           | `product_id`                                                                                                 | `url`, `alt_text`, `sort_order`, `created_at`                                                                                                                      | Multiple images per product                                  |
| **cart**                   | `cart_id`            | `person_id` → vy-person-identity(personId)                                                                  | `status: {ACTIVE,CHECKED_OUT}`, `affiliate_code?`, `created_at`, `updated_at`                                                                                        | Temporary basket                                             |
| **cart_item**              | `item_id`            | `cart_id`, `variant_id`                                                                                     | `quantity`, `unit_price_cents`, `created_at`, `updated_at`                                                                                                          | Line-items                                                  |
| **promotion_code**         | `promo_id`           |                                                                                                             | `code`, `discount_type: {PERCENTAGE,AMOUNT}`, `value`, `valid_from`, `valid_to`, `max_redemptions`, `created_at`, `updated_at`                                         | Coupons & discounts                                         |
| **promotion_redemption**   | `redemption_id`      | `promo_id`, `cart_id`, `person_id`                                                                           | `redeemed_at`                                                                                                                                                        | Tracks redemptions                                          |
| **affiliate_click**        | `click_id`           | `partner_id` → affiliate_partner(partner_id), `person_id?`, `cart_id?`                                        | `url`, `referrer`, `clicked_at`                                                                                                                                     | Tracks click attribution                                    |
| **order**                  | `order_id`           | `person_id`                                                                                                  | `status: {PENDING_PAYMENT,PAID,AWAITING_PRODUCTION,READY_TO_SHIP,SHIPPED,DELIVERED,CANCELLED}`, `total_amount_cents`, `currency`, `payment_intent_id`, `created_at`, `updated_at` | Finalized purchase record                                   |
| **order_item**             | `order_item_id`      | `order_id`, `variant_id`                                                                                     | `quantity`, `unit_price_cents`, `created_at`, `updated_at`                                                                                                          | Immutable line-items                                        |
| **subscription_plan**      | `plan_id`            |                                                                                                             | `name`, `description`, `price_cents`, `currency`, `interval: {WEEKLY,MONTHLY,QUARTERLY,YEARLY}`, `interval_count`, `trial_period_days`, `created_at`, `updated_at`      | Recurring billing definitions                              |
| **subscription**           | `subscription_id`    | `person_id`, `plan_id`                                                                                        | `status: {PENDING,ACTIVE,PAUSED,CANCELLED}`, `start_date`, `next_billing_date`, `canceled_at?`, `created_at`, `updated_at`                                           | Customer subscriptions                                     |
| **subscription_item**      | `subscription_item_id` | `subscription_id`, `variant_id`                                                                             | `quantity`, `created_at`, `updated_at`                                                                                                                              | Items in subscription                                      |
| **subscription_event**     | `event_id`           | `subscription_id`                                                                                             | `event_type: {RENEWAL,PAYMENT_FAILED,CANCELLATION}`, `event_time`, `payload: JSON`, `created_at`, `updated_at`                                                      | Lifecycle audits                                           |
| **order_attribution**      | `attribution_id`     | `order_id`, `partner_id`                                                                                      | `referral_code?`, `affiliate_source: {INBOUND,OUTBOUND}`, `created_at`, `updated_at`                                                                                 | Which affiliate/referral drove the order                   |
| **order_address**          | `address_id`         | `order_id`                                                                                                    | `line1`, `line2?`, `city`, `state`, `postal_code`, `country`, `created_at`, `updated_at`                                                                            | Shipping snapshot                                          |
| **order_shipping**         | `shipping_id`        | `order_id`                                                                                                    | `provider`, `method`, `tracking_number?`, `status: {PENDING,SHIPPED,IN_TRANSIT,DELIVERED,RETURNED}`, `shipped_at?`, `delivered_at?`, `created_at`, `updated_at`           | Fulfillment details                                       |
| **ztracking_***            | *varies*             | Mirrors each mutable entity’s PK                                                                              | All columns + `ztrackingVersion: UUID` (PK) and `versionDate: TIMESTAMP`                                                                                            | Audit/version history                                      |

### 3.2 Relationships & Indexing
- **Catalog:**  
  - `product → product_variant → order_item & subscription_item`  
  - `product ↔ product_category ↔ category`  
- **Cart & Promotions:**  
  - `cart → cart_item`, `cart → promotion_redemption`  
  - `affiliate_click` links to `cart` for inbound/outbound attribution  
- **Orders & Subscriptions:**  
  - `order → order_item, order_address, order_shipping, order_attribution`  
  - `subscription_plan → subscription → subscription_item → subscription_event`  
- **Indexes:**  
  - `(person_id, status)` on `cart` & `order`  
  - Unique `(cart_id, variant_id)` on `cart_item`  
  - `(order_id)` on child tables  
  - `(subscription_id, event_time)` on `subscription_event`

### 3.3 Enums & Value Sets
- **CartStatus:** `ACTIVE`, `CHECKED_OUT`  
- **OrderStatus:** `PENDING_PAYMENT`, `PAID`, `AWAITING_PRODUCTION`, `READY_TO_SHIP`, `SHIPPED`, `DELIVERED`, `CANCELLED`  
- **PromoType:** `PERCENTAGE`, `AMOUNT`  
- **AffiliateSource:** `INBOUND`, `OUTBOUND`  
- **SubscriptionStatus:** `PENDING`, `ACTIVE`, `PAUSED`, `CANCELLED`  
- **SubscriptionInterval:** `WEEKLY`, `MONTHLY`, `QUARTERLY`, `YEARLY`  
- **SubscriptionEventType:** `RENEWAL`, `PAYMENT_FAILED`, `CANCELLATION`  
- **ShippingStatus:** `PENDING`, `SHIPPED`, `IN_TRANSIT`, `DELIVERED`, `RETURNED`  

---

## 4. Business Processes & Use Cases

1. **Browse Catalog**  
   - `GET /products`, `GET /categories` → product listings & filters  
2. **Manage Cart**  
   - `POST /carts` → create or fetch existing active cart  
   - `POST /carts/{cartId}/items` → add/update item  
   - `DELETE /carts/{cartId}/items/{itemId}` → remove item  
   - `POST /carts/{cartId}/promotions` → apply promo code  
3. **Checkout & Place Order**  
   - `POST /orders` with cart details → create order, reserve inventory, call finance-payments to create PaymentIntent  
   - Await `PaymentSucceeded` webhook → mark order PAID, emit `OrderPaid`  
4. **Manage Subscriptions**  
   - `POST /subscriptions` → enroll in plan (creates subscription + first order)  
   - Scheduled jobs or webhooks → trigger renewals via `POST /orders`  
5. **Handle Affiliate & Referral**  
   - On cart creation, record `affiliate_click`  
   - On order creation, create `order_attribution`  
6. **Fulfill & Ship**  
   - `PUT /orders/{orderId}/shipping` → update `order_shipping` status  
   - Emit `OrderShipped` / `OrderDelivered`  

---

## 5. API Specification

### 5.1 REST Endpoints

| Method | Path                                     | Body                                        | Response            | Notes                                               |
|--------|------------------------------------------|---------------------------------------------|---------------------|-----------------------------------------------------|
| GET    | `/products`                              | —                                           | `[Product]`         | Filter by category, active                          |
| GET    | `/products/{productId}/variants`         | —                                           | `[Variant]`         |                                                     |
| GET    | `/categories`                            | —                                           | `[Category]`        |                                                     |
| POST   | `/carts`                                 | `{ personId }`                              | `{ cartId }`        | Creates or returns existing Active cart             |
| POST   | `/carts/{cartId}/items`                  | `{ variantId, quantity }`                   | `{ itemId }`        |                                                     |
| DELETE | `/carts/{cartId}/items/{itemId}`         | —                                           | 204                 |                                                     |
| POST   | `/carts/{cartId}/promotions`             | `{ code }`                                  | `{ valid: true/false }` |                                                 |
| POST   | `/orders`                                | `{ cartId, personId, shippingAddress }`     | `{ orderId }`       | Initiates payment via finance-payments              |
| GET    | `/orders/{orderId}`                      | —                                           | `Order + items + shipping + attribution` |            |
| PUT    | `/orders/{orderId}/shipping`             | `{ provider, method, trackingNumber }`      | 200                 | Updates shipping status                            |
| POST   | `/subscriptions`                         | `{ personId, planId, items[] }`             | `{ subscriptionId }`| Creates subscription and initial order              |
| GET    | `/subscriptions/{subscriptionId}`         | —                                           | `Subscription + items + events` |                                        |
| POST   | `/subscriptions/{subscriptionId}/cancel`  | —                                           | 200                 | Cancels future renewals                             |

### 5.2 Event Interfaces

- **Emitted:**  
  - `CartCreated`, `CartUpdated`, `PromotionApplied`, `OrderCreated`, `PaymentRequested`, `OrderPaid`, `OrderCancelled`, `OrderShipped`, `SubscriptionCreated`, `SubscriptionRenewed`, `SubscriptionCancelled`  
- **Consumed:**  
  - `PaymentSucceeded`, `PaymentFailed` (from finance-payments)

---

## 6. Data Persistence

### 6.1 Schema Snippets

```sql
CREATE TABLE order (
  order_id             UUID PRIMARY KEY,
  person_id            UUID NOT NULL,
  status               VARCHAR(20) NOT NULL,
  total_amount_cents   INT NOT NULL,
  currency             VARCHAR(3) NOT NULL,
  payment_intent_id    VARCHAR(100),
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
  cart_id    UUID PRIMARY KEY,
  person_id  UUID NOT NULL,
  status     VARCHAR(12) NOT NULL,
  affiliate_code VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- other tables follow definitions above...
```

### 6.2 Retention & Archival
Carts: expire & archive after 30 days of inactivity

Orders/Subscriptions: retain indefinitely; GDPR deleted_at support

Promotions & Affiliates: retain usage history for 2 years

### 7. Integration & Dependencies

#### 7.1 Upstream
vy-person-identity (authentication, profile, addresses)

vy-affiliate-service (attribution data)

#### 7.2 Downstream
vy-finance-payments (Stripe orchestration)

vy-finance-wallet (ledger entries on OrderPaid, SubscriptionRenewed)

ez-waveflow-manager (notifications, reminders)

Analytics & BI (forecasting, cohort analysis)

### 8. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Latency  | p95 API < 200 ms |
| Throughput | ≥ 200 requests/sec |
| Availability | 99.9% uptime; graceful degradation if finance-payments is offline |
| Security | OAuth2; PII encrypted at rest & in transit; PCI-DSS compliance for card data |
| Scalability | Partition by person_id and order_id; autoscale on traffic spikes |
| Observability | Structured logs (traceId), metrics per endpoint/event type |

### 9. Monitoring & Alerting
Metrics:

REST QPS & latency

Cart conversion rate

Orders/sec and Subscription renewals/sec

Payment failure rate

Alerts:

5xx rate > 2% → PagerDuty

Payment failure spike > 1% → Slack

Inventory reservation failures → Ops email

### 10. Testing Strategy
Unit tests: domain validation, pricing logic, cart rules

Contract tests: REST schemas, event payloads

Integration tests: finance-payments & finance-wallet in test containers

E2E smoke tests: complete checkout & subscription flows

### 11. Deployment & Configuration
CI/CD: Monorepo pipeline (lint → test → build → deploy)

Infra: Kubernetes Deployment & Service; Helm chart; Vault-managed secrets

Feature Flags: Toggle promotions, affiliate types, subscription trials

### 12. Rollout & Back-out Plan
Canary release to 10% of traffic

Monitor key metrics, then Gradual ramp to 100%

Rollback: disable feature flags + revert to previous image

Data Reprocessing: replay event stream if corrections needed

### 13. Open Questions & Risks
Question / Risk	Owner	Mitigation
Promo-code abuse or quotas exceeded	Product/Ops	Rate-limit redemptions; monitor redemption ratios
Inconsistent inventory across variants	Merchandising	Real-time inventory sync; fallback allocations
Race conditions on concurrent cart checkouts	Engineering	Idempotent order creation; DB constraints
PCI-DSS scope creep	Security	Keep card data in finance-payments only
GDPR “right to be forgotten” for historic orders/subscriptions	Legal	deleted_at + secure purge pipeline

