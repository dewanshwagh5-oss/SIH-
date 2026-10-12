You are a senior presentation designer at a quiet, serious deep-tech company. Build the deck below as a .pptx file and also export it as a PDF.

The audience is quantum, cryptography and government stakeholders at the Amaravati Quantum Valley meeting on 15 October 2026. They are technical and sceptical. They will notice anything that looks generic, decorative or overclaimed.

=====================================================================
PART 1: RULES FOR CONTENT
=====================================================================
- The deck has 15 main slides and 2 appendix slides (A1, A2).
- Use each slide's headline, on-slide text and visual exactly as written in Part 3.
- Do not add bullets, statistics, claims, taglines or icons that are not in the content.
- Put every "Notes" section in the presenter notes, never on the slide.
- Keep every [square-bracket] placeholder visible. Set it in amber (#D98A2B) with a light amber highlight so a person can confirm it later.
- Put slide numbers on every slide. Put source notes at the bottom left in 12 pt.

=====================================================================
PART 2: DESIGN (the deck must not look AI-made)
=====================================================================
DESIGN PHILOSOPHY
Make it look like a person with taste made it: a research lab's annual report or a well-edited technical journal, not a startup template. The tone is calm, precise and confident. Restraint is the main design tool.

COLOUR
- Navy #0F1B2D: background for slides 1, 2 and 15 only. Text on navy is #F6F5F1.
- Off-white #F6F5F1: background for every other slide.
- Text on off-white: near-black #1A1F27. Secondary text: #5B6470. Hairlines: #D6D3CB.
- One accent, teal #1FA59A, used sparingly for emphasis and status chips.
- Amber #D98A2B: only for risk and [placeholders].
- Use no other colours. No gradients, glows, drop shadows or glass effects.

TYPE
- Inter or IBM Plex Sans only. Use two weights: regular and semibold.
- Headlines: 36 to 44 pt, left-aligned, sentence case. Each headline is a full claim, so let it wrap to two lines instead of shrinking it.
- Body: 18 to 22 pt. Nothing below 14 pt except the 12 pt source notes.
- Big numbers, where used: 72 to 96 pt in semibold, with a short label underneath.

LAYOUT
- Use a strict 12-column grid with wide, identical margins on every slide (at least 0.6 in).
- Make compositions asymmetric and left-weighted. Leave about 40% of each slide empty.
- Vary the layouts. Not every slide is a title with bullets: use a single full-width diagram, a two-column comparison, one table, or big numbers, depending on the content.
- One idea per slide. Five bullets at most, and fewer is better.
- Prefer thin 1 pt rules and hairlines over boxes and cards, and open diagrams over filled containers.

DIAGRAMS
- Draw every diagram as flat vector shapes in PowerPoint. Never use images.
- Give each diagram one obvious entry point, arrows in one consistent direction, labelled parts and no orphan boxes.
- Use 1.5 pt strokes. Diagrams should look clean and slightly austere, like engineering drawings.
- Icons are simple line outlines of the same stroke weight. Never use filled clip art.

STRICTLY AVOID (these make a deck look AI-made)
- Emoji, stock photos, AI-generated images, and generic 3D or "futuristic" art.
- Purple-to-blue gradients, glowing network nodes, circuit-board backgrounds, padlock-and-shield clip art, binary-code rain, brain icons, atom icons.
- Rounded cards in a three-column grid on every slide.
- An icon in a coloured circle above every bullet.
- Centring everything, and a decorative underline below every title.
- Title Case Headlines, exclamation marks, and filler words such as "unlock", "revolutionary", "seamless", "cutting-edge", "next-gen" or "empower".
- Fake product screenshots or generated UI.

CONSISTENCY
Keep the margins and the positions of the title, slide number and source notes identical on every slide. The deck should read as one system, not 15 separate designs.

=====================================================================
PART 3: SLIDE CONTENT
=====================================================================

---------------------------------------------------------------
SLIDE 1: TITLE (navy background)
---------------------------------------------------------------
On slide:
- TraceCore  (large, semibold)
- Lab records that stay trustworthy in the quantum era
- TCEX Technologies, Chennai
- Amaravati Quantum Valley stakeholder meeting, 15 October 2026
- [Presenter name, role]

Visual: type only. Draw one thin teal line across the slide, ending in a small seal mark. No images.

Notes: Say the one-line story here, once: the records behind every approved drug and device must stay secret and trustworthy for decades, quantum computing threatens both, and TraceCore is a lab system built for that.

---------------------------------------------------------------
SLIDE 2: THE STAKE (navy background)
---------------------------------------------------------------
Headline: Every approved medicine and medical device rests on a lab record

On slide:
- A lab tests the product
- A regulator reads the record
- A patient trusts the result
- If that record is altered, or leaked, the whole chain breaks

Visual: four line icons in a row: lab flask, document, regulator stamp, patient. Show a single broken stroke (a crack) between "document" and "regulator".

Notes: Open with a concrete case. A cardiac device is tested in a lab, and a single changed number in the record can put an unsafe device on the market. Keep this to 20 seconds.

---------------------------------------------------------------
SLIDE 3: WHAT A LIMS IS
---------------------------------------------------------------
Headline: A LIMS is the lab's system of record

On slide:
- Sample → Test → Review → Report → Archive
- Every step logged: who did it, what changed, when, and why
- The question every auditor asks: "Can you prove this record was never altered?"
- Used by pharma, medical device, CRO and food testing labs

Visual: a five-step horizontal flow. Under each step, one small log line in monospace, for example "10:42, Analyst A, result entered".

Notes: LIMS stands for Laboratory Information Management System. Think of it as the lab's operating system for evidence.

---------------------------------------------------------------
SLIDE 4: THE PROBLEM TODAY
---------------------------------------------------------------
Headline: Paper and spreadsheets cannot prove a record is untouched

On slide:
- Records sit across paper registers, Excel files and email
- Values are re-typed by hand from instruments
- Edits leave no trace of who changed what
- Audits take days of reconstruction
- 2026: at least 22 Indian sites received US FDA warning letters, about half citing data integrity or incomplete lab records

Visual: on the left, a messy stack (register, spreadsheet, email) drawn in outline. On the right, a single clean timeline. Label the gap between them "no audit trail".

Source note: FDA count from our 1 Oct 2026 review of published warning letters.

Notes: Revised Schedule M has applied to every Indian drug maker since 1 January 2026. It requires a record of every data change: the old value, who changed it and when. That is hard to do on paper.

---------------------------------------------------------------
SLIDE 5: HARVEST NOW, DECRYPT LATER
---------------------------------------------------------------
Headline: Data stolen today can be read tomorrow

On slide:
- Attackers copy encrypted data now and store it
- A large enough quantum computer could break today's public-key encryption (RSA, ECC)
- Anything that must stay secret for years is already at risk

Rule box below: If (how long data must stay secret) + (time to migrate) > (time until quantum), you are already late.

Visual: a timeline arrow. Left: "Today: encrypted data copied". Middle: "Stored for years". Right: "Quantum computer: data opened". Put the rule in a simple outlined box below it.

Notes: This rule is known as Mosca's inequality. The argument does not depend on guessing the year quantum arrives, only on how long the data must stay protected.

---------------------------------------------------------------
SLIDE 6: WHY LAB DATA IS A PRIME TARGET
---------------------------------------------------------------
Headline: Lab data must stay secret and trusted for decades

On slide (table):
| Data | Why it stays valuable |
| Study protocols and research data | Intellectual property for the life of the product |
| Sponsor and client information | Commercial contracts and unreleased products |
| Regulated reports | Kept for years under GLP and GMP retention rules |
| Signing and identity keys | They vouch for every record in the archive |

Visual: the table only, with hairline row dividers. Highlight the last row in teal.

Notes: A pre-clinical study done today supports a product that may sell for 15 years. Its data has to outlive any encryption chosen today.

---------------------------------------------------------------
SLIDE 7: QUANTUM RISK IS ALSO A FORGERY RISK
---------------------------------------------------------------
Headline: A broken signature means a record can no longer prove anything

On slide:
- Today, digital signatures (RSA, ECDSA) prove who approved a record
- A capable quantum computer could forge those signatures
- An archived approval would then prove nothing
- For regulated labs, trust in the record matters as much as secrecy

Visual: two panels side by side. Left: a signed report with a seal. Right: the same report with an identical-looking forged seal and a question mark.

Notes: Most quantum-security talk is about secrecy. For a lab, the bigger loss is proof. If signatures can be forged, an auditor cannot trust any record in the archive.

---------------------------------------------------------------
SLIDE 8: THE MIGRATION CLOCK HAS STARTED
---------------------------------------------------------------
Headline: Standards and national deadlines are already set

On slide:
- 2024: NIST publishes post-quantum standards FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA)
- 2027: India begins PQC rollout in critical information infrastructure
- 2028: Indian enterprises begin structured preparation
- 2030: NIST plans to deprecate RSA-2048 and similar algorithms
- 2033: India targets full national adoption
- 2035: NIST plans to disallow quantum-vulnerable algorithms
- India's task force calls for crypto inventories, vendor crypto bills of materials and quantum-safe procurement

