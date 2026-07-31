# ETL, ELT, and Medallion Architecture

## ETL and ELT

- ETL: extract, transform, and then load.
- ELT: extract, load, and transform within the analytics platform.

Fabric supports both approaches. The first POC uses ELT: the CSV files arrive in the
Lakehouse, and a notebook transforms them there.

## Medallion layers

| Layer | Purpose | What not to do |
|---|---|---|
| Bronze | Preserve received data and its traceability | Apply silent corrections |
| Silver | Type, validate, deduplicate, and standardize | Aggregate for a single report |
| Gold | Prepare business entities or aggregates | Lose metric definitions |

Medallion is a pattern, not a requirement to create three workspaces or three lakehouses.
For learning purposes, we use three table prefixes within a single Lakehouse.

## Example

```text
Files/raw/orders.csv
        ↓
bronze_orders
        ↓  types + rules + deduplication
silver_orders
        ↓  joins + revenue metric
gold_sales_by_month
```
