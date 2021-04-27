const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_selection = require("d3-selection"),
    d3 = require("../../");

it("transition.selectAll(selector) selects the descendants matching the specified selector, then derives a transition", () => {
  const document = jsdom("<h1 id='one'><child/></h1><h1 id='two'><child/></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition1 = d3_selection.selectAll([one, two]).data([1, 2]).transition().delay(function(d) { return d * 10; }),
      transition2 = transition1.selectAll("child");
  assert.strictEqual(transition2 instanceof d3.transition, true);
  assert.deepStrictEqual(transition2._groups, [[one.firstChild], [two.firstChild]]);
  assert.deepStrictEqual(transition2._parents, [one, two]);
  assert.strictEqual(transition2._name, transition1._name);
  assert.strictEqual(transition2._id, transition1._id);
  assert.strictEqual("__data__" in one.firstChild, false);
  assert.strictEqual("__data__" in two.firstChild, false);
  assert.strictEqual(one.firstChild.__transition[transition1._id].delay, 10);
  assert.strictEqual(two.firstChild.__transition[transition1._id].delay, 20);
});

it("transition.selectAll(function) selects the descendants returned by the specified function, then derives a transition", () => {
  const document = jsdom("<h1 id='one'><child/></h1><h1 id='two'><child/></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition1 = d3_selection.selectAll([one, two]).data([1, 2]).transition().delay(function(d) { return d * 10; }),
      transition2 = transition1.selectAll(function() { return [this.firstChild]; });
  assert.strictEqual(transition2 instanceof d3.transition, true);
  assert.deepStrictEqual(transition2._groups, [[one.firstChild], [two.firstChild]]);
  assert.deepStrictEqual(transition2._parents, [one, two]);
  assert.strictEqual(transition2._name, transition1._name);
  assert.strictEqual(transition2._id, transition1._id);
  assert.strictEqual("__data__" in one.firstChild, false);
  assert.strictEqual("__data__" in two.firstChild, false);
  assert.strictEqual(one.firstChild.__transition[transition1._id].delay, 10);
  assert.strictEqual(two.firstChild.__transition[transition1._id].delay, 20);
});
