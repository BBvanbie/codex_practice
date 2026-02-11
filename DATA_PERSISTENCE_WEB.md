# DATA_PERSISTENCE_WEB.md — Local Persistence (Web)

## Goal
- 端末内に永続化して、リロードしてもデータが残ること。

## Decision
- IndexedDB を使用する（localStorageは使わない）。
- 実装は Dexie を使用する。

## Todo Schema
- id: string (uuid)
- title: string
- memo?: string
- createdAt: number (epoch ms)
- dueAt?: string (YYYY-MM-DD)  ※時刻なし
- sortDueKey: string (YYYY-MM-DD)  ※dueAtなしは "2100-01-01"
- isDone: boolean
- doneAt?: number (epoch ms)
- successNote?: string
- successScore?: number (1..5)

## Rules
- create:
  - createdAt = now
  - isDone = false
  - dueAt があるなら sortDueKey=dueAt
  - dueAt がないなら sortDueKey="2100-01-01"
- edit:
  - dueAt を変えたら sortDueKey も必ず更新
- mark done:
  - isDone=true, doneAt=now
- (no UI) revert done:
  - isDone=false, doneAt=null, successNote=null, successScore=null
- delete:
  - confirm -> hard delete
