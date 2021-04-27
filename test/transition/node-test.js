const tape = require("tape"),
    d3_selection = require("d3-selection"),
    d3 = require("../../");

it("transition.node is the same as selection.node", () => {
  assert.strictEqual(d3.transition.prototype.node, d3_selection.selection.prototype.node);
});
