// Drawing title as it appears under a view on a sheet: a detail bubble
// (view number over sheet number), the title underlined, and a line below.
export default function DrawingTitle({ no, sheet, title, sub, as: Tag = 'h2', id }) {
  return (
    <div className="dtitle">
      <span className="bubble" aria-hidden="true">
        <span>{no}</span>
        <span>{sheet}</span>
      </span>
      <div>
        <Tag className="dtitle-text" id={id}>
          {title}
        </Tag>
        {sub && <p className="dtitle-sub">{sub}</p>}
      </div>
    </div>
  );
}
