// Section label styled like a drawing sheet reference: "A-01 / Selected work".
export default function SheetLabel({ no, children }) {
  return (
    <div className="sheet-label mono">
      <b>{no}</b>
      <span>{children}</span>
    </div>
  );
}
