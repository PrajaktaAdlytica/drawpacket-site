import test from "node:test";
import assert from "node:assert/strict";
import { initialDemo, transition } from "../src/lib/demo.js";
const send = (s, type, extra = {}) => transition(s, { type, ...extra });
function reviewed() {
  let s = initialDemo();
  for (const type of ["COMPARE", "INSPECT", "PROPOSE"]) s = send(s, type);
  return send(s, "APPROVE_REVISION", {
    rationale: "Approved sources support the revised gross.",
  });
}
test("source arithmetic supports the variance and illustrative retainage", () => {
  assert.equal(65000 + 5000 + 8000, 78000);
  assert.equal(84000 - 78000, 6000);
  assert.equal(78000 * (1 - 0.1), 70200);
});
test("cannot skip evidence and named approval gates", () => {
  let s = initialDemo();
  for (const type of ["DRAFT", "GC_APPROVE", "ACCEPT_WAIVER", "ACCEPT_COI"])
    assert.deepEqual(send(s, type, { acknowledged: true }), s);
  s = send(send(send(s, "COMPARE"), "INSPECT"), "PROPOSE");
  assert.equal(send(s, "APPROVE_REVISION", { rationale: " " }).step, 3);
});
test("loading a document does not accept it or clear the hold", () => {
  let s = reviewed();
  s = send(send(s, "LOAD_WAIVER"), "LOAD_COI");
  assert.equal(s.step, 4);
  assert.equal(s.waiverAccepted, false);
  assert.equal(s.coiAccepted, false);
  assert.equal(send(s, "DRAFT").step, 4);
  s = send(s, "ACCEPT_WAIVER");
  assert.equal(s.step, 4);
  s = send(s, "ACCEPT_COI");
  assert.equal(s.step, 5);
  s = send(s, "DRAFT");
  assert.equal(s.step, 6);
  assert.equal(send(s, "GC_APPROVE", { acknowledged: false }).step, 6);
  assert.equal(send(s, "GC_APPROVE", { acknowledged: true }).step, 7);
});
test("either review order preserves both requirements", () => {
  let s = reviewed();
  for (const type of ["LOAD_COI", "ACCEPT_COI", "LOAD_WAIVER", "ACCEPT_WAIVER"])
    s = send(s, type);
  assert.equal(s.step, 5);
  assert.equal(s.waiverAccepted && s.coiAccepted, true);
});
test("unsupported recommendation is rejected and reset clears local state", () => {
  let s = send(send(initialDemo(), "COMPARE"), "INSPECT");
  s = send(s, "REJECT");
  assert.equal(s.step, 2);
  assert.equal(s.rejected, true);
  assert.match(s.events.at(-1), /rejected/);
  assert.deepEqual(send(s, "RESET"), initialDemo());
});