Visual: one horizontal timeline from 2024 to 2035. NIST milestones sit above the line and India milestones below it. Put the task-force line as a short caption under the timeline.

Source note: NIST IR 8547 (draft); India National Quantum Mission task force report, Feb 2026.

Notes: A lab system bought today will still be running in 2035. Buyers will soon be asked to show their software is ready. TraceCore is built for that question.

---------------------------------------------------------------
SLIDE 9: OUR APPROACH
---------------------------------------------------------------
Headline: TraceCore builds post-quantum protection into the lab record
(Fallback if the statuses are not confirmed: "TraceCore is designed for post-quantum resilience", with every chip reading "In development".)

On slide (table):
| Layer | What it protects | Status |
| Access | Passwordless sign-in for each user | [CONFIRM] |
| Transport | Data moving between lab, instruments and server (ML-KEM) | [CONFIRM] |
| Storage and keys | Stored records and encryption keys | [CONFIRM] |
| Signatures and audit trail | Approvals and every logged change (ML-DSA) | [CONFIRM] |

- Crypto-agile: algorithms can be swapped without rebuilding the system [CONFIRM]
- Deployed on the lab's own servers: the lab keeps its data and its keys [CONFIRM]

Visual: four stacked horizontal layers, each with a small status pill (Built, Tested, In progress or Planned) in teal or grey only, never red or green. A thin line of the Sample → Archive flow from slide 3 runs along the bottom.

