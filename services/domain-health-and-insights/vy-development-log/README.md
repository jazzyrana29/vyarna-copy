# vy-development-log

NestJS microservice for logging growth measurements, developmental milestones, teething events and special moments. Data is stored in TiDB and messages flow through Kafka.

## Overview

This service captures various child development records and exposes them to other services via Kafka topics. It uses TypeORM with TiDB for persistence and follows the same conventions as other `vy` microservices.

## Environment Variables

The `.env-example` file documents all required variables:

| Variable | Description |
| --- | --- |
| `APP` | Service name |
| `CONTEXT` | Execution context identifier |
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

## Kafka Topics

Topics consumed/produced by this service include:

- `create-growth-measurement`
- `get-growth-measurements`
- `get-history-growth-measurement`
- `create-milestone`
- `get-milestones`
- `create-teething-event`
- `get-teething-events`
- `create-development-moment`
- `get-development-moments`

## Setup & Running

1. Copy the sample environment file and adjust values for your machine:

   ```bash
   cp .env-example .env
   ```

2. Install dependencies from the monorepo root or inside this folder:

   ```bash
   # from repo root
   node repo.js install vy-development-log

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

A `ztracking_*` table exists for each entity to maintain audit history.

