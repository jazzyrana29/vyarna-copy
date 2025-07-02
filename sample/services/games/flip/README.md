# Flip Game Service

A minimal NestJS service providing the backend API for the Flip game.
It stores game sessions using MySQL via TypeORM and communicates through Kafka.

## Getting Started

1. Copy `.env-example` to `.env` and configure the variables, especially
   `KAFKA_BROKER` and `KAFKA_GROUP`.
2. Install dependencies and run the service:

```bash
npm install
npm run start:dev
```
