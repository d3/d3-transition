var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("../build/d3");

tape.Test.prototype.inDelta = function(actual, expected) {
  this._assert(expected - 1e-6 < actual && actual < expected + 1e-6, {
    message: "should be in delta",
    operator: "inDelta",
    actual: actual,
    expected: expected
  });
};

tape('d3.ease("linear") returns the expected results', function(test) {
  var ease = d3.ease("linear");
  test.equal(ease(-0.01), 0);
  test.equal(ease(0), 0);
  test.inDelta(ease(0.1), 0.1);
  test.inDelta(ease(0.2), 0.2);
  test.inDelta(ease(0.3), 0.3);
  test.inDelta(ease(0.4), 0.4);
  test.inDelta(ease(0.5), 0.5);
  test.inDelta(ease(0.6), 0.6);
  test.inDelta(ease(0.7), 0.7);
  test.inDelta(ease(0.8), 0.8);
  test.inDelta(ease(0.9), 0.9);
  test.equal(ease(".9"), ease(0.9)); // test numeric coercion
  test.equal(ease(1), 1);
  test.equal(ease(1.01), 1);
  test.end();
});

tape('d3.ease("linear-in") is an alias for d3.ease("linear")', function(test) {
  test.equal(d3.ease("linear-in"), d3.ease("linear"));
  test.end();
});

tape('d3.ease("linear-out") is an alias for d3.ease("linear")', function(test) {
  test.equal(d3.ease("linear-out"), d3.ease("linear"));
  test.end();
});

tape('d3.ease("linear-in-out") is an alias for d3.ease("linear")', function(test) {
  test.equal(d3.ease("linear-in-out"), d3.ease("linear"));
  test.end();
});

tape('d3.ease("linear-out-in") is an alias for d3.ease("linear")', function(test) {
  test.equal(d3.ease("linear-out-in"), d3.ease("linear"));
  test.end();
});

tape('d3.ease("quad") returns the expected results', function(test) {
  var ease = d3.ease("quad");
  test.equal(ease(-0.01), 0);
  test.equal(ease(0), 0);
  test.inDelta(ease(0.1), 0.01);
  test.inDelta(ease(0.2), 0.04);
  test.inDelta(ease(0.3), 0.09);
  test.inDelta(ease(0.4), 0.16);
  test.inDelta(ease(0.5), 0.25);
  test.inDelta(ease(0.6), 0.36);
  test.inDelta(ease(0.7), 0.49);
  test.inDelta(ease(0.8), 0.64);
  test.inDelta(ease(0.9), 0.81);
  test.equal(ease(".9"), ease(0.9)); // test numeric coercion
  test.equal(ease(1), 1);
  test.equal(ease(1.01), 1);
  test.end();
});

tape('d3.ease("quad-in") is an alias for d3.ease("quad")', function(test) {
  test.equal(d3.ease("quad-in"), d3.ease("quad"));
  test.end();
});

tape('d3.ease("quad-out") returns the expected results', function(test) {
  var ease = d3.ease("quad-out");
  test.equal(ease(-0.01), 0);
  test.equal(ease(0), 0);
  test.inDelta(ease(0.1), 0.19);
  test.inDelta(ease(0.2), 0.36);
  test.inDelta(ease(0.3), 0.51);
  test.inDelta(ease(0.4), 0.64);
  test.inDelta(ease(0.5), 0.75);
  test.inDelta(ease(0.6), 0.84);
  test.inDelta(ease(0.7), 0.91);
  test.inDelta(ease(0.8), 0.96);
  test.inDelta(ease(0.9), 0.99);
  test.equal(ease(".9"), ease(0.9)); // test numeric coercion
  test.equal(ease(1), 1);
  test.equal(ease(1.01), 1);
  test.end();
});

tape('d3.ease("quad-in-out") returns the expected results', function(test) {
  var ease = d3.ease("quad-in-out");
  test.equal(ease(-0.01), 0);
  test.equal(ease(0), 0);
  test.inDelta(ease(0.1), 0.02);
  test.inDelta(ease(0.2), 0.08);
  test.inDelta(ease(0.3), 0.18);
  test.inDelta(ease(0.4), 0.32);
  test.inDelta(ease(0.5), 0.50);
  test.inDelta(ease(0.6), 0.68);
  test.inDelta(ease(0.7), 0.82);
  test.inDelta(ease(0.8), 0.92);
  test.inDelta(ease(0.9), 0.98);
  test.equal(ease(".9"), ease(0.9)); // test numeric coercion
  test.equal(ease(1), 1);
  test.equal(ease(1.01), 1);
  test.end();
});

