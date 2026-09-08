import { useCallback, useEffect, useMemo, useState } from "react";
import AlertsRail from "./components/AlertsRail";
import KnowledgeSearch from "./components/KnowledgeSearch";
import PlanMap from "./components/PlanMap";
import SectionView from "./components/SectionView";
import WellDossier from "./components/WellDossier";
import { ACTIVE_WELL, KIND_LABEL, WELLS, type EventKind } from "./data/field";
import { formationAt, fmtDepth, predictAhead, withinRadius } from "./lib/nwis";

const ALL_KINDS = Object.keys(KIND_LABEL) as EventKind[];
const MIN_R = 800;
const MAX_R = 6000;

export default function App() {
  const [radius, setRadius] = useState(3000);
  const [selected, setSelected] = useState<string | null>("NHK-204");
  const [hovered, setHovered] = useState<string | null>(null);
  const [openEvent, setOpenEvent] = useState<string | null>(null);
  const [kinds, setKinds] = useState<Set<EventKind>>(new Set(ALL_KINDS));

  const nearby = useMemo(() => withinRadius(radius), [radius]);
  const predictions = useMemo(() => predictAhead(radius), [radius]);
  const well = useMemo(() => WELLS.find((w) => w.id === selected) ?? null, [selected]);
  const formation = formationAt(ACTIVE_WELL.bitDepth);

  // Keep the dossier pointed at a well that is still inside the radius.
  useEffect(() => {
    if (selected && !nearby.some((w) => w.id === selected)) setSelected(nearby[0]?.id ?? null);
  }, [nearby, selected]);

  const toggleKind = useCallback((k: EventKind) => {
    setKinds((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next.size ? next : new Set(ALL_KINDS);
    });
  }, []);

  const focus = useCallback((wellId: string, eventId?: string) => {
    setSelected(wellId);
    if (eventId) setOpenEvent(eventId);
    document.getElementById("dossier")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  return (
    <div className="shell">
      <header className="mast">
        <div>
          <div className="eyebrow">
            <span>eRTMAC-NWIS</span>
            <span>Oil India Limited · Upper Assam Asset</span>
            <b>SIH26121</b>
          </div>
          <h1>
            Every nearby well,<br />
            <em>remembered.</em>
          </h1>
          <p>
            Offset-well intelligence beside the real-time stream. Plan view for where the neighbours are, section view for
            what happened at this depth, and a look-ahead that fires before the bit reaches the trouble.
          </p>
        </div>
        <div className="rig-stack">
          <span className="live"><i />eRTMAC stream live</span>
          <div className="depth">
            {ACTIVE_WELL.bitDepth.toLocaleString("en-IN")}<span> m MD</span>
          </div>
          <div style={{ color: "var(--mist)", fontSize: 11 }}>
            {ACTIVE_WELL.name} · {ACTIVE_WELL.rig}
          </div>
          <div style={{ color: "var(--chalk)", fontSize: 11 }}>In {formation.name} — {formation.lithology}</div>
        </div>
      </header>

      <dl className="ticker">
        <div><dt>Rate of penetration</dt><dd>{ACTIVE_WELL.ropAvg}<small>m/hr</small></dd></div>
        <div><dt>Mud weight</dt><dd>{ACTIVE_WELL.mudWeight}<small>sg</small></dd></div>
        <div><dt>ECD</dt><dd>{ACTIVE_WELL.ecd}<small>sg</small></dd></div>
        <div><dt>Hookload</dt><dd>{ACTIVE_WELL.hookload}<small>t</small></dd></div>
        <div><dt>Torque</dt><dd>{ACTIVE_WELL.torque}<small>kNm</small></dd></div>
        <div><dt>Standpipe</dt><dd>{ACTIVE_WELL.spp}<small>bar</small></dd></div>
        <div><dt>Offsets in radius</dt><dd>{nearby.length}<small>wells</small></dd></div>
      </dl>

      <div className="controls">
        <div className="radius">
          <span className="ctl-label">Search radius</span>
          <input
            type="range"
            min={MIN_R}
            max={MAX_R}
            step={100}
            value={radius}
            aria-label="Offset well search radius in metres"
            style={{ ["--fill" as string]: `${((radius - MIN_R) / (MAX_R - MIN_R)) * 100}%` }}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
          <output>{(radius / 1000).toFixed(1)} km</output>
        </div>
        <div className="filters">
          <span className="ctl-label" style={{ marginRight: 4 }}>Event types</span>
          {ALL_KINDS.map((k) => (
            <button
              key={k}
              type="button"
              className="chip"
              aria-pressed={kinds.has(k)}
              style={{ ["--kc" as string]: `var(--k-${k})` }}
              onClick={() => toggleKind(k)}
            >
              {KIND_LABEL[k]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        <div style={{ display: "grid", gap: 22 }}>
          <section className="panel">
            <div className="panel-head">
              <h2>Plan view — offset wells</h2>
              <span className="hint">horizontal · {(radius / 1000).toFixed(1)} km radius</span>
            </div>
            <div className="panel-body">
              <PlanMap
                wells={nearby}
                radius={radius}
                selected={selected}
                hovered={hovered}
                onSelect={(id) => focus(id)}
                onHover={setHovered}
              />
              <p className="axis-tag" style={{ marginBottom: 0 }}>
                Marker colour = worst recorded severity · ring = search radius · × = abandoned
              </p>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head">
              <h2>Section view — depth &amp; formation</h2>
              <span className="hint">vertical · projected on the NE–SW trend</span>
            </div>
            <div className="panel-body">
              <SectionView
                wells={nearby}
                selected={selected}
                hovered={hovered}
                kinds={kinds}
                onSelect={(id) => focus(id)}
                onHover={setHovered}
                onPickEvent={(e) => focus(e.well, e.id)}
              />
              <p className="axis-tag" style={{ marginBottom: 0 }}>
                Bands = formations · dashes on tracks = casing shoes · shaded band = {ACTIVE_WELL.lookahead} m look-ahead from{" "}
                {fmtDepth(ACTIVE_WELL.bitDepth)}
              </p>
            </div>
          </section>
        </div>

        <div style={{ display: "grid", gap: 22 }}>
          <section className="panel">
            <div className="panel-head">
              <h2>Look-ahead alerts</h2>
              <span className="hint">next {ACTIVE_WELL.lookahead} m</span>
            </div>
            <AlertsRail predictions={predictions} onFocusWell={(id) => focus(id)} />
          </section>

          <section className="panel" id="dossier">
            <div className="panel-head">
              <h2>Offset dossier</h2>
              <span className="hint">{well ? `${withinRadius(radius).findIndex((w) => w.id === well.id) + 1} of ${nearby.length}` : "—"}</span>
            </div>
            {well ? (
              <WellDossier
                well={well}
                kinds={kinds}
                openEvent={openEvent}
                onToggleEvent={(id) => setOpenEvent((cur) => (cur === id ? null : id))}
              />
            ) : (
              <p className="empty">No offset well inside the current radius. Widen the radius to pull one in.</p>
            )}
          </section>

          <section className="panel">
            <div className="panel-head">
              <h2>Institutional memory</h2>
              <span className="hint">18 events · 9 wells</span>
            </div>
            <KnowledgeSearch radius={radius} onPick={focus} />
          </section>
        </div>
      </div>

      <div className="pipeline">
        <div className="stage">
          <div className="n">01</div>
          <h4>Ingest</h4>
          <p>Completion reports, daily drilling reports, mud logs, survey files and scanned PDFs land in one queue.</p>
        </div>
        <div className="stage">
          <div className="n">02</div>
          <h4>Extract</h4>
          <p>OCR plus domain NLP lift events, depths, mud programmes and mitigations, each kept tied to its source page.</p>
        </div>
        <div className="stage">
          <div className="n">03</div>
          <h4>Correlate</h4>
          <p>Events are placed by formation and depth, not filename, so a 2013 paper report lines up with today's bit.</p>
        </div>
        <div className="stage">
          <div className="n">04</div>
          <h4>Alert</h4>
          <p>The look-ahead model scores the next stand against offset behaviour and hands the driller the mitigation.</p>
        </div>
      </div>

      <footer className="foot">
        <span>SIH26121 · eRTMAC-NWIS · decision support, not an autopilot</span>
        <span>Demonstration data — synthetic Upper Assam field</span>
      </footer>
    </div>
  );
}
