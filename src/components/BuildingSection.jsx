// Hero drawing: a building section through a two-story school, drawn the way
// a CAD set would show it, with red Bluebeam-style markup clouds on top.
// Every stroked element gets pathLength=1 so CSS can "plot" it on load.

const P = { pathLength: 1 };

// Revision cloud around a rectangle: a chain of outward-bulging arcs,
// traversed clockwise so sweep-flag 1 always bulges outward.
export function cloudPath(x, y, w, h, step = 22) {
  const corners = [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
  let d = `M${x} ${y}`;
  for (let c = 0; c < 4; c++) {
    const [x0, y0] = corners[c];
    const [x1, y1] = corners[(c + 1) % 4];
    const len = Math.hypot(x1 - x0, y1 - y0);
    const n = Math.max(2, Math.round(len / step));
    const r = ((len / n) / 2) * 1.12;
    for (let i = 1; i <= n; i++) {
      const px = x0 + ((x1 - x0) * i) / n;
      const py = y0 + ((y1 - y0) * i) / n;
      d += ` A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${px.toFixed(1)} ${py.toFixed(1)}`;
    }
  }
  return d;
}

// Markup: cloud + leader + numbered tag. Numbers key to the notes below the drawing.
const MARKUPS = [
  { n: 1, cloud: [160, 182, 290, 80], leader: [450, 196, 486, 168], tag: [486, 152] },
  { n: 2, cloud: [520, 276, 146, 52], leader: [666, 284, 712, 250], tag: [712, 232] },
  { n: 3, cloud: [138, 442, 84, 44], leader: [222, 480, 262, 508], tag: [262, 504] },
];

function Wall({ x, pieces }) {
  // Exterior wall cut in section (solid poché), broken at window openings.
  return (
    <g>
      {pieces.map(([y0, y1]) => (
        <rect key={y0} className="poche" x={x} y={y0} width="16" height={y1 - y0} />
      ))}
      {pieces.slice(0, -1).map(([, y1], i) => {
        const yNext = pieces[i + 1][0];
        return (
          <g key={`w${y1}`} className="ln-thin">
            <line {...P} x1={x + 6} y1={y1} x2={x + 6} y2={yNext} />
            <line {...P} x1={x + 10} y1={y1} x2={x + 10} y2={yNext} />
          </g>
        );
      })}
    </g>
  );
}

function Level({ y, name, elev }) {
  return (
    <g>
      <line {...P} className="ln-thin" x1="944" y1={y} x2="1010" y2={y} />
      <circle {...P} className="ln" cx="1000" cy={y} r="8" />
      <path className="fill" d={`M1000 ${y} L1000 ${y - 8} A8 8 0 0 1 1008 ${y} Z M1000 ${y} L1000 ${y + 8} A8 8 0 0 1 992 ${y} Z`} />
      <text className="tx" x="1016" y={y - 6}>{name}</text>
      <text className="tx" x="1016" y={y + 16}>{elev}</text>
    </g>
  );
}

function Stair() {
  // 12 risers from Level 1 (y 440) up to Level 2 (y 270), climbing right to left.
  const risers = 12;
  const rise = (440 - 270) / risers;
  const run = (870 - 660) / risers;
  let d = 'M870 440';
  for (let i = 0; i < risers; i++) {
    const yTop = 440 - rise * (i + 1);
    const xLeft = 870 - run * (i + 1);
    d += ` L${(870 - run * i).toFixed(1)} ${yTop.toFixed(1)} L${xLeft.toFixed(1)} ${yTop.toFixed(1)}`;
  }
  return (
    <g>
      <path {...P} className="ln" d={d} />
    </g>
  );
}

function Duct({ x, y, w, h }) {
  return (
    <g className="ln">
      <rect {...P} x={x} y={y} width={w} height={h} fill="none" />
      <line {...P} x1={x} y1={y} x2={x + w} y2={y + h} />
      <line {...P} x1={x + w} y1={y} x2={x} y2={y + h} />
    </g>
  );
}

export default function BuildingSection({ active = null, labels = [], onHover, onSelect }) {
  return (
    <svg
      className="drawing"
      viewBox="0 0 1100 560"
      role="img"
      aria-labelledby="drawing-title drawing-desc"
    >
      <title id="drawing-title">Building section through a two-story school</title>
      <desc id="drawing-desc">
        A construction drawing with three red markups: a classroom, a duct that runs into a beam,
        and the foundation. Each markup number matches a note below the drawing.
      </desc>
      <defs>
        <pattern id="earth" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" className="hatch" />
        </pattern>
      </defs>

      {/* Grid lines and bubbles */}
      {[
        ['A', 180],
        ['B', 550],
        ['C', 920],
      ].map(([l, x]) => (
        <g key={l}>
          <line className="cl" x1={x} y1="52" x2={x} y2="530" />
          <circle {...P} className="ln" cx={x} cy="34" r="16" />
          <text className="tx tx-c" x={x} y="39">{l}</text>
        </g>
      ))}

      {/* Earth below grade */}
      <rect x="40" y="440" width="1020" height="72" fill="url(#earth)" />
      <line {...P} className="ln-heavy" x1="40" y1="440" x2="172" y2="440" />
      <line {...P} className="ln-heavy" x1="928" y1="440" x2="1060" y2="440" />

      {/* Footings */}
      <rect className="poche" x="150" y="448" width="60" height="28" />
      <rect className="poche" x="890" y="448" width="60" height="28" />
      <rect className="poche" x="527" y="448" width="46" height="22" />

      {/* Slab on grade */}
      <rect {...P} className="ln paper" x="188" y="440" width="724" height="8" />

      {/* Exterior walls with window openings, parapets up to y 92 */}
      <Wall x={172} pieces={[[92, 190], [250, 336], [406, 448]]} />
      <Wall x={912} pieces={[[92, 190], [250, 336], [406, 448]]} />

      {/* Roof and Level 2 slabs (Level 2 has a stair opening from 650 to 880) */}
      <rect className="poche" x="188" y="110" width="724" height="10" />
      <rect className="poche" x="188" y="270" width="462" height="10" />
      <rect className="poche" x="880" y="270" width="32" height="10" />

      {/* Column and beams at grid B */}
      <rect className="poche" x="545" y="140" width="10" height="130" />
      <rect className="poche" x="545" y="304" width="10" height="136" />
      <rect className="poche" x="535" y="120" width="30" height="20" />
      <rect className="poche" x="535" y="280" width="30" height="24" />

      {/* Ceilings */}
      <line className="dash" x1="188" y1="176" x2="912" y2="176" />
      <line className="dash" x1="188" y1="326" x2="650" y2="326" />

      {/* Ducts: the Level 1 one runs into the beam at B */}
      <Duct x={300} y={128} w={86} h={28} />
      <Duct x={556} y={288} w={94} h={30} />
      <Stair />

      {/* Room tags */}
      <text className="tx tx-c" x="350" y="236">CLASSROOM</text>
      <text className="tx tx-c" x="390" y="396">MULTIPURPOSE</text>

      {/* Levels */}
      <Level y={110} name="ROOF" elev={`+28'-0"`} />
      <Level y={270} name="LEVEL 2" elev={`+14'-0"`} />
      <Level y={440} name="LEVEL 1" elev={`0'-0"`} />

      {/* Dimension string */}
      <g className="ln-thin">
        <line {...P} x1="100" y1="110" x2="100" y2="440" />
        {[110, 270, 440].map((y) => (
          <g key={y}>
            <line {...P} x1="92" y1={y} x2="150" y2={y} />
            <line {...P} className="ln" x1="94" y1={y + 6} x2="106" y2={y - 6} />
          </g>
        ))}
      </g>
      <text className="tx tx-c" transform="translate(88 190) rotate(-90)">{`14'-0"`}</text>
      <text className="tx tx-c" transform="translate(88 355) rotate(-90)">{`14'-0"`}</text>

      {/* Markups */}
      {/* Markups: hover, focus or tap one to highlight its note (and the reverse) */}
      <g className={`markups${active ? ' has-active' : ''}`}>
        {MARKUPS.map(({ n, cloud, leader, tag }, i) => (
          <g
            key={n}
            className={`markup${active === n ? ' is-active' : ''}`}
            style={{ '--i': i }}
            role="button"
            tabIndex={0}
            aria-label={`Markup ${n}: ${labels[i] ?? ''}`}
            aria-pressed={active === n}
            onMouseEnter={() => onHover?.(n)}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(n)}
            onBlur={() => onHover?.(null)}
            onClick={() => onSelect?.(n)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect?.(n);
              }
            }}
          >
            <rect className="mk-hit" x={cloud[0] - 12} y={cloud[1] - 12} width={cloud[2] + 24} height={cloud[3] + 24} />
            <path {...P} className="mk" d={cloudPath(...cloud)} />
            <line {...P} className="mk" x1={leader[0]} y1={leader[1]} x2={leader[2]} y2={leader[3]} />
            <rect className="mk-tag" x={tag[0]} y={tag[1]} width="26" height="22" />
            <text className="mk-n" x={tag[0] + 13} y={tag[1] + 16}>{n}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
