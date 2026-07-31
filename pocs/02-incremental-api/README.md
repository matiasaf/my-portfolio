# POC 02 — Incremental API ingestion

## Question

Can we process new and updated API records without duplicating data when a run is repeated?

This POC uses small JSON files as deterministic, paginated API responses. That keeps the
experiment reproducible while preserving the important API concepts: pages, immutable event
IDs, business keys, update timestamps, watermarking, upserts, and idempotent reruns.

## Architecture

```text
Mock API pages (JSON)
    ↓ upload in two batches
bronze_api_order_events
    ↓ MERGE by event_id
silver_api_orders_current
    ↓ latest version per order_id
gold_api_order_summary + control_api_watermark
    ↓
SQL validation
```

## Expected runs

| Run | Files present | New events | Bronze events | Current orders | Watermark |
|---|---|---:|---:|---:|---|
| 1 | page_001 + page_002 | 5 | 5 | 5 | 2026-07-01 10:20:00 |
| 2 | add page_003 | 2 | 7 | 6 | 2026-07-02 12:00:00 |
| 3 | no changes | 0 | 7 | 6 | unchanged |

After run 2, the Gold result is one cancelled order worth 50.00 and five completed orders
worth 850.00 in total.

## Requirements

- A Fabric workspace with capacity.
- A Lakehouse named `lh_api_orders`.
- Permission to import and run a PySpark notebook.

## Steps

1. Create `Files/api_source` in `lh_api_orders`.
2. Upload `initial/page_001.json` and `initial/page_002.json`.
3. Import the notebook, attach `lh_api_orders`, and run all cells.
4. Upload `incremental/page_003.json` into the same folder and run again.
5. Run the notebook a third time without uploading anything.
6. Execute `sql/validations.sql` in the SQL analytics endpoint after metadata sync.

## Acceptance criteria

- [ ] First run creates five Bronze events and five current orders.
- [ ] Second run inserts only two events and leaves six current orders.
- [ ] Order `O-1002` changes from Pending to Completed.
- [ ] Third run inserts zero events and changes no business result.
- [ ] Gold reports five completed orders and completed amount of `850.00`.
- [ ] The watermark equals `2026-07-02 12:00:00` after run 2.

## Production extension

Replace the uploaded JSON pages with a Data Factory pipeline using a REST connection. Pass
the API page or continuation token dynamically, land every response unchanged, and keep the
same Bronze MERGE and Silver latest-record logic. Store credentials in a managed connection,
not in the notebook.

## Real API end-to-end extension

The deployable Vercel Function in [`api/`](api/README.md) turns the fixed files into a real
HTTPS API with cursor pagination, an exclusive `updated_after` watermark, repeatable
extraction windows, and optional API-key authentication. Deploy it with `npm run api:deploy`,
then use the returned `/api/v1/order-events` URL as the source of a Fabric Data Factory REST
connection. The API README contains the exact initial, increment, and retry requests.

The shared POC deployment is available at `https://api-alpha-seven-69.vercel.app`. Follow
[`REAL_API_E2E.md`](REAL_API_E2E.md) to configure its `x-api-key` header, cursor pagination,
`data[]` mapping, Lakehouse destination, and the three execution proof. The API key is shared
separately and must not be committed to this repository.
