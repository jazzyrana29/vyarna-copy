# Snakes Game Service

This service provides the backend for the Snakes game. Kafka is used for round creation and updates.

Kafka access is **required** for the game logic to work.

## Development

1. Install dependencies

```bash
npm install
```

2. Run the service in development mode

```bash
npm run start:dev
```

Configuration options are loaded from `.env`. See `.env-example` for required variables including the TiDB connection settings.
