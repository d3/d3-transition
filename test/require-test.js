var tape = require("tape"),
    path = require("path"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection"),
    requirejs = require("requirejs");

require("../");

tape("can load as a CommonJS module", function(test) {
  var document = jsdom.jsdom();
  test.ok(d3.select(document.body).transition() instanceof d3.transition);
  test.end();
});

tape("can load as AMD module", function(test) {
  delete global.d3;
  requirejs([path.join(__dirname, "../node_modules/d3-selection/dist/d3-selection")], function(d3) {
    requirejs([path.join(__dirname, "../dist/d3-transition")], function() {
      var document = jsdom.jsdom();
      test.ok(d3.select(document.body).transition() instanceof d3.transition);
      test.end();
      global.d3 = d3;
    });
  });
});

tape("can load as minified AMD module", function(test) {
  delete global.d3;
  requirejs([path.join(__dirname, "../node_modules/d3-selection/dist/d3-selection.min")], function(d3) {
    requirejs([path.join(__dirname, "../dist/d3-transition.min")], function() {
      var document = jsdom.jsdom();
      test.ok(d3.select(document.body).transition() instanceof d3.transition);
      test.end();
      global.d3 = d3;
    });
  });
});
