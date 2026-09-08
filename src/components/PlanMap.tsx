import { ACTIVE_WELL, type Well } from "../data/field";
import { bearingOf, distanceOf, eventsFor, fmtDist } from "../lib/nwis";

const W = 720;
const H = 560;
const CX = W / 2;
const CY = H / 2 + 6;
const FRAME = H / 2 - 40;

const severityColour = (wellId: string) => {
  const worst = Math.max(0, ...eventsFor(wellId).map((e) => e.severity));
  return worst >= 3 ? "var(--alarm)" : worst === 2 ? "var(--caution)" : "var(--clear)";
};

interface Props {
  wells: Well[];
  radius: number;
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export default function PlanMap({ wells, radius, selected, hovered, onSelect, onHover }: Props) {
  // The frame follows the radius, so the wells in play always fill the map.
  const px = (m: number) => (m / (radius * 1.18)) * FRAME;
  const step = radius <= 1600 ? 400 : radius <= 3200 ? 1000 : 2000;
  const rings = Array.from({ length: Math.floor((radius * 1.1) / step) }, (_, i) => (i + 1) * step);
  const active = (id: string) => selected === id || hovered === id;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Plan view of offset wells around the active rig">
      <defs>
        <radialGradient id="rigGlow">
          <stop offset="0%" stopColor="rgba(245,165,36,0.30)" />
          <stop offset="100%" stopColor="rgba(245,165,36,0)" />
        </radialGradient>
      </defs>

      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`} className="map-grid" x1={i * 60} y1={0} x2={i * 60} y2={H} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <line key={`h${i}`} className="map-grid" x1={0} y1={i * 60} x2={W} y2={i * 60} />
      ))}

      <circle cx={CX} cy={CY} r={px(radius)} className="map-radius" />
      <circle cx={CX} cy={CY} r={px(1400)} fill="url(#rigGlow)" />

      {rings.map((r) => (
        <g key={r}>
          <circle cx={CX} cy={CY} r={px(r)} className="map-ring" />
          <text className="map-ring-label" x={CX + 5} y={CY - px(r) + 12}>
            {r >= 1000 ? `${r / 1000} KM` : `${r} M`}
          </text>
        </g>
      ))}

      {wells.map((w) => {
        const x = CX + px(w.x);
        const y = CY - px(w.y);
        const on = active(w.id);
        const count = eventsFor(w.id).length;
        return (
          <g key={w.id} className="well-hit" onMouseEnter={() => onHover(w.id)} onMouseLeave={() => onHover(null)} onClick={() => onSelect(w.id)}>
            <line className={`map-link${on ? " on" : ""}`} x1={CX} y1={CY} x2={x} y2={y} />
            <circle cx={x} cy={y} r={20} fill="transparent" />
            {on && <circle cx={x} cy={y} r={13} fill="none" stroke="var(--amber)" strokeWidth={1} opacity={0.7} />}
            <circle className="well-dot" cx={x} cy={y} r={on ? 7 : 5} fill={severityColour(w.id)} />
            {w.status === "abandoned" && (
              <path d={`M${x - 8} ${y - 8} L${x + 8} ${y + 8} M${x + 8} ${y - 8} L${x - 8} ${y + 8}`} stroke="rgba(220,235,228,0.35)" strokeWidth={1} />
            )}
            <text className={`well-label${on ? " on" : ""}`} x={x + 12} y={y + 3.5} textAnchor={x > W - 190 ? "end" : "start"} transform={x > W - 190 ? `translate(${-24} 0)` : undefined}>
              {w.id}
            </text>
            <text className="well-label" x={x + 12} y={y + 15} opacity={on ? 0.95 : 0.5} textAnchor={x > W - 190 ? "end" : "start"} transform={x > W - 190 ? `translate(${-24} 0)` : undefined}>
              {fmtDist(distanceOf(w))} · {String(Math.round(bearingOf(w))).padStart(3, "0")}° · {count} events
            </text>
          </g>
        );
      })}

      <g>
        <path className="rig-cross" d={`M${CX - 13} ${CY} H${CX + 13} M${CX} ${CY - 13} V${CY + 13}`} />
        <circle cx={CX} cy={CY} r={5.5} fill="var(--amber)" />
        <text className="well-label on" x={CX - 20} y={CY + 4} textAnchor="end" style={{ fill: "var(--amber)" }}>
          {ACTIVE_WELL.id} · ACTIVE RIG
        </text>
      </g>

      <g transform="translate(26, 26)">
        <path d="M0 26 L7 0 L14 26 L7 19 Z" fill="var(--paper)" opacity={0.85} />
        <text className="well-label" x={4} y={40}>N</text>
      </g>

      <g transform={`translate(26, ${H - 34})`}>
        <line x1={0} y1={0} x2={px(step)} y2={0} stroke="var(--paper)" strokeWidth={1.2} opacity={0.7} />
        <line x1={0} y1={-4} x2={0} y2={4} stroke="var(--paper)" opacity={0.7} />
        <line x1={px(step)} y1={-4} x2={px(step)} y2={4} stroke="var(--paper)" opacity={0.7} />
        <text className="well-label" x={0} y={16}>{step.toLocaleString("en-IN")} m</text>
      </g>
    </svg>
  );
}
