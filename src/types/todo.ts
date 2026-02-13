export type Todo = {
  id: string;
  title: string;
  memo?: string;
  createdAt: number;
  dueAt?: string;
  sortDueKey: string;
  isDone: boolean;
  doneAt?: number;
  successNote?: string;
  successScore?: number;
};

export type CreateTodoInput = {
  title: string;
  dueAt?: string;
  memo?: string;
};

export type DeadlineBadge =
  | { kind: "overdue"; label: "期限切れ" }
  | { kind: "today"; label: "今日" }
  | { kind: "inDays"; label: string };
