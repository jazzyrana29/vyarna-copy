# vy-finance-payments

Microservice handling payment intents and related operations. Generated from PRD
specifications. All HTTP traffic is routed through `vy-gateway` which forwards
messages to this service over Kafka.

## Local Development Setup

### Install Dependencies

```bash
npm install
```

### Environment Variables

Copy `.env-example` to `.env` and provide values for the following variables:

| Variable | Description |
| --- | --- |
| `APP_PORT` | Port to run the service |
| `NODE_ENV` | Environment name (e.g. `development`) |
| `KAFKA_BROKER` | Address of the Kafka broker |
| `KAFKA_GROUP` | Kafka consumer group for this service |
| `LOG_STREAM_LEVEL` | Logging verbosity |
| `SENTRY_DNS` | Optional Sentry DSN for error tracking |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Secret for validating Stripe webhooks |
| `TIDB_HOST` | TiDB/MySQL host |
| `TIDB_PORT` | TiDB port |
| `TIDB_USER` | Database username |
| `TIDB_PASSWORD` | Database password |
| `TIDB_DATABASE` | Database name |
| `TIDB_ENABLE_SSL` | Enable SSL connection to the DB (`true`/`false`) |
| `TIDB_CA_PATH` | Path to CA certificate when SSL is enabled |
| `AUTO_SEED` | Seed sample data on startup |

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

### Example API Call

When the gateway is running on `http://localhost:4040` you can create a payment
intent through the gateway which forwards the request to this service via Kafka:

```bash
curl -X POST http://localhost:4040/vy-finance-payments/payment-intents \
  -H 'Content-Type: application/json' \
  -d '{"amount": 1000, "currency": "usd"}'
```

### Gateway Interaction

`vy-finance-payments` listens only to Kafka topics. The `vy-gateway` exposes
POST endpoints under `src/modules/domain-finance/vy-finance-payments/` and
forwards each call as a Kafka message. All operations — including reads and
deletes — are invoked via HTTP `POST`. The gateway returns the service’s
response back to the client.
