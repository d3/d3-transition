const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_ease = require("d3-ease"),
    d3_timer = require("d3-timer"),
    d3_selection = require("d3-selection"),
    state = require("./state");

require("../../");

it("transition.easeVarying(factory) accepts an easing function factory", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      transition = d3_selection.select(document)
        .selectAll("h1").data([{ exponent: 3 }, { exponent: 4 }])
        .transition();
  transition.easeVarying(d => d3_ease.easePolyIn.exponent(d.exponent));
  assert.strictEqual(transition.ease()(.5), d3_ease.easePolyIn.exponent(3)(0.5));
});

it("transition.easeVarying(factory)’ factory receives datum, index, group with the node as this", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      transition = d3_selection.select(document)
        .selectAll("h1").data([{ exponent: 3 }, { exponent: 4 }])
        .transition();
  transition.easeVarying(function(d, i, e) {
    assert.strictEqual(e.length, 2);
    assert.strictEqual(d.exponent, i + 3);
    assert.strictEqual(this, e[i]);
    return t => t;
  });
});

it("transition.easeVarying() throws an error if the argument is not a function", () => {
  const document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      transition = d3_selection.select(document)
        .selectAll("h1").data([{ exponent: 3 }, { exponent: 4 }])
        .transition();
  assert.throws(function() { transition.easeVarying(); });
  assert.throws(function() { transition.easeVarying("a"); });
});

