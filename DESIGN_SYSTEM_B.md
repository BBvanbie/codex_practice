# DESIGN_SYSTEM_B.md — Polished Product UI (Linear/Notion-inspired, iOS-friendly)

## 0. Intent
- iOSで違和感がない操作感を保ちつつ、見た目は「プロダクトっぽい洗練」へ寄せる。
- 派手さより“密度の最適化・タイポ・整列・コントラスト”で勝つ。

---

## 1. Layout
- Max content width: 560px (desktopでもプロダクト感)
- Page padding: 16px
- Vertical spacing scale: 8 / 12 / 16 / 20 / 24 / 32
- Section spacing:
  - Title ↔ list: 10px
  - Pending ↔ Done: 24px

---

## 2. Typography
- Font: system-ui stack
- App title: 18–20, semibold
- Section title: 14, semibold
- Row title: 15–16, medium
- Meta: 12–13, regular
- Line-height: comfortable (1.35–1.5)
- Use tabular numbers for dates (visual stability)

---

## 3. Color tokens (use CSS variables)
### Light
- --bg: #F6F7FB (soft cool)
- --surface: #FFFFFF
- --surface-2: #FBFBFD
- --text: #0B0F1A
- --text-2: #5B6475
- --border: rgba(15, 23, 42, 0.08)
- --accent: #2F6BFF
- --accent-2: rgba(47, 107, 255, 0.12)
- --danger: #FF3B30
- --danger-2: rgba(255, 59, 48, 0.12)
- --success: #22C55E
- --success-2: rgba(34, 197, 94, 0.12)
- --warning: #F97316
- --warning-2: rgba(249, 115, 22, 0.14)

### Dark
- --bg: #0B0F1A
- --surface: #101828
- --surface-2: #0F172A
- --text: #E6EAF2
- --text-2: #A7B0C0
- --border: rgba(148, 163, 184, 0.14)
- --accent: #7AA2FF
- --accent-2: rgba(122, 162, 255, 0.16)
- --danger: #FF6B61
- --danger-2: rgba(255, 107, 97, 0.18)
- --success: #34D399
- --success-2: rgba(52, 211, 153, 0.18)
- --warning: #FB923C
- --warning-2: rgba(251, 146, 60, 0.18)

---

## 4. Surfaces & Borders
- Cards are flat + border (not heavy shadows)
- Border: 1px solid var(--border)
- Card background: var(--surface)
- Subtle inner separation with dividers using var(--border)

---

## 5. Radius
- Card: 16px
- Button: 12px
- Modal sheet: 20px
- Badge: 999px

---

## 6. Primary Components

### 6.1 Top Bar
- Title left: "Todo"
- Right: "+" button
  - 40x40
  - Background: var(--accent)
  - Icon: white
  - Hover/press: slightly darker / 0.98 scale

### 6.2 Section Header
- Left: section title
- Right (optional micro text): pending sort rule summary
- Keep quiet: use --text-2

### 6.3 Todo Card Row
- Height: auto, padding 14–16
- Left: title (max 2 lines)
- Right: badge (only pending & rule matched)
- Bottom line (meta row):
  - Pending: due date if exists (YYYY/MM/DD)
  - Done: done date (YYYY/MM/DD)
- Press feedback: background becomes --surface-2 (no toggles)

### 6.4 Badges
- Overdue: background --danger-2, text --danger, label "期限切れ"
- Today: background --warning-2, text --warning, label "今日"
- In 1–3 days: background --accent-2, text --accent, label "あとX日"

### 6.5 Swipe Actions
- Right swipe complete:
  - background: --success
  - label: "完了"
- Left swipe delete:
  - background: --danger
  - label: "削除"
- Action surface should fill row height and feel solid.
- Reveal threshold & snap should feel deliberate (avoid accidental triggers).

### 6.6 Modal (Add Todo)
- Bottom sheet style, max width same as content column
- Fields:
  - title: large input, autofocus
  - due date: compact date picker
  - memo: textarea
- Buttons:
  - Primary: "追加" (accent)
  - Secondary: "キャンセル" (text)
- Disabled primary when title empty

### 6.7 Toast
- Bottom center, floating card
- Background: var(--surface)
- Border: 1px solid --border
- Text: --text
- Duration ~1.2s

### 6.8 Confirm Dialog
- Product-style modal (not native alert imitation)
- Title: "削除しますか？"
- Body: "この操作は元に戻せません。"
- Buttons: Cancel / Delete (danger)

---

## 7. Motion (Subtle)
- All animation durations: 160–240ms
- Use easing: ease-out for modal, spring-ish for swipe but not bouncy
- Respect prefers-reduced-motion

---

## 8. Accessibility
- Touch target >= 44px
- Keyboard focus ring visible (accent)
- Don’t rely only on color (badge text mandatory)

---

## 9. Visual checkpoints
- The UI should look “shipping-ready” on:
  - iPhone Safari (light/dark)
  - Desktop Chrome (center column, clean spacing)
