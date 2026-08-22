# Harness maintenance

The project harness is the infrastructure that lets a contributor or coding agent understand,
change, and verify this repository reliably. It has five maintained subsystems.

| Subsystem | Repository source | Healthy when |
|---|---|---|
| Instructions | `AGENTS.md`, `CLAUDE.md`, and linked docs | A new session can find the right files and constraints quickly |
| Tools | npm scripts and the optional PDF toolchain | Required actions have named, least-privilege commands |
| Environment | `.nvmrc`, `package.json`, and `package-lock.json` | A clean checkout installs and builds reproducibly |
| State | `PROGRESS.md` and Git | Active, blocked, and next work survives a session boundary |
| Feedback | `npm run verify` and CI | Completion is decided by executable checks, not confidence |

## Operating loop

1. Orient with `AGENTS.md`, `PROGRESS.md`, and `git status --short`.
2. Make the smallest scoped change that satisfies the task.
3. Use `npm run check` for fast feedback while editing.
4. Run `npm run verify` before declaring the work complete.
5. Perform the manual visual checks listed in `AGENTS.md` when the change affects rendered UI.
6. Update `PROGRESS.md` with blockers, verification, and the next action when continuity matters.

## Failure attribution

When a task fails or loops, classify the cause before adding more instructions:

- **Intent:** the requested outcome or hard constraints were unclear.
- **Context:** the relevant architecture, convention, or source of truth was undiscoverable.
- **Environment:** setup, versions, dependencies, or permissions were not reproducible.
- **State:** prior work, blockers, or the next action were lost.
- **Feedback:** checks were missing, ambiguous, slow, or unable to reproduce the failure.

Improve the subsystem that caused the failure. Prefer executable invariants and focused docs over
adding step-by-step prose to `AGENTS.md`.

`AGENTS.md` is the canonical instruction source. `CLAUDE.md` imports it so Claude Code receives
the same guidance without maintaining a duplicate rule set.

## Audit cadence

Review this harness after major architecture or deployment changes and whenever the same failure
class occurs twice. Confirm that commands still work from a clean install, documentation links
resolve, CI runs the same full gate used locally, and `PROGRESS.md` contains no stale active work.

To measure a subsystem's value, hold the task and model constant, omit one subsystem for a trial,
and record the change in outcome. Use failure attribution—not the ablation result alone—to decide
what to improve.
