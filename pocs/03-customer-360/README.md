# POC 03 — Customer 360

## Business question

Which customers buy, spend more, need support, or cannot be matched across systems?

## What this POC proves

```text
CRM customers + commerce orders + support tickets
                    ↓
          Bronze source contracts
                    ↓
   Silver identity normalization + quality
                    ↓
 dim_customer + fact_sales + fact_support
                    ↓
      gold_customer_360 + semantic KPIs
```

The CRM is the customer master for this POC. Orders and tickets identify people by email.
Matching is deterministic: `lower(trim(email))`. This is intentionally explainable; fuzzy
matching belongs in a later experiment with stewardship and confidence thresholds.

## Requirements

- Complete POCs 01 and 02, or understand Bronze/Silver/Gold and Delta tables.
- A Fabric workspace with capacity.
- A Lakehouse named `lh_customer_360`.
- Permission to import and run a PySpark notebook.

## Steps

1. Create `Files/raw` in `lh_customer_360`.
2. Upload the three CSV files from `data/`.
3. Import `notebooks/01_build_customer_360.ipynb` and attach the Lakehouse.
4. Run all cells and inspect unmatched orders and tickets.
5. Run `sql/validations.sql` in the SQL analytics endpoint.
6. Create a semantic model with the dimension and both facts.
7. Add the measures from `semantic-model/measures.dax`.

## Expected evidence

- Five CRM customers produce five dimension rows.
- Five completed, matched orders produce `2350.00` revenue.
- One completed order worth `120.00` is unmatched and excluded from trusted KPIs.
- Three open, matched support tickets are visible.
- One support ticket is unmatched.
- Alice is High value with `1100.00` lifetime value.
- Gold contains one row per governed customer.

## Acceptance criteria

- [ ] Email normalization matches case and whitespace variants.
- [ ] Unmatched records are visible rather than silently dropped.
- [ ] Dimension grain is one row per normalized customer email.
- [ ] Fact tables reference `customer_key`, not source email.
- [ ] Revenue equals `2350.00` in SQL and Power BI.
- [ ] Every measure has a definition, grain, owner, and independent validation query.
- [ ] You can explain why deterministic matching is appropriate for this POC.

## Known limitations

- Email is treated as a stable identity key; production systems need identity governance.
- No fuzzy matching, survivorship workflow, consent, deletion, or householding.
- Customer attributes use current-state logic, not a slowly changing dimension.
- Currency and time zones are intentionally omitted.
