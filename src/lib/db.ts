import Dexie, { type Table } from "dexie";
import { buildSortDueKey } from "@/lib/domain";
import type { CreateTodoInput, Todo } from "@/types/todo";

class TodoDatabase extends Dexie {
  todos!: Table<Todo, string>;

  constructor() {
    super("todo_prototype_db");
    this.version(1).stores({
      todos: "id, isDone, sortDueKey, createdAt, doneAt"
    });
  }
}

export const db = new TodoDatabase();

const makeId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `todo_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const createTodo = async (input: CreateTodoInput): Promise<void> => {
  const now = Date.now();
  const dueAt = input.dueAt || undefined;
  await db.todos.add({
    id: makeId(),
    title: input.title.trim(),
    memo: input.memo?.trim() || undefined,
    createdAt: now,
    dueAt,
    sortDueKey: buildSortDueKey(dueAt),
    isDone: false
  });
};

export const markTodoDone = async (id: string): Promise<void> => {
  await db.todos.update(id, {
    isDone: true,
    doneAt: Date.now()
  });
};

export const deleteTodo = async (id: string): Promise<void> => {
  await db.todos.delete(id);
};

export const listPendingTodos = async (): Promise<Todo[]> => {
  const all = await db.todos.toArray();
  return all.filter((todo) => !todo.isDone);
};

export const listDoneTodos = async (): Promise<Todo[]> => {
  const all = await db.todos.toArray();
  return all.filter((todo) => todo.isDone);
};
