import assert from "node:assert";
import {it} from "vitest";
import {selection} from "d3-selection";
import {transition} from "d3-transition";

it("transition.node is the same as selection.node", () => {
  assert.strictEqual(transition.prototype.node, selection.prototype.node);
});
