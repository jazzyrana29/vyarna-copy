# vy-commerce

NestJS based microservice that implements Vyarna's commerce domain.  It handles
product lookups via Stripe, shopping cart management, order lifecycle and
promotion code validation.  All interactions are performed through Kafka topics
defined in [`ez-utils`](../../../libs/ez-utils).

Data is persisted in a TiDB/MySQL database using TypeORM.  On startup the
service ensures the configured database exists and then connects to handle
Kafka messages.

## Local Development

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

Key variables:

- `KAFKA_BROKER` – address of the Kafka cluster
- `KAFKA_GROUP` – consumer group used by this service
- `TIDB_*` – connection settings for the TiDB/MySQL database
- `STRIPE_SECRET_KEY` – API key used for catalog and promotion lookups

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

## Kafka Topics

Messages are exchanged over Kafka.  The most relevant topics are:

- `KT_CREATE_CART`, `KT_ADD_CART_ITEM`, `KT_REMOVE_CART_ITEM`,
  `KT_APPLY_CART_PROMOTION`, `KT_GET_CART`
- `KT_CREATE_ORDER`, `KT_GET_ORDERS`, `KT_GET_ZTRACKING_ORDER`
- `KT_VALIDATE_PROMOTION_CODE`
- `PaymentSucceeded`, `PaymentFailed` events from finance-payments

Send a message conforming to the DTOs in `ez-utils` on the appropriate topic to
invoke each operation.  REST endpoints will be added in the future and exposed
via the API gateway.
