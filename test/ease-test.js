var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection");

tape.Test.prototype.inDelta = function(actual, expected) {
  this._assert(expected - 1e-6 < actual && actual < expected + 1e-6, {
    message: 'should be in delta',
    operator: 'inDelta',
    actual: actual,
    expected: expected
  });
};

require("../");

tape("d3.ease.linear returns the expected results", function(test) {
  test.equal(d3.ease.linear(-.01), 0);
  test.equal(d3.ease.linear(0), 0);
  test.inDelta(d3.ease.linear(.1), .1);
  test.inDelta(d3.ease.linear(.2), .2);
  test.inDelta(d3.ease.linear(.3), .3);
  test.inDelta(d3.ease.linear(.4), .4);
  test.inDelta(d3.ease.linear(.5), .5);
  test.inDelta(d3.ease.linear(.6), .6);
  test.inDelta(d3.ease.linear(.7), .7);
  test.inDelta(d3.ease.linear(.8), .8);
  test.inDelta(d3.ease.linear(.9), .9);
  test.equal(d3.ease.linear(1), 1);
  test.equal(d3.ease.linear(1.01), 1);
  test.end();
});

tape("d3.ease.linearIn is an alias for d3.ease.linear", function(test) {
  test.equal(d3.ease.linearIn, d3.ease.linear);
  test.end();
});

tape("d3.ease.linearOut is an alias for d3.ease.linear", function(test) {
  test.equal(d3.ease.linearOut, d3.ease.linear);
  test.end();
});

tape("d3.ease.linearInOut is an alias for d3.ease.linear", function(test) {
  test.equal(d3.ease.linearInOut, d3.ease.linear);
  test.end();
});

tape("d3.ease.linearOutIn is an alias for d3.ease.linear", function(test) {
  test.equal(d3.ease.linearOutIn, d3.ease.linear);
  test.end();
});

tape("d3.ease.quad returns the expected results", function(test) {
  test.equal(d3.ease.quad(-.01), 0);
  test.equal(d3.ease.quad(0), 0);
  test.inDelta(d3.ease.quad(.1), .1 * .1);
  test.inDelta(d3.ease.quad(.2), .2 * .2);
  test.inDelta(d3.ease.quad(.3), .3 * .3);
  test.inDelta(d3.ease.quad(.4), .4 * .4);
  test.inDelta(d3.ease.quad(.5), .5 * .5);
  test.inDelta(d3.ease.quad(.6), .6 * .6);
  test.inDelta(d3.ease.quad(.7), .7 * .7);
  test.inDelta(d3.ease.quad(.8), .8 * .8);
  test.inDelta(d3.ease.quad(.9), .9 * .9);
  test.equal(d3.ease.quad(1), 1);
  test.equal(d3.ease.quad(1.01), 1);
  test.end();
});

tape("d3.ease.quadIn is an alias for d3.ease.quad", function(test) {
  test.equal(d3.ease.quadIn, d3.ease.quad);
  test.end();
});

tape("d3.ease.quadOut returns the expected results", function(test) {
  var quadOut = outOf(d3.ease.quad);
  test.equal(d3.ease.quadOut(-.01), 0);
  test.equal(d3.ease.quadOut(0), 0);
  test.inDelta(d3.ease.quadOut(.1), quadOut(.1));
  test.inDelta(d3.ease.quadOut(.2), quadOut(.2));
  test.inDelta(d3.ease.quadOut(.3), quadOut(.3));
  test.inDelta(d3.ease.quadOut(.4), quadOut(.4));
  test.inDelta(d3.ease.quadOut(.5), quadOut(.5));
  test.inDelta(d3.ease.quadOut(.6), quadOut(.6));
  test.inDelta(d3.ease.quadOut(.7), quadOut(.7));
  test.inDelta(d3.ease.quadOut(.8), quadOut(.8));
  test.inDelta(d3.ease.quadOut(.9), quadOut(.9));
  test.equal(d3.ease.quadOut(1), 1);
  test.equal(d3.ease.quadOut(1.01), 1);
  test.end();
});

