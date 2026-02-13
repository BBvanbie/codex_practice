type Props = {
  title: string;
  note?: string;
  primary?: boolean;
};

export function SectionHeader({ title, note, primary = false }: Props) {
  return (
    <div className="section-header">
      <h2 className={primary ? "section-title section-title-primary" : "section-title"}>{title}</h2>
      {note ? <p className="section-note">{note}</p> : null}
    </div>
  );
}
