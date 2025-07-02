# Dice Game Service

This microservice runs the Dice game logic. It communicates with other services via Kafka and uses TypeORM for persistence.

## Getting Started

1. Copy `.env-example` to `.env` and configure `KAFKA_BROKER` and `KAFKA_GROUP`.
2. Install dependencies and start the service in development mode:

```bash
npm install
npm run start:dev
```