tape("d3.ease.quadInOut returns the expected results", function(test) {
  var quadInOut = inOutOf(d3.ease.quad);
  test.equal(d3.ease.quadInOut(-.01), 0);
  test.equal(d3.ease.quadInOut(0), 0);
  test.inDelta(d3.ease.quadInOut(.1), quadInOut(.1));
  test.inDelta(d3.ease.quadInOut(.2), quadInOut(.2));
  test.inDelta(d3.ease.quadInOut(.3), quadInOut(.3));
  test.inDelta(d3.ease.quadInOut(.4), quadInOut(.4));
  test.inDelta(d3.ease.quadInOut(.5), quadInOut(.5));
  test.inDelta(d3.ease.quadInOut(.6), quadInOut(.6));
  test.inDelta(d3.ease.quadInOut(.7), quadInOut(.7));
  test.inDelta(d3.ease.quadInOut(.8), quadInOut(.8));
  test.inDelta(d3.ease.quadInOut(.9), quadInOut(.9));
  test.equal(d3.ease.quadInOut(1), 1);
  test.equal(d3.ease.quadInOut(1.01), 1);
  test.end();
});

tape("d3.ease.quadOutIn returns the expected results", function(test) {
  var quadOutIn = outInOf(d3.ease.quad);
  test.equal(d3.ease.quadOutIn(-.01), 0);
  test.equal(d3.ease.quadOutIn(0), 0);
  test.inDelta(d3.ease.quadOutIn(.1), quadOutIn(.1));
  test.inDelta(d3.ease.quadOutIn(.2), quadOutIn(.2));
  test.inDelta(d3.ease.quadOutIn(.3), quadOutIn(.3));
  test.inDelta(d3.ease.quadOutIn(.4), quadOutIn(.4));
  test.inDelta(d3.ease.quadOutIn(.5), quadOutIn(.5));
  test.inDelta(d3.ease.quadOutIn(.6), quadOutIn(.6));
  test.inDelta(d3.ease.quadOutIn(.7), quadOutIn(.7));
  test.inDelta(d3.ease.quadOutIn(.8), quadOutIn(.8));
  test.inDelta(d3.ease.quadOutIn(.9), quadOutIn(.9));
  test.equal(d3.ease.quadOutIn(1), 1);
  test.equal(d3.ease.quadOutIn(1.01), 1);
  test.end();
});

tape("d3.ease.cubic returns the expected results", function(test) {
  test.equal(d3.ease.cubic(-.01), 0);
  test.equal(d3.ease.cubic(0), 0);
  test.inDelta(d3.ease.cubic(.1), .1 * .1 * .1);
  test.inDelta(d3.ease.cubic(.2), .2 * .2 * .2);
  test.inDelta(d3.ease.cubic(.3), .3 * .3 * .3);
  test.inDelta(d3.ease.cubic(.4), .4 * .4 * .4);
  test.inDelta(d3.ease.cubic(.5), .5 * .5 * .5);
  test.inDelta(d3.ease.cubic(.6), .6 * .6 * .6);
  test.inDelta(d3.ease.cubic(.7), .7 * .7 * .7);
  test.inDelta(d3.ease.cubic(.8), .8 * .8 * .8);
  test.inDelta(d3.ease.cubic(.9), .9 * .9 * .9);
  test.equal(d3.ease.cubic(1), 1);
  test.equal(d3.ease.cubic(1.01), 1);
  test.end();
});

tape("d3.ease.cubicIn is an alias for d3.ease.cubic", function(test) {
  test.equal(d3.ease.cubicIn, d3.ease.cubic);
  test.end();
});

