var tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_selection = require("d3-selection"),
    d3_transition = require("../../");

tape("transition.size is the same as selection.size", function(test) {
  test.equal(d3_transition.transition.prototype.size, d3_selection.selection.prototype.size);
  test.end();
});

tape("transition.size() returns the expected value", function(test) {
  var root = jsdom().documentElement;
  test.equal(d3_selection.select(root).transition().size(), 1);
  test.equal(d3_selection.selectAll([null, root]).transition().size(), 1);
  test.end();
});
