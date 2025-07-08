# Vyara Person Identity Service

NestJS microservice handling creation and management of `Person` records.  It
communicates over Kafka and persists data in TiDB via TypeORM.

---

## Environment Variables

Copy `.env-example` to `.env` and provide the following values:

| Variable           | Description                               |
| ------------------ | ----------------------------------------- |
| `APP_PORT`         | Port the service listens on (default 5006) |
| `NODE_ENV`         | Node environment (`development`, `prod`)  |
| `KAFKA_BROKER`     | Kafka broker connection string            |
| `KAFKA_GROUP`      | Kafka consumer group ID                   |
| `LOG_STREAM_LEVEL` | Numeric log level for `ez-logger`         |
| `SENTRY_DNS`       | Sentry DSN for error reporting            |
| `TIDB_HOST`        | TiDB host                                 |
| `TIDB_PORT`        | TiDB port                                 |
| `TIDB_USER`        | TiDB user                                 |
| `TIDB_PASSWORD`    | TiDB password                             |
| `TIDB_DATABASE`    | Database name                             |
| `TIDB_ENABLE_SSL`  | `true` to enable TLS                      |
| `TIDB_CA_PATH`     | Path to CA certificate                    |
| `AUTO_SEED`        | Seed demo data on startup (`true/false`)  |

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

## REST Endpoints

The Gateway exposes the following POST endpoints:

- `POST /vy-person-identity/create-person-entity`
- `POST /vy-person-identity/update-person-entity`
- `POST /vy-person-identity/get-person-entity`
- `POST /vy-person-identity/get-history-person-entity`
- `POST /vy-person-identity/get-many-persons`

Example payload for creating a person:

```json
{
  "businessUnitId": "uuid",
  "username": "jdoe",
  "nameFirst": "John",
  "nameLast": "Doe",
  "email": "john@example.com",
  "password": "secret",
  "roles": ["Provider"],
  "updatedBy": "uuid"
}
```

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
    "businessUnitId": "uuid",
    "username": "jdoe",
    "nameFirst": "John",
    "nameLast": "Doe",
    "email": "john@example.com",
    "password": "secret",
    "roles": ["Provider"],
    "updatedBy": "uuid"
  }
}
```

The service listens on the port specified by `APP_PORT`.
