const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_ease = require("d3-ease"),
    d3_timer = require("d3-timer"),
    d3_interpolate = require("d3-interpolate"),
    d3_selection = require("d3-selection");

require("../../");

it("transition.style(name, value) creates an tween to the specified value", () => {
  const root = jsdom().documentElement,
      ease = d3_ease.easeCubic,
      duration = 250,
      interpolate = d3_interpolate.interpolateRgb("red", "blue"),
      selection = d3_selection.select(root).style("color", "red"),
      transition = selection.transition().style("color", "blue");

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / duration)));
}, 125);
});

it("transition.style(name, value) creates an tween to the value returned by the specified function", () => {
  const root = jsdom().documentElement,
      ease = d3_ease.easeCubic,
      duration = 250,
      interpolate = d3_interpolate.interpolateRgb("red", "blue"),
      selection = d3_selection.select(root).style("color", "red"),
      transition = selection.transition().style("color", function() { return "blue"; });

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / duration)));
}, 125);
});

it("transition.style(name, value) immediately evaluates the specified function with the expected context and arguments", () => {
  const document = jsdom("<h1 id='one' style='color:#0ff;'></h1><h1 id='two' style='color:#f0f;'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      ease = d3_ease.easeCubic,
      duration = 250,
      interpolate1 = d3_interpolate.interpolateRgb("cyan", "red"),
      interpolate2 = d3_interpolate.interpolateRgb("magenta", "green"),
      selection = d3_selection.selectAll([one, two]).data(["red", "green"]),
      result = [],
      transition = selection.transition().style("color", function(d, i, nodes) { result.push([d, i, nodes, this]); return d; });

  assert.deepStrictEqual(result, [
    ["red", 0, [one, two], one],
    ["green", 1, [one, two], two]
  ]);

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(one.style.getPropertyValue("color"), interpolate1(ease(elapsed / duration)));
    assert.strictEqual(two.style.getPropertyValue("color"), interpolate2(ease(elapsed / duration)));
}, 125);
});

it("transition.style(name, value) recycles tweens ", () => {
  const document = jsdom("<h1 id='one' style='color:#f0f;'></h1><h1 id='two' style='color:#f0f;'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition = d3_selection.selectAll([one, two]).transition().style("color", "red");
  assert.strictEqual(one.__transition[transition._id].tween, two.__transition[transition._id].tween);
});

it("transition.style(name, value) constructs an interpolator using the current value on start", () => {
  const root = jsdom().documentElement,
      ease = d3_ease.easeCubic,
      duration = 250,
      interpolate = d3_interpolate.interpolateRgb("red", "blue"),
      selection = d3_selection.select(root),
      transition = selection.transition().on("start", function() { selection.style("color", "red"); }).style("color", function() { return "blue"; });

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / duration)));
}, 125);
});

it("transition.style(name, null) creates an tween which removes the specified style post-start", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("color", "red"),
      transition = selection.transition().style("color", null).on("start", started);

  function started() {
    assert.strictEqual(root.style.getPropertyValue("color"), "red");
  }

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("color"), "");
});
});

it("transition.style(name, null) creates an tween which removes the specified style post-start", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("color", "red"),
      transition = selection.transition().style("color", () => null).on("start", started);

  function started() {
    assert.strictEqual(root.style.getPropertyValue("color"), "red");
  }

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("color"), "");
});
});

it("transition.style(name, value) creates an tween which removes the specified style post-start if the specified function returns null", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("color", "red"),
      transition = selection.transition().style("color", function() {}).on("start", started);

  function started() {
    assert.strictEqual(root.style.getPropertyValue("color"), "red");
  }

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("color"), "");
});
});

it("transition.style(name, constant) is a noop if the string-coerced value matches the current value on tween initialization", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("opacity", 1),
      transition = selection.transition().style("opacity", 1);

  d3_timer.timeout(function(elapsed) {
    root.style.opacity = 0.5;
  }, 125);

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("opacity"), "0.5");
}, 250);
});

it("transition.style(name, function) is a noop if the string-coerced value matches the current value on tween initialization", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("opacity", 1),
      transition = selection.transition().style("opacity", function() { return 1; });

  d3_timer.timeout(function(elapsed) {
    root.style.opacity = 0.5;
  }, 125);

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("opacity"), "0.5");
}, 250);
});

it("transition.style(name, value) interpolates numbers", () => {
  const root = jsdom().documentElement,
      ease = d3_ease.easeCubic,
      duration = 250,
      interpolate = d3_interpolate.interpolateNumber(0, 1),
      selection = d3_selection.select(root).style("opacity", 0),
      transition = selection.transition().style("opacity", 1);

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("opacity"), interpolate(ease(elapsed / duration)) + "");
}, 125);
});

it("transition.style(name, constant) uses interpolateNumber if value is a number", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("font-size", "15px"),
      transition = selection.transition().style("font-size", 10);

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("font-size"), "NaN");
}, 125);
});

it("transition.style(name, function) uses interpolateNumber if value is a number", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("font-size", "15px"),
      transition = selection.transition().style("font-size", () => 10);

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("font-size"), "NaN");
}, 125);
});

it("transition.style(name, value) interpolates strings", () => {
  const root = jsdom().documentElement,
      ease = d3_ease.easeCubic,
      duration = 250,
      interpolate = d3_interpolate.interpolateString("1px", "2px"),
      selection = d3_selection.select(root).style("font-size", "1px"),
      transition = selection.transition().style("font-size", "2px");

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("font-size"), interpolate(ease(elapsed / duration)));
}, 125);
});

it("transition.style(name, value) interpolates colors", () => {
  const root = jsdom().documentElement,
      ease = d3_ease.easeCubic,
      duration = 250,
      interpolate = d3_interpolate.interpolateRgb("#f00", "#00f"),
      selection = d3_selection.select(root).style("color", "#f00"),
      transition = selection.transition().style("color", "#00f");

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / duration)));
}, 125);
});

it("transition.style(name, value) creates an styleTween with the specified name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("color", "red"),
      transition = selection.transition().style("color", "blue");
  assert.strictEqual(transition.styleTween("color").call(root).call(root, 0.5), "rgb(128, 0, 128)");
});

it("transition.style(name, value) creates a tween with the name \"style.name\"", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root).style("color", "red"),
      transition = selection.transition().style("color", "blue");
  transition.tween("style.color").call(root).call(root, 0.5);
  assert.strictEqual(root.style.getPropertyValue("color"), "rgb(128, 0, 128)");
});
