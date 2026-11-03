import assert from "node:assert";
import {it} from "vitest";
import {selection} from "d3-selection";
import {transition} from "d3-transition";

it("transition.empty is the same as selection.empty", () => {
  assert.strictEqual(transition.prototype.empty, selection.prototype.empty);
});
