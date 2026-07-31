# Lab 01 — Thinking About Data Quality with SQL

## Objective

Use small queries to test claims about the data.

After running POC 01, open the SQL analytics endpoint and adapt these queries:

```sql
-- How many rows and orders are there?
SELECT COUNT(*) AS rows_count,
       COUNT(DISTINCT order_id) AS order_count
FROM dbo.silver_orders;

-- Are there any invalid quantities?
SELECT *
FROM dbo.silver_orders
WHERE quantity <= 0;

-- Are there any unmatched customer keys?
SELECT o.customer_id
FROM dbo.silver_orders AS o
LEFT JOIN dbo.silver_customers AS c
  ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;
```

## Completion criteria

For each query, write down:

- Which claim it tests.
- What result you expect.
- What action you would take if the result does not match.
