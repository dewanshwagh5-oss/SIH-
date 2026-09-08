/**
 * Synthetic-but-plausible field dataset for the Upper Assam (Dibrugarh/Tinsukia)
 * operating area. Depths in metres MD, offsets in metres on a local grid whose
 * origin is the active rig. Real deployments swap this module for the eRTMAC
 * stream plus the extraction pipeline output.
 */

export type EventKind =
  | "mud-loss"
  | "kick"
  | "stuck-pipe"
  | "overpressure"
  | "torque-spike"
  | "cementing"
  | "fishing"
  | "npt";

export interface WellEvent {
  id: string;
  well: string;
  depth: number;
  kind: EventKind;
  severity: 1 | 2 | 3;
  date: string;
  headline: string;
  detail: string;
  mitigation: string;
  source: string;
}

export interface Formation {
  name: string;
  top: number;
  base: number;
  lithology: string;
  note: string;
}

export interface Well {
  id: string;
  name: string;
  /** metres east / north of the active rig */
  x: number;
  y: number;
  spudded: string;
  td: number;
  status: "producing" | "abandoned" | "suspended" | "injector" | "drilling";
  operatorNote: string;
  /** MD -> horizontal displacement, drives the section-view trajectory */
  survey: { md: number; hd: number }[];
  casing: { size: string; shoe: number }[];
}

export const FORMATIONS: Formation[] = [
  { name: "Dihing", top: 0, base: 520, lithology: "Loose sand, pebble beds", note: "Shallow washouts; keep flow rate moderate." },
  { name: "Dhekiajuli", top: 520, base: 1180, lithology: "Sand–clay alternation", note: "Ballooning reported in three offsets." },
  { name: "Tipam Sandstone", top: 1180, base: 2050, lithology: "Massive coarse sandstone", note: "Primary seepage-loss interval across the field." },
  { name: "Barail", top: 2050, base: 2980, lithology: "Sandstone with coal streaks", note: "Coal caving drives torque and drag spikes." },
  { name: "Kopili Shale", top: 2980, base: 3520, lithology: "Grey fissile shale", note: "Reactive; pressure ramp begins near 3 150 m." },
  { name: "Sylhet Limestone", top: 3520, base: 3980, lithology: "Fractured limestone", note: "Total-loss risk where fractures are open." },
  { name: "Langpar", top: 3980, base: 4400, lithology: "Calcareous shale / marl", note: "Reservoir approach; tighten gas monitoring." },
];

export const ACTIVE_WELL = {
  id: "NHK-217",
  name: "Nahorkatiya NHK-217",
  rig: "OIL E-1400 / Rig-32",
  bitDepth: 3062,
  ropAvg: 6.4,
  mudWeight: 1.42,
  ecd: 1.49,
  hookload: 184,
  torque: 18.2,
  spp: 231,
  lookahead: 260,
  survey: [
    { md: 0, hd: 0 },
    { md: 900, hd: 4 },
    { md: 1600, hd: 62 },
    { md: 2300, hd: 218 },
    { md: 2900, hd: 402 },
    { md: 3400, hd: 585 },
    { md: 4100, hd: 812 },
  ],
};

