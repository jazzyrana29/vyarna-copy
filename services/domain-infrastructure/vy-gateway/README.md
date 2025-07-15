# vy-gateway

The gateway exposes REST and WebSocket APIs for the platform. Incoming
HTTP requests are converted into Kafka messages and dispatched to the
appropriate microservice such as `vy-finance-payments`.

## Environment Variables

Copy `.env-example` to `.env` and adjust the values as needed:

| Variable                  | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `APP`                     | Name used in logs                              |
| `APP_PORT`                | Port for HTTP/WebSocket server                 |
| `KAFKA_BROKER`            | Connection string for Kafka                    |
| `KAFKA_GROUP`             | Kafka consumer group id                        |
| `LOG_STREAM_LEVEL`        | Logging verbosity                              |
| `CONTEXT`                 | Prefix for structured logs                     |
| `REST_TIMEOUT`            | Timeout for outbound HTTP calls in ms          |
| `ALLOWED_ORIGINS`         | JSON array of allowed CORS origins             |
| `NODE_ENV`                | Environment mode (`local`, `production`, etc.) |
| `SWAGGER_URL`             | URL where Swagger docs are served              |
| `REDIS_PORT`              | Redis port for caching                         |
| `REDIS_HOST`              | Redis host                                     |
| `JWT_SECRET_KEY`          | Secret used to sign and verify JWTs            |
| `STRIPE_SECRET_KEY`       | Stripe API secret                              |
| `STRIPE_WEBHOOK_SECRET`   | Signature secret for Stripe webhooks           |
| `ACTIVE_CAMPAIGN_NAME`    | _(optional)_ ActiveCampaign account name       |
| `ACTIVE_CAMPAIGN_API_KEY` | _(optional)_ API key for ActiveCampaign        |

## Build & Test

```bash
npm run build      # compile TypeScript
npm run test       # unit tests
npm run test:e2e   # end-to-end tests
```

## REST API

All endpoints use the HTTP `POST` method and are forwarded to the appropriate
Kafka topic:

| Method | Path                                                | Description                                  |
| ------ | --------------------------------------------------- | -------------------------------------------- |
| `POST` | `/vy-finance-payments/create-payment-intent`        | Create a new payment intent.                 |
| `POST` | `/vy-finance-payments/get-payment-intent`           | Retrieve a payment intent by id.             |
| `POST` | `/vy-finance-payments/get-ztracking-payment-intent` | Get ztracking information for an intent.     |
| `POST` | `/vy-finance-payments/confirm-payment-intent`       | Confirm an existing payment intent.          |
| `POST` | `/vy-finance-payments/get-payment-intent-status`    | Retrieve latest status for a payment intent. |
| `POST` | `/vy-finance-payments/create-refund`                | Issue a refund for a payment intent.         |
| `POST` | `/vy-finance-payments/get-refund`                   | Get a refund record.                         |
| `POST` | `/vy-finance-payments/create-payment-method`        | Vault a payment method.                      |
| `POST` | `/vy-finance-payments/list-payment-methods`         | List vaulted methods for a customer.         |
| `POST` | `/vy-finance-payments/delete-payment-method`        | Remove a vaulted method.                     |
| `POST` | `/webhooks/process-stripe-webhook`                  | Receive Stripe webhook events.               |

Stripe sends events to this endpoint. The gateway authenticates using
`STRIPE_SECRET_KEY` and verifies webhook signatures with `STRIPE_WEBHOOK_SECRET`.

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
curl -X POST http://localhost:4040/vy-finance-payments/create-payment-intent \
  -H 'Content-Type: application/json' \
  -d '{
    "items": [{ "id": "a1b2c3", "quantity": 1 }],
    "customerDetails": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "address": {
        "street": "1 Main St",
        "city": "Town",
        "state": "CA",
        "zip": "12345",
        "country": "US"
      }
    }
  }'
```

The gateway sends the request over Kafka and returns the microservice response.

## Interplay with Microservices

Each controller under `src/modules` communicates with its corresponding
microservice via Kafka. This gateway is effectively the public API layer while
the domain services remain decoupled and headless.

## WebSocket Usage

Multiple Socket.IO namespaces exist, including `finance-payments`,
`sales-subscriptions` and `person-identity`. The example below uses the finance
namespace. Clients connect to the `/finance-payments` namespace to receive
payment updates. Identify the user through a `userId` query parameter during the
Socket.IO handshake or by emitting a `register-user` event right after connecting. The
socket joins a room matching that `userId` and all `payment-status-update`
events are delivered only to that room.

```ts
// using query parameter
const socket = io('/finance-payments', { query: { userId: '123' } });

// or after connection
socket.emit('register-user', '123');
```

Only the initiating user will receive status updates for their payment intents.

### Triggering `payment-status-update`

The gateway emits a `payment-status-update` whenever the payments service
confirms whether a payment succeeded or failed. These notifications are typically
generated from Stripe webhook events but can also be produced manually through
Kafka.

1. Send Stripe webhooks such as `payment_intent.succeeded` or
   `payment_intent.payment_failed` to `vy-finance-payments`.
2. Or publish messages directly to the Kafka topics `succeeded-payment` and
   `failed-payment` using the constants `KT_SUCCEEDED_PAYMENT` and
   `KT_FAILED_PAYMENT`.

Once the gateway processes one of these events it will emit `payment-status-update`
to the room of the user that created the intent.

```ts
const socket = io('/finance-payments', { query: { userId: '123' } });

socket.on('payment-status-update', (update) => {
  console.log('Intent', update.paymentIntentId, 'is', update.status);
});
```

## Kafka Event Flow

Each WebSocket event corresponds to a Kafka topic. The main topics are:

- `create-payment-intent`
- `get-payment-intent`
- `get-ztracking-payment-intent`
- `confirm-payment-intent`
- `capture-payment-intent`
- `create-refund`
- `get-refund`
- `process-stripe-webhook`
- `create-payment-method`
- `list-payment-methods`
- `delete-payment-method`
- `get-payment-intent-status`

### Get Payment Intent Status

1. Client calls `POST /vy-finance-payments/get-payment-intent-status`.
2. Gateway publishes the `get-payment-intent-status` Kafka message.
3. Service `vy-finance-payments` retrieves the intent from Stripe and responds with a `PaymentStatusUpdateDto`.
4. Gateway returns this DTO to the HTTP caller and emits it over the WebSocket if subscribed.
