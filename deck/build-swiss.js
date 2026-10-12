// TraceCore deck in the Swiss International system (open-design, Apache-2.0):
// 16-col grid, Klein Blue accent, square corners, 1px hairlines, no shadows/gradients.
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "TraceCore";
pres.author = "TCEX Technologies";
pres.theme = { headFontFace: "Inter", bodyFontFace: "Inter" };

const IKB = "002FA7", PAPER = "FAFAF8", INK = "0A0A0A", GREY = "6B6B6B", HAIR = "C9C9C4", MARK = "FFE36E";
const SANS = "Inter", BLACK = "Inter Black", MONO = "Consolas";
const W = 13.333, P = 0.6, TOTAL = 17;
let n = 0;

const T = (s, t, x, y, w, h, o = {}) =>
  s.addText(t, { x, y, w, h, fontFace: SANS, fontSize: 16, color: INK, margin: 0, valign: "top", isTextBox: true, ...o });
const hl = (s, x, y, w, color = INK, wt = 0.75) => s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width: wt } });
const vl = (s, x, y, h, color = INK, wt = 0.75, dash) => s.addShape(pres.shapes.LINE, { x, y, w: 0, h, line: { color, width: wt, ...(dash ? { dashType: "dash" } : {}) } });
const box = (s, x, y, w, h, fill, line) => s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: fill ? { color: fill } : { type: "none" }, line: line ? { color: line, width: 0.75 } : { type: "none" } });
const mono = (s, t, x, y, w, o = {}) => T(s, t.toUpperCase(), x, y, w, 0.25, { fontFace: MONO, fontSize: 10, charSpacing: 2, ...o });

// [placeholders] -> mono run on a marker highlight, so they cannot be missed
function R(text, o = {}) {
  return text.split(/(\[[^\]]+\])/).filter(Boolean).map((t) => t.startsWith("[")
    ? { text: t, options: { ...o, fontFace: MONO, color: INK, highlight: MARK } }
    : { text: t, options: { ...o } });
}

function dots(s, x, y, cols, rows, color) {
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const v = Math.abs(Math.sin((c + r * 0.7) * 0.9) * Math.cos(r * 0.6 + c * 0.25));
    s.addShape(pres.shapes.RECTANGLE, { x: x + c * 0.15, y: y + r * 0.15, w: 0.07, h: 0.07, fill: { color, transparency: Math.round(30 + 65 * (1 - v)) }, line: { type: "none" } });
  }
}

function chrome(s, topic, fg, source, opts = {}) {
  const x0 = opts.x0 ?? P, x1 = opts.x1 ?? W - P;
  mono(s, "TraceCore — " + topic, x0, 0.42, 6, { color: fg });
  mono(s, `S${String(n).padStart(2, "0")} / ${TOTAL}`, W / 2 - 1, 0.42, 2, { color: fg, align: "center" });
  mono(s, "15.10.2026", x1 - 2, 0.42, 2, { color: fg, align: "right" });
  hl(s, x0, 6.88, x1 - x0, fg, 0.75);
  mono(s, source ? "Source — " + source : "TCEX Technologies · Chennai", x0, 6.98, 9.5, { color: fg, fontSize: 9, charSpacing: 1 });
  mono(s, `№${String(n).padStart(2, "0")} / ${TOTAL}`, x1 - 2, 6.98, 2, { color: fg, fontSize: 9, align: "right" });
}

function slide({ topic, label, title, source, dark, size = 40 }) {
  n++;
  const s = pres.addSlide();
  s.background = { color: dark ? IKB : PAPER };
  const fg = dark ? PAPER : INK;
  chrome(s, topic, fg, source);
  if (label) mono(s, `№${String(n).padStart(2, "0")} · ${label}`, P, 1.05, 8, { color: dark ? PAPER : IKB, fontSize: 11 });
  if (title) T(s, title, P, 1.35, 12.1, 1.3, { fontFace: SANS, bold: true, fontSize: size, color: fg, charSpacing: -0.5, lineSpacingMultiple: 0.92 });
  return s;
}

