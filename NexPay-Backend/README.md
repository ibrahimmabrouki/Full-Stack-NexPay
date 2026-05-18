# NexPay Backend

Backend service for NexPay: a multi-currency wallet and payments platform built with Fastify, TypeScript, and Prisma (Postgres).

## Features
- User registration and authentication (JWT access tokens + refresh tokens via HTTP-only cookies)
- Wallets with multi-currency `wallet_balances` (USD, LBP, EUR)
- Transfers with ledger entries and notifications
- Currency conversion and currency rates caching
- Stripe top-ups and webhook handling
- AI integrations for memory summarization and transaction upserts
- Image upload via ImgBB

## Tech stack
- Node.js, TypeScript
- Fastify
- Prisma (Postgres) with `@prisma/adapter-pg`
- Stripe, Axios, bcrypt, JWT

## Quick start

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file at project root with the following variables:

- `POSTGRES_URL` (Postgres connection string)
- `ACCESS_TOKEN_SECRET`
- `SECRET_TOKEN_EXPIRE` (e.g. `15m`)
- `REFRESH_TOKEN_SECRET`
- `REFRESH_TOKEN_EXPIRE` (e.g. `7d`)
- `COOKIE_SECRET`
- `FRONTEND_URL`
- `PORT` (optional)
- `AI_SERVICE_URL`
- `INTERNAL_API_KEY`
- `IMGBB_API_KEY` (for profile image uploads)
- `CONVERSATION_SUMMARY_TRIGGER` (optional)

3. Generate Prisma client and run migrations

```bash
npx prisma generate
# apply migrations as needed, e.g.:
npx prisma migrate deploy
```

4. Seed the database with example data

```bash
npm run seed
```

5. Start the dev server

```bash
npm run dev
```

## Scripts
- `npm run dev` — start dev server with `tsx` watch
- `npm run build` — compile TypeScript
- `npm run seed` — run seed script to populate example data

## Files of interest
- `src/app.ts` — server entry, route registration and plugin setup
- `src/config/prisma.ts` — Prisma client + Postgres adapter config
- `prisma/schema.prisma` — database models and enums
- `src/controllers` — request handlers (auth, users, transfers, stripe, notifications, admin)
- `src/routes` — route definitions
- `src/services` — AI + business helpers
- `src/utils` — helpers: password hashing, exchange rate fetch, image upload

## Notes
- This project uses cookies with `secure: false` in development — enable `secure: true` in production behind HTTPS.
- The Prisma adapter is configured with `ssl.rejectUnauthorized: false` — review for production deployments.
- The seed script wipes certain tables then inserts example users, wallets, balances, and currency rates. Only run it on development databases.

## Next steps
- Add tests and CI.
- Harden production configuration (secure cookies, strict DB SSL, environment validation).

If you want a slide deck or a short video script derived from this README, tell me which format you prefer.
