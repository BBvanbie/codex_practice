# ARCHITECTURE_WEB.md — Stack & Structure

## Stack
- Next.js (App Router) + TypeScript
- Styling: Tailwind CSS（軽く整える程度）
- Persistence: Dexie (IndexedDB)
- Gestures: @use-gesture/react + CSS transform (or equivalent)
  - Must support iPhone Safari touch.

## Project structure (recommended)
- app/
  - page.tsx (Main screen)
- components/
  - TodoRow.tsx (swipe actions)
  - AddTodoModal.tsx
  - Toast.tsx
  - ConfirmDialog.tsx
- lib/
  - db.ts (Dexie schema + CRUD)
  - domain.ts (sorting + deadline badge calc)
  - date.ts (date helpers: today, addDays, compare by day)
- types/
  - todo.ts

## Non-functional
- No PWA.
- No server required: fully client-side for the prototype.
