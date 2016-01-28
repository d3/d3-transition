var tape = require("tape"),
    jsdom = require("jsdom"),
    d3_selection = require("d3-selection"),
    d3_transition = require("../../");

tape("selection.interrupt() returns the selection", function(test) {
  var document = jsdom.jsdom(),
      selection = d3_selection.select(document);
  test.equal(selection.interrupt(), selection);
  test.end();
});
