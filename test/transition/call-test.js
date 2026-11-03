import assert from "node:assert";
import {it} from "vitest";
import {selection} from "d3-selection";
import {transition} from "d3-transition";

it("transition.call is the same as selection.call", () => {
  assert.strictEqual(transition.prototype.call, selection.prototype.call);
});
