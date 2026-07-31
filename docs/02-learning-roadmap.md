# Learning Roadmap

Suggested pace: 6 to 8 hours per week for 8 weeks. Advance based on evidence, not the
calendar.

| Module | Topic | Observable outcome |
|---|---|---|
| 0 | Data fundamentals | Explain tables, schemas, quality, ETL/ELT, and batch processing |
| 1 | Fabric overview | Draw the flow and locate each workload |
| 2 | OneLake and Lakehouse | Create a Lakehouse and distinguish Files from Tables |
| 3 | Ingestion | Load a CSV manually and through a pipeline |
| 4 | Transformation | Clean and enrich data with PySpark |
| 5 | SQL and modeling | Query tables and explain facts and dimensions |
| 6 | Power BI | Create a semantic model and a simple report |
| 7 | Operations and governance | Review execution, access, lineage, consumption, and cleanup |
| POC | Integrated use case | Demonstrate the complete flow with evidence |

## Module 0 — Fundamentals

Study:

- Structured data and schemas.
- Keys, relationships, and granularity.
- Quality: nulls, duplicates, types, and ranges.
- ETL compared with ELT.
- Batch processing compared with streaming.

Practice: [Reading a dataset](../fundamentals/01-how-to-read-a-dataset.md).

## Module 1 — Fabric overview

Identify these components without going deep yet:

- Data Factory: ingestion and orchestration.
- Data Engineering: Lakehouse, Spark, and notebooks.
- Data Warehouse: relational analytics with T-SQL.
- Power BI: semantic models and visualization.
- Real-Time Intelligence and Data Science: later paths.

Exit criterion: be able to choose which component to use for moving, transforming,
querying, and visualizing data.

## Module 2 — OneLake and Lakehouse

Learn tenant → workspace → item and the difference between:

- `Files`: unmanaged files.
- `Tables`: managed and queryable Delta tables.
- SQL analytics endpoint: the SQL surface for Lakehouse tables.

Lab: [First contact](../labs/00-first-contact/README.md).

## Modules 3 and 4 — Ingestion and transformation

First, manually load a small dataset. Then repeat the load with a pipeline. Transform it
with a notebook and separate the layers:

- Bronze: faithful and traceable copy.
- Silver: clean, typed, and deduplicated data.
- Gold: aggregated data ready for consumption.

## Modules 5 and 6 — SQL, modeling, and Power BI

Learn `SELECT`, `WHERE`, `GROUP BY`, `JOIN`, and count validations. Then distinguish fact
tables, dimensions, measures, and semantic models.

Exit criterion: the total displayed in the report matches an independent SQL query.

## Module 7 — Operations and governance

Review least-privilege permissions, lineage, execution history, retries, capacity
consumption, classification, and cleanup. A demo that works only once is not yet an
operable solution.

## What to leave for later

- Streaming and KQL.
- Machine learning.
- CI/CD and APIs.
- Mirroring, cross-cloud shortcuts, and advanced security.
- Spark optimization at scale.

These topics matter, but they distract from the first goal: understanding a complete
batch flow.
