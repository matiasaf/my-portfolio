# POC 02 — Real API end-to-end with Fabric Data Factory

This path replaces the manual upload with the deployed API while preserving the same Bronze,
Silver, Gold, watermark, and retry evidence.

## Deployed API

```text
Base URL:  https://api-alpha-seven-69.vercel.app
Health:    GET /api/health
Events:    GET /api/v1/order-events
Auth:      x-api-key: <shared separately>
```

Do not paste the API key into a notebook, source-controlled file, screenshot, or run log.

## 1. Verify connectivity before Fabric

The health endpoint is public:

```bash
curl https://api-alpha-seven-69.vercel.app/api/health
```

Expected response:

```json
{"status":"ok","service":"incremental-order-events-api"}
```

Verify the protected endpoint after receiving the key:

```bash
curl -H "x-api-key: $API_KEY" \
  "https://api-alpha-seven-69.vercel.app/api/v1/order-events?limit=2&available_through=2026-07-01T23%3A59%3A59Z"
```

The response contains event rows in `data` and the next token in
`pagination.next_cursor`.

## 2. Create the REST connection

1. Open the Fabric workspace and select **Settings > Manage connections and gateways**.
2. Create a new **Cloud** connection with type **REST**.
3. Name it `con_incremental_orders_api`.
4. Set URL to `https://api-alpha-seven-69.vercel.app/`.
5. Select **Anonymous** authentication and **Organizational** privacy level.
6. Create the connection. Authentication is supplied as an HTTP header in the Copy activity.

For this POC, add `x-api-key` under the Copy activity's **Source > Advanced > Additional
headers**. Treat the pipeline as sensitive while that value is present. For production, use a
secret-backed connection or approved secrets store instead of a literal pipeline value.

## 3. Create the pipeline

1. Create a Data pipeline named `pl_incremental_orders_api`.
2. Add a Copy data activity named `copy_order_events`.
3. Create two String pipeline parameters:
   - `p_updated_after`, default empty.
   - `p_available_through`, default `2026-07-01T23:59:59Z`.
4. In the activity Source, select REST and `con_incremental_orders_api`.
5. Select request method `GET` and add header `x-api-key` with the separately shared key.
6. Set the Relative URL using dynamic content:

```text
@concat(
  'api/v1/order-events?limit=2',
  if(empty(pipeline().parameters.p_updated_after), '', concat('&updated_after=', uriComponent(pipeline().parameters.p_updated_after))),
  if(empty(pipeline().parameters.p_available_through), '', concat('&available_through=', uriComponent(pipeline().parameters.p_available_through)))
)
```

The upper boundary makes the historical first run deterministic. `updated_after` is an
exclusive boundary: an event equal to the watermark is not returned again.

## 4. Configure cursor pagination

Under **Source > Advanced > Pagination rules**, add:

```text
Name:  QueryParameters.cursor
Value: $.pagination.next_cursor
```

Fabric uses the returned token as the next request's `cursor` query parameter. Pagination
stops when `next_cursor` is `null`. Keep `limit=2` so the first run proves that all three API
pages were followed.

## 5. Map the response into Lakehouse JSON rows

The API response is an envelope, not a flat event:

```json
{
  "data": [{ "event_id": "EVT-001", "order_id": "O-1001" }],
  "pagination": { "next_cursor": "..." }
}
```

In the activity **Mapping** tab:

1. Import the source schema from a successful API preview.
2. Set collection reference to `$['data']` so each array element becomes one row.
3. Map `event_id`, `order_id`, `customer_id`, `status`, `amount`, and `updated_at`.
4. `page_number` is optional for the real API and can be left unmapped.

In **Destination**:

1. Select Lakehouse `lh_api_orders`.
2. Select **Files**, folder `api_source`, and JSON format.
3. Use the JSON Lines / set-of-objects pattern, not a single array document.
4. Use a unique output name such as dynamic content:

```text
@concat('api_', pipeline().RunId, '.json')
```

The notebook reads all JSON Lines in `Files/api_source`, deduplicates `event_id`, and then
performs the existing Bronze `MERGE`.

## 6. Run the three-execution proof

### Run 1 — initial window

```text
p_updated_after      =
p_available_through  = 2026-07-01T23:59:59Z
```

Run the pipeline, then the notebook. Expected result: 5 copied events, Bronze 5, Silver 5,
watermark `2026-07-01 10:20:00`.

### Run 2 — increment

```text
p_updated_after      = 2026-07-01T10:20:00Z
p_available_through  =
```

Run the pipeline, then the notebook. Expected result: 2 new events, Bronze 7, Silver 6,
`O-1002` is Completed, watermark `2026-07-02 12:00:00`.

### Run 3 — safe retry

Repeat the exact Run 2 parameters. Run the notebook again. The API returns the same immutable
event IDs, but Bronze inserts 0 rows and remains at 7.

## 7. Validate independently

Run `sql/validations.sql` in the Lakehouse SQL analytics endpoint. Definition of done:

- Seven unique Bronze events.
- Six current Silver orders.
- Five completed orders totaling `850.00` in Gold.
- Latest watermark `2026-07-02 12:00:00`.
- Latest retry inserted zero new events.

## Troubleshooting

- `401 Unauthorized`: `x-api-key` is missing or incorrect. Do not include the key in the URL.
- Only two rows arrive: the cursor pagination rule is missing or has the wrong JSONPath.
- Five rows are nested under one column: collection reference must be `$['data']`.
- Run 1 returns seven rows: `available_through` was omitted.
- Retry creates duplicate source rows: expected in landed files; the notebook deduplicates
  `event_id` before the Bronze `MERGE`.