tape('d3.ease("quad-out-in") returns the expected results', function(test) {
  var ease = d3.ease("quad-out-in");
  test.equal(ease(-0.01), 0);
  test.equal(ease(0), 0);
  test.inDelta(ease(0.1), 0.18);
  test.inDelta(ease(0.2), 0.32);
  test.inDelta(ease(0.3), 0.42);
  test.inDelta(ease(0.4), 0.48);
  test.inDelta(ease(0.5), 0.50);
  test.inDelta(ease(0.6), 0.52);
  test.inDelta(ease(0.7), 0.58);
  test.inDelta(ease(0.8), 0.68);
  test.inDelta(ease(0.9), 0.82);
  test.equal(ease(".9"), ease(0.9)); // test numeric coercion
  test.equal(ease(1), 1);
  test.equal(ease(1.01), 1);
  test.end();
});

tape('d3.ease("cubic") returns the expected results', function(test) {
  var ease = d3.ease("cubic");
  test.equal(ease(-0.01), 0);
  test.equal(ease(0), 0);
  test.inDelta(ease(0.1), 0.001);
  test.inDelta(ease(0.2), 0.008);
  test.inDelta(ease(0.3), 0.027);
  test.inDelta(ease(0.4), 0.064);
  test.inDelta(ease(0.5), 0.125);
  test.inDelta(ease(0.6), 0.216);
  test.inDelta(ease(0.7), 0.343);
  test.inDelta(ease(0.8), 0.512);
  test.inDelta(ease(0.9), 0.729);
  test.equal(ease(".9"), ease(0.9)); // test numeric coercion
  test.equal(ease(1), 1);
  test.equal(ease(1.01), 1);
  test.end();
});

tape('d3.ease("cubic-in") is an alias for d3.ease("cubic")', function(test) {
  test.equal(d3.ease("cubic-in"), d3.ease("cubic"));
  test.end();
});

tape('d3.ease("cubic-out") returns the expected results', function(test) {
  var ease = d3.ease("cubic-out");
  test.equal(ease(-0.01), 0);
  test.equal(ease(0), 0);
  test.inDelta(ease(0.1), 0.271);
  test.inDelta(ease(0.2), 0.488);
  test.inDelta(ease(0.3), 0.657);
  test.inDelta(ease(0.4), 0.784);
  test.inDelta(ease(0.5), 0.875);
  test.inDelta(ease(0.6), 0.936);
  test.inDelta(ease(0.7), 0.973);
  test.inDelta(ease(0.8), 0.992);
  test.inDelta(ease(0.9), 0.999);
  test.equal(ease(".9"), ease(0.9)); // test numeric coercion
  test.equal(ease(1), 1);
  test.equal(ease(1.01), 1);
  test.end();
});

tape('d3.ease("cubic-in-out") returns the expected results', function(test) {
  var ease = d3.ease("cubic-in-out");
  test.equal(ease(-0.01), 0);
  test.equal(ease(0), 0);
  test.inDelta(ease(0.1), 0.004);
  test.inDelta(ease(0.2), 0.032);
  test.inDelta(ease(0.3), 0.108);
  test.inDelta(ease(0.4), 0.256);
  test.inDelta(ease(0.5), 0.500);
  test.inDelta(ease(0.6), 0.744);
  test.inDelta(ease(0.7), 0.892);
  test.inDelta(ease(0.8), 0.968);
  test.inDelta(ease(0.9), 0.996);
  test.equal(ease(".9"), ease(0.9)); // test numeric coercion
  test.equal(ease(1), 1);
  test.equal(ease(1.01), 1);
  test.end();
});

tape('d3.ease("cubic-out-in") returns the expected results', function(test) {
  var ease = d3.ease("cubic-out-in");
  test.equal(ease(-0.01), 0);
  test.equal(ease(0), 0);
  test.inDelta(ease(0.1), 0.244);
  test.inDelta(ease(0.2), 0.392);
  test.inDelta(ease(0.3), 0.468);
  test.inDelta(ease(0.4), 0.496);
  test.inDelta(ease(0.5), 0.500);
  test.inDelta(ease(0.6), 0.504);
  test.inDelta(ease(0.7), 0.532);
  test.inDelta(ease(0.8), 0.608);
  test.inDelta(ease(0.9), 0.756);
  test.equal(ease(".9"), ease(0.9)); // test numeric coercion
  test.equal(ease(1), 1);
  test.equal(ease(1.01), 1);
  test.end();
});
