import { ACTIVE_WELL, FORMATIONS, type EventKind, type Well, type WellEvent } from "../data/field";
import { eventsFor, hdAt } from "../lib/nwis";

const W = 720;
const H = 640;
const PAD_L = 56;
const PAD_R = 16;
const TOP = 56;
const BOTTOM = 26;
const MAX_DEPTH = 4400;
/** Section line azimuth (NE–SW field trend); offsets are projected onto it. */
const AZ = (45 * Math.PI) / 180;

const yOf = (d: number) => TOP + (d / MAX_DEPTH) * (H - TOP - BOTTOM);
const projOf = (w: Well) => w.x * Math.sin(AZ) + w.y * Math.cos(AZ);

const STRATA_FILL = [
  "rgba(220,235,228,0.030)",
  "rgba(220,235,228,0.055)",
  "rgba(74,163,223,0.075)",
  "rgba(220,235,228,0.045)",
  "rgba(245,165,36,0.070)",
  "rgba(74,163,223,0.100)",
  "rgba(220,235,228,0.060)",
];

interface Props {
  wells: Well[];
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onPickEvent: (e: WellEvent) => void;
  kinds: Set<EventKind>;
}

export default function SectionView({ wells, selected, hovered, onSelect, onHover, onPickEvent, kinds }: Props) {
  const spread = Math.max(1, ...wells.map((w) => Math.abs(projOf(w))));
  const half = (W - PAD_L - PAD_R) / 2 - 46;
  const xOf = (w: Well) => PAD_L + half + 46 + (projOf(w) / spread) * half;
  const activeX = PAD_L + half + 46;
  // Stagger the header labels left-to-right so neighbouring tracks stay legible.
  const lane = new Map<string, number>();
  [...wells].sort((a, b) => xOf(a) - xOf(b)).forEach((w, i) => lane.set(w.id, i % 2));
  const labelY = (id: string) => TOP - (lane.get(id) === 1 ? 26 : 10);

  const trackPath = (survey: { md: number; hd: number }[], baseX: number, td: number) => {
    const steps = 26;
    const pts: string[] = [];
    for (let i = 0; i <= steps; i += 1) {
      const md = (td / steps) * i;
      pts.push(`${(baseX + hdAt(survey, md) * 0.055).toFixed(1)} ${yOf(md).toFixed(1)}`);
    }
    return `M${pts.join(" L")}`;
  };

  const on = (id: string) => selected === id || hovered === id;
  const bitY = yOf(ACTIVE_WELL.bitDepth);
  const aheadY = yOf(ACTIVE_WELL.bitDepth + ACTIVE_WELL.lookahead);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Vertical section showing formations, well tracks and events by depth">
      {FORMATIONS.map((f, i) => (
        <g key={f.name} className="strata">
          <rect x={PAD_L} y={yOf(f.top)} width={W - PAD_L - PAD_R} height={yOf(f.base) - yOf(f.top)} fill={STRATA_FILL[i % STRATA_FILL.length]} />
          <line x1={PAD_L} y1={yOf(f.top)} x2={W - PAD_R} y2={yOf(f.top)} stroke="rgba(220,235,228,0.14)" strokeDasharray="2 5" />
          <text className="strata-label" x={PAD_L + 8} y={yOf(f.top) + 13}>
            {f.name}
          </text>
        </g>
      ))}

      <rect x={PAD_L} y={bitY} width={W - PAD_L - PAD_R} height={Math.max(0, aheadY - bitY)} className="lookahead" />

      {Array.from({ length: MAX_DEPTH / 400 + 1 }, (_, i) => i * 400).map((d) => (
        <g key={d}>
          <line x1={PAD_L - 5} y1={yOf(d)} x2={PAD_L} y2={yOf(d)} stroke="rgba(220,235,228,0.3)" />
          <text className="depth-tick" x={PAD_L - 9} y={yOf(d) + 3.5} textAnchor="end">
            {d}
          </text>
        </g>
      ))}
      <line x1={PAD_L} y1={TOP} x2={PAD_L} y2={H - BOTTOM} stroke="rgba(220,235,228,0.25)" />
      <text className="depth-tick" x={PAD_L - 9} y={TOP - 10} textAnchor="end">m MD</text>

      {wells.map((w) => {
        const bx = xOf(w);
        const lit = on(w.id);
        return (
          <g key={w.id} onMouseEnter={() => onHover(w.id)} onMouseLeave={() => onHover(null)}>
            <path className={`track${lit ? " on" : ""}`} d={trackPath(w.survey, bx, w.td)} />
            <g className="well-hit" onClick={() => onSelect(w.id)}>
              <rect x={bx - 22} y={labelY(w.id) - 11} width={44} height={15} fill="transparent" />
              <text className={`well-label${lit ? " on" : ""}`} x={bx} y={labelY(w.id)} textAnchor="middle">
                {w.id}
              </text>
            </g>
            {w.casing.map((c) => (
              <line key={c.size} x1={bx - 5} y1={yOf(c.shoe)} x2={bx + 5} y2={yOf(c.shoe)} stroke="rgba(220,235,228,0.5)" strokeWidth={1.6} opacity={lit ? 1 : 0.45} />
            ))}
            {eventsFor(w.id).filter((e) => kinds.has(e.kind)).map((e) => (
              <g key={e.id} className="event-mark" onClick={() => onPickEvent(e)}>
                <title>{`${e.well} · ${e.depth} m · ${e.headline}`}</title>
                <circle
                  cx={bx + hdAt(w.survey, e.depth) * 0.055}
                  cy={yOf(e.depth)}
                  r={e.severity * 1.9 + 1.4}
                  fill={`var(--k-${e.kind as EventKind})`}
                  opacity={lit ? 1 : 0.72}
                  stroke="var(--ink)"
                  strokeWidth={0.8}
                />
              </g>
            ))}
          </g>
        );
      })}

      <path className="track active" d={trackPath(ACTIVE_WELL.survey, activeX, ACTIVE_WELL.bitDepth)} />
      <path
        className="track"
        strokeDasharray="4 4"
        stroke="var(--amber-dim)"
        d={trackPath(ACTIVE_WELL.survey, activeX, 4100).replace("M", "M")}
        opacity={0.5}
      />
      <rect x={activeX - 34} y={TOP - 54} width={68} height={16} fill="var(--ink)" opacity={0.9} />
      <text className="well-label on" x={activeX} y={TOP - 42} textAnchor="middle" style={{ fill: "var(--amber)" }}>
        {ACTIVE_WELL.id}
      </text>

      <line className="bit-line" x1={PAD_L} y1={bitY} x2={W - PAD_R} y2={bitY} />
      <circle cx={activeX + hdAt(ACTIVE_WELL.survey, ACTIVE_WELL.bitDepth) * 0.055} cy={bitY} r={4.5} fill="var(--amber)" />
      <text className="depth-tick" x={W - PAD_R} y={bitY - 6} textAnchor="end" style={{ fill: "var(--amber)" }}>
        BIT {ACTIVE_WELL.bitDepth} m
      </text>
      <text className="depth-tick" x={W - PAD_R} y={aheadY + 12} textAnchor="end" style={{ fill: "var(--amber-dim)" }}>
        LOOK-AHEAD {ACTIVE_WELL.lookahead} m
      </text>
    </svg>
  );
}
