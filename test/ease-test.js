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
  test.inDelta(ease(0.1), 0.1);
  test.inDelta(ease(0.2), 0.2);
  test.inDelta(ease(0.3), 0.3);
  test.inDelta(ease(0.4), 0.4);
  test.inDelta(ease(0.5), 0.5);
  test.inDelta(ease(0.6), 0.6);
  test.inDelta(ease(0.7), 0.7);
  test.inDelta(ease(0.8), 0.8);
  test.inDelta(ease(0.9), 0.9);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
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
  test.inDelta(ease(0.1), 0.01);
  test.inDelta(ease(0.2), 0.04);
  test.inDelta(ease(0.3), 0.09);
  test.inDelta(ease(0.4), 0.16);
  test.inDelta(ease(0.5), 0.25);
  test.inDelta(ease(0.6), 0.36);
  test.inDelta(ease(0.7), 0.49);
  test.inDelta(ease(0.8), 0.64);
  test.inDelta(ease(0.9), 0.81);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("quad-in") is an alias for d3.ease("quad")', function(test) {
  test.equal(d3.ease("quad-in"), d3.ease("quad"));
  test.end();
});

tape('d3.ease("quad-out") returns the expected results', function(test) {
  var ease = d3.ease("quad-out");
  test.inDelta(ease(0.1), 0.19);
  test.inDelta(ease(0.2), 0.36);
  test.inDelta(ease(0.3), 0.51);
  test.inDelta(ease(0.4), 0.64);
  test.inDelta(ease(0.5), 0.75);
  test.inDelta(ease(0.6), 0.84);
  test.inDelta(ease(0.7), 0.91);
  test.inDelta(ease(0.8), 0.96);
  test.inDelta(ease(0.9), 0.99);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("quad-in-out") returns the expected results', function(test) {
  var ease = d3.ease("quad-in-out");
  test.inDelta(ease(0.1), 0.02);
  test.inDelta(ease(0.2), 0.08);
  test.inDelta(ease(0.3), 0.18);
  test.inDelta(ease(0.4), 0.32);
  test.inDelta(ease(0.5), 0.50);
  test.inDelta(ease(0.6), 0.68);
  test.inDelta(ease(0.7), 0.82);
  test.inDelta(ease(0.8), 0.92);
  test.inDelta(ease(0.9), 0.98);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("quad-out-in") returns the expected results', function(test) {
  var ease = d3.ease("quad-out-in");
  test.inDelta(ease(0.1), 0.18);
  test.inDelta(ease(0.2), 0.32);
  test.inDelta(ease(0.3), 0.42);
  test.inDelta(ease(0.4), 0.48);
  test.inDelta(ease(0.5), 0.50);
  test.inDelta(ease(0.6), 0.52);
  test.inDelta(ease(0.7), 0.58);
  test.inDelta(ease(0.8), 0.68);
  test.inDelta(ease(0.9), 0.82);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("cubic") returns the expected results', function(test) {
  var ease = d3.ease("cubic");
  test.inDelta(ease(0.1), 0.001);
  test.inDelta(ease(0.2), 0.008);
  test.inDelta(ease(0.3), 0.027);
  test.inDelta(ease(0.4), 0.064);
  test.inDelta(ease(0.5), 0.125);
  test.inDelta(ease(0.6), 0.216);
  test.inDelta(ease(0.7), 0.343);
  test.inDelta(ease(0.8), 0.512);
  test.inDelta(ease(0.9), 0.729);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("cubic-in") is an alias for d3.ease("cubic")', function(test) {
  test.equal(d3.ease("cubic-in"), d3.ease("cubic"));
  test.end();
});

