# EZ Darts Game

This service provides the backend for the Darts game. It communicates exclusively via Kafka topics to handle starting a game, revealing dart throws, and cashing out results. The service is built with NestJS and uses `ez-utils` and `ez-logger` for common functionality. Game data is persisted using TypeORM and MySQL.

## Getting Started

1. Copy `.env-example` to `.env` and set `KAFKA_BROKER` and `KAFKA_GROUP`.
2. Install dependencies and run the service with `npm run start:dev`.
