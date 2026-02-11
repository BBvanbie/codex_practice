# CODEX_RUNBOOK_WEB.md — Codex Execution Plan

## Objective
Implement the prototype exactly per WEB_SPEC.md and deploy via Vercel.

## Steps
1) Scaffold Next.js App Router + TS + Tailwind
2) Implement Dexie DB per DATA_PERSISTENCE_WEB.md
3) Implement domain helpers:
   - sort rules (pending: sortDueKey asc, tie createdAt asc)
   - badge rules (overdue/today/in 1-3 days)
4) Build UI:
   - single page with 2 sections (pending / done log)
   - "+" opens Add modal
   - toast on completion
5) Swipe actions:
   - Pending row: right swipe -> complete, left swipe -> delete(confirm)
   - Done row: left swipe -> delete(confirm), no right swipe
   - No tap toggles
6) QA checklist:
   - reload keeps data
   - sorting matches spec
   - badge matches spec around date boundaries
   - iPhone Safari swipe works
7) Push to GitHub
8) Deploy on Vercel
9) Return:
   - URL
   - iPhone smoke test steps
   - self-check vs spec
