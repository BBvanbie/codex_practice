import { describe, expect, it, vi } from "vitest";
import { buildSortDueKey, getDeadlineBadge, sortDoneTodos, sortPendingTodos } from "@/lib/domain";
import type { Todo } from "@/types/todo";

const makeTodo = (overrides: Partial<Todo>): Todo => ({
  id: "x",
  title: "t",
  createdAt: 1,
  sortDueKey: "2100-01-01",
  isDone: false,
  ...overrides
});

describe("domain helpers", () => {
  it("buildSortDueKey uses fallback for undefined due date", () => {
    expect(buildSortDueKey(undefined)).toBe("2100-01-01");
    expect(buildSortDueKey("2026-02-20")).toBe("2026-02-20");
  });

  it("sortPendingTodos sorts by due key then createdAt", () => {
    const todos = [
      makeTodo({ id: "c", sortDueKey: "2026-02-20", createdAt: 30 }),
      makeTodo({ id: "a", sortDueKey: "2026-02-19", createdAt: 20 }),
      makeTodo({ id: "b", sortDueKey: "2026-02-20", createdAt: 10 })
    ];
    expect(sortPendingTodos(todos).map((t) => t.id)).toEqual(["a", "b", "c"]);
  });

  it("sortDoneTodos sorts by doneAt descending", () => {
    const todos = [
      makeTodo({ id: "a", isDone: true, doneAt: 10 }),
      makeTodo({ id: "c", isDone: true, doneAt: 30 }),
      makeTodo({ id: "b", isDone: true, doneAt: 20 })
    ];
    expect(sortDoneTodos(todos).map((t) => t.id)).toEqual(["c", "b", "a"]);
  });

  it("getDeadlineBadge follows day-based rules", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-13T12:00:00+09:00"));

    expect(getDeadlineBadge("2026-02-12")).toEqual({ kind: "overdue", label: "期限切れ" });
    expect(getDeadlineBadge("2026-02-13")).toEqual({ kind: "today", label: "今日" });
    expect(getDeadlineBadge("2026-02-15")).toEqual({ kind: "inDays", label: "あと2日" });
    expect(getDeadlineBadge("2026-02-18")).toBeNull();
    expect(getDeadlineBadge(undefined)).toBeNull();

    vi.useRealTimers();
  });
});
