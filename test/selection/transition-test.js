var tape = require("tape"),
    jsdom = require("jsdom"),
    d3_selection = require("d3-selection"),
    d3_transition = require("../../");

tape("selection.transition() returns an instanceof d3.transition", function(test) {
  var document = jsdom.jsdom(),
      selection = d3_selection.select(document),
      transition = selection.transition();
  test.equal(transition instanceof d3_transition.transition, true);
  test.end();
});
