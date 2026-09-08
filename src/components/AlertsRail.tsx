import type { Prediction } from "../lib/nwis";
import { fmtDepth } from "../lib/nwis";

interface Props {
  predictions: Prediction[];
  onFocusWell: (id: string) => void;
}

export default function AlertsRail({ predictions, onFocusWell }: Props) {
  if (!predictions.length) {
    return <p className="empty">No offset evidence inside the look-ahead window at this radius. Widen the search radius to correlate more wells.</p>;
  }

  return (
    <div>
      {predictions.map((p, i) => (
        <article className="alert" key={p.id} style={{ ["--kc" as string]: `var(--k-${p.kind})`, animationDelay: `${i * 70}ms` }}>
          <div className="alert-top">
            <strong>{p.label} expected</strong>
            <span className="conf">{Math.round(p.confidence * 100)}%</span>
          </div>
          <div className="meter">
            <i style={{ width: `${p.confidence * 100}%`, animationDelay: `${i * 70 + 120}ms` }} />
          </div>
          <div className="alert-meta">
            <span>≈ {fmtDepth(p.depth)} MD</span>
            <span>{p.distanceAhead} m ahead of bit</span>
            <span>{p.formation}</span>
            <span>{p.evidence.length} offset precedent{p.evidence.length > 1 ? "s" : ""}</span>
          </div>
          <p>{p.recommendation}</p>
          <div className="evidence">
            {p.evidence.slice(0, 3).map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => onFocusWell(e.well)}
                style={{ background: "none", border: 0, padding: 0, color: "inherit", font: "inherit", textAlign: "left", cursor: "pointer" }}
              >
                <b>{e.well}</b> · {e.depth} m · {e.headline}
              </button>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
