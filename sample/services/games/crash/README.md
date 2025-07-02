# Crash Game Service

This service implements the Crash minigame as a standalone NestJS microservice.
It uses Kafka for communication and relies on `ez-logger` and `ez-utils` for
logging and Kafka message utilities.
It integrates with the Games WebSocket service via Kafka to manage round events and persists round data using TypeORM.
