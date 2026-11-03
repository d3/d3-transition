import assert from "node:assert";
import {it} from "vitest";
import {selection} from "d3-selection";
import {transition} from "d3-transition";

it("transition.nodes is the same as selection.nodes", () => {
  assert.strictEqual(transition.prototype.nodes, selection.prototype.nodes);
});
