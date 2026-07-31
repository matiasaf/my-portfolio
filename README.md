# Learning Microsoft Fabric from Scratch

A personal repository for learning Microsoft Fabric progressively through concise theory,
guided labs, and reproducible proofs of concept (POCs).

No prior Data Engineering experience is assumed. The roadmap starts with fundamental
concepts and ends with an end-to-end analytics solution.

## Where to start

1. Read [Start here](docs/00-start-here.md).
2. Complete the [initial assessment](docs/01-initial-assessment.md).
3. Follow the [learning roadmap](docs/02-learning-roadmap.md).
4. Use the [progress log](PROGRESS.md) at the end of each session.
5. After completing the fundamentals, build the
   [sales Lakehouse POC](pocs/01-sales-lakehouse/README.md).

## Repository map

```text
.
├── docs/                    # Concepts, roadmap, and glossary
├── fundamentals/            # Mini-lessons to complete before Fabric
├── labs/                    # Short, focused exercises
├── pocs/                    # End-to-end use cases
│   └── 01-sales-lakehouse/
│       ├── data/            # Small, version-controlled datasets
│       ├── notebooks/       # Notebook that can be imported into Fabric
│       └── sql/             # Validation queries
├── PROGRESS.md              # Personal learning log
└── CONTRIBUTING.md          # Repository conventions
```

## Study method

Each module follows this cycle:

> understand → execute → verify → explain → record

A practice exercise is not complete just because it “worked.” You should also be able to
explain which data entered the system, which transformation occurred, where the result was
stored, and how you verified it.

## Initial scope

- OneLake, workspaces, and Fabric capacities.
- Lakehouse, files, and Delta tables.
- Ingestion through manual uploads and Data Factory.
- Transformations with PySpark notebooks and SQL queries.
- Medallion architecture: Bronze, Silver, and Gold.
- Semantic models and Power BI reports.
- Security, governance, cost, and operations basics.

Data Science, Real-Time Intelligence, operational databases, and advanced automation will
be added after mastering the basic batch flow.

## Official references

- [Introduction to Microsoft Fabric](https://learn.microsoft.com/fabric/fundamentals/microsoft-fabric-overview)
- [End-to-end Lakehouse tutorial](https://learn.microsoft.com/fabric/data-engineering/tutorial-lakehouse-introduction)
- [Microsoft Fabric learning paths](https://learn.microsoft.com/training/browse/?products=fabric)
- [Data Engineering documentation in Fabric](https://learn.microsoft.com/fabric/data-engineering/)

> Microsoft Fabric evolves frequently. If a screen differs from a guide, check the official
> documentation first and record the difference in the progress log.
