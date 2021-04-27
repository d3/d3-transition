const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_selection = require("d3-selection"),
    d3 = require("../../");

it("transition.size is the same as selection.size", () => {
  assert.strictEqual(d3.transition.prototype.size, d3_selection.selection.prototype.size);
});

it("transition.size() returns the expected value", () => {
  const root = jsdom().documentElement;
  assert.strictEqual(d3_selection.select(root).transition().size(), 1);
  assert.strictEqual(d3_selection.selectAll([null, root]).transition().size(), 1);
});
