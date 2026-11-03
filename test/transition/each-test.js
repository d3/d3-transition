import assert from "node:assert";
import {it} from "vitest";
import {select, selectAll, selection} from "d3-selection";
import {transition} from "d3-transition";

it("transition.each is the same as selection.each", () => {
  assert.strictEqual(transition.prototype.each, selection.prototype.each);
});

it("transition.each() runs as expected", () => {
  const root = document.documentElement;
  let a = 0;
  select(root).transition().each(() => { ++a; });
  assert.strictEqual(a, 1);
  a = 0;
  selectAll([null, root]).transition().each(() => { ++a; });
  assert.strictEqual(a, 1);
});
