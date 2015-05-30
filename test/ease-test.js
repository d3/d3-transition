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

tape("d3.ease(type) coerces type to a string", function(test) {
  test.equal(d3.ease({toString: function() { return "cubic-in-out"; }}), d3.ease("cubic-in-out"));
  test.end();
});

tape('d3.ease("linear") returns the expected results', function(test) {
  var ease = d3.ease("linear");
  test.inDelta(ease(0.0), 0.0);
  test.inDelta(ease(0.1), 0.1);
  test.inDelta(ease(0.2), 0.2);
  test.inDelta(ease(0.3), 0.3);
  test.inDelta(ease(0.4), 0.4);
  test.inDelta(ease(0.5), 0.5);
  test.inDelta(ease(0.6), 0.6);
  test.inDelta(ease(0.7), 0.7);
  test.inDelta(ease(0.8), 0.8);
  test.inDelta(ease(0.9), 0.9);
  test.inDelta(ease(1.0), 1.0);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
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

tape('d3.ease("quad") returns the expected results', function(test) {
  var ease = d3.ease("quad");
  test.inDelta(ease(0.0), 0.00);
  test.inDelta(ease(0.1), 0.01);
  test.inDelta(ease(0.2), 0.04);
  test.inDelta(ease(0.3), 0.09);
  test.inDelta(ease(0.4), 0.16);
  test.inDelta(ease(0.5), 0.25);
  test.inDelta(ease(0.6), 0.36);
  test.inDelta(ease(0.7), 0.49);
  test.inDelta(ease(0.8), 0.64);
  test.inDelta(ease(0.9), 0.81);
  test.inDelta(ease(1.0), 1.00);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("quad-in") is an alias for d3.ease("quad")', function(test) {
  test.equal(d3.ease("quad-in"), d3.ease("quad"));
  test.end();
});

tape('d3.ease("quad-out") returns the expected results', function(test) {
  var ease = d3.ease("quad-out");
  test.inDelta(ease(0.0), 0.00);
  test.inDelta(ease(0.1), 0.19);
  test.inDelta(ease(0.2), 0.36);
  test.inDelta(ease(0.3), 0.51);
  test.inDelta(ease(0.4), 0.64);
  test.inDelta(ease(0.5), 0.75);
  test.inDelta(ease(0.6), 0.84);
  test.inDelta(ease(0.7), 0.91);
  test.inDelta(ease(0.8), 0.96);
  test.inDelta(ease(0.9), 0.99);
  test.inDelta(ease(1.0), 1.00);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("quad-in-out") returns the expected results', function(test) {
  var ease = d3.ease("quad-in-out");
  test.inDelta(ease(0.0), 0.00);
  test.inDelta(ease(0.1), 0.02);
  test.inDelta(ease(0.2), 0.08);
  test.inDelta(ease(0.3), 0.18);
  test.inDelta(ease(0.4), 0.32);
  test.inDelta(ease(0.5), 0.50);
  test.inDelta(ease(0.6), 0.68);
  test.inDelta(ease(0.7), 0.82);
  test.inDelta(ease(0.8), 0.92);
  test.inDelta(ease(0.9), 0.98);
  test.inDelta(ease(1.0), 1.00);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("cubic") returns the expected results', function(test) {
  var ease = d3.ease("cubic");
  test.inDelta(ease(0.0), 0.000);
  test.inDelta(ease(0.1), 0.001);
  test.inDelta(ease(0.2), 0.008);
  test.inDelta(ease(0.3), 0.027);
  test.inDelta(ease(0.4), 0.064);
  test.inDelta(ease(0.5), 0.125);
  test.inDelta(ease(0.6), 0.216);
  test.inDelta(ease(0.7), 0.343);
  test.inDelta(ease(0.8), 0.512);
  test.inDelta(ease(0.9), 0.729);
  test.inDelta(ease(1.0), 1.000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("cubic-in") is an alias for d3.ease("cubic")', function(test) {
  test.equal(d3.ease("cubic-in"), d3.ease("cubic"));
  test.end();
});

tape('d3.ease("cubic-out") returns the expected results', function(test) {
  var ease = d3.ease("cubic-out");
  test.inDelta(ease(0.0), 0.000);
  test.inDelta(ease(0.1), 0.271);
  test.inDelta(ease(0.2), 0.488);
  test.inDelta(ease(0.3), 0.657);
  test.inDelta(ease(0.4), 0.784);
  test.inDelta(ease(0.5), 0.875);
  test.inDelta(ease(0.6), 0.936);
  test.inDelta(ease(0.7), 0.973);
  test.inDelta(ease(0.8), 0.992);
  test.inDelta(ease(0.9), 0.999);
  test.inDelta(ease(1.0), 1.000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("cubic-in-out") returns the expected results', function(test) {
  var ease = d3.ease("cubic-in-out");
  test.inDelta(ease(0.0), 0.000);
  test.inDelta(ease(0.1), 0.004);
  test.inDelta(ease(0.2), 0.032);
  test.inDelta(ease(0.3), 0.108);
  test.inDelta(ease(0.4), 0.256);
  test.inDelta(ease(0.5), 0.500);
  test.inDelta(ease(0.6), 0.744);
  test.inDelta(ease(0.7), 0.892);
  test.inDelta(ease(0.8), 0.968);
  test.inDelta(ease(0.9), 0.996);
  test.inDelta(ease(1.0), 1.000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
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

// tape('d3.ease("poly", 2.5) returns the expected results', function(test) {
//   var ease = d3.ease("poly", 2.5);
//   test.inDelta(ease(0.0), 0.000000);
//   test.inDelta(ease(0.1), 0.003162);
//   test.inDelta(ease(0.2), 0.017889);
//   test.inDelta(ease(0.3), 0.049295);
//   test.inDelta(ease(0.4), 0.101193);
//   test.inDelta(ease(0.5), 0.176777);
//   test.inDelta(ease(0.6), 0.278855);
//   test.inDelta(ease(0.7), 0.409963);
//   test.inDelta(ease(0.8), 0.572433);
//   test.inDelta(ease(0.9), 0.768433);
//   test.inDelta(ease(1.0), 1.000000);
//   test.equal(ease(".9"), ease(0.9), "numeric coercion");
//   test.end();
// });

// tape('d3.ease("poly-in", 2.5) returns the expected results', function(test) {
//   var ease = d3.ease("poly-in", 2.5);
//   test.inDelta(ease(0.0), 0.000000);
//   test.inDelta(ease(0.1), 0.003162);
//   test.inDelta(ease(0.2), 0.017889);
//   test.inDelta(ease(0.3), 0.049295);
//   test.inDelta(ease(0.4), 0.101193);
//   test.inDelta(ease(0.5), 0.176777);
//   test.inDelta(ease(0.6), 0.278855);
//   test.inDelta(ease(0.7), 0.409963);
//   test.inDelta(ease(0.8), 0.572433);
//   test.inDelta(ease(0.9), 0.768433);
//   test.inDelta(ease(1.0), 1.000000);
//   test.equal(ease(".9"), ease(0.9), "numeric coercion");
//   test.end();
// });

// tape('d3.ease("poly-out", 2.5) returns the expected results', function(test) {
//   var ease = d3.ease("poly-out", 2.5);
//   test.inDelta(ease(0.0), 0.000000);
//   test.inDelta(ease(0.1), 0.231567);
//   test.inDelta(ease(0.2), 0.427567);
//   test.inDelta(ease(0.3), 0.590037);
//   test.inDelta(ease(0.4), 0.721145);
//   test.inDelta(ease(0.5), 0.823223);
//   test.inDelta(ease(0.6), 0.898807);
//   test.inDelta(ease(0.7), 0.950705);
//   test.inDelta(ease(0.8), 0.982111);
//   test.inDelta(ease(0.9), 0.996838);
//   test.inDelta(ease(1.0), 1.000000);
//   test.equal(ease(".9"), ease(0.9), "numeric coercion");
//   test.end();
// });

// tape('d3.ease("poly-in-out", 2.5) returns the expected results', function(test) {
//   var ease = d3.ease("poly-in-out", 2.5);
//   test.inDelta(ease(0.0), 0.000000);
//   test.inDelta(ease(0.1), 0.008944);
//   test.inDelta(ease(0.2), 0.050596);
//   test.inDelta(ease(0.3), 0.139427);
//   test.inDelta(ease(0.4), 0.286217);
//   test.inDelta(ease(0.5), 0.500000);
//   test.inDelta(ease(0.6), 0.713783);
//   test.inDelta(ease(0.7), 0.860573);
//   test.inDelta(ease(0.8), 0.949404);
//   test.inDelta(ease(0.9), 0.991056);
//   test.inDelta(ease(1.0), 1.000000);
//   test.equal(ease(".9"), ease(0.9), "numeric coercion");
//   test.end();
// });

tape('d3.ease("sin") returns the expected results', function(test) {
  var ease = d3.ease("sin");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.012312);
  test.inDelta(ease(0.2), 0.048943);
  test.inDelta(ease(0.3), 0.108993);
  test.inDelta(ease(0.4), 0.190983);
  test.inDelta(ease(0.5), 0.292893);
  test.inDelta(ease(0.6), 0.412215);
  test.inDelta(ease(0.7), 0.546010);
  test.inDelta(ease(0.8), 0.690983);
  test.inDelta(ease(0.9), 0.843566);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("sin-in") is an alias for d3.ease("sin")', function(test) {
  test.equal(d3.ease("sin-in"), d3.ease("sin"));
  test.end();
});

tape('d3.ease("sin-out") returns the expected results', function(test) {
  var ease = d3.ease("sin-out");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.156434);
  test.inDelta(ease(0.2), 0.309017);
  test.inDelta(ease(0.3), 0.453990);
  test.inDelta(ease(0.4), 0.587785);
  test.inDelta(ease(0.5), 0.707107);
  test.inDelta(ease(0.6), 0.809017);
  test.inDelta(ease(0.7), 0.891007);
  test.inDelta(ease(0.8), 0.951057);
  test.inDelta(ease(0.9), 0.987688);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("sin-in-out") returns the expected results', function(test) {
  var ease = d3.ease("sin-in-out");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.024472);
  test.inDelta(ease(0.2), 0.095492);
  test.inDelta(ease(0.3), 0.206107);
  test.inDelta(ease(0.4), 0.345492);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.654508);
  test.inDelta(ease(0.7), 0.793893);
  test.inDelta(ease(0.8), 0.904508);
  test.inDelta(ease(0.9), 0.975528);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("exp") returns the expected results', function(test) {
  var ease = d3.ease("exp");
  test.inDelta(ease(0.0), 0.000976); // Note: not exactly zero.
  test.inDelta(ease(0.1), 0.001953);
  test.inDelta(ease(0.2), 0.003906);
  test.inDelta(ease(0.3), 0.007813);
  test.inDelta(ease(0.4), 0.015625);
  test.inDelta(ease(0.5), 0.031250);
  test.inDelta(ease(0.6), 0.062500);
  test.inDelta(ease(0.7), 0.125000);
  test.inDelta(ease(0.8), 0.250000);
  test.inDelta(ease(0.9), 0.500000);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("exp-in") is an alias for d3.ease("exp")', function(test) {
  test.equal(d3.ease("exp-in"), d3.ease("exp"));
  test.end();
});

tape('d3.ease("exp-out") returns the expected results', function(test) {
  var ease = d3.ease("exp-out");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.500000);
  test.inDelta(ease(0.2), 0.750000);
  test.inDelta(ease(0.3), 0.875000);
  test.inDelta(ease(0.4), 0.937500);
  test.inDelta(ease(0.5), 0.968750);
  test.inDelta(ease(0.6), 0.984375);
  test.inDelta(ease(0.7), 0.992188);
  test.inDelta(ease(0.8), 0.996094);
  test.inDelta(ease(0.9), 0.998047);
  test.inDelta(ease(1.0), 0.999023); // Note: not exactly one.
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("exp-in-out") returns the expected results', function(test) {
  var ease = d3.ease("exp-in-out");
  test.inDelta(ease(0.0), 0.000488); // Note: not exactly zero.
  test.inDelta(ease(0.1), 0.001953);
  test.inDelta(ease(0.2), 0.007813);
  test.inDelta(ease(0.3), 0.031250);
  test.inDelta(ease(0.4), 0.125000);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.875000);
  test.inDelta(ease(0.7), 0.968750);
  test.inDelta(ease(0.8), 0.992188);
  test.inDelta(ease(0.9), 0.998047);
  test.inDelta(ease(1.0), 0.999511); // Note: not exactly one.
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("circle") returns the expected results', function(test) {
  var ease = d3.ease("circle");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.005013);
  test.inDelta(ease(0.2), 0.020204);
  test.inDelta(ease(0.3), 0.046061);
  test.inDelta(ease(0.4), 0.083485);
  test.inDelta(ease(0.5), 0.133975);
  test.inDelta(ease(0.6), 0.200000);
  test.inDelta(ease(0.7), 0.285857);
  test.inDelta(ease(0.8), 0.400000);
  test.inDelta(ease(0.9), 0.564110);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("circle-in") is an alias for d3.ease("circle")', function(test) {
  test.equal(d3.ease("circle-in"), d3.ease("circle"));
  test.end();
});