tape('d3.ease("cubic-out") returns the expected results', function(test) {
  var ease = d3.ease("cubic-out");
  test.inDelta(ease(0.1), 0.271);
  test.inDelta(ease(0.2), 0.488);
  test.inDelta(ease(0.3), 0.657);
  test.inDelta(ease(0.4), 0.784);
  test.inDelta(ease(0.5), 0.875);
  test.inDelta(ease(0.6), 0.936);
  test.inDelta(ease(0.7), 0.973);
  test.inDelta(ease(0.8), 0.992);
  test.inDelta(ease(0.9), 0.999);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("cubic-in-out") returns the expected results', function(test) {
  var ease = d3.ease("cubic-in-out");
  test.inDelta(ease(0.1), 0.004);
  test.inDelta(ease(0.2), 0.032);
  test.inDelta(ease(0.3), 0.108);
  test.inDelta(ease(0.4), 0.256);
  test.inDelta(ease(0.5), 0.500);
  test.inDelta(ease(0.6), 0.744);
  test.inDelta(ease(0.7), 0.892);
  test.inDelta(ease(0.8), 0.968);
  test.inDelta(ease(0.9), 0.996);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("cubic-out-in") returns the expected results', function(test) {
  var ease = d3.ease("cubic-out-in");
  test.inDelta(ease(0.1), 0.244);
  test.inDelta(ease(0.2), 0.392);
  test.inDelta(ease(0.3), 0.468);
  test.inDelta(ease(0.4), 0.496);
  test.inDelta(ease(0.5), 0.500);
  test.inDelta(ease(0.6), 0.504);
  test.inDelta(ease(0.7), 0.532);
  test.inDelta(ease(0.8), 0.608);
  test.inDelta(ease(0.9), 0.756);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("poly") is an alias for d3.ease("cubic")', function(test) {
  test.equal(d3.ease("poly"), d3.ease("cubic"));
  test.end();
});

tape('d3.ease("poly-in") is an alias for d3.ease("cubic")', function(test) {
  test.equal(d3.ease("poly-in"), d3.ease("cubic"));
  test.end();
});

tape('d3.ease("poly-out") is an alias for d3.ease("cubic-out")', function(test) {
  test.equal(d3.ease("poly-out"), d3.ease("cubic-out"));
  test.end();
});

tape('d3.ease("poly-in-out") is an alias for d3.ease("cubic-in-out")', function(test) {
  test.equal(d3.ease("poly-in-out"), d3.ease("cubic-in-out"));
  test.end();
});

tape('d3.ease("poly-out-in") is an alias for d3.ease("cubic-out-in")', function(test) {
  test.equal(d3.ease("poly-out-in"), d3.ease("cubic-out-in"));
  test.end();
});

tape('d3.ease("poly", 2.5) returns the expected results', function(test) {
  var ease = d3.ease("poly", 2.5);
  test.inDelta(ease(0.1), 0.003162);
  test.inDelta(ease(0.2), 0.017889);
  test.inDelta(ease(0.3), 0.049295);
  test.inDelta(ease(0.4), 0.101193);
  test.inDelta(ease(0.5), 0.176777);
  test.inDelta(ease(0.6), 0.278855);
  test.inDelta(ease(0.7), 0.409963);
  test.inDelta(ease(0.8), 0.572433);
  test.inDelta(ease(0.9), 0.768433);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("poly-in", 2.5) returns the expected results', function(test) {
  var ease = d3.ease("poly-in", 2.5);
  test.inDelta(ease(0.1), 0.003162);
  test.inDelta(ease(0.2), 0.017889);
  test.inDelta(ease(0.3), 0.049295);
  test.inDelta(ease(0.4), 0.101193);
  test.inDelta(ease(0.5), 0.176777);
  test.inDelta(ease(0.6), 0.278855);
  test.inDelta(ease(0.7), 0.409963);
  test.inDelta(ease(0.8), 0.572433);
  test.inDelta(ease(0.9), 0.768433);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("poly-out", 2.5) returns the expected results', function(test) {
  var ease = d3.ease("poly-out", 2.5);
  test.inDelta(ease(0.1), 0.231567);
  test.inDelta(ease(0.2), 0.427567);
  test.inDelta(ease(0.3), 0.590037);
  test.inDelta(ease(0.4), 0.721145);
  test.inDelta(ease(0.5), 0.823223);
  test.inDelta(ease(0.6), 0.898807);
  test.inDelta(ease(0.7), 0.950705);
  test.inDelta(ease(0.8), 0.982111);
  test.inDelta(ease(0.9), 0.996838);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("poly-in-out", 2.5) returns the expected results', function(test) {
  var ease = d3.ease("poly-in-out", 2.5);
  test.inDelta(ease(0.1), 0.008944);
  test.inDelta(ease(0.2), 0.050596);
  test.inDelta(ease(0.3), 0.139427);
  test.inDelta(ease(0.4), 0.286217);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.713783);
  test.inDelta(ease(0.7), 0.860573);
  test.inDelta(ease(0.8), 0.949404);
  test.inDelta(ease(0.9), 0.991056);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("poly-out-in", 2.5) returns the expected results', function(test) {
  var ease = d3.ease("poly-out-in", 2.5);
  test.inDelta(ease(0.1), 0.213783);
  test.inDelta(ease(0.2), 0.360573);
  test.inDelta(ease(0.3), 0.449404);
  test.inDelta(ease(0.4), 0.491056);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.508944);
  test.inDelta(ease(0.7), 0.550596);
  test.inDelta(ease(0.8), 0.639427);
  test.inDelta(ease(0.9), 0.786217);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("sin") returns the expected results', function(test) {
  var ease = d3.ease("sin");
  test.inDelta(ease(0.1), 0.012312);
  test.inDelta(ease(0.2), 0.048943);
  test.inDelta(ease(0.3), 0.108993);
  test.inDelta(ease(0.4), 0.190983);
  test.inDelta(ease(0.5), 0.292893);
  test.inDelta(ease(0.6), 0.412215);
  test.inDelta(ease(0.7), 0.546010);
  test.inDelta(ease(0.8), 0.690983);
  test.inDelta(ease(0.9), 0.843566);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("sin-in") is an alias for d3.ease("sin")', function(test) {
  test.equal(d3.ease("sin-in"), d3.ease("sin"));
  test.end();
});

