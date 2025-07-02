# Plinko Game Service

This service implements the Plinko game logic and communicates via Kafka. It persists game state using TypeORM and MySQL, relying on `ez-utils` with `ez-logger` for Kafka messaging and logging.

## Getting Started

1. Copy the `.env-example` file and update environment variables.

```bash
cp .env-example .env
```

2. Install dependencies and run in development mode.

```bash
npm install
npm run start:dev
```

The service listens for Kafka topics defined in `ez-utils` and responds on `<topic>-response` channels. It also integrates with the Games WebSocket gateway for real-time updates.
