var tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_ease = require("d3-ease"),
    d3_timer = require("d3-timer"),
    d3_interpolate = require("d3-interpolate"),
    d3_selection = require("d3-selection");

require("../../");

tape("transition.paused(true) allows pause the transition animation", function(test) {
  var root = jsdom().documentElement,
      ease = d3_ease.easeCubic,
      duration = 100,
      interpolate = d3_interpolate.interpolateNumber(0, 100),
      selection = d3_selection.select(root).attr("t", 0),
      transition = selection.transition().duration(duration).attr("t", 100).on("end", ended);
  var beginTime = d3_timer.now();

  d3_timer.timeout(function(elapsed) {
    transition.paused(true);
    test.strictEqual(root.__transition[transition._id].paused, true);
    test.strictEqual(transition.paused(), true);
    test.strictEqual(Number(root.getAttribute("t")), interpolate(ease(elapsed / duration)));
  }, 50);

  d3_timer.timeout(function(elapsed) {
    var progress = root.__transition[transition._id].progress;
    test.strictEqual(transition.progress(), progress);
    test.ok(progress >= 0.5);
    test.strictEqual(Number(root.getAttribute("t")), interpolate(ease(progress)));
    transition.paused(false);
    test.strictEqual(root.__transition[transition._id].paused, false);
    test.strictEqual(transition.paused(), false);
  }, 150);

  function ended() {
    var t = d3_timer.now() - beginTime;
    test.ok(t > 150);
    test.end();
  }
});

tape("transition.progress() allows get the progrss of the transition animation", function(test) {
  var root = jsdom().documentElement,
      ease = d3_ease.easeCubic,
      duration = 100,
      interpolate = d3_interpolate.interpolateNumber(0, 100),
      selection = d3_selection.select(root).attr("t", 0),
      transition = selection.transition().duration(duration).attr("t", 100).on("end", ended);
  var beginTime = d3_timer.now();

  d3_timer.timeout(function(elapsed) {
    // get the progress on runtime
    var progress = root.__transition[transition._id].progress;
    test.strictEqual(transition.progress(), progress);
    test.ok(progress < 0);
    test.ok(Math.abs(progress) >= 0.5);
    test.strictEqual(Number(root.getAttribute("t")), interpolate(ease(-progress)));
    transition.paused(true);
  }, 50);

  d3_timer.timeout(function(elapsed) {
    var progress = root.__transition[transition._id].progress;
    test.strictEqual(transition.progress(), progress);
    test.ok(progress >= 0.5);
    test.strictEqual(Number(root.getAttribute("t")), interpolate(ease(progress)));
    transition.paused(false);
  }, 150);

  function ended() {
    var t = d3_timer.now() - beginTime;
    test.ok(t > 150);
    test.end();
  }
});
