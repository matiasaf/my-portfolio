# Harness maintenance

**Applies when:** changing agent instructions, development setup, repository state, verification,
CI, or recovery behavior. **Evidence:** the tracked manifests, scripts, workflow, and architecture
in this repository. **Review or retire when:** the runtime, package manager, build/deployment model,
supported agent adapters, or recurring failure class changes.

The harness lets a fresh contributor or coding-agent session understand, change, and verify this
repository without chat history. `AGENTS.md` is the canonical, vendor-neutral contract.

## Five subsystems

| Subsystem | Repository source | Healthy when |
|---|---|---|
| Instructions | `AGENTS.md`, thin adapters, and routed docs | A new session finds authority and local constraints without duplicated rules |
| Tools | npm scripts and optional PDF tooling | Inspect, initialize, edit, check, build, and verify have named least-privilege paths |
| Environment | `.nvmrc`, `package.json`, `package-lock.json`, `scripts/harness-init.mjs` | A clean checkout becomes ready reproducibly on supported systems |
| State | `PROGRESS.md` and Git | `idle`, `active`, or `blocked` work survives a session boundary with one next action |
| Feedback | `scripts/verify-harness.mjs`, `npm run check`, `npm run verify`, and CI | Completion follows risk-scaled executable evidence |

## Knowledge authority and routing

Use the task router in `AGENTS.md`. Within a task, authority descends from the user's request and
security constraints to accepted specifications/plans, architecture decisions and contracts,
tests, implementation, setup docs, then external context. `docs/ARCHITECTURE.md` controls routes,
content ownership, internationalization, PDFs, and build behavior. `CONTRIBUTING.md`, `SECURITY.md`,
and `LICENSE` control their named policy domains. This guide controls only harness behavior.

Keep scoped guidance near its owner. Every new scoped guide must say when it applies, what repository
evidence supports it, and which change or repeated failure should trigger review or retirement.

## Startup readiness

The cross-platform implementation is Node.js because Node is already the project's pinned runtime:

```text
npm run harness:init
```

It checks compatible Node and npm versions, compares installed package versions with
`package-lock.json`, runs `npm ci` only when dependencies are absent or stale, and then runs the
read-only harness verifier.
Use `npm run harness:init -- --check` in diagnostics or CI when dependencies must never be installed.

POSIX shells (macOS/Linux):

```sh
npm run harness:init
npm run dev
```

Windows PowerShell:

```powershell
npm run harness:init
npm run dev
```

No shell wrapper is needed: npm and Node resolve platform-specific executable names. Initialization
does not deploy, start the long-running server, alter Git, require privilege elevation, or contact an
external service except npm's configured registry when a clean install is genuinely required. Use
normal npm/Node trust-store or CA-bundle configuration for private proxies; never disable TLS checks
or commit certificates.

Readiness means four observable outcomes: `dev` exists (can start), `verify` exists (can test),
`PROGRESS.md` has a valid state (can recover), and it contains exactly one explicit next-action
section (can proceed).

## State contract

`PROGRESS.md` starts with `## Current state` and a `Status` of `idle`, `active`, or `blocked`.
Active and blocked records contain branch, HEAD, worktree summary, ISO-8601 timestamp, objective,
ordered acceptance criteria, decisions with reasons, progress, blockers, exact verification
outcomes, and one exact next action. Use `None` rather than omitting a section. Replace stale detail;
Git remains the changelog.

Concurrent editing tasks require separate Git worktrees and a separate state file in each checkout.
Never let two implementers write in one worktree.

## Feedback and recovery

Run the narrowest behavior check after the first substantive edit. The ladder is:

1. `npm run harness:check` for harness-only changes or `npm run check` for Astro/TypeScript changes.
2. A focused artifact, route, link, or PDF check appropriate to the edit.
3. `npm run verify` for the final gate and for shared code, contracts, dependencies, configuration,
   or broad behavior.
4. Manual responsive, theme, language, keyboard, metadata, link, and download review for affected UI.

Read the output, including skipped tests, warnings, stale generated files, and fallbacks. Record
`PASS`, `FAIL`, or `BLOCKED` with the exact command and distinguish new regressions from existing
failures or environment blockers.

When a task fails or loops, classify it before adding instructions:

- **Intent:** outcome or constraints are unclear.
- **Context:** authority or implementation guidance is undiscoverable.
- **Environment:** versions, dependencies, permissions, or setup are not reproducible.
- **State:** completed work, blockers, or the next action was lost.
- **Feedback:** checks are missing, ambiguous, slow, or cannot reproduce the failure.

Improve the subsystem that caused the failure. Prefer executable invariants and routing over more
general prose.

## Explorer, implementer, verifier, coordinator

The role contract in `AGENTS.md` is semantic, not vendor-specific. Tools with real subagents may use
a fresh read-only explorer and verifier. Codex and Claude sessions that lack fresh-context isolation
must execute the same phases sequentially and say that verification was not independent. GitHub
Copilot receives the same policy through its thin adapter. Maximum implementation retries default
to three; stop with `PASS`, `BLOCKED`, or `BUDGET_EXHAUSTED`.

## Verifier ownership

`npm run harness:check` is read-only. It checks required files and headings, adapter delegation,
project scripts, state validity, pinned runtime compatibility, and forbidden portability/security
patterns. Update its assertions when the canonical contract intentionally changes; never weaken a
check solely to make a broken migration pass.

CI runs `npm run verify`, the same final gate used locally. The verifier statically covers Windows,
macOS, and Linux paths because its Node and npm APIs are cross-platform; only CI matrix jobs or
documented local runs count as executed OS evidence.

## Audit cadence

Review the harness after major architecture or deployment changes, an adapter/runtime upgrade, or
the second recurrence of one failure class. Confirm that clean initialization works, documentation
links resolve, adapters still delegate, CI matches the local gate, and operational state is current.
