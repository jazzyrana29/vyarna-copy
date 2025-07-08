# vy-finance-payments

Microservice handling payment intents and related operations. Generated from PRD specifications.

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env-example` to `.env` and fill in the required values:

```bash
# Application settings
APP_PORT=5004
NODE_ENV=development
KAFKA_BROKER=localhost:9092
KAFKA_GROUP=vy-finance-payments
LOG_STREAM_LEVEL=101
SENTRY_DNS=

# Stripe credentials
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# TiDB / MySQL connection
TIDB_HOST=
TIDB_PORT=
TIDB_USER=
TIDB_PASSWORD=
TIDB_DATABASE=
TIDB_ENABLE_SSL=true
TIDB_CA_PATH=/pathTo/isrgrootx1.pem
AUTO_SEED=true
```

### 3. Start the Service

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
| `POST` | `/refunds` | Issue a refund for a payment intent. |
| `GET` | `/refunds/{id}` | Get a refund record. |
| `POST` | `/payment-methods` | Vault a payment method. |
| `GET` | `/payment-methods` | List vaulted methods for a customer. |
| `DELETE` | `/payment-methods/{id}` | Remove a vaulted method. |

## Kafka Event Flow

Each HTTP/WebSocket request is translated to a Kafka message. The gateway sends
the payload on a topic and waits for the corresponding `*-response` event. The
main topics are:

- `create-payment-intent`
- `get-payment-intent`
- `get-ztracking-payment-intent`
- `create-refund`
- `get-refund`
- `process-stripe-webhook`
- `create-payment-method`
- `list-payment-methods`
- `delete-payment-method`

The payments service consumes these topics, executes the business logic (Stripe
operations, persistence, etc.) and publishes the result back on the response
topic using the same key.
