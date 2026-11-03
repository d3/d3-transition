import assert from "node:assert";
import {it} from "vitest";
import {select, selection} from "d3-selection";
import "d3-transition";

it("transition.selection() returns the transition’s selection", () => {
  document.body.innerHTML = "<h1 id='one'>one</h1><h1 id='two'>two</h1>";
  const s0 = select(document.body).selectAll("h1");
  const t = s0.transition();
  const s1 = t.selection();
  assert(s1 instanceof selection);
  assert.strictEqual(s1._groups, s0._groups);
  assert.strictEqual(s1._parents, s0._parents);
});
