import { useRef, useState } from "react";
import type { Todo } from "@/types/todo";
import { formatEpochYmdSlash, formatYmdSlash } from "@/lib/date";
import { getDeadlineBadge } from "@/lib/domain";

type Props = {
  todo: Todo;
  inDoneList: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

const SWIPE_THRESHOLD = 80;

export function TodoCardRow({ todo, inDoneList, onComplete, onDelete }: Props) {
  const [x, setX] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);
  const badge = !inDoneList ? getDeadlineBadge(todo.dueAt) : null;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    dragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const delta = e.clientX - startX.current;
    if (inDoneList && delta > 0) {
      setX(0);
      return;
    }
    setX(Math.max(-120, Math.min(120, delta)));
  };

  const handlePointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;

    if (!inDoneList && x > SWIPE_THRESHOLD) {
      onComplete(todo.id);
    } else if (x < -SWIPE_THRESHOLD) {
      onDelete(todo.id);
    }
    setX(0);
  };

  return (
    <div className="row-wrap">
      <div className="row-actions">
        {!inDoneList ? <span className="action-complete">完了</span> : <span />}
        <span className="action-delete">削除</span>
      </div>
      <div
        className="todo-row"
        style={{ transform: `translateX(${x}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="todo-main">
          <p className="todo-title">{todo.title}</p>
          <p className="todo-meta">
            {inDoneList && todo.doneAt ? `完了日 ${formatEpochYmdSlash(todo.doneAt)}` : null}
            {!inDoneList && todo.dueAt ? `期限 ${formatYmdSlash(todo.dueAt)}` : null}
          </p>
        </div>
        {badge ? <span className={`badge badge-${badge.kind}`}>{badge.label}</span> : null}
      </div>
    </div>
  );
}