// ---------------- S01 Cover ----------------
{
  n++;
  const s = pres.addSlide();
  s.background = { color: IKB };
  chrome(s, "Amaravati Quantum Valley", PAPER, null);
  dots(s, 10.55, 1.0, 14, 7, PAPER);
  mono(s, "№01 · TCEX Technologies, Chennai", P, 2.45, 8, { color: PAPER, fontSize: 11 });
  T(s, "TraceCore.", P, 2.75, 12, 1.8, { fontFace: BLACK, fontSize: 120, color: PAPER, charSpacing: -3 });
  T(s, "Lab records that stay trustworthy in the quantum era.", P, 4.65, 11, 0.6, { fontSize: 24, color: PAPER });
  T(s, R("Stakeholder meeting, 15 October 2026  ·  [Presenter name, role]", { fontSize: 14, color: PAPER }), P, 5.45, 11, 0.4, {});
  s.addNotes("Say the one-line story here, once: the records behind every approved drug and device must stay secret and trustworthy for decades. Quantum computing threatens both. TraceCore is a lab system built for that.");
}

// ---------------- S02 The stake (S11 timeline + S12 ink banner) ----------------
{
  const s = slide({ topic: "The stake", label: "The stake", title: "Every approved medicine and medical device\nrests on a lab record." });
  const xs = [P, 3.8, 7.0, 10.2], y = 3.55;
  const nodes = [["Lab", "tests the product"], ["Record", "holds the result"], ["Regulator", "reads the record"], ["Patient", "trusts the result"]];
  hl(s, P, y, 4.95, INK, 1);
  hl(s, 5.85, y, W - P - 5.85, INK, 1);
  s.addShape(pres.shapes.LINE, { x: 5.55, y: y - 0.22, w: 0.12, h: 0.44, line: { color: IKB, width: 1.5 } });
  s.addShape(pres.shapes.LINE, { x: 5.73, y: y - 0.22, w: 0.12, h: 0.44, line: { color: IKB, width: 1.5 } });
  nodes.forEach(([a, b], i) => {
    box(s, xs[i], y - 0.08, 0.16, 0.16, INK);
    mono(s, String(i + 1).padStart(2, "0"), xs[i], y + 0.3, 1);
    T(s, a, xs[i], y + 0.6, 2.9, 0.45, { fontSize: 24, bold: true });
    T(s, b, xs[i], y + 1.05, 2.9, 0.4, { fontSize: 15, color: GREY });
  });
  mono(s, "Break", 5.35, y - 0.55, 0.8, { color: IKB, fontSize: 9, align: "center" });
  box(s, 0, 5.55, W, 1.0, INK);
  T(s, "If that record is altered, or leaked, the whole chain breaks.", P, 5.82, 12, 0.5, { fontSize: 24, bold: true, color: PAPER });
  s.addNotes("Open with a concrete case. A cardiac device is tested in a lab, and a single changed number in the record can put an unsafe device on the market. Keep this to 20 seconds.");
}

// ---------------- S03 What a LIMS is (S11) ----------------
{
  const s = slide({ topic: "What a LIMS is", label: "What a LIMS is", title: "A LIMS is the lab's system of record." });
  const steps = ["Sample", "Test", "Review", "Report", "Archive"];
  const logs = ["09:12 analyst A\nregistered", "10:42 analyst A\nresult entered", "14:05 QA lead\nreviewed", "16:30 manager\nreleased", "16:31 system\nlocked"];
  const y = 2.75, gap = (W - 2 * P) / 5;
  hl(s, P, y, W - 2 * P, INK, 1);
  steps.forEach((t, i) => {
    const x = P + i * gap;
    box(s, x, y - 0.08, 0.16, 0.16, i === 4 ? IKB : INK);
    T(s, t, x, y + 0.3, gap - 0.2, 0.45, { fontSize: 22, bold: true, color: i === 4 ? IKB : INK });
    T(s, logs[i], x, y + 0.8, gap - 0.2, 0.5, { fontFace: MONO, fontSize: 11, color: GREY });
  });
  hl(s, P, 4.55, W - 2 * P, HAIR);
  mono(s, "Every step logged", P, 4.8, 4);
  T(s, "Who did it, what changed, when, and why. Used by pharma, medical device, CRO and food testing labs.", P, 5.1, 4.9, 1.3, { fontSize: 16 });
  mono(s, "The question every auditor asks", 6.1, 4.8, 6, { color: IKB });
  T(s, "“Can you prove this record was never altered?”", 6.1, 5.1, 6.6, 1.3, { fontSize: 28, bold: true, charSpacing: -0.3 });
  s.addNotes("LIMS stands for Laboratory Information Management System. Think of it as the lab's operating system for evidence.");
}