tape('d3.ease("sin-out") returns the expected results', function(test) {
  var ease = d3.ease("sin-out");
  test.inDelta(ease(0.1), 0.156434);
  test.inDelta(ease(0.2), 0.309017);
  test.inDelta(ease(0.3), 0.453990);
  test.inDelta(ease(0.4), 0.587785);
  test.inDelta(ease(0.5), 0.707107);
  test.inDelta(ease(0.6), 0.809017);
  test.inDelta(ease(0.7), 0.891007);
  test.inDelta(ease(0.8), 0.951057);
  test.inDelta(ease(0.9), 0.987688);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("sin-in-out") returns the expected results', function(test) {
  var ease = d3.ease("sin-in-out");
  test.inDelta(ease(0.1), 0.024472);
  test.inDelta(ease(0.2), 0.095492);
  test.inDelta(ease(0.3), 0.206107);
  test.inDelta(ease(0.4), 0.345492);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.654508);
  test.inDelta(ease(0.7), 0.793893);
  test.inDelta(ease(0.8), 0.904508);
  test.inDelta(ease(0.9), 0.975528);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("sin-out-in") returns the expected results', function(test) {
  var ease = d3.ease("sin-out-in");
  test.inDelta(ease(0.1), 0.154508);
  test.inDelta(ease(0.2), 0.293893);
  test.inDelta(ease(0.3), 0.404508);
  test.inDelta(ease(0.4), 0.475528);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.524472);
  test.inDelta(ease(0.7), 0.595492);
  test.inDelta(ease(0.8), 0.706107);
  test.inDelta(ease(0.9), 0.845492);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("exp") returns the expected results', function(test) {
  var ease = d3.ease("exp");
  test.inDelta(ease(0.1), 0.001953);
  test.inDelta(ease(0.2), 0.003906);
  test.inDelta(ease(0.3), 0.007813);
  test.inDelta(ease(0.4), 0.015625);
  test.inDelta(ease(0.5), 0.031250);
  test.inDelta(ease(0.6), 0.062500);
  test.inDelta(ease(0.7), 0.125000);
  test.inDelta(ease(0.8), 0.250000);
  test.inDelta(ease(0.9), 0.500000);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("exp-in") is an alias for d3.ease("exp")', function(test) {
  test.equal(d3.ease("exp-in"), d3.ease("exp"));
  test.end();
});

