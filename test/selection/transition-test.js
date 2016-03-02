var tape = require("tape"),
    jsdom = require("jsdom"),
    d3_timer = require("d3-timer"),
    d3_ease = require("d3-ease"),
    d3_selection = require("d3-selection"),
    d3_transition = require("../../");

tape("selection.transition() returns an instanceof d3.transition", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition();
  test.equal(transition instanceof d3_transition.transition, true);
  test.end();
});

tape("selection.transition() uses the default timing parameters", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition(),
      schedule = root.__transition[transition._id];
  test.equal(schedule.time, d3_timer.now());
  test.equal(schedule.delay, 0);
  test.equal(schedule.duration, 250);
  test.equal(schedule.ease, d3_ease.easeCubic);
  test.end();
});

tape("selection.transition() assigns a monotonically-increasing id", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition(),
      transition2 = selection.transition(),
      transition3 = selection.transition();
  test.ok(transition2._id > transition1._id);
  test.ok(transition3._id > transition2._id);
  test.end();
});

tape("selection.transition() uses a default name of null", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition(),
      schedule = root.__transition[transition._id];
  test.strictEqual(schedule.name, null);
  test.end();
});

tape("selection.transition(null) uses a name of null", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition(null),
      schedule = root.__transition[transition._id];
  test.strictEqual(schedule.name, null);
  test.end();
});

tape("selection.transition(undefined) uses a name of null", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition(undefined),
      schedule = root.__transition[transition._id];
  test.strictEqual(schedule.name, null);
  test.end();
});

tape("selection.transition(name) uses the specified name", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition("foo"),
      schedule = root.__transition[transition._id];
  test.strictEqual(schedule.name, "foo");
  test.end();
});

tape("selection.transition(name) coerces the name to a string", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition({toString: function() { return "foo"; }}),
      schedule = root.__transition[transition._id];
  test.strictEqual(schedule.name, "foo");
  test.end();
});

tape("selection.transition(transition) inherits the id, name and timing from the specified transition", function(test) {
  var document = jsdom.jsdom("<h1 id='one'>one</h1><h1 id='two'>two</h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      selection1 = d3_selection.select(one),
      transition1 = selection1.transition().delay(50).duration(100).ease(d3_ease.easeBounce),
      schedule1 = one.__transition[transition1._id];

  d3_timer.timeout(function() {
    var selection2 = d3_selection.select(two),
        transition2 = selection2.transition(transition1),
        schedule2 = two.__transition[transition2._id];

    test.equal(transition1._id, transition2._id);
    test.equal(schedule1.name, schedule2.name);
    test.equal(schedule1.delay, schedule2.delay);
    test.equal(schedule1.duration, schedule2.duration);
    test.equal(schedule1.ease, schedule2.ease);
    test.equal(schedule1.time, schedule2.time);
    test.end();
  }, 10);
});

tape("selection.transition(transition) reselects the existing transition with the specified transition’s id, if any", function(test) {
  var root = jsdom.jsdom().documentElement,
      foo = function foo() {},
      bar = function bar() {},
      selection = d3_selection.select(root),
      transition1 = selection.transition().tween("tween", foo),
      schedule1 = root.__transition[transition1._id],
      transition2 = selection.transition(transition1).tween("tween", bar),
      schedule2 = root.__transition[transition2._id];

  test.equal(transition1._id, transition2._id);
  test.equal(schedule1, schedule2);
  test.equal(transition1.tween("tween"), bar);
  test.equal(transition2.tween("tween"), bar);
  test.end();
});
