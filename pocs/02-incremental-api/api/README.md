# Incremental Orders API

Vercel Function used to validate POC 02 against a real HTTPS API. It exposes immutable
order events, cursor pagination, a strict incremental watermark, an optional extraction
upper bound, and optional API-key authentication.

## Contract

```http
GET /api/v1/order-events?updated_after=<ISO-8601>&available_through=<ISO-8601>&limit=2&cursor=<token>
x-api-key: <secret> # required only when API_KEY is configured
```

- `updated_after` is exclusive. Send the last successful watermark to obtain only newer
  events.
- `available_through` is inclusive. It freezes a repeatable extraction window for this
  historical POC; a normal live API would use the current time as its upper boundary.
- `cursor` is opaque. Keep requesting pages until `pagination.next_cursor` is `null`.
- `limit` defaults to 2 and accepts values from 1 through 100.

Health check: `GET /api/health`.

## Local verification and deployment

From the repository root:

```bash
npm run api:test
npm run api:dev
npm run api:deploy
```

`api:deploy` creates or updates a production Vercel project and prints its HTTPS URL.

To enable authentication after the first deploy, add `API_KEY` to the Production environment
in the Vercel project settings and redeploy. Store the same value in a Fabric managed
connection and send it as the `x-api-key` header.

```bash
npx vercel env add API_KEY production --cwd pocs/02-incremental-api/api
npm run api:deploy
```

## Fabric Data Factory request sequence

For the controlled three-run proof:

1. Initial run: omit `updated_after`, set
   `available_through=2026-07-01T23:59:59Z`, and follow every cursor. This returns five
   events.
2. Increment run: set `updated_after=2026-07-01T10:20:00Z`, omit `available_through`, and
   follow every cursor. This returns two events.
3. Retry run: repeat step 2. The API returns the same two immutable event IDs and the Bronze
   `MERGE` inserts zero rows.

Land each response body unchanged. In the transformation step, explode `data`; do not ingest
the `pagination` or `request` objects as business events.
