type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  title = "削除しますか？",
  message = "この操作は元に戻せません。",
  onCancel,
  onConfirm
}: Props) {
  if (!open) return null;

  return (
    <div className="overlay" role="dialog" aria-modal="true" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button type="button" className="text-button" onClick={onCancel}>
            キャンセル
          </button>
          <button type="button" className="danger-button" onClick={onConfirm}>
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
