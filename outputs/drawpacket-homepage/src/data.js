export const chapters = [
  ["opening", "The month"],
  ["evidence", "The evidence"],
  ["variance", "The difference"],
  ["offerings", "Five ways in"],
  ["workflow", "The review"],
  ["demo", "Your turn"],
  ["controls", "The boundary"],
  ["pilot", "One cycle"],
  ["questions", "Your questions"],
  ["close", "The next step"],
];
export const offers = [
  {
    id: 1,
    name: "Pay App Check",
    short: "Start with the line.",
    description: "SOV-to-pay-app completeness check.",
    body: "Compare the application with its schedule of values. Surface missing fields, unsupported amounts, and the source behind each line.",
    output: "A line-by-line completeness and variance review.",
    icon: "table",
    asset: "pay-app-hero.svg",
  },
  {
    id: 2,
    name: "Change Evidence",
    short: "Follow what changed.",
    description: "Change-order and stored-material evidence reconciliation.",
    body: "Connect approved changes and stored-material proof to the amounts they support. Keep unexplained differences open for a reviewer.",
    output: "An evidence-linked reconciliation of changes and materials.",
    icon: "git-branch",
    asset: "changes-hero.svg",
  },
  {
    id: 3,
    name: "Waiver Tracking",
    short: "See the whole chain.",
    description: "Tiered subcontractor waiver request and tracking.",
    body: "Identify missing waiver evidence across subcontractor tiers. Prepare request drafts using lawyer/GC-approved forms; no automated signing or sending.",
    output: "A tiered evidence register and proposed follow-up queue.",
    icon: "hierarchy",
    asset: "waivers-hero.svg",
  },
  {
    id: 4,
    name: "Compliance Holds",
    short: "Put the date in context.",
    description: "Insurance/compliance expiry hold queue.",
    body: "Compare document expiry dates with the intended review date. Make the hold reason, owner, and next action visible. A COI check does not determine coverage.",
    output: "A dated exception queue with a named reviewer.",
    icon: "calendar",
    asset: "compliance-hero.svg",
  },
  {
    id: 5,
    name: "Owner Packet",
    short: "Leave a readable record.",
    description: "Owner draw packet and payment-release evidence ledger.",
    body: "Draft an indexed owner packet and preserve the evidence behind a named GC decision. Waiver language and release remain lawyer/GC-approved.",
    output: "A draft packet and review ledger, without payment execution.",
    icon: "file-export",
    asset: "packet-hero.svg",
  },
];
export const sources = [
  {
    id: "SOV-07-v3",
    label: "Schedule of values",
    date: "30 Sep",
    state: "Received",
    icon: "table",
    amount: "$70,000",
    detail:
      "Lines 23–24 support $65,000 current installed work and $5,000 eligible stored materials. Current-period gross basis; synthetic data.",
  },
  {
    id: "CO-03-v1",
    label: "Approved change order",
    date: "28 Sep",
    state: "Received",
    icon: "file-check",
    amount: "$8,000",
    detail:
      "Approved change, line 04. Fictional approval by Owen Hale on 28 Sep 2026. Counted once in the $78,000 supported gross.",
  },
  {
    id: "SM-07-v1",
    label: "Stored-material proof",
    date: "29 Sep",
    state: "Received",
    icon: "building-warehouse",
    amount: "$5,000",
    detail:
      "Synthetic storage and invoice references support the $5,000 materials component already included in SOV-07-v3. Not an additional $5,000.",
  },
  {
    id: "W-07-L2-v0",
    label: "Lower-tier conditional waiver",
    date: "Needed",
    state: "Missing",
    icon: "alert-triangle",
    amount: "Pending",
    detail:
      "Cedar Supply lower-tier conditional waiver is missing. Form placeholder only, not legal wording. No unsigned source is treated as complete.",
  },
  {
    id: "COI-07-v1",
    label: "Insurance certificate",
    date: "08 Oct",
    state: "Expiring",
    icon: "certificate",
    amount: "Review hold",
    detail:
      "Expires 08 Oct 2026, before intended review on 10 Oct. A certificate is evidence for review, not a determination of policy coverage.",
  },
];
export const faqs = [
  [
    "Who is DrawPacket for?",
    "General contractor project accountants and payment administrators handling monthly subcontractor draws. The initial scope is one project and one payment cycle.",
  ],
  [
    "Is DrawPacket an operating product?",
    "Not yet. This is a research-stage concept with an isolated synthetic preview. No customers, production integrations, accepted pricing, or measured results are represented.",
  ],
  [
    "Which offer can I test?",
    "There are five distinct proposed modules: Pay App Check, Change Evidence, Waiver Tracking, Compliance Holds, and Owner Packet. A first pilot selects one repeat job; bundling comes only after buyer evidence supports it.",
  ],
  [
    "Does it replace Procore, GCPay, or accounting software?",
    "Replacement is not the starting assumption. A supervised pilot would compare the selected module with your current tools and handoffs. Incumbent coverage may eliminate the incremental value.",
  ],
  [
    "Does it sign waivers or release funds?",
    "No. This preview cannot sign, send requests, move money, file notices, or write to an ERP or bank. Waiver language and release decisions remain with authorized counsel and the GC.",
  ],
  [
    "What changes by state and contract?",
    "Required forms, notice rules, waiver conditions, evidence expectations, and review authority can differ. A pilot needs an approved jurisdiction and contract-specific template set. DrawPacket does not replace statutory lien advice.",
  ],
  [
    "What does a conditional waiver mean?",
    "In the California educational example, a conditional waiver becomes effective subject to payment conditions; an unconditional form represents receipt. A signature or uploaded document must not be treated as payment evidence. Have counsel review the actual form and jurisdiction.",
  ],
  [
    "What records may I share?",
    "Do not upload project records here. A future supervised pilot would use permissioned, de-identified SOVs, pay applications, changes, waivers, and insurance evidence through an agreed access process.",
  ],
  [
    "What does the hypothetical price include?",
    "The $2,000 diagnostic or $1,500–$4,000 project/cycle pilot are alternative test hypotheses, not live plans or an active checkout. Scope, module, permissions, review owner, deliverables, and price would be agreed before work.",
  ],
  [
    "What would make a pilot successful?",
    "GC-reviewed evidence of fewer true avoidable returns without wrongful holds, with no unresolved material omission, approved templates, and a funded project owner. Review hours and subcontractor response burden also matter.",
  ],
  [
    "How do I withdraw or delete contact data?",
    "This local preview does not send or store contact data on a server. Close or reset the form to clear it. A live intake must identify the controller, retention period, and a working deletion contact before collecting requests.",
  ],
  [
    "Are integrations live?",
    "No integrations are live or claimed. System access and any future integration would be separately permissioned and tested after a supervised cycle demonstrates value.",
  ],
];
