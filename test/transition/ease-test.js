var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection");

require("../../");

tape("transition.ease(ease) throws an error if ease is not a function", function(test) {
  var document = jsdom.jsdom(),
      transition = d3.select(document.documentElement).transition();
  test.throws(function() { transition.ease(42); }, /Error/);
  test.end();
});
