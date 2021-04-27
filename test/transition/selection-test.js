const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_selection = require("d3-selection");

require("../../");

it("transition.selection() returns the transition’s selection", () => {
  const document = jsdom("<h1 id='one'>one</h1><h1 id='two'>two</h1>"),
      selection0 = d3_selection.select(document.body).selectAll("h1"),
      transition = selection0.transition(),
      selection1 = transition.selection();
  assert(selection1 instanceof d3_selection.selection);
  assert.strictEqual(selection1._groups, selection0._groups);
  assert.strictEqual(selection1._parents, selection0._parents);
});
