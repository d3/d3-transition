const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_selection = require("d3-selection"),
    d3 = require("../../");

it("transition.merge(other) merges elements from the specified other transition for null elements in this transition", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition0 = d3_selection.select(document.documentElement).transition(),
      transition1 = d3_selection.selectAll([null, two]).transition(transition0),
      transition2 = d3_selection.selectAll([one, null]).transition(transition0),
      transition3 = transition1.merge(transition2);
  assert.strictEqual(transition3 instanceof d3.transition, true);
  assert.deepStrictEqual(transition3._groups, [[one, two]]);
  assert.strictEqual(transition3._parents, transition1._parents);
  assert.strictEqual(transition3._name, transition1._name);
  assert.strictEqual(transition3._id, transition1._id);
});

it("transition.merge(other) throws an error if the other transition has a different id", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition1 = d3_selection.selectAll([null, two]).transition(),
      transition2 = d3_selection.selectAll([one, null]).transition();
  assert.throws(function() { transition1.merge(transition2); });
});
