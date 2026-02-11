# CODEX_DESIGN_PROMPT_ADDON_B.md — Codex Add-on (Design B)

Follow these as strict requirements:
- DESIGN_SYSTEM_B.md
- UI_RULES.md (existing rules)

Implementation requirements:
- Implement design tokens using CSS variables (globals.css) + Tailwind utilities.
- Create reusable components with consistent spacing:
  - SectionHeader
  - TodoCardRow
  - PrimaryIconButton (+)
  - BottomSheetModal
  - Toast
  - ConfirmDialog
- Keep shadows minimal; prefer border + subtle surface changes.
- Implement Dark mode via prefers-color-scheme (and optional manual toggle is OUT OF SCOPE).

Deliverables:
- Polished UI that matches checkpoints in DESIGN_SYSTEM_B.md.
- Provide 6 capture targets (describe what screen to capture) same as previous addon.
