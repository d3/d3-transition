const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_ease = require("d3-ease"),
    d3_timer = require("d3-timer"),
    d3_interpolate = require("d3-interpolate"),
    d3_selection = require("d3-selection"),
    state = require("./state");

require("../../");

it("transition.tween(name, value) defines an tween using the interpolator returned by the specified function", () => {
  const root = jsdom().documentElement,
      value,
      interpolate = function(t) { value = t; },
      transition = d3_selection.select(root).transition().tween("foo", function() { return interpolate; });

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(value, d3_ease.easeCubic(elapsed / 250));
}, 125);
});

it("transition.tween(name, value) invokes the value function with the expected context and arguments", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      result = [],
      transition = d3_selection.selectAll([one, two]).data(["one", "two"]).transition().tween("foo", function(d, i, nodes) { result.push([d, i, nodes, this]); });

  d3_timer.timeout(function(elapsed) {
    assert.deepStrictEqual(result, [
      ["one", 0, [one, two], one],
      ["two", 1, [one, two], two]
    ]);
});
});

it("transition.tween(name, value) passes the eased time to the interpolator", () => {
  const root = jsdom().documentElement,
      then = d3_timer.now(),
      duration = 250,
      ease = d3_ease.easeCubic,
      transition = d3_selection.select(root).transition().tween("foo", function() { return interpolate; }).on("end", function() {
}),
      schedule = root.__transition[transition._id];

  function interpolate(t) {
    "use strict";
    assert.strictEqual(this, root);
    assert.strictEqual(t, schedule.state === state.ENDING ? 1 : ease((d3_timer.now() - then) / duration));
  }
});

it("transition.tween(name, value) allows the specified function to return null for a noop", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().tween("foo", function() {});
});

it("transition.tween(name, value) uses copy-on-write to apply changes", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      foo = function() {},
      bar = function() {},
      transition = d3_selection.selectAll([one, two]).transition(),
      schedule1 = one.__transition[transition._id],
      schedule2 = two.__transition[transition._id];

  transition.tween("foo", foo);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: foo}]);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  transition.tween("foo", bar);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: bar}]);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  d3_selection.select(two).transition(transition).tween("foo", foo);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: bar}]);
  assert.deepStrictEqual(schedule2.tween, [{name: "foo", value: foo}]);
});

it("transition.tween(name, value) uses copy-on-write to apply removals", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      foo = function() {},
      transition = d3_selection.selectAll([one, two]).transition(),
      schedule1 = one.__transition[transition._id],
      schedule2 = two.__transition[transition._id];

  transition.tween("foo", foo);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: foo}]);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  transition.tween("bar", null);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: foo}]);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  transition.tween("foo", null);
  assert.deepStrictEqual(schedule1.tween, []);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  d3_selection.select(two).transition(transition).tween("foo", foo);
  assert.deepStrictEqual(schedule1.tween, []);
  assert.deepStrictEqual(schedule2.tween, [{name: "foo", value: foo}]);
});

it("transition.tween(name, value) coerces the specified name to a string", () => {
  const root = jsdom().documentElement,
      tween = function() {},
      transition = d3_selection.select(root).transition().tween({toString: function() { return "foo"; }}, tween);

  assert.strictEqual(transition.tween("foo"), tween);
});

it("transition.tween(name) coerces the specified name to a string", () => {
  const root = jsdom().documentElement,
      tween = function() {},
      transition = d3_selection.select(root).transition().tween("foo", tween);

  assert.strictEqual(transition.tween({toString: function() { return "foo"; }}), tween);
});

it("transition.tween(name, value) throws an error if value is not null and not a function", () => {
  const root = jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  assert.throws(function() { transition.tween("foo", 42); });
});

it("transition.tween(name, null) removes the specified tween", () => {
  const root = jsdom().documentElement,
      frames = 0,
      interpolate = function() { ++frames; },
      transition = d3_selection.select(root).transition().tween("foo", function() { return interpolate; }).tween("foo", null);

  assert.strictEqual(transition.tween("foo"), null);

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(frames, 0);
}, 125);
});

it("transition.tween(name) returns the tween with the specified name", () => {
  const root = jsdom().documentElement,
      tween = function() {},
      transition = d3_selection.select(root).transition().tween("foo", tween).on("start", started).on("end", ended);

  assert.strictEqual(transition.tween("foo"), tween);
  assert.strictEqual(transition.tween("bar"), null);

  function started() {
    assert.strictEqual(transition.tween("foo"), tween);
  }

  function ended() {
    assert.strictEqual(transition.tween("foo"), tween);
}
});
