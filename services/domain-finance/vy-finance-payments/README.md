# vy-finance-payments

Microservice handling payment intents and related operations. Generated from PRD specifications.

## Stripe Configuration

Copy `.env.example` to `.env` and provide your Stripe credentials:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Run the service after installing dependencies with `npm install` and start it in dev mode:

```
npm run start:dev
```
