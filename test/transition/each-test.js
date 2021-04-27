const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_selection = require("d3-selection"),
    d3 = require("../../");

it("transition.each is the same as selection.each", () => {
  assert.strictEqual(d3.transition.prototype.each, d3_selection.selection.prototype.each);
});

it("transition.each() runs as expected", () => {
  const root = jsdom().documentElement;
  const a = 0;
  d3_selection.select(root).transition().each(() => {++a});
  assert.strictEqual(a, 1);
  a = 0;
  d3_selection.selectAll([null, root]).transition().each(() => {++a});
  assert.strictEqual(a, 1);
});
