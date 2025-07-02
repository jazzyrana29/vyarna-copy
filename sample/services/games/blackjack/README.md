# Blackjack Service

This microservice processes Blackjack game actions via Kafka. It stores game state in memory and uses `ez-utils` with `ez-logger` for logging. The WebSocket gateway for game events resides in the separate `games-websocket` service.

## Getting Started

1. Copy `.env-example` to `.env` and configure Kafka connection variables.
2. Install dependencies and start the service:

```bash
npm install
npm run start:dev
```
