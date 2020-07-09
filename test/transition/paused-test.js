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

tape("transition.progress() allows to get the progress of the transition animation", function(test) {
  var root = jsdom().documentElement,
      ease = d3_ease.easeCubic,
      duration = 100,
      interpolate = d3_interpolate.interpolateNumber(0, 100),
      selection = d3_selection.select(root).attr("t", 0),
      transition = selection.transition().duration(duration).attr("t", 100).on("end", ended);
  var beginTime = d3_timer.now();
  var oldProgress;

  d3_timer.timeout(function(elapsed) {
    // get the progress on runtime
    var progress = -root.__transition[transition._id].progress;
    test.strictEqual(transition.progress(), progress);
    test.ok(progress >= 0.5);
    test.strictEqual(Number(root.getAttribute("t")), interpolate(ease(progress)));
    transition.paused(true);
    oldProgress = progress;
    transition.progress(progress);
  }, 50);

  d3_timer.timeout(function(elapsed) {
    var progress = root.__transition[transition._id].progress;
    test.strictEqual(transition.progress(), progress);
    test.strictEqual(oldProgress, progress);
    test.ok(progress >= 0.5);
    test.strictEqual(Number(root.getAttribute("t")), interpolate(ease(progress)));
    transition.paused(false);
  }, 150);

  function ended() {
    var t = d3_timer.now() - beginTime;
    test.ok(t > 150);
    test.strictEqual(transition.progress(), 1);
    test.end();
  }
});

tape("transition.on(\"progress\", listener) event to notify animation progress", function(test) {
  var root = jsdom().documentElement,
      duration = 100,
      selection = d3_selection.select(root).attr("t", 0),
      transition = selection.transition().duration(duration).attr("t", 100)
      .on("progress", onProgress)
      .on("end", ended);
  var beginTime = d3_timer.now();
  var oldProgress;
  var lastProgress = 0;

  d3_timer.timeout(function(elapsed) {
    // get the progress on runtime
    var progress = -root.__transition[transition._id].progress;
    test.strictEqual(transition.progress(), progress);
    test.strictEqual(lastProgress, progress);
    test.ok(progress >= 0.5);
    transition.paused(true);
    oldProgress = progress;
    transition.progress(progress);
  }, 50);

  d3_timer.timeout(function(elapsed) {
    var progress = root.__transition[transition._id].progress;
    test.strictEqual(transition.progress(), progress);
    test.strictEqual(oldProgress, progress);
    test.strictEqual(lastProgress, progress);
    test.ok(progress >= 0.5);
    transition.paused(false);
  }, 150);

  function onProgress(data, index, grp, progress) {
    test.ok(progress >= lastProgress, `${progress} >= ${lastProgress}`);
    lastProgress = progress;
  }

  function ended() {
    var t = d3_timer.now() - beginTime;
    test.ok(t > 150);
    test.strictEqual(transition.progress(), 1);
    test.strictEqual(lastProgress, 1);
    test.end();
  }
});

tape("transition.on(\"progress\", listener) event should work on paused status", function(test) {
  var root = jsdom().documentElement,
      duration = 100,
      selection = d3_selection.select(root).attr("t", 0),
      transition = selection.transition().duration(duration).attr("t", 100).paused(true)
      .on("progress", onProgress)
      .on("end", ended);
  var beginTime = d3_timer.now();
  var progresses = [];

  d3_timer.timeout(function(elapsed) {
    test.ok(progresses.length);
    test.strictEqual(transition.progress(), progresses[0]);
    transition.progress(0.2);
  }, 50);

  d3_timer.timeout(function(elapsed) {
    test.ok(progresses.length === 2, `progresses.length(${progresses.length}) === 2`);
    test.strictEqual(transition.progress(), progresses[1]);
    transition.progress(1);
  }, 100);

  function onProgress(data, index, grp, progress) {
    progresses.push(progress);
  }

  function ended() {
    var t = d3_timer.now() - beginTime;
    test.ok(t >= 100);
    test.ok(t < 150);
    test.ok(progresses.length === 3, `progresses.length(${progresses.length}) === 3`);
    test.strictEqual(progresses[2], 1);
    test.strictEqual(transition.progress(), 1);
    test.end();
  }
});
