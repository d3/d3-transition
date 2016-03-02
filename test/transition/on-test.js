var tape = require("tape"),
    jsdom = require("jsdom"),
    d3_timer = require("d3-timer"),
    d3_selection = require("d3-selection");

require("../../");

tape("transition.on(type, listener) throws an error if listener is not a function", function(test) {
  var root = jsdom.jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  test.throws(function() { transition.on("start", 42); }, /Error/);
  test.end();
});

tape("transition.on(typename) returns the listener with the specified typename, if any", function(test) {
  var root = jsdom.jsdom().documentElement,
      foo = function() {},
      bar = function() {},
      transition = d3_selection.select(root).transition().on("start", foo).on("start.bar", bar);
  test.equal(transition.on("start"), foo);
  test.equal(transition.on("start.foo"), undefined);
  test.equal(transition.on("start.bar"), bar);
  test.equal(transition.on("end"), undefined);
  test.end();
});

tape("transition.on(typename) throws an error if the specified type is not supported", function(test) {
  var root = jsdom.jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  test.throws(function() { transition.on("foo"); }, /Error/);
  test.end();
});

tape("transition.on(typename, listener) throws an error if the specified type is not supported", function(test) {
  var root = jsdom.jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  test.throws(function() { transition.on("foo", function() {}); }, /Error/);
  test.end();
});

tape("transition.on(\"start\", listener) registers a listener for the start event", function(test) {
  var root = jsdom.jsdom().documentElement,
      transition = d3_selection.select(root).transition().on("start", started),
      schedule = root.__transition[transition._id];

  function started() {
    test.equal(schedule.state, 2); // STARTING
    test.end();
  }
});

tape("transition.on(\"interrupt\", listener) registers a listener for the interrupt event", function(test) {
  var root = jsdom.jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().on("interrupt", interrupted),
      schedule = root.__transition[transition._id];

  function interrupted() {
    test.equal(schedule.state, 5); // ENDED
    test.end();
  }

  d3_timer.timeout(function() {
    selection.interrupt();
  });
});

tape("transition.on(\"end\", listener) registers a listener for the end event", function(test) {
  var root = jsdom.jsdom().documentElement,
      transition = d3_selection.select(root).transition().duration(50).on("end", ended),
      schedule = root.__transition[transition._id];

  function ended() {
    test.equal(schedule.state, 5); // ENDED
    test.end();
  }
});
