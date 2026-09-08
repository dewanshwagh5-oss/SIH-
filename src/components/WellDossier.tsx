import { KIND_LABEL, type EventKind, type Well, type WellEvent } from "../data/field";
import { bearingOf, distanceOf, eventsFor, fmtDist, formationAt } from "../lib/nwis";

interface Props {
  well: Well;
  openEvent: string | null;
  onToggleEvent: (id: string) => void;
  kinds: Set<EventKind>;
}

export default function WellDossier({ well, openEvent, onToggleEvent, kinds }: Props) {
  const events: WellEvent[] = eventsFor(well.id).filter((e) => kinds.has(e.kind));

  return (
    <>
      <div className="dossier-head">
        <h3>{well.name}</h3>
        <div className="tags">
          <span>Offset <b>{fmtDist(distanceOf(well))}</b></span>
          <span>Bearing <b>{String(Math.round(bearingOf(well))).padStart(3, "0")}°</b></span>
          <span>TD <b>{well.td.toLocaleString("en-IN")} m</b></span>
          <span>Spudded <b>{well.spudded}</b></span>
          <span>Status <b>{well.status}</b></span>
        </div>
        <div className="tags" style={{ marginTop: 2 }}>
          <span>Casing <b>{well.casing.map((c) => `${c.size} @ ${c.shoe} m`).join("  ·  ")}</b></span>
        </div>
        <p style={{ margin: "6px 0 0", color: "var(--mist)", fontSize: 11.5 }}>{well.operatorNote}</p>
      </div>

      <div className="log">
        {events.map((e) => {
          const open = openEvent === e.id;
          return (
            <div
              className="log-row"
              key={e.id}
              data-open={open}
              style={{ ["--kc" as string]: `var(--k-${e.kind})` }}
              onClick={() => onToggleEvent(e.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  onToggleEvent(e.id);
                }
              }}
            >
              <div className="log-depth">
                {e.depth.toLocaleString("en-IN")}
                <small>{formationAt(e.depth).name}</small>
              </div>
              <div>
                <div className="log-title">
                  <i className="dot" />
                  <span>{e.headline}</span>
                </div>
                <div className="log-sub">
                  {KIND_LABEL[e.kind]} · severity {e.severity}/3 · {e.date}
                </div>
                {open && (
                  <div className="log-detail">
                    <p className="lede" style={{ margin: 0 }}>{e.detail}</p>
                    <p className="fix" style={{ margin: 0 }}>{e.mitigation}</p>
                    <span className="src">Source — {e.source}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {!events.length && <p className="empty">No events match the active event-type filter for this well.</p>}
      </div>
    </>
  );
}
