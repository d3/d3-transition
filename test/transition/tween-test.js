var tape = require("tape"),
    jsdom = require("jsdom"),
    d3_ease = require("d3-ease"),
    d3_timer = require("d3-timer"),
    d3_interpolate = require("d3-interpolate"),
    d3_selection = require("d3-selection");

require("../../");

tape("transition.tween(name, value) defines an tween using the interpolator returned by the specified function", function(test) {
  var root = jsdom.jsdom().documentElement,
      value,
      interpolate = function(t) { value = t; },
      transition = d3_selection.select(root).transition().tween("foo", function() { return interpolate; });

  d3_timer.timeout(function(elapsed) {
    test.equal(value, d3_ease.easeCubic(elapsed / 250));
    test.end();
  }, 125);
});

tape("transition.tween(name, value) invokes the value function with the expected context and arguments", function(test) {
  var document = jsdom.jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      result = [],
      transition = d3_selection.selectAll([one, two]).data(["one", "two"]).transition().tween("foo", function(d, i, nodes) { result.push([d, i, nodes, this]); });

  d3_timer.timeout(function(elapsed) {
    test.deepEqual(result, [
      ["one", 0, [one, two], one],
      ["two", 1, [one, two], two]
    ]);
    test.end();
  });
});

tape("transition.tween(name, value) passes the eased time to the interpolator", function(test) {
  var root = jsdom.jsdom().documentElement,
      then = d3_timer.now(),
      duration = 250,
      ease = d3_ease.easeCubic,
      transition = d3_selection.select(root).transition().tween("foo", function() { return interpolate; }).on("end", function() { test.end(); }),
      schedule = root.__transition[transition._id];

  function interpolate(t) {
    "use strict";
    test.equal(this, null);
    test.equal(t, schedule.state === 3 ? ease((d3_timer.now() - then) / duration) : 1);
  }
});

tape("transition.tween(name, value) allows the specified function to return null for a noop", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().tween("foo", function() {});

  test.end();
});

tape("transition.tween(name, value) coerces the specified name to a string", function(test) {
  var root = jsdom.jsdom().documentElement,
      tween = function() {},
      transition = d3_selection.select(root).transition().tween({toString: function() { return "foo"; }}, tween);

  test.equal(transition.tween("foo"), tween);
  test.end();
});

tape("transition.tween(name) coerces the specified name to a string", function(test) {
  var root = jsdom.jsdom().documentElement,
      tween = function() {},
      transition = d3_selection.select(root).transition().tween("foo", tween);

  test.equal(transition.tween({toString: function() { return "foo"; }}), tween);
  test.end();
});

tape("transition.tween(name, value) throws an error if value is not a function", function(test) {
  var root = jsdom.jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  test.throws(function() { transition.tween("foo", 42); }, /Error/);
  test.end();
});

tape("transition.tween(name) returns the tween with the specified name", function(test) {
  var root = jsdom.jsdom().documentElement,
      tween = function() {},
      transition = d3_selection.select(root).transition().tween("foo", tween).on("start", started).on("end", ended);

  test.equal(transition.tween("foo"), tween);
  test.equal(transition.tween("bar"), null);

  function started() {
    test.equal(transition.tween("foo"), tween);
  }

  function ended() {
    test.equal(transition.tween("foo"), tween);
    test.end();
  }
});