// ---------------- S04 The problem (S08 duo compare) ----------------
{
  const s = slide({ topic: "The problem today", label: "The problem today", title: "Paper and spreadsheets cannot prove\na record is untouched.", source: "TCEX review of published US FDA warning letters, 1 Oct 2026" });
  vl(s, 6.67, 2.85, 3.85, INK);
  mono(s, "Today, in most labs", P, 2.85, 5);
  ["Records sit across paper registers, Excel files and email", "Values are re-typed by hand from instruments", "Edits leave no trace of who changed what", "Audits take days of reconstruction"].forEach((t, i) => {
    const y = 3.25 + i * 0.8;
    hl(s, P, y, 5.7, HAIR);
    mono(s, String(i + 1).padStart(2, "0"), P, y + 0.17, 0.6, { color: GREY });
    T(s, t, P + 0.65, y + 0.12, 5.0, 0.6, { fontSize: 17 });
  });
  mono(s, "2026 · US FDA warning letters", 7.1, 2.85, 5, { color: IKB });
  T(s, "22", 7.05, 3.05, 5, 1.8, { fontFace: BLACK, fontSize: 120, color: IKB, charSpacing: -4 });
  T(s, "Indian sites received warning letters, at least.", 7.1, 5.1, 5.6, 0.4, { fontSize: 18, bold: true });
  T(s, "About half cited data integrity or incomplete lab records.", 7.1, 5.55, 5.4, 0.8, { fontSize: 16, color: GREY });
  s.addNotes("Revised Schedule M has applied to every Indian drug maker since 1 January 2026. It requires a record of every data change: the old value, who changed it and when. That is hard to do on paper.");
}

// ---------------- S05 Harvest now (S03 statement) ----------------
{
  const s = slide({ topic: "Harvest now, decrypt later", label: "Harvest now, decrypt later" });
  T(s, "Data stolen today\ncan be read tomorrow.", P, 1.4, 12, 2.2, { fontFace: BLACK, fontSize: 66, charSpacing: -2, lineSpacingMultiple: 0.9 });
  const cols = [["Today", "Attackers copy encrypted data and store it."], ["Years pass", "The copy sits untouched, waiting."], ["Quantum arrives", "Public-key encryption (RSA, ECC) breaks. The data opens."]];
  const cw = (W - 2 * P - 0.6) / 3;
  cols.forEach(([h, d], i) => {
    const x = P + i * (cw + 0.3), c = i === 2 ? IKB : INK;
    hl(s, x, 3.95, cw, c, i === 2 ? 2 : 1);
    mono(s, String(i + 1).padStart(2, "0") + " · " + h, x, 4.1, cw, { color: c, fontSize: 11 });
    T(s, d, x, 4.45, cw - 0.2, 0.8, { fontSize: 17, color: i === 2 ? IKB : INK, bold: i === 2 });
  });
  box(s, P, 5.5, W - 2 * P, 1.05, null, INK);
  mono(s, "Mosca's rule", P + 0.25, 5.65, 3, { color: IKB });
  T(s, [{ text: "secrecy period + migration time > time until quantum", options: { bold: true } }, { text: "   →  you are already late.", options: { bold: true, color: IKB } }], P + 0.25, 5.95, 11.5, 0.45, { fontSize: 20 });
  s.addNotes("Anything that must stay secret for years is already at risk. The rule on screen is Mosca's inequality. The argument does not depend on guessing the year quantum arrives, only on how long the data must stay protected.");
}

