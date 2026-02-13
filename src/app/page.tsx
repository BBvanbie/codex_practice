"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AddTodoModal } from "@/components/AddTodoModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { PrimaryIconButton } from "@/components/PrimaryIconButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Toast } from "@/components/Toast";
import { TodoCardRow } from "@/components/TodoCardRow";
import { createTodo, deleteTodo, listDoneTodos, listPendingTodos, markTodoDone } from "@/lib/db";
import { sortDoneTodos, sortPendingTodos } from "@/lib/domain";
import type { CreateTodoInput, Todo } from "@/types/todo";

export default function HomePage() {
  const [pendingTodos, setPendingTodos] = useState<Todo[]>([]);
  const [doneTodos, setDoneTodos] = useState<Todo[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const [pending, done] = await Promise.all([listPendingTodos(), listDoneTodos()]);
    setPendingTodos(sortPendingTodos(pending));
    setDoneTodos(sortDoneTodos(done));
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1200);
    return () => clearTimeout(id);
  }, [toast]);

  const handleCreate = async (input: CreateTodoInput) => {
    await createTodo(input);
    await reload();
  };

  const handleComplete = async (id: string) => {
    await markTodoDone(id);
    setToast("🎉 達成！");
    await reload();
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteTargetId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    await deleteTodo(deleteTargetId);
    setDeleteTargetId(null);
    await reload();
  };

  const pendingRows = useMemo(
    () =>
      pendingTodos.map((todo) => (
        <TodoCardRow
          key={todo.id}
          todo={todo}
          inDoneList={false}
          onComplete={handleComplete}
          onDelete={handleDeleteRequest}
        />
      )),
    [pendingTodos]
  );

  const doneRows = useMemo(
    () =>
      doneTodos.map((todo) => (
        <TodoCardRow
          key={todo.id}
          todo={todo}
          inDoneList
          onComplete={handleComplete}
          onDelete={handleDeleteRequest}
        />
      )),
    [doneTodos]
  );

  return (
    <main className="app-shell">
      <header className="top-bar">
        <h1>Todo</h1>
        <PrimaryIconButton label="Todoを追加" onClick={() => setAddOpen(true)} />
      </header>

      <section className="section">
        <SectionHeader title="未完了" note="期限順（期限なしは最後）" primary />
        {pendingRows.length > 0 ? pendingRows : <p className="empty">未完了はありません</p>}
      </section>

      <section className="section section-done">
        <SectionHeader title="達成ログ" />
        {doneRows.length > 0 ? doneRows : <p className="empty">達成ログはまだありません</p>}
      </section>

      <AddTodoModal open={addOpen} onClose={() => setAddOpen(false)} onCreate={handleCreate} />
      <ConfirmDialog
        open={Boolean(deleteTargetId)}
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
      />
      <Toast message={toast} />
    </main>
  );
}
