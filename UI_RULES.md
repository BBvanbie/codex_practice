# UI_RULES.md — Layout & Interaction Rules (Strict)

## 1. Page layout (Single screen)
- The page is scrollable as a whole.
- Pending section appears first, then Done section below.
- Both sections show all items (no pagination, no collapse).

## 2. Visual hierarchy
- Pending must feel more “primary” than Done:
  - stronger section title
  - slightly more spacing and prominence
- Done is calm and quiet but still readable.

## 3. Interaction rules (must)
- No tap toggles. Ever.
- Swipe only:
  - Pending: right swipe -> complete / left swipe -> delete(confirm)
  - Done: left swipe -> delete(confirm) only
- After completing, the item must visually move into Done section immediately.

## 4. Date display rules
- Pending rows may show due date as small meta text (optional but recommended).
- Done rows show done date (title + done date only requirement applies to main content).

## 5. Empty states
- Pending empty:
  - Friendly minimal message: "未完了はありません"
- Done empty:
  - "達成ログはまだありません"
- Empty states should not be loud.

## 6. Responsiveness
- iPhone: full width
- iPad/PC: center column with max width 520px

## 7. Theme
- Support light/dark mode.
- Use system font stack.