// ---------------- S06 Prime target (S20 ledger) ----------------
{
  const s = slide({ topic: "Why lab data", label: "Why lab data is a prime target", title: "Lab data must stay secret and trusted\nfor decades." });
  const rows = [["Study protocols and research data", "Intellectual property for the life of the product"], ["Sponsor and client information", "Commercial contracts and unreleased products"], ["Regulated reports", "Kept for years under GLP and GMP retention rules"], ["Signing and identity keys", "They vouch for every record in the archive"]];
  rows.forEach(([a, b], i) => {
    const y = 2.95 + i * 0.92, last = i === 3, c = last ? IKB : INK;
    hl(s, P, y, W - 2 * P, last ? IKB : HAIR, last ? 1.5 : 0.75);
    mono(s, String(i + 1).padStart(2, "0"), P, y + 0.3, 0.6, { color: last ? IKB : GREY });
    T(s, a, P + 0.7, y + 0.22, 5.4, 0.6, { fontSize: 22, bold: true, color: c });
    T(s, b, 6.9, y + 0.27, 5.8, 0.6, { fontSize: 17, color: last ? IKB : GREY });
  });
  hl(s, P, 2.95 + 4 * 0.92, W - 2 * P, HAIR);
  s.addNotes("A pre-clinical study done today supports a product that may sell for 15 years. Its data has to outlive any encryption chosen today. The last row matters most: the keys vouch for the whole archive.");
}

// ---------------- S07 Forgery (S08 duo) ----------------
{
  const s = slide({ topic: "Forgery risk", label: "Quantum risk is also a forgery risk", title: "A broken signature means a record\ncan no longer prove anything." });
  vl(s, 6.67, 2.9, 2.6, INK);
  mono(s, "Today", P, 2.9, 5);
  T(s, "A digital signature proves who approved a record.", P, 3.25, 5.6, 1.2, { fontSize: 26, bold: true, charSpacing: -0.3 });
  T(s, "RSA, ECDSA", P, 4.6, 5, 0.4, { fontFace: MONO, fontSize: 13, color: GREY });
  mono(s, "With a capable quantum computer", 7.1, 2.9, 5.6, { color: IKB });
  T(s, "The same signature can be forged.", 7.1, 3.25, 5.6, 1.2, { fontSize: 26, bold: true, color: IKB, charSpacing: -0.3 });
  T(s, "An archived approval would then prove nothing.", 7.1, 4.6, 5.6, 0.5, { fontSize: 16, color: GREY });
  hl(s, P, 5.75, W - 2 * P, INK, 1);
  T(s, "For regulated labs, trust in the record matters as much as secrecy.", P, 5.95, 12, 0.5, { fontSize: 20, bold: true });
  s.addNotes("Most quantum-security talk is about secrecy. For a lab, the bigger loss is proof. If signatures can be forged, an auditor cannot trust any record in the archive.");
}

// ---------------- S08 Migration clock (S02 vertical timeline) ----------------
{
  const s = slide({ topic: "Migration clock", label: "The migration clock has started", title: "Standards and national deadlines\nare already set.", source: "NIST IR 8547 (draft); India National Quantum Mission task force report, Feb 2026" });
  const ms = [[2024, "NIST", "Post-quantum standards published: FIPS 203 (ML-KEM), 204 (ML-DSA), 205 (SLH-DSA)"], [2027, "INDIA", "PQC rollout begins in critical information infrastructure"], [2028, "INDIA", "Enterprises begin structured preparation"], [2030, "NIST", "RSA-2048 and similar algorithms deprecated"], [2033, "INDIA", "Full national adoption targeted"], [2035, "NIST", "Quantum-vulnerable algorithms disallowed"]];
  const y0 = 3.0, rh = 0.6, ax = P + 0.08;
  vl(s, ax, y0 + 0.15, rh * 5, INK, 0.75, true);
  ms.forEach(([yr, who, d], i) => {
    const y = y0 + i * rh, ind = who === "INDIA";
    box(s, ax - 0.08, y + 0.07, 0.16, 0.16, ind ? IKB : INK);
    T(s, String(yr), P + 0.45, y, 1.1, 0.4, { fontFace: MONO, fontSize: 20, bold: true, color: ind ? IKB : INK });
    box(s, P + 1.6, y + 0.04, 0.8, 0.26, ind ? IKB : null, ind ? IKB : INK);
    mono(s, who, P + 1.6, y + 0.07, 0.8, { color: ind ? PAPER : INK, fontSize: 9, align: "center", charSpacing: 1 });
    T(s, d, P + 2.6, y + 0.02, 5.8, 0.6, { fontSize: 15 });
  });
  hl(s, 9.4, 3.0, W - P - 9.4, IKB, 2);
  mono(s, "India's task force calls for", 9.4, 3.15, 3.4, { color: IKB });
  T(s, "Crypto inventories, vendor crypto bills of materials, and quantum-safe procurement.", 9.4, 3.5, 3.3, 1.8, { fontSize: 18, bold: true });
  s.addNotes("A lab system bought today will still be running in 2035. Buyers will soon be asked to show their software is ready. TraceCore is built for that question.");
}

