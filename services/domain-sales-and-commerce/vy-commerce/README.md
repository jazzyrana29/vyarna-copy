# vy-commerce

Commerce microservice handling catalog and orders. Generated from PRD specifications.

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env-example` to `.env` and update the values for your environment:

```bash
cp .env-example .env
```

Sample variables from `.env-example`:

```bash
APP_PORT=4044
NODE_ENV=development
KAFKA_BROKER=localhost:9092
KAFKA_GROUP=vy-commerce
LOG_STREAM_LEVEL=101
SENTRY_DNS=
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

Run the service in development mode once your `.env` file is configured:

```bash
npm run start:dev
```

### 4. Running Migrations

Generate a new migration after building the project:

```bash
npm run migration:init
```

Run pending migrations:

```bash
npm run migration:run
```

## Usage Examples

The service currently communicates via Kafka topics. For example, sending a `KT_CREATE_ORDER` message will create a new order.

REST endpoints will be documented here once they are implemented and exposed through the gateway.