tape('d3.ease("circle-out") returns the expected results', function(test) {
  var ease = d3.ease("circle-out");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.435890);
  test.inDelta(ease(0.2), 0.600000);
  test.inDelta(ease(0.3), 0.714143);
  test.inDelta(ease(0.4), 0.800000);
  test.inDelta(ease(0.5), 0.866025);
  test.inDelta(ease(0.6), 0.916515);
  test.inDelta(ease(0.7), 0.953939);
  test.inDelta(ease(0.8), 0.979796);
  test.inDelta(ease(0.9), 0.994987);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("circle-in-out") returns the expected results', function(test) {
  var ease = d3.ease("circle-in-out");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.010102);
  test.inDelta(ease(0.2), 0.041742);
  test.inDelta(ease(0.3), 0.100000);
  test.inDelta(ease(0.4), 0.200000);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.800000);
  test.inDelta(ease(0.7), 0.900000);
  test.inDelta(ease(0.8), 0.958258);
  test.inDelta(ease(0.9), 0.989898);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("bounce") returns the expected results', function(test) {
  var ease = d3.ease("bounce");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.011875);
  test.inDelta(ease(0.2), 0.060000);
  test.inDelta(ease(0.3), 0.069375);
  test.inDelta(ease(0.4), 0.227500);
  test.inDelta(ease(0.5), 0.234375);
  test.inDelta(ease(0.6), 0.090000);
  test.inDelta(ease(0.7), 0.319375);
  test.inDelta(ease(0.8), 0.697500);
  test.inDelta(ease(0.9), 0.924375);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("bounce-in") is an alias for d3.ease("bounce")', function(test) {
  test.equal(d3.ease("bounce-in"), d3.ease("bounce"));
  test.end();
});

