# eRTMAC-NWIS — Nearby Wells Intelligence System

Front-end for **SIH26121** (Smart India Hackathon 2026, Oil India Limited, theme *Smart Automation*):
an AI-powered offset-well knowledge and decision-support platform that sits alongside the eRTMAC
real-time drilling stream.

The premise of the problem statement is that drilling decisions need more than the active well's
live data — they need what happened in the wells drilled nearby, which today is scattered across
well completion reports, daily drilling reports and scanned PDFs. This interface is the surface for
that institutional memory.

## What the interface does

| Area | What it answers |
| --- | --- |
| **Plan view** (horizontal map) | Where the offset wells are, relative to the active rig, inside a user-set radius. Marker colour encodes the worst severity ever recorded on that well; bearing, offset distance and event count are on the label. |
| **Section view** (vertical map) | What happened *at this depth*. Formation bands, well tracks projected onto the field trend, casing shoes, every extracted event plotted at its measured depth, the current bit depth and the look-ahead window. |
| **Look-ahead alerts** | Risks scored for the next 260 m of hole from offset behaviour, each with the precedents it was derived from and the mitigation that worked. |
| **Offset dossier** | The full extracted drilling history for one well — event, detail, mitigation, and the source document the text came from. |
| **Institutional memory** | Ranked retrieval across the extracted corpus, so a 2013 scanned report is one query away. |

The two maps and every panel share one selection: hover or click a well anywhere and it lights up
everywhere, at the same depth and the same coordinates.

## Design notes

Built as a control-room instrument rather than a generic dashboard: a petroleum-dark ground with a
hairline survey grid, signal amber for the active well, mud-log colour coding by event type, and
`Instrument Serif` against `IBM Plex Mono` so headings read editorial and every number reads as an
instrument. Motion is used only where it carries meaning — the live-stream pulse, staggered alert
entry, and confidence meters that fill.

Both maps are hand-drawn SVG (no mapping or charting dependency), so they scale, theme and animate
with the rest of the interface and add nothing to the bundle.

## Data

`src/data/field.ts` holds a synthetic-but-plausible Upper Assam dataset — 9 offset wells, 7
formations, 18 extracted events with sources. It is the seam where a deployment plugs in the real
eRTMAC stream and the extraction pipeline output; nothing else in the app assumes mock data.
`src/lib/nwis.ts` holds the geometry, the look-ahead scoring and the retrieval ranking, with the same
feature set a trained model would consume.

## Running it

```bash
npm install
npm run dev      # development server
npm run build    # typecheck + production build to dist/
npm run preview  # serve the build
```

React 18 + TypeScript + Vite. No runtime dependencies beyond React.
