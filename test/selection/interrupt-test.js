import assert from "assert";
import jsdom from "../jsdom.js";
import * as d3_timer from "d3-timer";
import * as d3_selection from "d3-selection";
import * as state from "../transition/state.js";
import * as d3 from "../../src/index.js"; // ?

it("selection.interrupt() returns the selection", () => {
  const document = jsdom(),
      selection = d3_selection.select(document);
  assert.strictEqual(selection.interrupt(), selection);
});

it("selection.interrupt() cancels any pending transitions on the selected elements", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition(),
      transition2 = transition1.transition();
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, true);
  assert.strictEqual(selection.interrupt(), selection);
  assert.strictEqual(root.__transition, undefined);
});

it("selection.interrupt() only cancels pending transitions with the null name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition("foo"),
      transition2 = selection.transition();
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, true);
  assert.strictEqual(selection.interrupt(), selection);
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, false);
});

it("selection.interrupt(null) only cancels pending transitions with the null name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition("foo"),
      transition2 = selection.transition();
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, true);
  assert.strictEqual(selection.interrupt(null), selection);
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, false);
});

it("selection.interrupt(undefined) only cancels pending transitions with the null name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition("foo"),
      transition2 = selection.transition();
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, true);
  assert.strictEqual(selection.interrupt(undefined), selection);
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, false);
});

it("selection.interrupt(name) only cancels pending transitions with the specified name", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition("foo"),
      transition2 = selection.transition();
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, true);
  assert.strictEqual(selection.interrupt("foo"), selection);
  assert.strictEqual(transition1._id in root.__transition, false);
  assert.strictEqual(transition2._id in root.__transition, true);
});

it("selection.interrupt(name) coerces the name to a string", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition1 = selection.transition("foo"),
      transition2 = selection.transition();
  assert.strictEqual(transition1._id in root.__transition, true);
  assert.strictEqual(transition2._id in root.__transition, true);
  assert.strictEqual(selection.interrupt({toString: function() { return "foo"; }}), selection);
  assert.strictEqual(transition1._id in root.__transition, false);
  assert.strictEqual(transition2._id in root.__transition, true);
});

it("selection.interrupt() does nothing if there is no transition on the selected elements", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root);
  assert.strictEqual(root.__transition, undefined);
  assert.strictEqual(selection.interrupt(), selection);
  assert.strictEqual(root.__transition, undefined);
});

it("selection.interrupt() dispatches an interrupt event to the started transition on the selected elements", () => {
  const root = jsdom().documentElement,
      interrupts = 0,
      selection = d3_selection.select(root),
      transition = selection.transition().on("interrupt", function() { ++interrupts; });
  d3_timer.timeout(function() {
    const schedule = root.__transition[transition._id];
    assert.strictEqual(schedule.state, state.STARTED);
    selection.interrupt();
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, state.ENDED);
    assert.strictEqual(root.__transition, undefined);
    assert.strictEqual(interrupts, 1);
});
});

it("selection.interrupt() destroys the schedule after dispatching the interrupt event", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().on("interrupt", interrupted);

  d3_timer.timeout(function() {
    selection.interrupt();
  });

  function interrupted() {
    assert.strictEqual(transition.delay(), 0);
    assert.strictEqual(transition.duration(), 250);
    assert.strictEqual(transition.on("interrupt"), interrupted);
}
});

it("selection.interrupt() does not dispatch an interrupt event to a starting transition", () => {
  const root = jsdom().documentElement,
      interrupts = 0,
      selection = d3_selection.select(root),
      transition = selection.transition().on("interrupt", function() { ++interrupts; }).on("start", started);

  function started() {
    const schedule = root.__transition[transition._id];
    assert.strictEqual(schedule.state, state.STARTING);
    selection.interrupt();
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, state.ENDED);
    assert.strictEqual(root.__transition, undefined);
    assert.strictEqual(interrupts, 0);
}
});

it("selection.interrupt() prevents a created transition from starting", () => {
  const root = jsdom().documentElement,
      starts = 0,
      selection = d3_selection.select(root),
      transition = selection.transition().on("start", function() { ++starts; }),
      schedule = root.__transition[transition._id];

  assert.strictEqual(schedule.state, state.CREATED);
  selection.interrupt();
  assert.strictEqual(schedule.timer._call, null);
  assert.strictEqual(schedule.state, state.ENDED);
  assert.strictEqual(root.__transition, undefined);

  d3_timer.timeout(function() {
    assert.strictEqual(starts, 0);
}, 10);
});