Notes: Be exact about status. This room knows the algorithms. Saying "in development" honestly earns more trust than overstating.

---------------------------------------------------------------
SLIDE 10: WHAT THE PLATFORM DOES
---------------------------------------------------------------
Headline: One connected record from sample to archive

On slide:
- Sample management: registration, unique ID, storage location, status
- Study management: protocol, study director, sponsor, lifecycle
- Testing and results: instrument data captured directly, limits checked [CONFIRM which instruments]
- Quality review: deviations, CAPA, approvals
- Reports and archive: version control, controlled release, retrieval
- Integrity controls: role-based access, server-set timestamps, reason for every change, original value always kept

Visual: text on the left half. On the right half, a framed empty placeholder labelled "[Insert real audit-trail screenshot]". Do not generate a UI.

Notes: Mention the AI compliance assistant in one sentence only if it ships today. Otherwise leave it out.

---------------------------------------------------------------
SLIDE 11: LIVE DEMO
---------------------------------------------------------------
Headline: One sample, end to end

On slide (numbered):
1. Register a sample (date set by the server, cannot be changed)
2. Capture a result from an instrument
3. Try to edit it: the system demands a reason
4. Open the audit trail: old value, new value, who, when, why
5. Approve with an electronic signature [show the PQC signature if built]

Visual: numbered steps on the left with large teal numerals. On the right, a framed placeholder labelled "[Live screen / 60-second video]".

Notes: Rehearse this twice. If the network is unreliable, use a recorded 60-second video.

---------------------------------------------------------------
SLIDE 12: HOW A LAB SHOULD JUDGE ANY LIMS
---------------------------------------------------------------
Headline: Five questions every lab should ask its software vendor

On slide (table):
| Question | TraceCore's answer |
| Can every record be traced from sample to archive? | Yes, linked end to end |
| Can I see who changed what, why, and who approved it? | Yes, full audit trail |
| Are roles and duties separated? | Yes, role-based access |
| Where does my data live, and who holds the keys? | On the lab's servers, with the lab [CONFIRM] |
| How will the system move to post-quantum cryptography? | Built in [CONFIRM status] |

Visual: a two-column table with hairline dividers. Highlight the last row in teal.

Notes: We don't name competitors. The last question is the one most vendors have not answered yet.

---------------------------------------------------------------
SLIDE 13: WHERE WE START
---------------------------------------------------------------
Headline: We start where data must stay protected the longest

