const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_selection = require("d3-selection"),
    d3 = require("../../");

it("transition.filter(selector) retains the elements matching the specified selector", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition1 = d3_selection.selectAll([one, two]).data([1, 2]).transition().delay(function(d) { return d * 10; }),
      transition2 = transition1.filter("#two");
  assert.strictEqual(transition2 instanceof d3.transition, true);
  assert.deepStrictEqual(transition2._groups, [[two]]);
  assert.strictEqual(transition2._parents, transition1._parents);
  assert.strictEqual(transition2._name, transition1._name);
  assert.strictEqual(transition2._id, transition1._id);
});

it("transition.filter(function) retains the elements for which the specified function returns true", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition1 = d3_selection.selectAll([one, two]).data([1, 2]).transition().delay(function(d) { return d * 10; }),
      transition2 = transition1.filter(function() { return this === two; });
  assert.strictEqual(transition2 instanceof d3.transition, true);
  assert.deepStrictEqual(transition2._groups, [[two]]);
  assert.strictEqual(transition2._parents, transition1._parents);
  assert.strictEqual(transition2._name, transition1._name);
  assert.strictEqual(transition2._id, transition1._id);
});
