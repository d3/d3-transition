var tape = require("tape"),
    path = require("path"),
    jsdom = require("jsdom"),
    d3 = require("../build/d3"),
    requirejs = require("requirejs");

tape("can load as a CommonJS module", function(test) {
  var document = jsdom.jsdom();
  test.ok(d3.select(document.body).transition() instanceof d3.transition);
  test.ok(!("d3" in global));
  test.end();
});

tape("can load as AMD module", function(test) {
  requirejs([path.join(__dirname, "../build/d3")], function(d3) {
    var document = jsdom.jsdom();
    test.ok(d3.select(document.body).transition() instanceof d3.transition);
    test.end();
    delete global.d3;
  });
});
