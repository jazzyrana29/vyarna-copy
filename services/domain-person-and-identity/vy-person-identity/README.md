# Vyara Person Identity Service

NestJS microservice handling creation and management of `Person`, `Email` and
identity verification records. It communicates exclusively over Kafka and
persists data in TiDB via TypeORM. Optionally it integrates with ActiveCampaign
and Stripe when creating new persons.

---

## Environment Variables

Copy `.env-example` to `.env` and provide the following values:

| Variable           | Description                               |
| ------------------ | ----------------------------------------- |
| `APP_PORT`                | Port the service listens on (default 5006) |
| `NODE_ENV`                | Node environment (`development`, `prod`)  |
| `KAFKA_BROKER`            | Kafka broker connection string            |
| `KAFKA_GROUP`             | Kafka consumer group ID                   |
| `LOG_STREAM_LEVEL`        | Numeric log level for `ez-logger`         |
| `CONTEXT`                 | Logger context identifier                  |
| `SENTRY_DNS`              | Sentry DSN for error reporting            |
| `TIDB_HOST`               | TiDB host                                 |
| `TIDB_PORT`               | TiDB port                                 |
| `TIDB_USER`               | TiDB user                                 |
| `TIDB_PASSWORD`           | TiDB password                             |
| `TIDB_DATABASE`           | Database name                             |
| `TIDB_ENABLE_SSL`         | `true` to enable TLS                      |
| `TIDB_CA_PATH`            | Path to CA certificate                    |
| `ACTIVE_CAMPAIGN_NAME`    | ActiveCampaign account name               |
| `ACTIVE_CAMPAIGN_API_KEY` | ActiveCampaign API token                  |
| `STRIPE_SECRET_KEY`       | Stripe API key                            |

---

## Running the Service

```bash
# install dependencies
npm install

# create .env from template and edit values
cp .env-example .env

# start the microservice
npm run start:dev
```

---

## Triggering Operations

This service does not expose HTTP endpoints directly. The `vy-gateway` service
provides REST APIs which publish Kafka messages consumed here. Typical gateway
routes include:

- `POST /vy-person-identity/create-person-entity`
- `POST /vy-person-identity/update-person-entity`
- `POST /vy-person-identity/get-person-entity`
- `POST /vy-person-identity/get-history-person-entity`
- `POST /vy-person-identity/get-many-persons`

Example payload sent via Kafka when creating a person:

```json
{
  "rootBusinessUnitId": "uuid",
  "username": "jdoe",
  "nameFirst": "John",
  "nameLastFirst": "Doe",
  "nameLastSecond": null,
  "email": "john@example.com",
  "password": "secret",
  "roles": ["Provider"],
  "updatedBy": "uuid"
}
```

**Roles are multi-valued.** A person can hold several roles at once, for
example `["Provider", "Consumer", "Admin"]`. If the payload omits the
`roles` field, the service will automatically assign the default role
`"Consumer"`.

---

## Kafka Topics

Messages are consumed and produced on these topics:

### Person

- `create-person-entity`
- `update-person-entity`
- `get-person-entity`
- `get-many-persons`
- `get-history-person-entity`

### Email

- `create-email`
- `update-email`
- `get-email`
- `get-ztracking-email`

### Verification

- `start-identity-verification`
- `review-identity-verification`

Example Kafka message for `create-person-entity`:

```json
{
  "key": "trace-id",
  "value": {
    "rootBusinessUnitId": "uuid",
    "username": "jdoe",
    "nameFirst": "John",
    "nameLastFirst": "Doe",
    "nameLastSecond": null,
    "email": "john@example.com",
    "password": "secret",
    "roles": ["Provider"],
    "updatedBy": "uuid"
  }
}
```

The service listens on the port specified by `APP_PORT`.
