import {
  ACTIVE_WELL,
  EVENTS,
  FORMATIONS,
  KIND_LABEL,
  WELLS,
  type EventKind,
  type WellEvent,
  type Well,
} from "../data/field";

export const distanceOf = (w: Well) => Math.hypot(w.x, w.y);

export const bearingOf = (w: Well) => {
  const deg = (Math.atan2(w.x, w.y) * 180) / Math.PI;
  return (deg + 360) % 360;
};

export const withinRadius = (radius: number) =>
  WELLS.filter((w) => distanceOf(w) <= radius).sort((a, b) => distanceOf(a) - distanceOf(b));

export const formationAt = (depth: number) =>
  FORMATIONS.find((f) => depth >= f.top && depth < f.base) ?? FORMATIONS[FORMATIONS.length - 1];

export const eventsFor = (wellId: string) =>
  EVENTS.filter((e) => e.well === wellId).sort((a, b) => a.depth - b.depth);

/** Horizontal displacement of a well at a given measured depth, linearly interpolated. */
export const hdAt = (survey: { md: number; hd: number }[], md: number) => {
  if (md <= survey[0].md) return survey[0].hd;
  for (let i = 1; i < survey.length; i += 1) {
    if (md <= survey[i].md) {
      const a = survey[i - 1];
      const b = survey[i];
      return a.hd + ((md - a.md) / (b.md - a.md)) * (b.hd - a.hd);
    }
  }
  return survey[survey.length - 1].hd;
};

export interface Prediction {
  id: string;
  kind: EventKind;
  label: string;
  depth: number;
  distanceAhead: number;
  confidence: number;
  formation: string;
  evidence: WellEvent[];
  recommendation: string;
}

const RECOMMENDATION: Partial<Record<EventKind, string>> = {
  "mud-loss": "Pre-mix a calcium-carbonate blend and trim mud weight before the formation top.",
  overpressure: "Step mud weight up ahead of the ramp and flow-check every stand.",
  "stuck-pipe": "Hold static time under 15 minutes; keep the string moving on surveys.",
  "torque-spike": "Drop RPM, raise sweep frequency, back-ream through the coal streaks.",
  kick: "Verify the kill sheet and pressure-test the BOP before entering the interval.",
  cementing: "Use the foamed lead slurry design proven on NHK-204.",
  fishing: "Watch for cyclic torque — the twist-off precursor on NHK-198.",
};

/**
 * Look-ahead risk model. Production replaces this with the trained model; the
 * feature set (offset distance, depth proximity, severity, recency) is the same.
 */
export function predictAhead(radius: number, window = ACTIVE_WELL.lookahead): Prediction[] {
  const from = ACTIVE_WELL.bitDepth;
  const to = from + window;
  const near = withinRadius(radius);
  const nearIds = new Set(near.map((w) => w.id));

  const buckets = new Map<EventKind, WellEvent[]>();
  for (const e of EVENTS) {
    if (!nearIds.has(e.well) || e.kind === "npt") continue;
    if (e.depth < from - 40 || e.depth > to) continue;
    buckets.set(e.kind, [...(buckets.get(e.kind) ?? []), e]);
  }

  return [...buckets.entries()]
    .map(([kind, evidence]) => {
      const depth = Math.round(evidence.reduce((s, e) => s + e.depth, 0) / evidence.length);
      const proximity = evidence.reduce((best, e) => {
        const w = near.find((n) => n.id === e.well);
        return Math.min(best, w ? distanceOf(w) : radius);
      }, radius);
      const severity = Math.max(...evidence.map((e) => e.severity));
      const confidence = Math.min(
        0.97,
        0.34 + evidence.length * 0.13 + severity * 0.09 + (1 - proximity / radius) * 0.24,
      );
      return {
        id: `P-${kind}`,
        kind,
        label: KIND_LABEL[kind],
        depth,
        distanceAhead: Math.max(0, depth - from),
        confidence,
        formation: formationAt(depth).name,
        evidence: evidence.sort((a, b) => b.severity - a.severity),
        recommendation: RECOMMENDATION[kind] ?? "Review the offset evidence before proceeding.",
      };
    })
    .sort((a, b) => b.confidence - a.confidence);
}

export interface SearchHit {
  event: WellEvent;
  well: Well | undefined;
  score: number;
  matched: string;
}

/** Ranked retrieval over the extracted knowledge base. */
export function searchKnowledge(query: string, radius: number): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const nearIds = new Set(withinRadius(radius).map((w) => w.id));

  return EVENTS.map((event) => {
    const well = WELLS.find((w) => w.id === event.well);
    const haystack = [
      event.headline,
      event.detail,
      event.mitigation,
      event.source,
      KIND_LABEL[event.kind],
      formationAt(event.depth).name,
      well?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    let matched = "";
    for (const t of terms) {
      if (!haystack.includes(t)) continue;
      score += event.headline.toLowerCase().includes(t) ? 3 : 1;
      if (!matched) matched = t;
    }
    if (score && nearIds.has(event.well)) score += 1.5;
    return { event, well, score, matched };
  })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score || a.event.depth - b.event.depth)
    .slice(0, 8);
}

export const fmtDepth = (d: number) => `${d.toLocaleString("en-IN")} m`;
export const fmtDist = (d: number) => (d >= 1000 ? `${(d / 1000).toFixed(2)} km` : `${Math.round(d)} m`);