export const WELLS: Well[] = [
  {
    id: "NHK-204", name: "Nahorkatiya NHK-204", x: -640, y: 410, spudded: "2019-03-11", td: 4120,
    status: "producing", operatorNote: "Closest analogue on trajectory and mud programme.",
    survey: [{ md: 0, hd: 0 }, { md: 1500, hd: 38 }, { md: 2600, hd: 260 }, { md: 4120, hd: 690 }],
    casing: [{ size: '13⅜"', shoe: 620 }, { size: '9⅝"', shoe: 2085 }, { size: '7"', shoe: 3540 }],
  },
  {
    id: "NHK-198", name: "Nahorkatiya NHK-198", x: 880, y: -260, spudded: "2017-11-02", td: 3980,
    status: "suspended", operatorNote: "Suspended after fishing job in the Kopili.",
    survey: [{ md: 0, hd: 0 }, { md: 1400, hd: 20 }, { md: 2800, hd: 170 }, { md: 3980, hd: 430 }],
    casing: [{ size: '13⅜"', shoe: 580 }, { size: '9⅝"', shoe: 1990 }],
  },
  {
    id: "DKI-11", name: "Dikom DKI-11", x: -1720, y: -980, spudded: "2021-06-24", td: 4310,
    status: "producing", operatorNote: "Same Sylhet fracture trend, drilled with managed pressure.",
    survey: [{ md: 0, hd: 0 }, { md: 1800, hd: 90 }, { md: 3200, hd: 420 }, { md: 4310, hd: 905 }],
    casing: [{ size: '13⅜"', shoe: 705 }, { size: '9⅝"', shoe: 2240 }, { size: '7"', shoe: 3860 }],
  },
  {
    id: "HGJ-06", name: "Hapjan HGJ-06", x: 2140, y: 1520, spudded: "2015-01-19", td: 3640,
    status: "abandoned", operatorNote: "Abandoned above target after sustained losses.",
    survey: [{ md: 0, hd: 0 }, { md: 1200, hd: 15 }, { md: 2400, hd: 120 }, { md: 3640, hd: 350 }],
    casing: [{ size: '13⅜"', shoe: 540 }, { size: '9⅝"', shoe: 2010 }],
  },
  {
    id: "MRN-42", name: "Moran MRN-42", x: -2880, y: 2260, spudded: "2022-09-30", td: 4450,
    status: "producing", operatorNote: "Best-in-field Barail section; reference torque programme.",
    survey: [{ md: 0, hd: 0 }, { md: 1600, hd: 45 }, { md: 3000, hd: 300 }, { md: 4450, hd: 780 }],
    casing: [{ size: '13⅜"', shoe: 660 }, { size: '9⅝"', shoe: 2120 }, { size: '7"', shoe: 3980 }],
  },
  {
    id: "BGN-3", name: "Baghjan BGN-3", x: 3260, y: -1880, spudded: "2018-04-07", td: 3870,
    status: "injector", operatorNote: "Converted to water injection in 2023.",
    survey: [{ md: 0, hd: 0 }, { md: 1500, hd: 25 }, { md: 2900, hd: 200 }, { md: 3870, hd: 460 }],
    casing: [{ size: '13⅜"', shoe: 600 }, { size: '9⅝"', shoe: 2060 }],
  },
  {
    id: "NHK-176", name: "Nahorkatiya NHK-176", x: 420, y: 1340, spudded: "2013-08-15", td: 3410,
    status: "abandoned", operatorNote: "Legacy well; only scanned paper WCR available.",
    survey: [{ md: 0, hd: 0 }, { md: 1200, hd: 10 }, { md: 2400, hd: 95 }, { md: 3410, hd: 260 }],
    casing: [{ size: '13⅜"', shoe: 505 }, { size: '9⅝"', shoe: 1940 }],
  },
  {
    id: "TNS-09", name: "Tengakhat TNS-09", x: -3960, y: -3120, spudded: "2020-02-11", td: 4180,
    status: "producing", operatorNote: "Outside the usual radius; useful Kopili pressure control.",
    survey: [{ md: 0, hd: 0 }, { md: 1700, hd: 60 }, { md: 3100, hd: 340 }, { md: 4180, hd: 700 }],
    casing: [{ size: '13⅜"', shoe: 640 }, { size: '9⅝"', shoe: 2170 }, { size: '7"', shoe: 3760 }],
  },
  {
    id: "SHK-2", name: "Shalmari SHK-2", x: 4680, y: 3320, spudded: "2016-05-28", td: 3290,
    status: "suspended", operatorNote: "Shallow structure, limited correlation below Barail.",
    survey: [{ md: 0, hd: 0 }, { md: 1300, hd: 30 }, { md: 2500, hd: 150 }, { md: 3290, hd: 300 }],
    casing: [{ size: '13⅜"', shoe: 560 }, { size: '9⅝"', shoe: 1980 }],
  },
];

