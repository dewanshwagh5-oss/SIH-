import { useMemo, useState } from "react";
import { KIND_LABEL } from "../data/field";
import { formationAt, searchKnowledge } from "../lib/nwis";

const SUGGESTIONS = ["mud loss tipam", "kopili overpressure", "stuck pipe", "cementing bond", "fishing"];

const highlight = (text: string, term: string) => {
  if (!term) return text;
  const i = text.toLowerCase().indexOf(term);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + term.length)}</mark>
      {text.slice(i + term.length)}
    </>
  );
};

interface Props {
  radius: number;
  onPick: (wellId: string, eventId: string) => void;
}

export default function KnowledgeSearch({ radius, onPick }: Props) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => searchKnowledge(q, radius), [q, radius]);

  return (
    <>
      <div className="search-wrap">
        <label className="sr-only" htmlFor="kb">Search extracted drilling knowledge</label>
        <input
          id="kb"
          className="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask the archive — “mud loss tipam”, “kick”, “cement bond”…"
          autoComplete="off"
        />
        <div className="suggests">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" className="chip" onClick={() => setQ(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {q && !hits.length && <p className="empty">Nothing in the indexed reports matches that. 18 events across 9 wells are indexed in this demo corpus.</p>}

      {hits.map((h, i) => (
        <div
          key={h.event.id}
          className="hit"
          style={{ animationDelay: `${i * 40}ms` }}
          role="button"
          tabIndex={0}
          onClick={() => onPick(h.event.well, h.event.id)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") onPick(h.event.well, h.event.id);
          }}
        >
          <b>{highlight(h.event.headline, h.matched)}</b>
          <span className="hit-meta">
            {h.well?.id ?? h.event.well} · {h.event.depth.toLocaleString("en-IN")} m ·{" "}
            {formationAt(h.event.depth).name} · {KIND_LABEL[h.event.kind]} · {h.event.source}
          </span>
        </div>
      ))}

      {!q && (
        <p className="empty">
          The corpus behind this box is what the extraction pipeline pulled out of well completion reports, daily drilling
          reports and scanned PDFs — every hit carries the document it came from.
        </p>
      )}
    </>
  );
}
