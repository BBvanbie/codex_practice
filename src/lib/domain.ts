import type { DeadlineBadge, Todo } from "@/types/todo";
import { compareDateOnly, parseYmdToDate, todayDateOnly } from "@/lib/date";

const NO_DUE_FALLBACK = "2100-01-01";

export const buildSortDueKey = (dueAt?: string): string => dueAt ?? NO_DUE_FALLBACK;

export const sortPendingTodos = (todos: Todo[]): Todo[] =>
  [...todos].sort((a, b) => {
    if (a.sortDueKey !== b.sortDueKey) {
      return a.sortDueKey.localeCompare(b.sortDueKey);
    }
    return a.createdAt - b.createdAt;
  });

export const sortDoneTodos = (todos: Todo[]): Todo[] =>
  [...todos].sort((a, b) => (b.doneAt ?? 0) - (a.doneAt ?? 0));

export const getDeadlineBadge = (dueAt?: string): DeadlineBadge | null => {
  if (!dueAt) return null;

  const due = parseYmdToDate(dueAt);
  const today = todayDateOnly();
  const diffDays = Math.round(compareDateOnly(due, today) / (24 * 60 * 60 * 1000));

  if (diffDays < 0) return { kind: "overdue", label: "期限切れ" };
  if (diffDays === 0) return { kind: "today", label: "今日" };
  if (diffDays <= 3) return { kind: "inDays", label: `あと${diffDays}日` };

  return null;
};
