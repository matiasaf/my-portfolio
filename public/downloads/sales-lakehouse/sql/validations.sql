-- POC 01: validations for the Lakehouse SQL analytics endpoint.

-- 1. Expected counts: customers=3, products=4, orders=6.
SELECT 'customers' AS entity, COUNT(*) AS row_count FROM dbo.silver_customers
UNION ALL
SELECT 'products', COUNT(*) FROM dbo.silver_products
UNION ALL
SELECT 'orders', COUNT(*) FROM dbo.silver_orders;

-- 2. This query must return zero rows.
SELECT *
FROM dbo.silver_orders
WHERE order_id IS NULL
   OR order_date IS NULL
   OR customer_id IS NULL
   OR product_id IS NULL
   OR quantity <= 0;

-- 3. These two queries must return zero rows.
SELECT o.*
FROM dbo.silver_orders AS o
LEFT JOIN dbo.silver_customers AS c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;

SELECT o.*
FROM dbo.silver_orders AS o
LEFT JOIN dbo.silver_products AS p ON o.product_id = p.product_id
WHERE p.product_id IS NULL;

-- 4. This must return four rows and total revenue of 2170.00.
SELECT *
FROM dbo.gold_sales_by_month
ORDER BY sale_month, category;

SELECT SUM(revenue) AS total_revenue
FROM dbo.gold_sales_by_month;
