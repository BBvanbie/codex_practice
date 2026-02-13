import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createTodo, db, deleteTodo, listDoneTodos, listPendingTodos, markTodoDone } from "@/lib/db";

describe("db persistence flow", () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  afterEach(async () => {
    await db.delete();
  });

  it("shows created todos in pending list", async () => {
    await createTodo({ title: "buy milk" });

    const pending = await listPendingTodos();
    expect(pending).toHaveLength(1);
    expect(pending[0]?.title).toBe("buy milk");
    expect(pending[0]?.isDone).toBe(false);
  });

  it("moves todo from pending to done after completion", async () => {
    await createTodo({ title: "task" });
    const [todo] = await listPendingTodos();
    expect(todo).toBeTruthy();

    await markTodoDone(todo.id);

    const pending = await listPendingTodos();
    const done = await listDoneTodos();
    expect(pending).toHaveLength(0);
    expect(done).toHaveLength(1);
    expect(done[0]?.id).toBe(todo.id);
  });

  it("deletes todo from storage", async () => {
    await createTodo({ title: "task to delete" });
    const [todo] = await listPendingTodos();
    expect(todo).toBeTruthy();

    await deleteTodo(todo.id);
    const pending = await listPendingTodos();
    expect(pending).toHaveLength(0);
  });
});
