import { useReducer, useState } from "react";
import { initialDemo, transition } from "../lib/demo";
import { Button, Icon, Kicker, DemoLabel } from "./UI";
import { track } from "../lib/analytics";
const names = [
  "Received",
  "Variance identified",
  "Held for evidence",
  "Correction proposed",
  "Evidence review",
  "Ready for packet",
  "Packet draft",
  "GC approval recorded",
];
export default function Demo() {
  const [s, dispatch] = useReducer(transition, undefined, initialDemo),
    [rationale, setRationale] = useState(""),
    [ack, setAck] = useState(false);
  const step = s.step;
  const act = (t) => dispatch({ type: t });
  function reset() {
    act("RESET");
    setRationale("");
    setAck(false);
  }
  function exportPacket() {
    const text = [
      "DRAWPACKET — DEMO / SYNTHETIC DATA",
      "CONCEPT PREVIEW — NOT A PAYMENT INSTRUCTION",
      "Packet OP-BP04-2026-09-v1",
      "Bridgepine Builders / BP-04 / Stoneway Mechanical / PA-07-v2",
      "Requested original gross: $84,000. Revised supported gross: $78,000.",
      "Work $65,000 + materials $5,000 + CO-03 $8,000.",
      "Synthetic assumption: 10% retainage = $7,800. Illustrative net $70,200.",
      "No tax, other deductions, or advances included; prior net certificates assumed paid.",
      "GC approval: Owen Hale, 07 Oct 2026 10:00, simulated.",
      "Waiver: W-07-L2-v1, signed form placeholder; completeness only.",
      "COI: COI-07-v2, synthetic expiry 08 Oct 2027.",
      "Source: SOV-07-v3, 30 Sep 2026, lines 23–24 ($65,000 work + $5,000 materials).",
      "Source: CO-03-v1, approved 28 Sep 2026, line 04 ($8,000).",
      "Source: SM-07-v1, 29 Sep 2026, evidence for the included $5,000 materials.",
      `Reviewer rationale (local simulation): ${s.rationale}`,
      "No signing, sending, payment release, or external writes.",
      ...s.events,
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    a.download = "DEMO-BP04-owner-packet.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  return (
    <div className="demo-workspace">
      <div className="workspace-head">
        <div>
          <DemoLabel />
          <h2>One draw. Your review.</h2>
          <p>Bridgepine Builders / BP-04 · Stoneway Mechanical / PA-07</p>
        </div>
        <button className="text-button" onClick={reset}>
          <Icon name="refresh" /> Reset example
        </button>
      </div>
      <div className="workspace-layout">
        <aside className="review-rail">
          <Kicker>Review sequence</Kicker>
          {names.map((n, i) => (
            <div
              key={n}
              className={`review-rail-step ${step === i ? "current" : ""} ${step > i ? "done" : ""}`}
            >
              <span>
                {step > i ? (
                  <Icon name="check" />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {n}
            </div>
          ))}
          <p className="fine">
            Active simulated role:
            <br />
            <strong>
              {step >= 6 ? "Owen Hale · GC approver" : "Mara Ellis · reviewer"}
            </strong>
          </p>
        </aside>
        <div className="workspace-main">
          <div className="workspace-status" aria-live="polite">
            <span className="status-label">
              <i />
              {names[step]}
            </span>
            <span className="mono">PA-07-v{step >= 4 ? "2" : "1"}</span>
          </div>
          <div className="amount-strip">
            <div>
              <small>{step >= 4 ? "Revised gross" : "Requested gross"}</small>
              <strong>{step >= 4 ? "$78,000" : "$84,000"}</strong>
            </div>
            <div>
              <small>Supported gross</small>
              <strong>$78,000</strong>
            </div>
            <div>
              <small>{step >= 4 ? "Variance resolved" : "Difference"}</small>
              <strong className={step >= 4 ? "resolved" : "oxblood"}>
                {step >= 4 ? "$0" : "$6,000"}
              </strong>
            </div>
          </div>
          <div className="demo-state-content">
            {step === 0 && (
              <>
                <h3>Start with the sources.</h3>
                <p>
                  The request has arrived. Compare the current-period gross
                  amount with the schedule of values and approved change.
                </p>
                <Button
                  onClick={() => {
                    act("COMPARE");
                    track("evidence_view", {
                      evidence_type: "sov",
                      synthetic_source_key: "SOV-07-v3",
                    });
                  }}
                >
                  Compare SOV + approved change
                </Button>
              </>
            )}
            {step === 1 && (
              <>
                <h3>The sources support $78,000.</h3>
                <div className="source-equation">
                  <span>
                    Current work <b>$65,000</b>
                  </span>
                  <span>
                    Stored materials <b>$5,000</b>
                  </span>
                  <span>
                    Approved CO-03 <b>$8,000</b>
                  </span>
                </div>
                <p>
                  The extra $6,000 has no approved support in this example. It
                  is a variance, not recovered money.
                </p>
                <Button onClick={() => act("INSPECT")}>
                  Inspect waiver + COI
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <h3>Two more questions stay open.</h3>
                <div className="mini-hold">
                  <Icon name="alert-triangle" />
                  <div>
                    <strong>Lower-tier conditional waiver missing</strong>
                    <p>Cedar Supply / W-07-L2-v0</p>
                  </div>
                </div>
                <div className="mini-hold">
                  <Icon name="calendar" />
                  <div>
                    <strong>COI expires before review</strong>
                    <p>08 Oct expiry · 10 Oct intended review</p>
                  </div>
                </div>
                <div className="button-row">
                  <Button onClick={() => act("PROPOSE")}>
                    Propose revised gross $78,000
                  </Button>
                  <button
                    className="text-button"
                    onClick={() => {
                      act("REJECT");
                      track("override_view", {
                        exception_type: "unsupported_variance",
                      });
                    }}
                  >
                    Test unsupported override
                  </button>
                </div>
                {s.rejected && (
                  <p className="error-note" role="status">
                    Suggestion rejected: clearing the $6,000 without approved
                    support does not establish authority. The variance remains
                    open.
                  </p>
                )}
              </>
            )}
            {step === 3 && (
              <>
                <h3>A proposal needs a reviewer.</h3>
                <p>
                  Original PA-07-v1 requests $84,000. Proposed PA-07-v2 uses
                  $78,000 supported gross. Waiver and COI holds remain.
                </p>
                <label className="field">
                  Review rationale
                  <textarea
                    value={rationale}
                    onChange={(e) => setRationale(e.target.value)}
                    placeholder="Explain why the source evidence supports this correction…"
                    minLength="8"
                  />
                </label>
                <Button
                  disabled={rationale.trim().length < 8}
                  onClick={() =>
                    dispatch({ type: "APPROVE_REVISION", rationale })
                  }
                >
                  Accept as simulated reviewer
                </Button>
              </>
            )}
            {step === 4 && (
              <>
                <h3>Loading is not accepting.</h3>
                <p>
                  Review each synthetic replacement separately. A conditional
                  waiver does not establish payment; a COI does not establish
                  coverage.
                </p>
                <div className="evidence-review">
                  <div>
                    <strong>Lower-tier waiver</strong>
                    <small>
                      {s.waiverAccepted
                        ? "Completeness accepted"
                        : s.waiverLoaded
                          ? "Signed form placeholder · 06 Oct 2026"
                          : "Replacement not loaded"}
                    </small>
                    {!s.waiverLoaded ? (
                      <Button secondary onClick={() => act("LOAD_WAIVER")}>
                        Load synthetic waiver
                      </Button>
                    ) : (
                      <Button
                        secondary
                        disabled={s.waiverAccepted}
                        onClick={() => act("ACCEPT_WAIVER")}
                      >
                        {s.waiverAccepted
                          ? "Reviewed"
                          : "Accept waiver completeness"}
                      </Button>
                    )}
                  </div>
                  <div>
                    <strong>COI renewal</strong>
                    <small>
                      {s.coiAccepted
                        ? "Renewal evidence accepted"
                        : s.coiLoaded
                          ? "COI-07-v2 · expires 08 Oct 2027"
                          : "Replacement not loaded"}
                    </small>
                    {!s.coiLoaded ? (
                      <Button secondary onClick={() => act("LOAD_COI")}>
                        Load synthetic renewal
                      </Button>
                    ) : (
                      <Button
                        secondary
                        disabled={s.coiAccepted}
                        onClick={() => act("ACCEPT_COI")}
                      >
                        {s.coiAccepted ? "Reviewed" : "Accept renewal evidence"}
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <h3>Ready to draft. Approval pending.</h3>
                <p>
                  The amount correction and both evidence replacements have been
                  reviewed. Gather their versions into one owner packet.
                </p>
                <Button onClick={() => act("DRAFT")}>
                  Draft the illustrative packet
                </Button>
              </>
            )}
            {step === 6 && (
              <>
                <h3>A named GC decision.</h3>
                <p>
                  OP-BP04-2026-09-v1 · revised gross $78,000 · reviewed sources
                  attached. This decision records approval in the synthetic
                  ledger only.
                </p>
                <label className="check-field">
                  <input
                    type="checkbox"
                    checked={ack}
                    onChange={(e) => setAck(e.target.checked)}
                  />
                  <span>
                    I am simulating Owen Hale’s GC approval. No payment,
                    signing, or external action will occur.
                  </span>
                </label>
                <Button
                  disabled={!ack}
                  onClick={() =>
                    dispatch({ type: "GC_APPROVE", acknowledged: ack })
                  }
                >
                  Record simulated GC approval
                </Button>
              </>
            )}
            {step === 7 && (
              <>
                <h3>The evidence trail is reviewable.</h3>
                <p>
                  GC-approved release — simulated decision only. No funds were
                  sent. No waiver was signed by this preview.
                </p>
                <div className="button-row">
                  <Button onClick={exportPacket}>
                    Download illustrative packet
                  </Button>
                  <button className="text-button" onClick={reset}>
                    Reset the example
                  </button>
                </div>
              </>
            )}
          </div>
          <details className="audit-log">
            <summary>View the evidence ledger ({s.events.length})</summary>
            {s.events.length ? (
              s.events.map((e, i) => <p key={i}>{e}</p>)
            ) : (
              <p>No review events yet.</p>
            )}
          </details>
          <div className="blocked-action">
            <Icon name="lock" />
            <span>
              Send, sign, release funds, and ERP/bank writes are disabled.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
