# Security policy

## Reporting a vulnerability

Do not open a public issue if you find a vulnerability, an exposed credential, or data that
should not be version-controlled.

Send the report to [fernandez.amatias@gmail.com](mailto:fernandez.amatias@gmail.com) with:

- a description of the problem and its impact;
- the affected URL, file, or commit;
- minimal reproduction steps;
- any suggested mitigation;
- a secure way to continue the conversation, if needed.

Do not include real secrets in the message. Receipt will be acknowledged, and responsible
disclosure will be coordinated after a fix is available.

## Scope

This policy covers the code and artifacts in this repository and the `builtbymatias.dev`
website. Vulnerabilities in third-party products and services should be reported to their
respective maintainers.

## Repository safeguards

- Tokens, keys, client data, and production exports must not be committed.
- Local environment variables belong in `.env*` files ignored by Git.
- Generated directories and local tool state remain excluded through `.gitignore`.
