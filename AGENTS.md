# Repository Guidelines

## Project Structure & Module Organization
This repository is currently spec-first. Core documents live at the repo root:
- `WEB_SPEC.md`: product requirements for the web prototype.
- `ARCHITECTURE_WEB.md`: implementation architecture.
- `DATA_PERSISTENCE_WEB.md`: IndexedDB/Dexie schema and data rules.
- `UI_RULES.md` and `DESIGN_SYSTEM_B.md`: interaction and visual standards.
- `CODEX_RUNBOOK_WEB.md` and `DEPLOY_WEB.md`: execution and deployment flow.

When code is added, keep a standard Next.js layout:
- `src/app/` for routes/pages.
- `src/components/` for UI modules.
- `src/lib/` for domain logic (sorting, badge rules, persistence helpers).
- `tests/` for unit/integration tests.

## Build, Test, and Development Commands
The app scaffold is not committed yet. For implementation, use:
- `npm install`: install dependencies.
- `npm run dev`: run local dev server.
- `npm run build`: production build validation.
- `npm run lint`: static checks.
- `npm test`: run test suite.

If scripts differ, update this file and `README.md` in the same PR.

## Coding Style & Naming Conventions
- Use TypeScript with 2-space indentation.
- Prefer small, pure functions in `src/lib/` for business rules.
- Use `camelCase` for variables/functions, `PascalCase` for React components, and `kebab-case` for file names (except component files, e.g. `TodoCard.tsx`).
- Keep persistence fields aligned with `DATA_PERSISTENCE_WEB.md` (for example, `sortDueKey`, `doneAt`).
- Follow UI constraints from `UI_RULES.md` (swipe-only state changes, no tap toggle).

## Testing Guidelines
- Use unit tests for domain rules (sorting, badge labeling, done/delete transitions).
- Name tests `*.test.ts` or `*.test.tsx`, mirroring source paths where possible.
- Add regression tests for spec-critical behavior before refactoring.
- Run `npm test` and `npm run lint` before opening a PR.

## Commit & Pull Request Guidelines
Git history currently uses short imperative messages (for example, `Add architecture documentation for web project`, `chore: update`).
- Prefer: `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`.
- Keep commits focused and scoped to one concern.
- PRs should include: summary, changed files, test results, and linked issue/spec section.
- For UI changes, include screenshots (desktop + iPhone Safari where relevant).

## Security & Configuration Tips
- Do not commit secrets or `.env` files.
- Treat IndexedDB data as local-only prototype storage; avoid storing sensitive personal data.
