// Local-only event contract. No service, cookie, persistence or contact fields.
const fields = {
  landing_view: ["page_version"],
  offer_19_selected: ["selected_offer_id", "placement"],
  demo_open: ["scenario_version"],
  evidence_view: ["evidence_type", "synthetic_source_key"],
  override_view: ["exception_type"],
  price_view: ["price_variant_id"],
};
const seen = new Set();
const sourceValues = new Set([
  "linkedin",
  "accountant-referral",
  "procore-integrator",
  "association",
  "direct",
]);
const campaignValues = new Set([
  "one-cycle-pilot",
  "draw-readiness",
  "demo-story",
]);
export function track(name, properties = {}) {
  if (typeof window === "undefined" || !fields[name]) return;
  if (["landing_view", "price_view"].includes(name)) {
    if (seen.has(name)) return;
    seen.add(name);
  }
  const query = new URLSearchParams(window.location.search);
  const category = (key, values, fallback) =>
    values.has(query.get(key)) ? query.get(key) : fallback;
  const detail = {
    name,
    concept_id: 19,
    environment: "local-concept",
    utm_source: category("utm_source", sourceValues, "unclassified"),
    utm_campaign: category("utm_campaign", campaignValues, "unclassified"),
  };
  for (const key of fields[name])
    if (properties[key] !== undefined) detail[key] = properties[key];
  window.dispatchEvent(new CustomEvent("drawpacket:analytics", { detail }));
}