On slide:
- GLP pre-clinical facilities: 61 certified in India
- Medical device testing labs: about 89 registered with CDSCO
- CROs and pharma QC labs: about 10,500 pharma manufacturing units, each with a QC lab
- Next: 6,815 NABL-accredited testing labs
- First deployment: [MDR, a leading Chennai device-testing lab, if naming is cleared; otherwise "a leading Chennai medical device testing lab"]

Visual: concentric outlined rings, with GLP and device labs in the centre and NABL labs on the outside. Label each ring with its number in semibold.

Source note: DST GLP list, CDSCO testing labs register, NABL portal (read 1 Oct 2026); pharma unit count is an industry estimate.

Notes: Do not state a market value in rupees or dollars.

---------------------------------------------------------------
SLIDE 14: WHY THIS BELONGS IN QUANTUM VALLEY
---------------------------------------------------------------
Headline: Quantum Valley builds the compute. We protect the data it could expose.

On slide:
- Amaravati will host an IBM Quantum System Two with a 156-qubit Heron processor, with pharma among its target applications
- The same pharma and device sector holds data that quantum computing could expose
- India's task force will require quantum-safe procurement: we can be an early reference application
- Built in South India, for Indian regulated labs

Visual: two halves. Left: "Quantum compute". Right: "Quantum-safe data (TraceCore)". Join them with a simple bridge drawn as one line.

Notes: Check the IBM system's commissioning status on the morning of the pitch and say it accurately.

---------------------------------------------------------------
SLIDE 15: THE ASK (navy background)
---------------------------------------------------------------
Headline: What we are asking for

On slide (as 3 or 4 outlined cards):
- Access to Quantum Valley testbeds to benchmark our post-quantum layer
- Expert review of our cryptographic design by ecosystem partners
- Introductions to 2 or 3 pilot labs in Andhra Pradesh
- [CONFIRM: incubation, grant or funding ask, with amount]

Closing line, alone on a full-width band at the bottom: Regulated science runs on trust. We are making that trust last.

Notes: End on the ask, then stop. Don't summarise.

---------------------------------------------------------------
APPENDIX A1: REGULATORY CONTEXT
---------------------------------------------------------------
Headline: The rules lab records live under

On slide:
- OECD GLP: pre-clinical study conduct and records
- 21 CFR Part 11: electronic records and signatures for US FDA submissions
- ALCOA+: attributable, legible, contemporaneous, original, accurate, plus complete, consistent, enduring, available
- Revised Schedule M: Indian GMP, record of every data change, in force for all units since 1 Jan 2026
- No body certifies LIMS software. Labs validate the configured system, and vendors supply validation documents.

---------------------------------------------------------------
APPENDIX A2: STATUS OF EVERY CLAIM
---------------------------------------------------------------
Headline: Where each capability stands today

On slide (table with empty checkboxes):
| Capability | Built | Tested | In progress | Planned | Externally reviewed |
| Audit trail and controlled correction | ☐ | ☐ | ☐ | ☐ | ☐ |
| Electronic signatures | ☐ | ☐ | ☐ | ☐ | ☐ |
| ML-KEM key establishment | ☐ | ☐ | ☐ | ☐ | ☐ |
| ML-DSA signatures | ☐ | ☐ | ☐ | ☐ | ☐ |
| Passwordless sign-in (KratosId) | ☐ | ☐ | ☐ | ☐ | ☐ |
| Instrument integration | ☐ | ☐ | ☐ | ☐ | ☐ |
| AI compliance assistant | ☐ | ☐ | ☐ | ☐ | ☐ |

Notes: Aakash ticks one box per row before the deck is finalised.

=====================================================================
PART 4: FINAL CHECK BEFORE YOU FINISH
=====================================================================
1. There are exactly 15 main slides and 2 appendix slides.
2. No text is below 14 pt except the 12 pt source notes.
3. Nothing touches a slide edge, and the margins are identical on every slide.
4. Every [placeholder] is still visible in amber.
5. There are no stock images, emoji, gradients or generated screenshots anywhere.
6. All speaker notes are in the presenter notes, not on the slides.
7. Squint test: on each slide, only the headline and one focal element stand out.
8. The deck does not use the words "quantum-proof", "unbreakable", "NIST-certified", "compliant", "revolutionary" or "first in the world".

Deliver the .pptx and a PDF export.