tape('d3.ease("exp-out") returns the expected results', function(test) {
  var ease = d3.ease("exp-out");
  test.inDelta(ease(0.1), 0.500000);
  test.inDelta(ease(0.2), 0.750000);
  test.inDelta(ease(0.3), 0.875000);
  test.inDelta(ease(0.4), 0.937500);
  test.inDelta(ease(0.5), 0.968750);
  test.inDelta(ease(0.6), 0.984375);
  test.inDelta(ease(0.7), 0.992188);
  test.inDelta(ease(0.8), 0.996094);
  test.inDelta(ease(0.9), 0.998047);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("exp-in-out") returns the expected results', function(test) {
  var ease = d3.ease("exp-in-out");
  test.inDelta(ease(0.1), 0.001953);
  test.inDelta(ease(0.2), 0.007813);
  test.inDelta(ease(0.3), 0.031250);
  test.inDelta(ease(0.4), 0.125000);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.875000);
  test.inDelta(ease(0.7), 0.968750);
  test.inDelta(ease(0.8), 0.992188);
  test.inDelta(ease(0.9), 0.998047);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("exp-out-in") returns the expected results', function(test) {
  var ease = d3.ease("exp-out-in");
  test.inDelta(ease(0.1), 0.375000);
  test.inDelta(ease(0.2), 0.468750);
  test.inDelta(ease(0.3), 0.492188);
  test.inDelta(ease(0.4), 0.498047);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.501953);
  test.inDelta(ease(0.7), 0.507813);
  test.inDelta(ease(0.8), 0.531250);
  test.inDelta(ease(0.9), 0.625000);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("circle") returns the circleected results', function(test) {
  var ease = d3.ease("circle");
  test.inDelta(ease(0.1), 0.005013);
  test.inDelta(ease(0.2), 0.020204);
  test.inDelta(ease(0.3), 0.046061);
  test.inDelta(ease(0.4), 0.083485);
  test.inDelta(ease(0.5), 0.133975);
  test.inDelta(ease(0.6), 0.200000);
  test.inDelta(ease(0.7), 0.285857);
  test.inDelta(ease(0.8), 0.400000);
  test.inDelta(ease(0.9), 0.564110);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("circle-in") is an alias for d3.ease("circle")', function(test) {
  test.equal(d3.ease("circle-in"), d3.ease("circle"));
  test.end();
});

tape('d3.ease("circle-out") returns the circleected results', function(test) {
  var ease = d3.ease("circle-out");
  test.inDelta(ease(0.1), 0.435890);
  test.inDelta(ease(0.2), 0.600000);
  test.inDelta(ease(0.3), 0.714143);
  test.inDelta(ease(0.4), 0.800000);
  test.inDelta(ease(0.5), 0.866025);
  test.inDelta(ease(0.6), 0.916515);
  test.inDelta(ease(0.7), 0.953939);
  test.inDelta(ease(0.8), 0.979796);
  test.inDelta(ease(0.9), 0.994987);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("circle-in-out") returns the circleected results', function(test) {
  var ease = d3.ease("circle-in-out");
  test.inDelta(ease(0.1), 0.010102);
  test.inDelta(ease(0.2), 0.041742);
  test.inDelta(ease(0.3), 0.100000);
  test.inDelta(ease(0.4), 0.200000);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.800000);
  test.inDelta(ease(0.7), 0.900000);
  test.inDelta(ease(0.8), 0.958258);
  test.inDelta(ease(0.9), 0.989898);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});

tape('d3.ease("circle-out-in") returns the circleected results', function(test) {
  var ease = d3.ease("circle-out-in");
  test.inDelta(ease(0.1), 0.300000);
  test.inDelta(ease(0.2), 0.400000);
  test.inDelta(ease(0.3), 0.458258);
  test.inDelta(ease(0.4), 0.489898);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.510102);
  test.inDelta(ease(0.7), 0.541742);
  test.inDelta(ease(0.8), 0.600000);
  test.inDelta(ease(0.9), 0.700000);
  test.equal(ease(0), 0, "exact zero");
  test.equal(ease(1), 1, "exact one");
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.equal(ease(-0.01), 0, "clamp below zero");
  test.equal(ease(1.01), 1, "clamp above one");
  test.end();
});
