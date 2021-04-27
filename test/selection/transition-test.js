import assert from "assert";
import jsdom from "../jsdom.js";
import * as d3_timer from "d3-timer";
import * as d3_selection from "d3-selection";
import * as d3_ease from "d3-ease";
import * as d3 from "../../src/index.js"; // ?

it("selection.transition() returns an instanceof d3.transition", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition();
  assert.strictEqual(transition instanceof d3.transition, true);
});

it("selection.transition() uses the default timing parameters", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition(),
      schedule = root.__transition[transition._id];
  assert.strictEqual(schedule.time, d3_timer.now());
  assert.strictEqual(schedule.delay, 0);
  assert.strictEqual(schedule.duration, 250);
  assert.strictEqual(schedule.ease, d3_ease.easeCubic);
});

it("selection.transition() assigns a monotonically-increasing id", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition(),
      transition2 = selection.transition(),
      transition3 = selection.transition();
  assert(transition2._id > transition1._id);
  assert(transition3._id > transition2._id);
});

it("selection.transition() uses a default name of null", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition(),
      schedule = root.__transition[transition._id];
  assert.strictEqual(schedule.name, null);
});

it("selection.transition(null) uses a name of null", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition(null),
      schedule = root.__transition[transition._id];
  assert.strictEqual(schedule.name, null);
});

it("selection.transition(undefined) uses a name of null", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition(undefined),
      schedule = root.__transition[transition._id];
  assert.strictEqual(schedule.name, null);
});

it("selection.transition(name) uses the specified name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition("foo"),
      schedule = root.__transition[transition._id];
  assert.strictEqual(schedule.name, "foo");
});

it("selection.transition(name) coerces the name to a string", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition({toString: function() { return "foo"; }}),
      schedule = root.__transition[transition._id];
  assert.strictEqual(schedule.name, "foo");
});

it("selection.transition(transition) inherits the id, name and timing from the corresponding parent in the specified transition", () => {
  const document = jsdom("<h1 id='one'><child></h1><h1 id='two'><child></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      selection = d3_selection.selectAll([one, two]),
      transition = selection.transition().delay(function(d, i) { return i * 50; }).duration(100).ease(d3_ease.easeBounce),
      schedule1 = one.__transition[transition._id],
      schedule2 = two.__transition[transition._id],
      transition1b = d3_selection.select(one.firstChild).transition(transition),
      schedule1b = one.firstChild.__transition[transition._id];

  assert.strictEqual(transition1b._id, transition._id);
  assert.strictEqual(schedule1b.name, schedule1.name);
  assert.strictEqual(schedule1b.delay, schedule1.delay);
  assert.strictEqual(schedule1b.duration, schedule1.duration);
  assert.strictEqual(schedule1b.ease, schedule1.ease);
  assert.strictEqual(schedule1b.time, schedule1.time);

  d3_timer.timeout(function() {
    const transition2b = d3_selection.select(two.firstChild).transition(transition),
        schedule2b = two.firstChild.__transition[transition._id];

    assert.strictEqual(transition2b._id, transition._id);
    assert.strictEqual(schedule2b.name, schedule2.name);
    assert.strictEqual(schedule2b.delay, schedule2.delay);
    assert.strictEqual(schedule2b.duration, schedule2.duration);
    assert.strictEqual(schedule2b.ease, schedule2.ease);
    assert.strictEqual(schedule2b.time, schedule2.time);
}, 10);
});

it("selection.transition(transition) reselects the existing transition with the specified transition’s id, if any", () => {
  const root = jsdom().documentElement,
      foo = function foo() {},
      bar = function bar() {},
      selection = d3_selection.select(root),
      transition1 = selection.transition().tween("tween", foo),
      schedule1 = root.__transition[transition1._id],
      transition2 = selection.transition(transition1).tween("tween", bar),
      schedule2 = root.__transition[transition2._id];

  assert.strictEqual(transition1._id, transition2._id);
  assert.strictEqual(schedule1, schedule2);
  assert.strictEqual(transition1.tween("tween"), bar);
  assert.strictEqual(transition2.tween("tween"), bar);
});

it("selection.transition(transition) throws an error if the specified transition is not found", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition1 = d3_selection.select(one).transition(),
      transition2 = d3_selection.select(two).transition().delay(50);
  try {
    d3_selection.select(two).transition(transition1);
    assert.fail();
  } catch (error) {
    assert.deepStrictEqual(error.message, `transition ${transition1._id} not found`);
  }
  try {
    d3_selection.select(one).transition(transition2);
    assert.fail();
  } catch (error) {
    assert.deepStrictEqual(error.message, `transition ${transition2._id} not found`);
  }
});
