var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection");

require("../../");

tape("transition.attrTween(name, value) throws an error if value is not a function", function(test) {
  var document = jsdom.jsdom(),
      transition = d3.select(document.documentElement).transition();
  test.throws(function() { transition.attrTween("foo", 42); }, /Error/);
  test.end();
});
