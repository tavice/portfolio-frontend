import { cloudPath } from './BuildingSection';

// Every drawing set explains its symbols on a legend. This one is for
// visitors who have never read a construction drawing. Collapsed by default.
const ITEMS = [
  {
    symbol: (
      <svg viewBox="0 0 64 40" aria-hidden="true">
        <path className="lg-cloud" d={cloudPath(8, 8, 48, 24, 10)} />
      </svg>
    ),
    term: 'Revision cloud',
    text: 'A red cloud is a markup: someone flagging an issue on the drawing. Here they are my notes, and the number tag matches the note below.',
  },
  {
    symbol: (
      <span className="bubble bubble-sm">
        <span>1</span>
        <span>A-501</span>
      </span>
    ),
    term: 'Detail bubble',
    text: 'The view number over the sheet it lives on. Each project on this site is a "detail", and the schedule points to them the same way.',
  },
  {
    symbol: <span className="lg-sheet">A-501</span>,
    term: 'Sheet number',
    text: 'A page in the drawing set. G sheets are general information, A sheets are architectural. The panel on the side is the title block: who drew it, and which sheet you are on.',
  },
  {
    symbol: <span className="lg-sheet">RFI</span>,
    term: 'Request for information',
    text: "A formal question sent during a project, usually because the drawings don't answer something. Managing them is a big part of a PM's job, and the contact form on this site is one.",
  },
];

export default function Legend() {
  return (
    <details className="legend">
      <summary>New to construction drawings? Read the legend</summary>
      <dl className="legend-list">
        {ITEMS.map((item) => (
          <div key={item.term} className="legend-item">
            <span className="legend-symbol">{item.symbol}</span>
            <div>
              <dt>{item.term}</dt>
              <dd>{item.text}</dd>
            </div>
          </div>
        ))}
      </dl>
    </details>
  );
}
