const tape = require("tape"),
    d3_selection = require("d3-selection"),
    d3 = require("../../");

it("transition.nodes is the same as selection.nodes", () => {
  assert.strictEqual(d3.transition.prototype.nodes, d3_selection.selection.prototype.nodes);
});
