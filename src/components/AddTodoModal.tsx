import { useState } from "react";
import { BottomSheetModal } from "@/components/BottomSheetModal";
import type { CreateTodoInput } from "@/types/todo";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateTodoInput) => Promise<void>;
};

export function AddTodoModal({ open, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [memo, setMemo] = useState("");
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setTitle("");
    setDueAt("");
    setMemo("");
  };

  const handleClose = () => {
    if (saving) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onCreate({
      title: title.trim(),
      dueAt: dueAt || undefined,
      memo: memo || undefined
    });
    setSaving(false);
    reset();
    onClose();
  };

  return (
    <BottomSheetModal open={open} title="Todoを追加" onClose={handleClose}>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>タイトル</span>
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例: ジムに行く"
            required
          />
        </label>
        <label>
          <span>期限日</span>
          <input type="date" value={dueAt} onChange={(e) => setDueAt(e.target.value)} />
        </label>
        <label>
          <span>メモ</span>
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} rows={3} />
        </label>
        <div className="form-actions">
          <button type="button" className="text-button" onClick={handleClose}>
            キャンセル
          </button>
          <button type="submit" className="primary-button" disabled={!title.trim() || saving}>
            追加
          </button>
        </div>
      </form>
    </BottomSheetModal>
  );
}