it("selection.interrupt() prevents a scheduled transition from starting", () => {
  const root = jsdom().documentElement,
      starts = 0,
      selection = d3_selection.select(root),
      transition = selection.transition().delay(50).on("start", function() { ++starts; }),
      schedule = root.__transition[transition._id];

  d3_timer.timeout(function() {
    assert.strictEqual(schedule.state, state.SCHEDULED);
    selection.interrupt();
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, state.ENDED);
    assert.strictEqual(root.__transition, undefined);
  });

  d3_timer.timeout(function() {
    assert.strictEqual(starts, 0);
}, 60);
});

it("selection.interrupt() prevents a starting transition from initializing tweens", () => {
  const root = jsdom().documentElement,
      tweens = 0,
      selection = d3_selection.select(root),
      transition = selection.transition().tween("tween", function() { ++tweens; }).on("start", started),
      schedule = root.__transition[transition._id];

  function started() {
    assert.strictEqual(schedule.state, state.STARTING);
    selection.interrupt();
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, state.ENDED);
    assert.strictEqual(root.__transition, undefined);
  }

  d3_timer.timeout(function() {
    assert.strictEqual(tweens, 0);
}, 10);
});

it("selection.interrupt() during tween initialization prevents an active transition from continuing", () => {
  const root = jsdom().documentElement,
      tweens = 0,
      selection = d3_selection.select(root),
      transition = selection.transition().tween("tween", function() { selection.interrupt(); return function() { ++tweens; }; }),
      schedule = root.__transition[transition._id];

  d3_timer.timeout(function() {
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, state.ENDED);
    assert.strictEqual(root.__transition, undefined);
    assert.strictEqual(tweens, 0);
}, 10);
});

it("selection.interrupt() prevents an active transition from continuing", () => {
  const root = jsdom().documentElement,
      interrupted = false,
      tweens = 0,
      selection = d3_selection.select(root),
      transition = selection.transition().tween("tween", function() { return function() { if (interrupted) ++tweens; }; }),
      schedule = root.__transition[transition._id];

  d3_timer.timeout(function() {
    interrupted = true;
    assert.strictEqual(schedule.state, state.STARTED);
    selection.interrupt();
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, state.ENDED);
    assert.strictEqual(root.__transition, undefined);
  }, 10);

  d3_timer.timeout(function() {
    assert.strictEqual(tweens, 0);
}, 50);
});

it("selection.interrupt() during the final tween invocation prevents the end event from being dispatched", () => {
  const root = jsdom().documentElement,
      ends = 0,
      selection = d3_selection.select(root),
      transition = selection.transition().duration(50).tween("tween", tween).on("end", function() { ++ends; }),
      schedule = root.__transition[transition._id];

  function tween() {
    return function(t) {
      if (t >= 1) {
        assert.strictEqual(schedule.state, state.ENDING);
        selection.interrupt();
      }
    };
  }

  d3_timer.timeout(function() {
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, state.ENDED);
    assert.strictEqual(root.__transition, undefined);
    assert.strictEqual(ends, 0);
}, 60);
});

it("selection.interrupt() has no effect on an ended transition", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().duration(50).on("end", ended),
      schedule = root.__transition[transition._id];

  function ended() {
    d3_timer.timeout(function() {
      assert.strictEqual(schedule.state, state.ENDED);
      assert.strictEqual(schedule.timer._call, null);
      selection.interrupt();
      assert.strictEqual(schedule.state, state.ENDED);
      assert.strictEqual(schedule.timer._call, null);
      assert.strictEqual(root.__transition, undefined);
});
  }
});

it("selection.interrupt() has no effect on an interrupting transition", () => {
  const root = jsdom().documentElement,
      interrupts = 0,
      selection = d3_selection.select(root),
      transition = selection.transition().duration(50).on("interrupt", interrupted),
      schedule = root.__transition[transition._id];

  d3_timer.timeout(function() {
    assert.strictEqual(schedule.state, state.STARTED);
    selection.interrupt();
    assert.strictEqual(schedule.state, state.ENDED);
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(interrupts, 1);
});

  function interrupted() {
    ++interrupts;
    selection.interrupt();
  }
});