// ---------------- S09 Approach (S19 four cards) ----------------
{
  const s = slide({ topic: "Our approach", label: "Our approach", title: "TraceCore builds post-quantum protection\ninto the lab record." });
  const L = [["Access", "Passwordless sign-in for each user", ""], ["Transport", "Data moving between lab, instruments and server", "ML-KEM"], ["Storage and keys", "Stored records and encryption keys", ""], ["Signatures and audit trail", "Approvals and every logged change", "ML-DSA"]];
  const cw = (W - 2 * P - 0.6) / 4;
  hl(s, P, 2.85, W - 2 * P, IKB, 2);
  L.forEach(([a, b, alg], i) => {
    const x = P + i * (cw + 0.2), y = 3.05;
    box(s, x, y, cw, 2.6, i === 3 ? IKB : null, i === 3 ? IKB : INK);
    const c = i === 3 ? PAPER : INK;
    mono(s, `Layer ${String(i + 1).padStart(2, "0")}${alg ? " · " + alg : ""}`, x + 0.2, y + 0.2, cw - 0.4, { color: c, fontSize: 9 });
    T(s, a, x + 0.2, y + 0.5, cw - 0.4, 0.8, { fontSize: 20, bold: true, color: c });
    T(s, b, x + 0.2, y + 1.3, cw - 0.4, 0.8, { fontSize: 14, color: c });
    mono(s, "Status", x + 0.2, y + 2.15, 1, { color: c, fontSize: 9 });
    T(s, R("[CONFIRM]", { fontSize: 11 }), x + 1.0, y + 2.13, 1.5, 0.3, {});
  });
  T(s, R("Crypto-agile: algorithms swap without a rebuild [CONFIRM]", { fontSize: 14 }), P, 5.95, 6, 0.4, {});
  T(s, R("Runs on the lab's own servers: the lab keeps its data and keys [CONFIRM]", { fontSize: 14 }), 6.8, 5.95, 6, 0.4, {});
  s.addNotes("Be exact about status. This room knows the algorithms. Saying 'in development' honestly earns more trust than overstating.\n\nFALLBACK if statuses are not confirmed by 14 Oct: headline becomes 'TraceCore is designed for post-quantum resilience' and every status reads 'In development'.");
}

// ---------------- S10 Platform (S04 six cells) ----------------
{
  const s = slide({ topic: "The platform", label: "What the platform does", title: "One connected record from sample to archive." });
  const C = [["Samples", "Registration, unique ID, storage location, status"], ["Studies", "Protocol, study director, sponsor, lifecycle"], ["Testing", "Instrument data captured directly, limits checked [CONFIRM which instruments]"], ["Quality", "Deviations, CAPA, approvals"], ["Reports", "Version control, controlled release, retrieval"], ["Integrity", "Role-based access, server-set timestamps, a reason for every change, original value always kept"]];
  const cw = (W - 2 * P) / 3, ch = 1.78, y0 = 2.85;
  hl(s, P, y0, W - 2 * P, INK, 1); hl(s, P, y0 + ch, W - 2 * P, HAIR); hl(s, P, y0 + 2 * ch, W - 2 * P, INK, 1);
  vl(s, P + cw, y0, 2 * ch, HAIR); vl(s, P + 2 * cw, y0, 2 * ch, HAIR);
  C.forEach(([h, d], i) => {
    const x = P + (i % 3) * cw + (i % 3 ? 0.25 : 0), y = y0 + Math.floor(i / 3) * ch + 0.22, last = i === 5;
    mono(s, String(i + 1).padStart(2, "0"), x, y, 1, { color: IKB, fontSize: 11 });
    T(s, h, x, y + 0.3, cw - 0.4, 0.45, { fontSize: 22, bold: true, color: last ? IKB : INK });
    T(s, R(d, { fontSize: 14 }), x, y + 0.8, cw - 0.45, 0.8, { color: GREY });
  });
  s.addNotes("Mention the AI compliance assistant in one sentence only if it ships today. Otherwise leave it out. Show a real screenshot of the audit trail during the demo.");
}

