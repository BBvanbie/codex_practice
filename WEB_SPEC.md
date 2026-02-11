# WEB_SPEC.md — Web Prototype Spec (No PWA)

## 1. Goal
- iOS版に移行する前に、UXと操作感を検証できるWeb試作品を作る。
- ブラウザで動けばOK（PWA不要 / オフライン要件なし）。

## 2. Scope (Must)
### UI (Single page)
- 1画面で上下分割
  - 上: 未完了Todo一覧
  - 下: 達成ログ（完了済みTodo）
- 右上に「＋」ボタン → 追加モーダルを開く

### Add (Modal)
- 入力: title(必須), dueAt(任意: 日付), memo(任意)
- title未入力は保存不可
- 保存後はモーダルを閉じる

### Done / Delete (Swipe only)
- 未完了リスト
  - 右スワイプ: 完了
  - 左スワイプ: 削除（確認ダイアログ必須）
- 達成ログ
  - 左スワイプ: 削除（確認ダイアログ必須）
  - 右スワイプ: 無し
- タップで状態変更は一切しない

### Auto sort
- 未完了: 期限が近い順（期限なしは必ず最下部）
- 達成ログ: doneAt 新しい順（降順）
- 過去分もすべてスクロールで見える

### Deadline badge (display only)
- 未完了のみ。並び順は変えず表示だけ強調。
- 判定は「日付単位（時刻無視）」。
  - dueAt < 今日 -> 「期限切れ」
  - dueAt == 今日 -> 「今日」
  - dueAt が 今日+1〜3日 -> 「あとX日」
  - それ以外 / dueAt==null -> 表示なし

### Feedback on completion
- 完了時は軽いトースト（例: "🎉 達成！"）を表示

## 3. Out of scope (Not now)
- PWA / オフライン
- ログの詳細表示画面
- アカウント / 同期
- リマインド通知
