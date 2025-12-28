# Git Conventions (Squash Merge) — Source of Truth

These conventions optimize for:

- fast collaboration
- readable history
- low cognitive overhead
- predictable PRs

This repo assumes **squash merge**: the PR title becomes the single commit on `main`.

---

## 1) The Golden Rule (Squash Merge)

**PR title = the commit message on `main`.**

So:

- PR titles must be high quality
- intermediate commits can be pragmatic
- the PR description carries context you’d otherwise encode in many commits

If you do only one thing: **write excellent PR titles.**

---

## 2) Branch Naming

### Format

`<type>/<scope>-<short-desc>[-<ticket>]`

### Rules

- lowercase
- kebab-case
- keep it short and specific (3–8 words)
- optional ticket goes last (e.g., `ABC-123`)

### Branch types

Use one of the following prefixes:

- `feature/` — new user-facing functionality
- `fix/` — bug fix
- `refactor/` — behavior-preserving restructuring
- `perf/` — performance improvements
- `chore/` — tooling, deps, cleanup, maintenance
- `test/` — test-only changes
- `docs/` — documentation-only changes
- `ci/` — CI/CD pipelines and GitHub Actions

### Scope

A short, stable area label. Examples:
`ui`, `forms`, `auth`, `billing`, `checkout`, `search`, `api`, `routing`, `design-system`, `deps`

### Examples

- `feature/ui-add-filters-panel-ABC-123`
- `fix/auth-refresh-token-loop`
- `refactor/forms-unify-validation`
- `chore/deps-bump-react-query`

### Anti-patterns (avoid)

- `wip/*`, `temp/*`, `updates/*`
- personal names: `teresa-fixes`
- long sentences, mixed casing, or unclear intent

---

## 3) PR Titles (Final Commit Messages)

### Required format (Conventional Commits)

`<type>(<scope>): <imperative summary>`

If scope is unclear or not useful, omit it:
`<type>: <imperative summary>`

### Allowed PR types

- `feat` — new feature
- `fix` — bug fix
- `refactor` — restructure without behavior change
- `perf` — performance improvements
- `test` — tests only
- `docs` — documentation only
- `chore` — maintenance / deps / tooling
- `build` — build tooling changes
- `ci` — pipeline changes

### Rules

- imperative verb: add / fix / prevent / remove / refactor / improve
- describe **what changed**, not the implementation details
- keep it readable out of context
- aim for ≤ ~72 characters when possible

### Examples (good)

- `feat(ui): add filters panel to transactions`
- `fix(auth): prevent refresh loop on 401`
- `refactor(forms): centralize validation schema`
- `perf(list): virtualize transactions table`
- `chore(deps): bump tanstack-query`

### Breaking changes

Use `!` after the type/scope:

- `feat(api)!: rename orderStatus to status`

If needed, explain in the PR description and release notes.

### Examples (avoid)

- `Update stuff`
- `Fix bug`
- `WIP`
- `Final`
- `Changes`

---

## 4) Commits During Development (Pre-Squash)

Since we squash merge, intermediate commits are allowed to be pragmatic, but should still be readable.

### Acceptable examples

- `wip(ui): wire up filters state`
- `fix: handle null merchant`
- `test: add coverage for empty state`
- `refactor: extract shared hook`

### Avoid

- `asdf`, `ok`, `final`, `temp`, `lol`

If CI runs on your branch, try to keep commits roughly buildable—but don’t over-invest in perfect micro-history.

---

## 5) PR Description Expectations

Because squash merge compresses commit history, the PR description must carry context.

Use the PR template fields:

- **What** changed
- **Why** (user impact / bug cause / business reason)
- **How** (notable approach + tradeoffs)
- **Tested** (unit / manual / e2e)
- **Screenshots** (if UI changes)

---

## 6) Suggested PR Hygiene (Optional but Recommended)

- Keep PRs small enough to review in one sitting
- Prefer “one PR = one intent”
- Include a rollback note if risk is non-trivial
- If a change impacts UX, include before/after screenshots

---

## 7) Quick Copy / Paste Reference

### Branch

`feature/<scope>-<short-desc>-<ticket?>`

### PR Title

`feat(<scope>): <imperative summary>`

### Examples

- Branch: `fix/ui-empty-state-copy`
- PR: `fix(ui): clarify empty state copy`