// ---------------- S11 Demo (S14 steps + block) ----------------
{
  const s = slide({ topic: "Live demo", label: "Live demo", title: "One sample, end to end." });
  const st = ["Register a sample. The server sets the date; it cannot be changed.", "Capture a result from an instrument.", "Try to edit it. The system demands a reason.", "Open the audit trail: old value, new value, who, when, why.", "Approve with an electronic signature [show the PQC signature if built]"];
  st.forEach((t, i) => {
    const y = 2.55 + i * 0.8;
    hl(s, P, y, 6.0, HAIR);
    T(s, String(i + 1).padStart(2, "0"), P, y + 0.12, 0.8, 0.5, { fontFace: BLACK, fontSize: 24, color: IKB });
    T(s, R(t, { fontSize: 16 }), P + 0.9, y + 0.17, 5.1, 0.6, {});
  });
  box(s, 7.3, 2.55, W - P - 7.3, 4.0, IKB);
  mono(s, "Live · sample TS-0417", 7.55, 2.75, 4, { color: PAPER });
  dots(s, 10.9, 2.8, 10, 4, PAPER);
  T(s, R("[Live screen / 60-second video]", { fontSize: 14 }), 7.55, 6.05, 4.5, 0.3, {});
  s.addNotes("Rehearse this twice. If the network is unreliable, use a recorded 60-second video.");
}

// ---------------- S12 Five questions (S20 ledger) ----------------
{
  const s = slide({ topic: "Judging a LIMS", label: "How a lab should judge any LIMS", title: "Five questions every lab should ask\nits software vendor." });
  const Q = [["Can every record be traced from sample to archive?", "Yes, linked end to end"], ["Can I see who changed what, why, and who approved it?", "Yes, full audit trail"], ["Are roles and duties separated?", "Yes, role-based access"], ["Where does my data live, and who holds the keys?", "On the lab's servers [CONFIRM]"], ["How will the system move to post-quantum cryptography?", "Built in [CONFIRM status]"]];
  mono(s, "Question", P, 2.75, 3, { color: GREY }); mono(s, "TraceCore", 7.7, 2.75, 3, { color: GREY });
  Q.forEach(([q, a], i) => {
    const y = 3.05 + i * 0.68, last = i === 4;
    hl(s, P, y, W - 2 * P, last ? IKB : i === 0 ? INK : HAIR, last || i === 0 ? 1.25 : 0.75);
    T(s, q, P, y + 0.18, 6.9, 0.45, { fontSize: 17, bold: last, color: last ? IKB : INK });
    T(s, R(a, { fontSize: 17, bold: true, color: last ? IKB : INK }), 7.7, y + 0.18, 5.0, 0.45, {});
  });
  hl(s, P, 3.05 + 5 * 0.68, W - 2 * P, HAIR);
  s.addNotes("We don't name competitors. The last question is the one most vendors have not answered yet.");
}

