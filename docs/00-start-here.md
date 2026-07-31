# Start Here

## What Microsoft Fabric is, in plain language

Microsoft Fabric is a SaaS analytics platform that brings together tools for moving,
storing, transforming, analyzing, and visualizing data. Its experiences share OneLake,
a common logical storage layer.

This mental model is enough for this roadmap:

```text
Source → Ingestion → OneLake/Lakehouse → Transformation → Model → Report
            │              │                 │             │
       Data Factory    Delta tables      Spark/SQL      Power BI
```

You do not need to master every Fabric experience at once.

## Before opening the portal

You need:

- A Microsoft work or school account.
- Access to [Microsoft Fabric](https://app.fabric.microsoft.com/).
- A workspace assigned to a Fabric capacity or an enabled trial.
- Permission to create items in that workspace.

The availability of trials, capacities, and features depends on the tenant. If you cannot
enable them, you can still study the fundamentals and review the POC artifacts; record the
blocker in `PROGRESS.md`.

## Your first goal

During the first week, you should be able to explain:

- The difference between data, a file, a table, and a report.
- What a workspace, OneLake, and a Lakehouse are.
- Why a Delta table is not simply a CSV file.
- What Data Factory, Spark, SQL, and Power BI do within the same flow.
- How to verify that a load produced the expected result.

## Recommended order

1. Complete the assessment without looking up answers.
2. Read the lessons in `fundamentals/`.
3. Create a lab workspace without real data.
4. Complete labs 00 and 01.
5. Build POC 01.
6. Return to the assessment and compare your answers.

## Cost rule

Use an authorized lab capacity. Before ending each session:

- Stop or release resources if your organization allows it.
- Avoid unnecessary recurring schedules.
- Delete synthetic data you no longer need.
- Ask the administrator how consumption is monitored.