tape('d3.ease("bounce-out") returns the expected results', function(test) {
  var ease = d3.ease("bounce-out");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.075625);
  test.inDelta(ease(0.2), 0.302500);
  test.inDelta(ease(0.3), 0.680625);
  test.inDelta(ease(0.4), 0.910000);
  test.inDelta(ease(0.5), 0.765625);
  test.inDelta(ease(0.6), 0.772500);
  test.inDelta(ease(0.7), 0.930625);
  test.inDelta(ease(0.8), 0.940000);
  test.inDelta(ease(0.9), 0.988125);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("bounce-in-out") returns the expected results', function(test) {
  var ease = d3.ease("bounce-in-out");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.030000);
  test.inDelta(ease(0.2), 0.113750);
  test.inDelta(ease(0.3), 0.045000);
  test.inDelta(ease(0.4), 0.348750);
  test.inDelta(ease(0.5), 0.500000);
  test.inDelta(ease(0.6), 0.651250);
  test.inDelta(ease(0.7), 0.955000);
  test.inDelta(ease(0.8), 0.886250);
  test.inDelta(ease(0.9), 0.970000);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("back") returns the expected results', function(test) {
  var ease = d3.ease("back");
  test.inDelta(ease(0.0),  0.000000);
  test.inDelta(ease(0.1), -0.014314);
  test.inDelta(ease(0.2), -0.046451);
  test.inDelta(ease(0.3), -0.080200);
  test.inDelta(ease(0.4), -0.099352);
  test.inDelta(ease(0.5), -0.087698);
  test.inDelta(ease(0.6), -0.029028);
  test.inDelta(ease(0.7), +0.092868);
  test.inDelta(ease(0.8), +0.294198);
  test.inDelta(ease(0.9), +0.591172);
  test.inDelta(ease(1.0), +1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("back-in") is an alias for d3.ease("back")', function(test) {
  test.equal(d3.ease("back-in"), d3.ease("back"));
  test.end();
});