// ---------------- S13 Market (S17 system diagram) ----------------
{
  const s = slide({ topic: "Where we start", label: "Where we start", title: "We start where data must stay protected\nthe longest.", source: "DST GLP list, CDSCO register, NABL portal, read 1 Oct 2026; pharma units: industry estimate" });
  const S = [["61", "certified GLP pre-clinical facilities"], ["~89", "medical device testing labs (CDSCO)"], ["~10,500", "pharma units, each with a QC lab"], ["6,815", "NABL-accredited testing labs, next"]];
  S.forEach(([a, b], i) => {
    const y = 2.8 + i * 0.78, hot = i < 2;
    hl(s, P, y, 6.6, hot ? IKB : HAIR, hot ? 1.25 : 0.75);
    T(s, a, P, y + 0.08, 2.4, 0.65, { fontFace: BLACK, fontSize: 30, color: hot ? IKB : INK });
    T(s, b, P + 2.5, y + 0.22, 4.1, 0.5, { fontSize: 15 });
  });
  T(s, R("First deployment: [MDR, if naming is cleared]", { fontSize: 14, bold: true }), P, 6.0, 6.6, 0.35, {});
  const cx = 10.25, cy = 4.55;
  [[2.0, "NABL labs"], [1.4, "Pharma QC"], [0.85, "GLP + device"]].forEach(([r, l]) => {
    s.addShape(pres.shapes.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { type: "none" }, line: { color: INK, width: 0.75 } });
    mono(s, l, cx - 1, cy - r + 0.18, 2, { fontSize: 7, align: "center", charSpacing: 1 });
  });
  s.addShape(pres.shapes.OVAL, { x: cx - 0.42, y: cy - 0.32, w: 0.84, h: 0.84, fill: { color: IKB }, line: { type: "none" } });
  mono(s, "Start", cx - 0.42, cy - 0.03, 0.84, { color: PAPER, fontSize: 9, align: "center" });
  s.addNotes("These counts come from official registers (DST, CDSCO, NABL) read on 1 Oct 2026; the pharma figure is an industry estimate. Do not state a market value in rupees or dollars. If MDR cannot be named, say 'a leading Chennai medical device testing lab'.");
}

// ---------------- S14 Quantum Valley (S18 why now) ----------------
{
  const s = slide({ topic: "Quantum Valley", label: "Why this belongs in Quantum Valley", title: "Quantum Valley builds the compute.\nWe protect the data it could expose." });
  const C = [["Compute", "Amaravati will host an IBM Quantum System Two", "Pharma is among its target applications.", "156", "qubits · Heron processor"], ["Exposure", "The same sector holds the data quantum could expose", "Pharma and device labs keep records for decades.", "15 yrs", "life of a product's data"], ["Procurement", "India will require quantum-safe procurement", "TraceCore can be an early reference application.", "2027", "PQC rollout begins"]];
  const cw = (W - 2 * P - 0.6) / 3;
  C.forEach(([k, h, d, num, nl], i) => {
    const x = P + i * (cw + 0.3), last = i === 2, c = last ? IKB : INK;
    hl(s, x, 2.85, cw, c, last ? 2 : 1);
    mono(s, k, x, 3.0, cw, { color: c });
    T(s, h, x, 3.35, cw - 0.2, 1.0, { fontSize: 19, bold: true, color: c });
    T(s, d, x, 4.35, cw - 0.2, 0.7, { fontSize: 14, color: GREY });
    T(s, num, x, 5.15, cw, 0.8, { fontFace: BLACK, fontSize: 40, color: c, charSpacing: -1 });
    mono(s, nl, x, 5.95, cw, { color: GREY, fontSize: 9 });
  });
  T(s, "Built in South India, for Indian regulated labs.", P, 6.4, 12, 0.35, { fontSize: 14, bold: true });
  s.addNotes("Check the IBM system's commissioning status on the morning of the pitch and say it accurately.");
}

