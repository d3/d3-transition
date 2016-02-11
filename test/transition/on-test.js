var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection");

require("../../");

tape("transition.on(type, listener) throws an error if listener is not a function", function(test) {
  var document = jsdom.jsdom(),
      transition = d3.select(document.documentElement).transition();
  test.throws(function() { transition.on("start", 42); }, /Error/);
  test.end();
});
