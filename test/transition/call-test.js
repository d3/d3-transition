const tape = require("tape"),
    d3_selection = require("d3-selection"),
    d3 = require("../../");

it("transition.call is the same as selection.call", () => {
  assert.strictEqual(d3.transition.prototype.call, d3_selection.selection.prototype.call);
});
