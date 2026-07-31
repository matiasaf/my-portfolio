# How to Read a Dataset

Before transforming a file, answer:

1. What does one row represent?
2. What uniquely identifies a row?
3. What does each column mean, and which type should it have?
4. Which values may be missing?
5. Which business rules should hold?

Example: in `orders.csv`, one row represents an order line, not necessarily a complete
order. `order_id` may repeat when an order contains several products; identifying a line
correctly may require an additional field.

## Basic checks

- Total row count.
- Distinct key count.
- Nulls by column.
- Duplicates based on the expected key.
- Minimum and maximum values.
- Unexpected categories.
- Unmatched relationships between tables.

## Key question

If a report shows sales by city, should the city come from each order or from the customer
table? The answer affects consistency, history, and modeling. Record the decision in the
POC instead of hiding it in the code.
