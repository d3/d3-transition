var tape = require("tape"),
    jsdom = require("jsdom"),
    d3_selection = require("d3-selection");

require("../../");

tape("transition.on(type, listener) throws an error if listener is not a function", function(test) {
  var root = jsdom.jsdom().documentElement,
      transition = d3_selection.select(root).transition();
  test.throws(function() { transition.on("start", 42); }, /Error/);
  test.end();
});
