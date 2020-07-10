var tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_ease = require("d3-ease"),
    d3_timer = require("d3-timer"),
    d3_selection = require("d3-selection"),
    state = require("./state");

require("../../");

tape("transition.easeVarying(factory) accepts an easing function factory", function(test) {
  var document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      transition = d3_selection.select(document)
        .selectAll("h1").data([{ exponent: 3 }, { exponent: 4 }])
        .transition();
  transition.easeVarying(d => d3_ease.easePolyIn.exponent(d.exponent));
  test.equal(transition.ease()(.5), d3_ease.easePolyIn.exponent(3)(0.5));
  test.end();
});

tape("transition.easeVarying(factory)’ factory receives datum, index, group with the node as this", function(test) {
  var document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      transition = d3_selection.select(document)
        .selectAll("h1").data([{ exponent: 3 }, { exponent: 4 }])
        .transition();
  transition.easeVarying(function(d, i, e) {
    test.equal(e.length, 2);
    test.equal(d.exponent, i + 3);
    test.equal(this, e[i]);
    return t => t;
  });
  test.end();
});

tape("transition.easeVarying() throws an error if the argument is not a function", function(test) {
  var document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      transition = d3_selection.select(document)
        .selectAll("h1").data([{ exponent: 3 }, { exponent: 4 }])
        .transition();
  test.throws(function() { transition.easeVarying(); });
  test.throws(function() { transition.easeVarying("a"); });
  test.end();
});

