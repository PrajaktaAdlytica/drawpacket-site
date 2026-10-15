export const initialDemo = () => ({
  step: 0,
  waiverLoaded: false,
  waiverAccepted: false,
  coiLoaded: false,
  coiAccepted: false,
  rationale: "",
  rejected: false,
  events: [],
});
export function transition(s, action) {
  const add = (next, message) => ({
    ...s,
    ...next,
    events: [...s.events, message],
  });
  switch (action.type) {
    case "RESET":
      return initialDemo();
    case "COMPARE":
      return s.step === 0
        ? add(
            { step: 1 },
            "05 Oct 09:05 · Compared current gross: $84,000 requested; $78,000 supported.",
          )
        : s;
    case "INSPECT":
      return s.step === 1
        ? add(
            { step: 2 },
            "05 Oct 09:08 · Lower-tier waiver missing; COI expires before intended review.",
          )
        : s;
    case "REJECT":
      return s.step === 2
        ? add(
            { rejected: true },
            "05 Oct 09:10 · Suggestion to clear $6,000 without an approved source rejected.",
          )
        : s;
    case "PROPOSE":
      return s.step === 2
        ? add(
            { step: 3 },
            "05 Oct 09:12 · Revised gross $78,000 proposed. Original remains on record.",
          )
        : s;
    case "APPROVE_REVISION":
      return s.step === 3 && action.rationale.trim().length >= 8
        ? add(
            { step: 4, rationale: action.rationale },
            "05 Oct 09:15 · Mara Ellis accepted PA-07-v2, revised gross $78,000. Other holds remain.",
          )
        : s;
    case "LOAD_WAIVER":
      return s.step === 4
        ? add(
            { waiverLoaded: true },
            "06 Oct 10:00 · W-07-L2-v1 loaded; signed synthetic form placeholder, awaiting review.",
          )
        : s;
    case "ACCEPT_WAIVER":
      return s.step === 4 && s.waiverLoaded
        ? add(
            { waiverAccepted: true, step: s.coiAccepted ? 5 : 4 },
            "06 Oct 10:10 · Mara Ellis accepted waiver completeness only; no payment inferred.",
          )
        : s;
    case "LOAD_COI":
      return s.step === 4
        ? add(
            { coiLoaded: true },
            "06 Oct 11:00 · COI-07-v2 loaded; illustrative expiry 08 Oct 2027.",
          )
        : s;
    case "ACCEPT_COI":
      return s.step === 4 && s.coiLoaded
        ? add(
            { coiAccepted: true, step: s.waiverAccepted ? 5 : 4 },
            "06 Oct 11:10 · Mara Ellis accepted renewal evidence; no coverage determination.",
          )
        : s;
    case "DRAFT":
      return s.step === 5 && s.waiverAccepted && s.coiAccepted
        ? add(
            { step: 6 },
            "06 Oct 14:20 · OP-BP04-2026-09-v1 drafted. Named GC approval pending.",
          )
        : s;
    case "GC_APPROVE":
      return s.step === 6 && action.acknowledged
        ? add(
            { step: 7 },
            "07 Oct 10:00 · Owen Hale recorded simulated GC approval. No funds moved.",
          )
        : s;
    default:
      return s;
  }
}
