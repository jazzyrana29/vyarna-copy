# vy-gateway

The gateway exposes REST and WebSocket APIs for the platform. Incoming
HTTP requests are converted into Kafka messages and dispatched to the
appropriate microservice such as `vy-finance-payments`.

## Environment Variables

Copy `.env-example` to `.env` and adjust the values as needed:

| Variable | Description |
| --- | --- |
| `APP` | Name used in logs |
| `APP_PORT` | Port for HTTP/WebSocket server |
| `KAFKA_BROKER` | Connection string for Kafka |
| `KAFKA_GROUP` | Kafka consumer group id |
| `LOG_STREAM_LEVEL` | Logging verbosity |
| `CONTEXT` | Prefix for structured logs |
| `REST_TIMEOUT` | Timeout for outbound HTTP calls in ms |
| `ALLOWED_ORIGINS` | JSON array of allowed CORS origins |
| `NODE_ENV` | Environment mode (`local`, `production`, etc.) |
| `SWAGGER_URL` | URL where Swagger docs are served |
| `REDIS_PORT` | Redis port for caching |
| `REDIS_HOST` | Redis host |
| `ACTIVE_CAMPAIGN_NAME` | ActiveCampaign account name |
| `ACTIVE_CAMPAIGN_API_KEY` | API key for ActiveCampaign |

## Build & Test

```bash
npm run build      # compile TypeScript
npm run test       # unit tests
npm run test:e2e   # end-to-end tests
```

## REST API

All endpoints use the HTTP `POST` method and are forwarded to the appropriate
Kafka topic:

| Method | Path | Description |
| ------ | ---- | ----------- |
| `POST` | `/payment-intents` | Create a new payment intent. |
| `POST` | `/payment-intents/get` | Retrieve a payment intent by id. |
| `POST` | `/payment-intents/ztracking` | Get ztracking information for an intent. |
| `POST` | `/payment-intents/confirm` | Confirm an existing payment intent. |
| `POST` | `/refunds` | Issue a refund for a payment intent. |
| `POST` | `/payment-refunds/get` | Get a refund record. |
| `POST` | `/payment-methods` | Vault a payment method. |
| `POST` | `/payment-methods/get` | List vaulted methods for a customer. |
| `POST` | `/payment-methods/delete` | Remove a vaulted method. |

## Running the Gateway

Start Redis and then launch the service in development mode:

```bash
redis-server &
npm run start:dev
```

## Example API Call

With the gateway listening on `http://localhost:4040` you can create a payment
intent which will be forwarded to `vy-finance-payments`:

```bash
curl -X POST http://localhost:4040/vy-finance-payments/payment-intents \
  -H 'Content-Type: application/json' \
  -d '{"amount": 1000, "currency": "usd"}'
```

The gateway sends the request over Kafka and returns the microservice response.

## Interplay with Microservices

Each controller under `src/modules` communicates with its corresponding
microservice via Kafka. This gateway is effectively the public API layer while
the domain services remain decoupled and headless.

## WebSocket Usage

Clients connect to the `finance-payments` namespace to receive payment updates.
Identify the user through a `userId` query parameter during the Socket.IO
handshake or by emitting a `register-user` event right after connecting. The
socket joins a room matching that `userId` and all `payment-status-update`
events are delivered only to that room.

```ts
// using query parameter
const socket = io('/finance-payments', { query: { userId: '123' } });

// or after connection
socket.emit('register-user', '123');
```

Only the initiating user will receive status updates for their payment intents.
