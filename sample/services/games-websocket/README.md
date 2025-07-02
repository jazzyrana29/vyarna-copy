# Games WebSocket

This service exposes WebSocket endpoints for real-time minigames. It communicates
with the various game microservices through Kafka and relays game events to
connected clients.

## Getting Started

1. Copy the example environment file and adjust values as needed:

   ```bash
   cp .env-example .env
   ```

2. Install dependencies and start the service in development mode:

   ```bash
   npm install
   npm run start:dev
   ```

The following environment variables are commonly required:

- `KAFKA_BROKER` – Kafka broker address (e.g. `localhost:9092`)
- `KAFKA_GROUP` – consumer group id (defaults to `games-websocket`)
- `APP_PORT` – port for the HTTP/WebSocket server

Kafka connectivity is **mandatory**. The service will not function unless
`KAFKA_BROKER` points to a reachable broker.

The service listens to Kafka topics defined in `ez-utils` and forwards relevant
responses to connected WebSocket clients.

### WebSocket Libraries

Most gateways use **socket.io** for client communication. The remaining
gateways have been updated to use the same library for consistency.
