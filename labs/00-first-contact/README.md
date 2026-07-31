# Lab 00 — First Contact with Fabric

Estimated duration: 30 to 45 minutes.

## Objective

Identify the tenant, workspace, capacity, and items without loading sensitive data.

## Steps

1. Open the Fabric portal.
2. Create or select an authorized lab workspace.
3. Confirm that the workspace is assigned to a Fabric-compatible capacity.
4. Create a Lakehouse named `lh_sales`.
5. Identify the `Files` and `Tables` sections.
6. Open the associated SQL analytics endpoint.
7. Return to the workspace and identify the automatically created items.

## Validation

Without looking at the guide, explain:

- Which element contains the Lakehouse.
- Where you would upload an untransformed CSV file.
- Where you would expect to see a Delta table.
- Which surface you would use to query with SQL.

## Evidence

Record the actual workspace and Lakehouse names in `PROGRESS.md`. Do not store IDs,
tokens, or screenshots containing sensitive information in Git.

## Cleanup

Keep `lh_sales` if you will continue with the POC. Otherwise, delete the test items
according to your organization's policies.
