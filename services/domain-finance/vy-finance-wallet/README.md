# vy-finance-wallet

Kafka-based microservice that manages wallet accounts and ledger transactions.
It handles provider payouts, consumer rewards, affiliate commissions and
internal charges. All HTTP traffic goes through `vy-gateway` which forwards
requests as Kafka messages to this service.

---

## Setup

1. Copy the sample environment file and adjust values for your machine:

   ```bash
   cp .env-example .env
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run pending database migrations after building:

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
| `APP` | Application name used in logs |
| `CONTEXT` | Context identifier for log streams |
| `APP_PORT` | Port the microservice listens on |
| `NODE_ENV` | Environment name (`development`, `production`, etc.) |
| `KAFKA_BROKER` | Kafka broker connection string |
| `KAFKA_GROUP` | Kafka consumer group id |
| `LOG_STREAM_LEVEL` | Numeric log level for `ez-logger` |
| `SENTRY_DNS` | Optional Sentry DSN |
| `TIDB_HOST` | TiDB host |
| `TIDB_PORT` | TiDB port |
| `TIDB_USER` | Database user |
| `TIDB_PASSWORD` | Database password |
| `TIDB_DATABASE` | Database name |
| `TIDB_ENABLE_SSL` | `true` to enable TLS connection |
| `TIDB_CA_PATH` | Path to CA certificate when TLS is enabled |
| `AUTO_SEED` | Seed sample data on startup |

## Kafka Topics

### Requests Consumed

- `create-wallet-account`
- `get-wallet-account`
- `get-ztracking-wallet-account`
- `record-transaction`
- `schedule-provider-payout`
- `pay-provider-payout`
- `issue-consumer-reward`
- `redeem-consumer-reward`
- `create-affiliate-commission`
- `create-internal-charge`
- `paid-order`
- `renewed-subscription`
- `refund-succeeded-wallet`
- `created-affiliate-commission`

### Events Produced

- `created-wallet-account`
- `recorded-transaction`
- `scheduled-provider-payout`
- `paid-provider-payout`
- `issued-consumer-reward`
- `redeemed-consumer-reward`
- `created-affiliate-commission`
- `created-internal-charge`

