import assert from "assert";
import * as d3 from "../src/index.js";
import jsdom from "./jsdom.js";
import * as d3_selection from "d3-selection";

it("d3.interrupt(node) cancels any pending transitions on the specified node", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition(),
      transition2 = transition1.transition();
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, true);
  d3.interrupt(root);
  assert.strictEqual(root.__transition, undefined);
});

it("selection.interrupt(name) only cancels pending transitions with the specified name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition("foo"),
      transition2 = selection.transition();
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, true);
  d3.interrupt(root, "foo");
  assert.strictEqual(transition1._id in root.__transition, false);
  assert.strictEqual(transition2._id in root.__transition, true);
});
