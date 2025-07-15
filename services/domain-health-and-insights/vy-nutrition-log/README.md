# vy-nutrition-log

A NestJS Kafka microservice that persists nutrition data with TypeORM. It logs breastfeeding, bottle, solids and pumping events so other services receive a consistent nutritional history.

## Features

- Start, fetch and end nutrition sessions
- Log events for breast, bottle, solids and pumping
- Return computed session summaries
- Ztracking tables for historical auditing
- Validates milk giver and baby via `vy-person-identity`

## Kafka Topics

### Consumes

- `start-nutrition-session`
- `get-nutrition-session`
- `get-ztracking-nutrition-session`
- `log-nutrition-event`
- `end-nutrition-session`

### Produces

- `created-nutrition-session`
- `logged-nutrition-event`
- `ended-nutrition-session`

## Setup

1. Copy the example env file and adjust values:
   ```bash
   cp .env-example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run pending migrations after building:
   ```bash
   npm run migration:run
   ```
4. Start the service in development mode:
   ```bash
   npm run start:dev
   ```

### Build & Test

```bash
npm run build   # compile TypeScript
npm test        # run unit tests
```

## Environment Variables

Values are documented in `.env-example`:

| Variable | Description |
| --- | --- |
| `APP` | Application name used in logs |
| `CONTEXT` | Log context identifier |
| `APP_PORT` | Port the service listens on |
| `NODE_ENV` | Environment name |
| `KAFKA_BROKER` | Kafka broker URL |
| `KAFKA_GROUP` | Kafka consumer group |
| `LOG_STREAM_LEVEL` | Numeric log level |
| `SENTRY_DNS` | Optional Sentry DSN |
| `TIDB_HOST` | TiDB host |
| `TIDB_PORT` | TiDB port |
| `TIDB_USER` | Database user |
| `TIDB_PASSWORD` | Database password |
| `TIDB_DATABASE` | Database name |
| `TIDB_ENABLE_SSL` | Enable SSL connection (`true`/`false`) |
| `TIDB_CA_PATH` | Path to CA certificate when SSL is enabled |
| `AUTO_SEED` | Seed sample data on startup |