export const EVENTS: WellEvent[] = [
  {
    id: "E-01", well: "NHK-204", depth: 1382, kind: "mud-loss", severity: 2, date: "2019-04-02",
    headline: "Seepage loss 4.2 m³/hr entering Tipam",
    detail: "Losses began 18 m below the Tipam top and held for 140 m of section. Returns never fully stopped; ECD read 1.51 sg against a 1.44 sg mud.",
    mitigation: "Cut mud weight to 1.38 sg, pumped 40 bbl of medium LCM sweep every second stand.",
    source: "DDR NHK-204 / 2019-04-02, p.2",
  },
  {
    id: "E-02", well: "NHK-204", depth: 2412, kind: "torque-spike", severity: 2, date: "2019-05-19",
    headline: "Torque climbed 6 kNm across Barail coal streaks",
    detail: "Coal cavings on shakers coincided with rotating torque rising from 14 to 20 kNm over three stands.",
    mitigation: "Raised sweep frequency, dropped RPM to 90, back-reamed every connection through the interval.",
    source: "WCR NHK-204 §5.3",
  },
  {
    id: "E-03", well: "NHK-204", depth: 3168, kind: "overpressure", severity: 3, date: "2019-06-08",
    headline: "Pressure ramp in Kopili Shale, 0.09 sg jump required",
    detail: "Connection gas rose to 4.8 % and background gas doubled within 60 m. Pore pressure re-modelled at 1.49 sg equivalent.",
    mitigation: "Mud weight raised 1.44 → 1.53 sg in two steps; flow checks every stand.",
    source: "DDR NHK-204 / 2019-06-08",
  },
  {
    id: "E-04", well: "NHK-198", depth: 3244, kind: "stuck-pipe", severity: 3, date: "2018-01-14",
    headline: "Differential sticking after a 42-minute static period",
    detail: "String stuck at 3 244 m while making a survey; overpull reached 55 t before the string freed.",
    mitigation: "Spotted 30 bbl of oil-base pill, worked string; kept static time under 15 min thereafter.",
    source: "DDR NHK-198 / 2018-01-14",
  },
  {
    id: "E-05", well: "NHK-198", depth: 3310, kind: "fishing", severity: 3, date: "2018-01-27",
    headline: "Twist-off, 11 days of fishing before sidetrack",
    detail: "Bottom-hole assembly parted at the jar; four fishing runs recovered most of the assembly.",
    mitigation: "Sidetracked at 3 120 m. Post-job review flagged cyclic torque as the root cause.",
    source: "WCR NHK-198 §7 (fishing report)",
  },
  {
    id: "E-06", well: "DKI-11", depth: 3585, kind: "mud-loss", severity: 3, date: "2021-08-21",
    headline: "Total losses at the Sylhet Limestone top",
    detail: "Returns lost completely 65 m into the limestone; 380 bbl lost before the well was made static.",
    mitigation: "Two cement plugs, then drilled ahead with managed-pressure equipment at 1.46 sg.",
    source: "WCR DKI-11 §6.1",
  },
  {
    id: "E-07", well: "DKI-11", depth: 3092, kind: "overpressure", severity: 2, date: "2021-07-30",
    headline: "Kopili pressure ramp confirmed on the same trend",
    detail: "Mirrors NHK-204 within 76 m of measured depth. Gas trend and shale density both consistent.",
    mitigation: "Pre-emptive weight-up before entering the interval; no non-productive time.",
    source: "DDR DKI-11 / 2021-07-30",
  },
  {
    id: "E-08", well: "HGJ-06", depth: 1421, kind: "mud-loss", severity: 3, date: "2015-03-02",
    headline: "Severe Tipam losses, 12.5 m³/hr",
    detail: "Loss rate never recovered below 6 m³/hr for the rest of the section; cumulative loss 940 bbl.",
    mitigation: "Three LCM squeezes; well eventually abandoned above target depth.",
    source: "WCR HGJ-06 §4.4",
  },
  {
    id: "E-09", well: "HGJ-06", depth: 2118, kind: "cementing", severity: 2, date: "2015-04-18",
    headline: "9⅝\" cement job with poor bond across the shoe",
    detail: "CBL showed channelling over the top 60 m of cement, attributed to losses during placement.",
    mitigation: "Remedial squeeze at the shoe; lightweight lead slurry used on later wells.",
    source: "Cementing report HGJ-06 CJ-03",
  },
  {
    id: "E-10", well: "MRN-42", depth: 2470, kind: "torque-spike", severity: 1, date: "2022-11-05",
    headline: "Barail drilled with controlled torque, no NPT",
    detail: "Reference case. Steady 15 kNm with a low-solids polymer mud and 100 RPM through the coal streaks.",
    mitigation: "Hole-cleaning schedule from this well is the current field standard.",
    source: "WCR MRN-42 §5",
  },
  {
    id: "E-11", well: "MRN-42", depth: 3648, kind: "mud-loss", severity: 2, date: "2023-01-16",
    headline: "Partial losses in the limestone, controlled",
    detail: "3.1 m³/hr at the Sylhet top; contained without stopping the section.",
    mitigation: "Pre-mixed calcium carbonate blend pumped ahead of the formation top.",
    source: "DDR MRN-42 / 2023-01-16",
  },
  {
    id: "E-12", well: "BGN-3", depth: 3402, kind: "kick", severity: 3, date: "2018-09-12",
    headline: "Gas kick, 18 bbl gained on a connection",
    detail: "Shut-in drill-pipe pressure 620 psi. Kill mud weight 1.56 sg.",
    mitigation: "Driller's method kill; casing point moved deeper on subsequent wells.",
    source: "Well control report BGN-3 / 2018-09-12",
  },
  {
    id: "E-13", well: "NHK-176", depth: 1290, kind: "mud-loss", severity: 1, date: "2013-09-04",
    headline: "Minor Tipam seepage, scanned report",
    detail: "Extracted by OCR from a scanned 2013 completion report; loss rate legible, duration uncertain.",
    mitigation: "LCM sweeps; details incomplete in the source document.",
    source: "Scanned WCR NHK-176 (OCR, 87 % confidence)",
  },
  {
    id: "E-14", well: "TNS-09", depth: 3130, kind: "overpressure", severity: 2, date: "2020-04-22",
    headline: "Kopili ramp seen 30 m shallower than the field mean",
    detail: "Supports a structurally high pore-pressure cell to the south-west.",
    mitigation: "Weight-up at 3 090 m; no losses induced.",
    source: "DDR TNS-09 / 2020-04-22",
  },
  {
    id: "E-15", well: "TNS-09", depth: 2360, kind: "npt", severity: 1, date: "2020-03-30",
    headline: "14 hours NPT, top-drive repair",
    detail: "Equipment downtime, not formation related. Retained for cost analysis only.",
    mitigation: "Not applicable.",
    source: "DDR TNS-09 / 2020-03-30",
  },
  {
    id: "E-16", well: "SHK-2", depth: 1355, kind: "mud-loss", severity: 2, date: "2016-06-30",
    headline: "Tipam losses at 5.5 m³/hr",
    detail: "Consistent with the field-wide Tipam loss trend between 1 280 and 1 460 m.",
    mitigation: "LCM sweeps and a 0.04 sg weight cut.",
    source: "WCR SHK-2 §4",
  },
  {
    id: "E-17", well: "NHK-204", depth: 3556, kind: "cementing", severity: 2, date: "2019-07-02",
    headline: "7\" liner cemented across a lossy limestone",
    detail: "Foamed lead slurry used after the DKI-11 experience; bond log acceptable.",
    mitigation: "Design reused as the field default for the 7\" liner.",
    source: "Cementing report NHK-204 CJ-05",
  },
  {
    id: "E-18", well: "DKI-11", depth: 2455, kind: "stuck-pipe", severity: 2, date: "2021-06-29",
    headline: "Pack-off while tripping through the Barail",
    detail: "Cavings bridged the annulus 15 m above the bit during a trip out.",
    mitigation: "Circulated clean over two bottoms-up before continuing the trip.",
    source: "DDR DKI-11 / 2021-06-29",
  },
];

export const KIND_LABEL: Record<EventKind, string> = {
  "mud-loss": "Mud loss",
  kick: "Well-control kick",
  "stuck-pipe": "Stuck pipe",
  overpressure: "Overpressure",
  "torque-spike": "Torque spike",
  cementing: "Cementing issue",
  fishing: "Fishing operation",
  npt: "Non-productive time",
};
