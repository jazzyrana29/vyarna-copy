# vy-finance-payments

Microservice handling payment intents and related operations. Generated from PRD
specifications. All HTTP traffic is routed through `vy-gateway` which forwards
messages to this service over Kafka.

The codebase is organized into two NestJS modules:

- **PaymentIntentModule** – handles payment intents, refunds and Stripe webhook processing.
- **PaymentMethodModule** – manages vaulted payment methods.

## Local Development Setup

### Install Dependencies

```bash
npm install
```

### Environment Variables

Copy `.env-example` to `.env` and provide values for the following variables:

| Variable | Description |
| --- | --- |
| `APP` | Service name |
| `CONTEXT` | Log context |
| `APP_PORT` | Port to run the service |
| `NODE_ENV` | Environment name (e.g. `development`) |
| `KAFKA_BROKER` | Address of the Kafka broker |
| `KAFKA_GROUP` | Kafka consumer group for this service |
| `LOG_STREAM_LEVEL` | Logging verbosity |
| `SENTRY_DNS` | Optional Sentry DSN for error tracking |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Secret for validating Stripe webhooks |
| `STRIPE_ATTACH_PAYMENT_METHOD` | Attach new methods to customers when `stripeCustomerId` is provided (`true`/`false`) |
| `TIDB_HOST` | TiDB/MySQL host |
| `TIDB_PORT` | TiDB port |
| `TIDB_USER` | Database username |
| `TIDB_PASSWORD` | Database password |
| `TIDB_DATABASE` | Database name |
| `TIDB_ENABLE_SSL` | Enable SSL connection to the DB (`true`/`false`) |
| `TIDB_CA_PATH` | Path to CA certificate when SSL is enabled |

When `STRIPE_ATTACH_PAYMENT_METHOD` is `true`, include a `stripeCustomerId` in
the payload for `POST /payment-methods` to automatically attach the stored
payment method to that Stripe customer.

### Build & Test

```bash
npm run build   # compile TypeScript
npm test        # run unit tests
```

### Start the Service

Run the service in development mode after the environment is configured:

```bash
npm run start:dev
```

## REST API

The gateway exposes these endpoints which forward requests to the payments
service:

| Method | Path | Description |
| ------ | ---- | ----------- |
| `POST` | `/payment-intents` | Create a new payment intent. |
| `GET` | `/payment-intents/{id}` | Retrieve an intent by id. |
| `POST` | `/payment-intents/{id}/capture` | Confirm then capture an intent. |
| `POST` | `/refunds` | Issue a refund for a payment intent. |
| `GET` | `/refunds/{id}` | Get a refund record. |
| `POST` | `/payment-methods` | Vault a payment method. |
| `GET` | `/payment-methods` | List vaulted methods for a customer. |
| `DELETE` | `/payment-methods/{id}` | Remove a vaulted method. |

The `/payment-intents/{id}/capture` endpoint will automatically confirm the intent with Stripe before capturing the funds.

## Kafka Event Flow

Each HTTP/WebSocket request is translated to a Kafka message. The gateway sends
the payload on a topic and waits for the corresponding `*-response` event. The
main topics are:

- `create-payment-intent`
- `get-payment-intent`
- `get-ztracking-payment-intent`
- `confirm-payment-intent`
- `capture-payment-intent`
- `create-refund`
- `get-refund`
- `process-stripe-webhook`
- `create-payment-method`
- `list-payment-methods`
- `delete-payment-method`
- `get-payment-intent-status`
- `payment-status-update`
- `retry-payment-attempt`

The payments service consumes these topics, executes the business logic (Stripe
operations, persistence, etc.) and publishes the result back on the response
topic using the same key.
