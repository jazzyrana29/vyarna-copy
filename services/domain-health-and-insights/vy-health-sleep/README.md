# vy-health-sleep

Microservice for tracking infant sleep sessions. Generated from PRD specifications.

## Setup

1. Copy the sample environment file and adjust values for your machine:

   ```bash
   cp .env-example .env
   ```

2. Install dependencies from the monorepo root or inside this folder:

   ```bash
   # from repo root
   node repo.js install vy-health-sleep

   # or directly
   npm install
   ```

3. Run database migrations after building:

   ```bash
   npm run migration:run
   ```

4. Start the service in development mode:

   ```bash
   npm run start:dev
   ```

## Environment Variables

The `.env-example` file documents required variables:

| Variable | Description |
| --- | --- |
| `APP_PORT` | Port for the NestJS application |
| `NODE_ENV` | Environment name (`development`, `production`, etc.) |
| `KAFKA_BROKER` | Kafka broker connection string |
| `KAFKA_GROUP` | Kafka consumer group id |
| `LOG_STREAM_LEVEL` | Log verbosity for `ez-logger` |
| `SENTRY_DNS` | Optional Sentry DSN |
| `TIDB_HOST` | TiDB host |
| `TIDB_PORT` | TiDB port |
| `TIDB_USER` | Database user |
| `TIDB_PASSWORD` | Database password |
| `TIDB_DATABASE` | Database name |
| `TIDB_ENABLE_SSL` | `true` to enable SSL connection |
| `TIDB_CA_PATH` | Path to CA certificate when SSL is enabled |
| `AUTO_SEED` | Seed initial data on start |

## Kafka Topics

The service consumes and produces the following topics via Kafka:

- `create-sleep-session`
- `get-sleep-sessions`
- `get-ztracking-sleep-session`
- `start-sleep-session`
- `log-sleep-event`
- `interrupt-sleep`
- `record-sleep-environment`
- `rate-sleep`
- `end-sleep-session`

## Gateway Integration

REST endpoints are exposed by the `vy-gateway` service in
`services/domain-infrastructure/vy-gateway`. The `HealthSleepModule` within that
service maps HTTP requests to Kafka events using `HealthSleepKafkaService`. The
gateway waits for a Kafka response and returns the result to the caller. This
microservice listens for those topics and responds using
`SleepSessionKafkaService`.

### Example Requests

```
# Create a session
curl -X POST http://localhost:4040/sleep/sessions \
  -H 'Content-Type: application/json' \
  -d '{"babyId":"<babyId>","start":"2024-01-01T02:00:00Z","end":"2024-01-01T04:00:00Z"}'

# Fetch sessions for a baby
curl http://localhost:4040/sleep/sessions?babyId=<babyId>

# Get ztracking data for a session
curl http://localhost:4040/sleep/sessions/<sessionId>

# Log a sleep event
curl -X POST http://localhost:4040/sleep/sessions/<sessionId>/events \
  -H 'Content-Type: application/json' \
  -d '{"eventId":"<eventId>","eventType":"WAKE","eventTime":"2024-01-01T03:00:00Z"}'
```

All HTTP traffic goes through the gateway; this service only communicates via
Kafka.

