type Props = {
  label: string;
  onClick: () => void;
};

export function PrimaryIconButton({ label, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className="icon-button" aria-label={label}>
      +
    </button>
  );
}
