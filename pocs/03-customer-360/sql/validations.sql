-- POC 03: independent validation through the Lakehouse SQL analytics endpoint.

-- 1. Governed customer grain: exactly five unique customer rows.
SELECT COUNT(*) AS customers,
       COUNT(DISTINCT customer_key) AS unique_customer_keys,
       COUNT(DISTINCT normalized_email) AS unique_emails
FROM dbo.dim_customer;

-- 2. Trusted sales: five completed, matched orders totaling 2350.00.
SELECT COUNT(DISTINCT order_id) AS completed_orders,
       SUM(amount) AS total_revenue,
       COUNT(DISTINCT customer_key) AS purchasing_customers
FROM dbo.fact_sales;

-- 3. Unmatched completed revenue remains visible and excluded from facts.
SELECT COUNT(*) AS unmatched_orders,
       SUM(amount) AS unmatched_amount
FROM dbo.unmatched_orders
WHERE status = 'Completed';

-- 4. Support evidence: three open matched tickets; one unmatched ticket.
SELECT SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) AS open_tickets
FROM dbo.fact_support;

SELECT COUNT(*) AS unmatched_tickets
FROM dbo.unmatched_tickets;

-- 5. Expected Customer 360 rows.
SELECT full_name, segment, total_orders, lifetime_value,
       last_order_date, open_tickets, value_band
FROM dbo.gold_customer_360
ORDER BY full_name;

-- 6. This must return zero rows: every fact key resolves to the dimension.
SELECT f.customer_key
FROM dbo.fact_sales AS f
LEFT JOIN dbo.dim_customer AS d ON f.customer_key = d.customer_key
WHERE d.customer_key IS NULL
UNION ALL
SELECT f.customer_key
FROM dbo.fact_support AS f
LEFT JOIN dbo.dim_customer AS d ON f.customer_key = d.customer_key
WHERE d.customer_key IS NULL;