tape("d3.ease.cubicOut returns the expected results", function(test) {
  var cubicOut = outOf(d3.ease.cubic);
  test.equal(d3.ease.cubicOut(-.01), 0);
  test.equal(d3.ease.cubicOut(0), 0);
  test.inDelta(d3.ease.cubicOut(.1), cubicOut(.1));
  test.inDelta(d3.ease.cubicOut(.2), cubicOut(.2));
  test.inDelta(d3.ease.cubicOut(.3), cubicOut(.3));
  test.inDelta(d3.ease.cubicOut(.4), cubicOut(.4));
  test.inDelta(d3.ease.cubicOut(.5), cubicOut(.5));
  test.inDelta(d3.ease.cubicOut(.6), cubicOut(.6));
  test.inDelta(d3.ease.cubicOut(.7), cubicOut(.7));
  test.inDelta(d3.ease.cubicOut(.8), cubicOut(.8));
  test.inDelta(d3.ease.cubicOut(.9), cubicOut(.9));
  test.equal(d3.ease.cubicOut(1), 1);
  test.equal(d3.ease.cubicOut(1.01), 1);
  test.end();
});

tape("d3.ease.cubicInOut returns the expected results", function(test) {
  var cubicInOut = inOutOf(d3.ease.cubic);
  test.equal(d3.ease.cubicInOut(-.01), 0);
  test.equal(d3.ease.cubicInOut(0), 0);
  test.inDelta(d3.ease.cubicInOut(.1), cubicInOut(.1));
  test.inDelta(d3.ease.cubicInOut(.2), cubicInOut(.2));
  test.inDelta(d3.ease.cubicInOut(.3), cubicInOut(.3));
  test.inDelta(d3.ease.cubicInOut(.4), cubicInOut(.4));
  test.inDelta(d3.ease.cubicInOut(.5), cubicInOut(.5));
  test.inDelta(d3.ease.cubicInOut(.6), cubicInOut(.6));
  test.inDelta(d3.ease.cubicInOut(.7), cubicInOut(.7));
  test.inDelta(d3.ease.cubicInOut(.8), cubicInOut(.8));
  test.inDelta(d3.ease.cubicInOut(.9), cubicInOut(.9));
  test.equal(d3.ease.cubicInOut(1), 1);
  test.equal(d3.ease.cubicInOut(1.01), 1);
  test.end();
});

tape("d3.ease.cubicOutIn returns the expected results", function(test) {
  var cubicOutIn = outInOf(d3.ease.cubic);
  test.equal(d3.ease.cubicOutIn(-.01), 0);
  test.equal(d3.ease.cubicOutIn(0), 0);
  test.inDelta(d3.ease.cubicOutIn(.1), cubicOutIn(.1));
  test.inDelta(d3.ease.cubicOutIn(.2), cubicOutIn(.2));
  test.inDelta(d3.ease.cubicOutIn(.3), cubicOutIn(.3));
  test.inDelta(d3.ease.cubicOutIn(.4), cubicOutIn(.4));
  test.inDelta(d3.ease.cubicOutIn(.5), cubicOutIn(.5));
  test.inDelta(d3.ease.cubicOutIn(.6), cubicOutIn(.6));
  test.inDelta(d3.ease.cubicOutIn(.7), cubicOutIn(.7));
  test.inDelta(d3.ease.cubicOutIn(.8), cubicOutIn(.8));
  test.inDelta(d3.ease.cubicOutIn(.9), cubicOutIn(.9));
  test.equal(d3.ease.cubicOutIn(1), 1);
  test.equal(d3.ease.cubicOutIn(1.01), 1);
  test.end();
});

function inOf(ease) {
  return ease;
}

function outOf(ease) {
  return function(t) {
    return 1 - ease(1 - t);
  };
}

function inOutOf(ease) {
  return function(t) {
    return t *= 2, (t <= 1 ? ease(t) : 2 - ease(2 - t)) / 2;
  };
}

function outInOf(ease) {
  return inOutOf(outOf(ease));
}
