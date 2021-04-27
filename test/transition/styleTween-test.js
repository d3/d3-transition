const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_ease = require("d3-ease"),
    d3_timer = require("d3-timer"),
    d3_interpolate = require("d3-interpolate"),
    d3_selection = require("d3-selection"),
    state = require("./state");

require("../../");

it("transition.styleTween(name, value) defines a style tween using the interpolator returned by the specified function", () => {
  const root = jsdom().documentElement,
      interpolate = d3_interpolate.interpolateHcl("red", "blue"),
      ease = d3_ease.easeCubic,
      transition = d3_selection.select(root).transition().styleTween("color", function() { return interpolate; });

  d3_timer.timeout(function(elapsed) {
    assert.deepStrictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / 250)));
    assert.deepStrictEqual(root.style.getPropertyPriority("color"), "");
}, 125);
});

it("transition.styleTween(name, value, priority) defines a style tween using the interpolator returned by the specified function", () => {
  const root = jsdom().documentElement,
      interpolate = d3_interpolate.interpolateHcl("red", "blue"),
      ease = d3_ease.easeCubic,
      transition = d3_selection.select(root).transition().styleTween("color", function() { return interpolate; }, "important");

  d3_timer.timeout(function(elapsed) {
    assert.deepStrictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / 250)));
    assert.deepStrictEqual(root.style.getPropertyPriority("color"), "important");
}, 125);
});

it("transition.styleTween(name, value) invokes the value function with the expected context and arguments", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      result = [],
      transition = d3_selection.selectAll([one, two]).data(["one", "two"]).transition().styleTween("color", function(d, i, nodes) { result.push([d, i, nodes, this]); });

  d3_timer.timeout(function(elapsed) {
    assert.deepStrictEqual(result, [
      ["one", 0, [one, two], one],
      ["two", 1, [one, two], two]
    ]);
});
});

it("transition.styleTween(name, value) passes the eased time to the interpolator", () => {
  const root = jsdom().documentElement,
      then = d3_timer.now(),
      duration = 250,
      ease = d3_ease.easeCubic,
      transition = d3_selection.select(root).transition().styleTween("color", function() { return interpolate; }).on("end", function() {
}),
      schedule = root.__transition[transition._id];

  function interpolate(t) {
    "use strict";
    assert.strictEqual(this, root);
    assert.strictEqual(t, schedule.state === state.ENDING ? 1 : ease((d3_timer.now() - then) / duration));
  }
});

it("transition.styleTween(name, value) allows the specified function to return null for a noop", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("color", "red"),
      transition = selection.transition().styleTween("color", function() {});

  d3_timer.timeout(function(elapsed) {
    assert.deepStrictEqual(root.style.getPropertyValue("color"), "red");
}, 125);
});

it("transition.styleTween(name, value) coerces the specified name to a string", () => {
  const root = jsdom().documentElement,
      interpolate = d3_interpolate.interpolateHcl("red", "blue"),
      ease = d3_ease.easeCubic,
      transition = d3_selection.select(root).transition().styleTween({toString: function() { return "color"; }}, function() { return interpolate; });

  d3_timer.timeout(function(elapsed) {
    assert.deepStrictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / 250)));
}, 125);
});

it("transition.styleTween(name, value) throws an error if value is not null and not a function", () => {
  const root = jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  assert.throws(function() { transition.styleTween("color", 42); });
});

it("transition.styleTween(name, null) removes the specified style tween", () => {
  const root = jsdom().documentElement,
      interpolate = d3_interpolate.interpolateHcl("red", "blue"),
      transition = d3_selection.select(root).transition().styleTween("color", function() { return interpolate; }).styleTween("color", null);

  assert.strictEqual(transition.styleTween("color"), null);
  assert.strictEqual(transition.tween("style.color"), null);

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("color"), "");
}, 125);
});

it("transition.styleTween(name) returns the style tween with the specified name", () => {
  const root = jsdom().documentElement,
      interpolate = d3_interpolate.interpolateHcl("red", "blue"),
      tween = function() { return interpolate; },
      transition = d3_selection.select(root).transition().styleTween("color", tween).on("start", started).on("end", ended);

  assert.strictEqual(transition.styleTween("color"), tween);
  assert.strictEqual(transition.styleTween("bar"), null);

  function started() {
    assert.strictEqual(transition.styleTween("color"), tween);
  }

  function ended() {
    assert.strictEqual(transition.styleTween("color"), tween);
}
});

it("transition.styleTween(name) coerces the specified name to a string", () => {
  const root = jsdom().documentElement,
      tween = function() {},
      transition = d3_selection.select(root).transition().styleTween("color", tween);

  assert.strictEqual(transition.styleTween({toString: function() { return "color"; }}), tween);
});
