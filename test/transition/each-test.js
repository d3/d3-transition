var tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_selection = require("d3-selection"),
    d3_transition = require("../../");

tape("transition.each is the same as selection.each", function(test) {
  test.equal(d3_transition.transition.prototype.each, d3_selection.selection.prototype.each);
  test.end();
});

tape("transition.each() runs as expected", function(test) {
  var root = jsdom().documentElement;
  var a = 0;
  d3_selection.select(root).transition().each(() => {++a});
  test.equal(a, 1);
  a = 0;
  d3_selection.selectAll([null, root]).transition().each(() => {++a});
  test.equal(a, 1);
  test.end();
});
