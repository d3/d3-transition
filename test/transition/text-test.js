const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_timer = require("d3-timer"),
    d3_selection = require("d3-selection");

require("../../");

it("transition.text(value) creates a tween to set the text content to the specified value post-start", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().text("hello").on("start", started);

  function started() {
    assert.strictEqual(root.textContent, "");
  }

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.textContent, "hello");
});
});

it("transition.text(value) creates a tween to set the text content to the value returned by the specified function post-start", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().text(function() { return "hello"; }).on("start", started);

  function started() {
    assert.strictEqual(root.textContent, "");
  }

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(root.textContent, "hello");
});
});

it("transition.text(value) immediately evaluates the specified function with the expected context and arguments", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      selection = d3_selection.selectAll([one, two]).data(["red", "green"]),
      result = [],
      transition = selection.transition().text(function(d, i, nodes) { result.push([d, i, nodes, this]); return d; });

  assert.deepStrictEqual(result, [
    ["red", 0, [one, two], one],
    ["green", 1, [one, two], two]
  ]);

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(one.textContent, "red");
    assert.strictEqual(two.textContent, "green");
});
});

it("transition.text(value) creates a tween with the name \"text\"", () => {
  const root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition = selection.transition().text("hello");
  assert.strictEqual(transition.tween("text").call(root), undefined);
  assert.strictEqual(root.textContent, "hello");
});
