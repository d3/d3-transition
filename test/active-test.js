import assert from "assert";
import * as d3 from "../src/index.js";
import jsdom from "./jsdom.js";
import * as d3_timer from "d3-timer";
import * as d3_selection from "d3-selection";

it("d3.active(node) returns null if the specified node has no active transition with the null name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root);

  // No transitions pending.
  assert.strictEqual(d3.active(root), null);

  // Two transitions created.
  selection.transition().delay(50).duration(50);
  selection.transition("foo").duration(50);
  assert.strictEqual(d3.active(root), null);

  // One transition scheduled; one active with a different name.
  d3_timer.timeout(function() {
    assert.strictEqual(d3.active(root), null);
  });

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(d3.active(root), null);
}, 100);
});

it("d3.active(node, null) returns null if the specified node has no active transition with the null name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root);

  // No transitions pending.
  assert.strictEqual(d3.active(root, null), null);

  // Two transitions created.
  selection.transition().delay(50).duration(50);
  selection.transition("foo").duration(50);
  assert.strictEqual(d3.active(root, null), null);

  // One transition scheduled; one active with a different name.
  d3_timer.timeout(function() {
    assert.strictEqual(d3.active(root, null), null);
  });

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(d3.active(root, null), null);
}, 100);
});

it("d3.active(node, undefined) returns null if the specified node has no active transition with the null name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root);

  // No transitions pending.
  assert.strictEqual(d3.active(root, undefined), null);

  // Two transitions created.
  selection.transition().delay(50).duration(50);
  selection.transition("foo").duration(50);
  assert.strictEqual(d3.active(root, undefined), null);

  // One transition scheduled; one active with a different name.
  d3_timer.timeout(function() {
    assert.strictEqual(d3.active(root, undefined), null);
  });

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(d3.active(root, undefined), null);
}, 100);
});

it("d3.active(node, name) returns null if the specified node has no active transition with the specified name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root);

  // No transitions pending.
  assert.strictEqual(d3.active(root, "foo"), null);

  // Two transitions created.
  selection.transition("foo").delay(50).duration(50);
  selection.transition().duration(50);
  assert.strictEqual(d3.active(root, null), null);

  // One transition scheduled; one active with a different name.
  assert.strictEqual(d3.active(root, "foo"), null);

  // One transition scheduled.
  d3_timer.timeout(function() {
    assert.strictEqual(d3.active(root, "foo"), null);
  });

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(d3.active(root, "foo"), null);
}, 100);
});

it("d3.active(node) returns the active transition on the specified node with the null name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().on("start", check).tween("tween", tweened).on("end", ended);

  function check() {
    const t = d3.active(root);
    assert.deepStrictEqual(t._groups, [[root]]);
    assert.deepStrictEqual(t._parents, [null]);
    assert.strictEqual(t._name, null);
    assert.strictEqual(t._id, transition._id);
  }

  function tweened() {
    check();
    return function(t) {
      if (t >= 1) check();
    };
  }

  function ended() {
    check();
}
});

it("d3.active(node, name) returns the active transition on the specified node with the specified name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition("foo").on("start", check).tween("tween", tweened).on("end", ended);

  function check() {
    const t = d3.active(root, "foo");
    assert.deepStrictEqual(t._groups, [[root]]);
    assert.deepStrictEqual(t._parents, [null]);
    assert.strictEqual(t._name, "foo");
    assert.strictEqual(t._id, transition._id);
  }

  function tweened() {
    check();
    return function(t) {
      if (t >= 1) check();
    };
  }

  function ended() {
    check();
}
});
