-- POC 02: run after the second notebook execution.

-- 1. Seven immutable API events, but only six current orders.
SELECT 'bronze_events' AS metric, COUNT(*) AS value
FROM dbo.bronze_api_order_events
UNION ALL
SELECT 'current_orders', COUNT(*)
FROM dbo.silver_api_orders_current;

-- 2. No duplicate event IDs. This query must return zero rows.
SELECT event_id, COUNT(*) AS occurrences
FROM dbo.bronze_api_order_events
GROUP BY event_id
HAVING COUNT(*) > 1;

-- 3. O-1002 must contain only its latest business state.
SELECT order_id, status, amount, updated_at
FROM dbo.silver_api_orders_current
WHERE order_id = 'O-1002';

-- 4. Expected Gold: Cancelled 1 / 50.00; Completed 5 / 850.00.
SELECT status, orders_count, total_amount
FROM dbo.gold_api_order_summary
ORDER BY status;

-- 5. Expected watermark: 2026-07-02 12:00:00.
SELECT last_successful_updated_at
FROM dbo.control_api_watermark;

-- 6. The latest run must report zero new events after an idempotent third run.
SELECT TOP 3 run_at, source_rows_scanned, new_events_inserted, bronze_events_after
FROM dbo.api_ingestion_run_log
ORDER BY run_at DESC;
