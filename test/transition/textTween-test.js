var tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_ease = require("d3-ease"),
    d3_timer = require("d3-timer"),
    d3_interpolate = require("d3-interpolate"),
    d3_selection = require("d3-selection"),
    state = require("./state");

require("../../");

tape("transition.textTween(value) defines a text tween using the interpolator returned by the specified function", function(test) {
  var root = jsdom().documentElement,
      interpolate = d3_interpolate.interpolateHcl("red", "blue"),
      ease = d3_ease.easeCubic,
      transition = d3_selection.select(root).transition().textTween(function() { return interpolate; });

  d3_timer.timeout(function(elapsed) {
    test.deepEqual(root.textContent, interpolate(ease(elapsed / 250)));
    test.end();
  }, 125);
});

tape("transition.textTween() returns the existing text tween", function(test) {
  var root = jsdom().documentElement,
      factory = function() {},
      transition = d3_selection.select(root).transition().textTween(factory);
  test.strictEqual(transition.textTween(), factory);
  test.end();
});

tape("transition.textTween(null) removes an existing text tween", function(test) {
  var root = jsdom().documentElement,
      factory = function() {},
      transition = d3_selection.select(root).transition().textTween(factory);
  transition.textTween(undefined);
  test.strictEqual(transition.textTween(), null);
  test.end();
});
