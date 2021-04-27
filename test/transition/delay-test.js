const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_selection = require("d3-selection");

require("../../");

it("transition.delay() returns the delay for the first non-null node", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition1 = d3_selection.select(one).transition(),
      transition2 = d3_selection.select(two).transition().delay(50);
  assert.strictEqual(one.__transition[transition1._id].delay, 0);
  assert.strictEqual(two.__transition[transition2._id].delay, 50);
  assert.strictEqual(transition1.delay(), 0);
  assert.strictEqual(transition2.delay(), 50);
  assert.strictEqual(d3_selection.select(one).transition(transition1).delay(), 0);
  assert.strictEqual(d3_selection.select(two).transition(transition2).delay(), 50);
  assert.strictEqual(d3_selection.selectAll([null, one]).transition(transition1).delay(), 0);
  assert.strictEqual(d3_selection.selectAll([null, two]).transition(transition2).delay(), 50);
});

it("transition.delay(number) sets the delay for each selected element to the specified number", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition = d3_selection.selectAll([one, two]).transition().delay(50);
  assert.strictEqual(one.__transition[transition._id].delay, 50);
  assert.strictEqual(two.__transition[transition._id].delay, 50);
});

it("transition.delay(value) coerces the specified value to a number", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition = d3_selection.selectAll([one, two]).transition().delay("50");
  assert.strictEqual(one.__transition[transition._id].delay, 50);
  assert.strictEqual(two.__transition[transition._id].delay, 50);
});

it("transition.delay(function) passes the expected arguments and context to the function", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      result = [],
      selection = d3_selection.selectAll([one, two]).data(["one", "two"]),
      transition = selection.transition().delay(function(d, i, nodes) { result.push([d, i, nodes, this]); });
  assert.deepStrictEqual(result, [
    ["one", 0, transition._groups[0], one],
    ["two", 1, transition._groups[0], two]
  ]);
});

it("transition.delay(function) sets the delay for each selected element to the number returned by the specified function", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition = d3_selection.selectAll([one, two]).transition().delay(function(d, i) { return i * 20; });
  assert.strictEqual(one.__transition[transition._id].delay, 0);
  assert.strictEqual(two.__transition[transition._id].delay, 20);
});

it("transition.delay(function) coerces the value returned by the specified function to a number", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      transition = d3_selection.selectAll([one, two]).transition().delay(function(d, i) { return i * 20 + ""; });
  assert.strictEqual(one.__transition[transition._id].delay, 0);
  assert.strictEqual(two.__transition[transition._id].delay, 20);
});
