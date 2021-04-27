const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_timer = require("d3-timer"),
    d3_selection = require("d3-selection"),
    state = require("./state");

require("../../");

it("transition.on(type, listener) throws an error if listener is not a function", () => {
  const root = jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  assert.throws(function() { transition.on("start", 42); });
});

it("transition.on(typename) returns the listener with the specified typename, if any", () => {
  const root = jsdom().documentElement,
      foo = function() {},
      bar = function() {},
      transition = d3_selection.select(root).transition().on("start", foo).on("start.bar", bar);
  assert.strictEqual(transition.on("start"), foo);
  assert.strictEqual(transition.on("start.foo"), undefined);
  assert.strictEqual(transition.on("start.bar"), bar);
  assert.strictEqual(transition.on("end"), undefined);
});

it("transition.on(typename) throws an error if the specified type is not supported", () => {
  const root = jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  assert.throws(function() { transition.on("foo"); });
});

it("transition.on(typename, listener) throws an error if the specified type is not supported", () => {
  const root = jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  assert.throws(function() { transition.on("foo", function() {}); });
});

it("transition.on(typename, listener) throws an error if the specified listener is not a function", () => {
  const root = jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  assert.throws(function() { transition.on("foo", 42); });
});

it("transition.on(typename, null) removes the listener with the specified typename, if any", () => {
  const root = jsdom().documentElement,
      starts = 0,
      transition = d3_selection.select(root).transition().on("start.foo", function() { ++starts; }),
      schedule = root.__transition[transition._id];

  assert.strictEqual(transition.on("start.foo", null), transition);
  assert.strictEqual(transition.on("start.foo"), undefined);
  assert.strictEqual(schedule.on.on("start.foo"), undefined);

  d3_timer.timeout(function() {
    assert.strictEqual(starts, 0);
});
});

it("transition.on(\"start\", listener) registers a listener for the start event", () => {
  const root = jsdom().documentElement,
      transition = d3_selection.select(root).transition().on("start", started),
      schedule = root.__transition[transition._id];

  function started() {
    assert.strictEqual(schedule.state, state.STARTING);
}
});

it("transition.on(\"interrupt\", listener) registers a listener for the interrupt event (during start)", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().on("interrupt", interrupted),
      schedule = root.__transition[transition._id];

  function interrupted() {
    assert.strictEqual(schedule.state, state.ENDED);
}

  d3_timer.timeout(function() {
    selection.interrupt();
  });
});

it("transition.on(\"interrupt\", listener) registers a listener for the interrupt event (during run)", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().on("interrupt", interrupted),
      schedule = root.__transition[transition._id];

  function interrupted() {
    assert.strictEqual(schedule.state, state.ENDED);
}

  d3_timer.timeout(function() {
    selection.interrupt();
  }, 50);
});

it("transition.on(\"end\", listener) registers a listener for the end event", () => {
  const root = jsdom().documentElement,
      transition = d3_selection.select(root).transition().duration(50).on("end", ended),
      schedule = root.__transition[transition._id];

  function ended() {
    assert.strictEqual(schedule.state, state.ENDING);
}
});

it("transition.on(typename, listener) uses copy-on-write to apply changes", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      foo = function() {},
      bar = function() {},
      transition = d3_selection.selectAll([one, two]).transition(),
      schedule1 = one.__transition[transition._id],
      schedule2 = two.__transition[transition._id];

  transition.on("start", foo);
  assert.strictEqual(schedule1.on.on("start"), foo);
  assert.strictEqual(schedule2.on, schedule1.on);
  transition.on("start", bar);
  assert.strictEqual(schedule1.on.on("start"), bar);
  assert.strictEqual(schedule2.on, schedule1.on);
  d3_selection.select(two).transition(transition).on("start", foo);
  assert.strictEqual(schedule1.on.on("start"), bar);
  assert.strictEqual(schedule2.on.on("start"), foo);
});
