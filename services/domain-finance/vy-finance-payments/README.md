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
