# Working Conventions

## Organization

- Concise theory belongs in `docs/` or `fundamentals/`.
- A lab teaches a single skill and belongs in `labs/NN-name/`.
- A POC demonstrates an end-to-end business use case and belongs in `pocs/NN-name/`.
- Included datasets must be synthetic, small, and non-sensitive.
- Never commit credentials, tokens, personal data, or production exports.

## Definition of done for a practice exercise

- A `README.md` exists with the objective, requirements, steps, and validations.
- Artifact names are reproducible.
- There is at least one result check.
- Decisions, known issues, and resource cleanup are documented.
- The `PROGRESS.md` log contains evidence from the session.

## Suggested names in Fabric

| Type | Convention | Example |
|---|---|---|
| Workspace | `ws-fabric-lab-<environment>` | `ws-fabric-lab-dev` |
| Lakehouse | `lh_<domain>` | `lh_sales` |
| Pipeline | `pl_<source>_<destination>` | `pl_csv_lakehouse` |
| Notebook | `nb_<order>_<action>` | `nb_01_bronze_silver` |
| Table | `<layer>_<entity>` | `silver_orders` |

## Git

Use small commits that describe learning or evidence:

```text
docs: explain the difference between lakehouse and warehouse
lab: add quality validations for orders
poc: add the product dimension
```
