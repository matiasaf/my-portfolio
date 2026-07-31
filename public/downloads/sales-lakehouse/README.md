# POC 01 — Sales Lakehouse

## Business question

How much did we sell per month and category from completed orders?

## What you will build

```text
Synthetic CSV files
    ↓ manual upload to Files/raw
Bronze tables
    ↓ typing, validation, and deduplication
Silver tables
    ↓ joins and aggregation
gold_sales_by_month
    ↓
SQL analytics endpoint / Power BI
```

## Requirements

- Complete labs 00 and 01.
- A lab workspace with Fabric capacity.
- A Lakehouse named `lh_sales`.
- Permission to create and run notebooks.

## Data

- `customers.csv`: customer dimension.
- `products.csv`: product and price dimension.
- `orders.csv`: sales facts; for simplicity, each order contains a single product, and
  `order_id` identifies the row.

All data is synthetic.

## Step 1 — Upload files

In the `lh_sales` explorer:

1. Create the `raw` folder under `Files`.
2. Upload the three files from `data/` into `Files/raw/`.
3. Preview them and confirm that they have headers.

## Step 2 — Import and run the notebook

1. Import `notebooks/01_bronze_silver_gold.ipynb` into the workspace.
2. Connect the notebook to `lh_sales` as its default Lakehouse.
3. Run the cells in order.
4. Confirm that the sample's rules reject no rows.

The notebook uses `overwrite` mode so the POC is repeatable. This is deliberate for the
lab; it is not a production incremental-loading strategy.

## Step 3 — Validate

Open the SQL analytics endpoint and run `sql/validations.sql`. If the new tables do not
appear yet, wait for metadata synchronization and refresh the explorer.

Expected result for the Gold table:

| sale_month | category | orders_count | units_sold | revenue |
|---|---|---:|---:|---:|
| 2026-01-01 | Accessories | 2 | 3 | 75.00 |
| 2026-01-01 | Computers | 1 | 1 | 1200.00 |
| 2026-02-01 | Accessories | 1 | 3 | 45.00 |
| 2026-02-01 | Computers | 1 | 1 | 850.00 |

## Step 4 — Consume in Power BI

1. Create a semantic model that includes `gold_sales_by_month`.
2. Create an explicit measure or sum for `revenue`.
3. Build a column chart with month, category, and revenue.
4. Add a card showing total revenue: `2170.00`.
5. Check the total against SQL; do not validate it visually alone.

## Acceptance criteria

- [ ] All three CSV files are in `Files/raw`.
- [ ] Bronze and Silver tables exist for all three entities.
- [ ] Invalid rows are identified.
- [ ] `gold_sales_by_month` contains four rows.
- [ ] Total revenue from completed orders is `2170.00`.
- [ ] The report matches the SQL validation.
- [ ] You can explain what happens in each layer.

## Known limitations

- Full load rather than incremental loading.
- One product per order; a real use case would need an order-line key.
- Current product prices only; there is no change history.
- No handling for currencies, taxes, or time zones.
- No alerts, CI/CD, secrets, or production monitoring.

These limitations form the natural backlog for a second POC.

## Cleanup

Delete the report, model, notebook, and Lakehouse if you will not reuse them. Do not leave
active schedules behind.
