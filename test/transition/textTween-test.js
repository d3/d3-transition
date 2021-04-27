const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_ease = require("d3-ease"),
    d3_timer = require("d3-timer"),
    d3_interpolate = require("d3-interpolate"),
    d3_selection = require("d3-selection"),
    state = require("./state");

require("../../");

it("transition.textTween(value) defines a text tween using the interpolator returned by the specified function", () => {
  const root = jsdom().documentElement,
      interpolate = d3_interpolate.interpolateHcl("red", "blue"),
      ease = d3_ease.easeCubic,
      transition = d3_selection.select(root).transition().textTween(function() { return interpolate; });

  d3_timer.timeout(function(elapsed) {
    assert.deepStrictEqual(root.textContent, interpolate(ease(elapsed / 250)));
}, 125);
});

it("transition.textTween() returns the existing text tween", () => {
  const root = jsdom().documentElement,
      factory = function() {},
      transition = d3_selection.select(root).transition().textTween(factory);
  assert.strictEqual(transition.textTween(), factory);
});

it("transition.textTween(null) removes an existing text tween", () => {
  const root = jsdom().documentElement,
      factory = function() {},
      transition = d3_selection.select(root).transition().textTween(factory);
  transition.textTween(undefined);
  assert.strictEqual(transition.textTween(), null);
});