tape('d3.ease("back-out") returns the expected results', function(test) {
  var ease = d3.ease("back-out");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 0.408828);
  test.inDelta(ease(0.2), 0.705802);
  test.inDelta(ease(0.3), 0.907132);
  test.inDelta(ease(0.4), 1.029028);
  test.inDelta(ease(0.5), 1.087697);
  test.inDelta(ease(0.6), 1.099352);
  test.inDelta(ease(0.7), 1.080200);
  test.inDelta(ease(0.8), 1.046451);
  test.inDelta(ease(0.9), 1.014314);
  test.inDelta(ease(1.0), 1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("back-in-out") returns the expected results', function(test) {
  var ease = d3.ease("back-in-out");
  test.inDelta(ease(0.0),  0.000000);
  test.inDelta(ease(0.1), -0.037519);
  test.inDelta(ease(0.2), -0.092556);
  test.inDelta(ease(0.3), -0.078833);
  test.inDelta(ease(0.4),  0.089926);
  test.inDelta(ease(0.5),  0.500000);
  test.inDelta(ease(0.6),  0.910074);
  test.inDelta(ease(0.7),  1.078833);
  test.inDelta(ease(0.8),  1.092556);
  test.inDelta(ease(0.9),  1.037519);
  test.inDelta(ease(1.0),  1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("elastic") returns the expected results', function(test) {
  var ease = d3.ease("elastic");
  test.inDelta(ease(0.0), -0.000488); // Note: not exactly zero.
  test.inDelta(ease(0.1),  0.001953);
  test.inDelta(ease(0.2), -0.001953);
  test.inDelta(ease(0.3), -0.003906);
  test.inDelta(ease(0.4),  0.015625);
  test.inDelta(ease(0.5), -0.015625);
  test.inDelta(ease(0.6), -0.031250);
  test.inDelta(ease(0.7),  0.125000);
  test.inDelta(ease(0.8), -0.125000);
  test.inDelta(ease(0.9), -0.250000);
  test.inDelta(ease(1.0),  1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("elastic-in") is an alias for d3.ease("elastic")', function(test) {
  test.equal(d3.ease("elastic-in"), d3.ease("elastic"));
  test.end();
});

tape('d3.ease("elastic-out") returns the expected results', function(test) {
  var ease = d3.ease("elastic-out");
  test.inDelta(ease(0.0), 0.000000);
  test.inDelta(ease(0.1), 1.250000);
  test.inDelta(ease(0.2), 1.125000);
  test.inDelta(ease(0.3), 0.875000);
  test.inDelta(ease(0.4), 1.031250);
  test.inDelta(ease(0.5), 1.015625);
  test.inDelta(ease(0.6), 0.984375);
  test.inDelta(ease(0.7), 1.003906);
  test.inDelta(ease(0.8), 1.001953);
  test.inDelta(ease(0.9), 0.998047);
  test.inDelta(ease(1.0), 1.000488); // Note: not exactly one.
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("elastic-in-out") returns the expected results', function(test) {
  var ease = d3.ease("elastic-in-out");
  test.inDelta(ease(0.0),  0.000084); // Note: not exactly zero.
  test.inDelta(ease(0.1),  0.000339);
  test.inDelta(ease(0.2), -0.003906);
  test.inDelta(ease(0.3),  0.023939);
  test.inDelta(ease(0.4), -0.117462);
  test.inDelta(ease(0.5),  0.500000);
  test.inDelta(ease(0.6),  1.117462);
  test.inDelta(ease(0.7),  0.976061);
  test.inDelta(ease(0.8),  1.003906);
  test.inDelta(ease(0.9),  0.999661);
  test.inDelta(ease(1.0),  0.999915); // Note: not exactly one.
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});

tape('d3.ease("elastic", a) is the same as d3.ease("elastic") if a <= 1', function(test) {
  test.equal(d3.ease("elastic", -1)(0.1), d3.ease("elastic")(0.1));
  test.equal(d3.ease("elastic", .4)(0.2), d3.ease("elastic")(0.2));
  test.equal(d3.ease("elastic", .8)(0.3), d3.ease("elastic")(0.3));
  test.end();
});

tape('d3.ease("elastic", 1.3) returns the expected results', function(test) {
  var ease = d3.ease("elastic", 1.3);
  test.inDelta(ease(0.0),  0.000214); // Note: not exactly zero.
  test.inDelta(ease(0.1),  0.001953);
  test.inDelta(ease(0.2), -0.004763);
  test.inDelta(ease(0.3),  0.001714);
  test.inDelta(ease(0.4),  0.015625);
  test.inDelta(ease(0.5), -0.038105);
  test.inDelta(ease(0.6),  0.013711);
  test.inDelta(ease(0.7),  0.125000);
  test.inDelta(ease(0.8), -0.304844);
  test.inDelta(ease(0.9),  0.109687);
  test.inDelta(ease(1.0),  1.000000);
  test.equal(ease(".9"), ease(0.9), "numeric coercion");
  test.end();
});
