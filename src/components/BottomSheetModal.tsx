import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function BottomSheetModal({ open, title, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header">
          <h3>{title}</h3>
          <button type="button" className="text-button" onClick={onClose}>
            閉じる
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