// ---------------- S15 The ask (S09 closing manifesto) ----------------
{
  n++;
  const s = pres.addSlide();
  s.background = { color: PAPER };
  const split = 6.2;
  box(s, 0, 0, split, 7.5, IKB);
  mono(s, "TraceCore — The ask", P, 0.42, 5, { color: PAPER });
  mono(s, `S${n} / ${TOTAL}`, split + 0.5, 0.42, 2, {});
  mono(s, "15.10.2026", W - P - 2, 0.42, 2, { align: "right" });
  dots(s, P, 1.1, 14, 6, PAPER);
  T(s, "Regulated science runs on trust.\nWe are making that trust last.", P, 3.6, split - 1.1, 2.4, { fontFace: BLACK, fontSize: 32, color: PAPER, lineSpacingMultiple: 0.95, charSpacing: -0.5 });
  hl(s, P, 6.88, split - 2 * P, PAPER); hl(s, split + 0.5, 6.88, W - P - split - 0.5, INK);
  mono(s, "TCEX Technologies · Chennai", P, 6.98, 5, { color: PAPER, fontSize: 9 });
  mono(s, `№${n} / ${TOTAL}`, W - P - 2, 6.98, 2, { fontSize: 9, align: "right" });
  mono(s, `№${n} · The ask`, split + 0.5, 1.05, 5, { color: IKB, fontSize: 11 });
  T(s, "What we are asking for.", split + 0.5, 1.35, 6.3, 0.8, { fontSize: 34, bold: true, charSpacing: -0.5 });
  const A = ["Access to Quantum Valley testbeds to benchmark our post-quantum layer", "Expert review of our cryptographic design by ecosystem partners", "Introductions to 2 or 3 pilot labs in Andhra Pradesh", "[CONFIRM: incubation, grant or funding ask, with amount]"];
  A.forEach((t, i) => {
    const y = 2.6 + i * 1.0;
    hl(s, split + 0.5, y, W - P - split - 0.5, i === 0 ? INK : HAIR, i === 0 ? 1 : 0.75);
    T(s, String(i + 1).padStart(2, "0"), split + 0.5, y + 0.18, 0.7, 0.5, { fontFace: BLACK, fontSize: 22, color: IKB });
    T(s, R(t, { fontSize: 17 }), split + 1.3, y + 0.2, W - P - split - 1.3, 0.75, {});
  });
  s.addNotes("End on the ask, then stop. Don't summarise.");
}

// ---------------- A1 Regulatory (S20 ledger) ----------------
{
  const s = slide({ topic: "Appendix", label: "Appendix A1 · Regulatory context", title: "The rules lab records live under." });
  const rows = [["OECD GLP", "Pre-clinical study conduct and records"], ["21 CFR Part 11", "Electronic records and signatures for US FDA submissions"], ["ALCOA+", "Attributable, legible, contemporaneous, original, accurate, plus complete, consistent, enduring, available"], ["Revised Schedule M", "Indian GMP: a record of every data change, in force for all units since 1 Jan 2026"]];
  rows.forEach(([a, b], i) => {
    const y = 2.5 + i * 0.85;
    hl(s, P, y, W - 2 * P, i === 0 ? INK : HAIR, i === 0 ? 1 : 0.75);
    T(s, a, P, y + 0.2, 3.4, 0.5, { fontSize: 18, bold: true });
    T(s, b, P + 3.6, y + 0.2, 8.5, 0.6, { fontSize: 15, color: GREY });
  });
  hl(s, P, 2.5 + 4 * 0.85, W - 2 * P, HAIR);
  T(s, "No body certifies LIMS software. Labs validate the configured system; vendors supply validation documents.", P, 6.1, 12, 0.5, { fontSize: 16, bold: true, color: IKB });
  s.addNotes("Use only in Q&A. Never say 'NIST-certified', 'GLP compliant' or 'Part 11 compliant'.");
}

// ---------------- A2 Status ----------------
{
  const s = slide({ topic: "Appendix", label: "Appendix A2 · Status of every claim", title: "Where each capability stands today." });
  const caps = ["Audit trail and controlled correction", "Electronic signatures", "ML-KEM key establishment", "ML-DSA signatures", "Passwordless sign-in (KratosId)", "Instrument integration", "AI compliance assistant"];
  const cols = ["Built", "Tested", "In progress", "Planned", "Ext. reviewed"];
  const cx = 6.0, cw = (W - P - cx) / 5;
  cols.forEach((c, j) => mono(s, c, cx + j * cw, 2.55, cw, { color: GREY, fontSize: 9, align: "center", charSpacing: 1 }));
  caps.forEach((c, i) => {
    const y = 2.85 + i * 0.5;
    hl(s, P, y, W - 2 * P, i === 0 ? INK : HAIR, i === 0 ? 1 : 0.75);
    T(s, c, P, y + 0.12, 5.2, 0.35, { fontSize: 15 });
    cols.forEach((_, j) => box(s, cx + j * cw + cw / 2 - 0.09, y + 0.16, 0.18, 0.18, null, INK));
  });
  hl(s, P, 2.85 + 7 * 0.5, W - 2 * P, HAIR);
  s.addNotes("Aakash ticks one box per row before the deck is finalised.");
}

pres.writeFile({ fileName: "/home/user/SIH-/deck/TraceCore_Pitch_Deck_Swiss.pptx" }).then(() => console.log("written"));
