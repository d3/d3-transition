const tape = require("tape"),
    d3_selection = require("d3-selection"),
    d3 = require("../../");

it("transition.empty is the same as selection.empty", () => {
  assert.strictEqual(d3.transition.prototype.empty, d3_selection.selection.prototype.empty);
});
