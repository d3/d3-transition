import assert from "assert";
import * as d3 from "../src/index.js";
import jsdom from "./jsdom.js";
import * as d3_timer from "d3-timer";
import * as d3_selection from "d3-selection";

it("transition.on(\"start\", error) terminates the transition", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().on("start", function() { throw new Error; });

  process.once("uncaughtException", function() {});

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(root.__transition, undefined);
});
});

it("transition.on(\"start\", error) with delay terminates the transition", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().delay(50).on("start", function() { throw new Error; });

  process.once("uncaughtException", function() {});

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(root.__transition, undefined);
}, 50);
});

it("transition.tween(\"foo\", error) terminates the transition", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().tween("foo", function() { throw new Error; });

  process.once("uncaughtException", function() {});

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(root.__transition, undefined);
});
});

it("transition.tween(\"foo\", error) with delay terminates the transition", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().delay(50).tween("foo", function() { throw new Error; });

  process.once("uncaughtException", function() {});

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(root.__transition, undefined);
}, 50);
});

it("transition.tween(\"foo\", deferredError) terminates the transition", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().duration(50).tween("foo", function() { return function(t) { if (t === 1) throw new Error; }; });

  process.once("uncaughtException", function() {});

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(root.__transition, undefined);
}, 50);
});

it("transition.on(\"end\", error) terminates the transition", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().delay(50).duration(50).on("end", function() { throw new Error; });

  process.once("uncaughtException", function() {});

  // No transitions remaining after the transition ends.
  d3_timer.timeout(function() {
    assert.strictEqual(root.__transition, undefined);
}, 100);
});
