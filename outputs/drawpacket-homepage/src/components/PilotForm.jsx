import { useState } from "react";
import { offers } from "../data";
import { Button, Kicker } from "./UI";
export default function PilotForm({ selected = 1 }) {
  const [prepared, setPrepared] = useState(false);
  function submit(e) {
    e.preventDefault();
    setPrepared(true);
  }
  return (
    <div className="pilot-form">
      <Kicker>One project / one cycle</Kicker>
      <h2>Start with your next draw.</h2>
      <p>
        A scoped conversation for a GC project accountant or payment
        administrator.
      </p>
      {prepared && (
        <div className="prepared-request" role="status">
          <h3>Your request preview is ready.</h3>
          <p>
            Nothing was submitted or stored on a server. Live contact collection
            will be enabled after DrawPacket’s contact and privacy details are
            finalized.
          </p>
          <p>
            For a pilot, the next commitments are a selected module,
            permissioned template/sample access, a named AP owner, and an agreed
            paid scope.
          </p>
          <Button secondary onClick={() => setPrepared(false)}>
            Edit the preview
          </Button>
        </div>
      )}
      <form hidden={prepared} onSubmit={submit}>
        <p className="form-notice">
          Local form preview. Do not enter project documents or sensitive
          financial information.
        </p>
        <div className="form-grid">
          <label className="field">
            Work email
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </label>
          <label className="field">
            Company
            <input
              name="company"
              autoComplete="organization"
              maxLength="120"
              required
              placeholder="Your general contractor"
            />
          </label>
        </div>
        <label className="field">
          Your role
          <select name="role" required defaultValue="">
            <option value="" disabled>
              Select your role
            </option>
            <option>Project accountant</option>
            <option>Payment administrator</option>
            <option>Controller / AP lead</option>
            <option>Other</option>
          </select>
        </label>
        <label className="field">
          Proposed module
          <select name="module" defaultValue={selected}>
            {offers.map((o) => (
              <option value={o.id} key={o.id}>
                {o.name}
              </option>
            ))}
            <option value="0">Help me select one</option>
          </select>
        </label>
        <label className="check-field">
          <input type="checkbox" required />
          <span>
            I agree to be contacted about this request when a live intake is
            available. This preview sends nothing.
          </span>
        </label>
        <label className="check-field">
          <input type="checkbox" />
          <span>
            I would also like research and pilot updates. Optional; not an
            active subscription.
          </span>
        </label>
        <Button type="submit">Preview pilot request</Button>
        <p className="fine">
          Purpose: discuss one scoped pilot. No backend or contact list is
          connected. Close this dialog to clear these fields. Hypothetical
          pricing: $2,000 diagnostic or $1,500–$4,000 per project/cycle.
        </p>
      </form>
    </div>
  );
}
