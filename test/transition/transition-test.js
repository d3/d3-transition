const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_timer = require("d3-timer"),
    d3_selection = require("d3-selection");

require("../../");

it("transition.transition() allows preceeding transitions with zero duration to end naturally", () => {
  const end0 = false,
      end1 = false,
      end2 = false,
      root = jsdom().documentElement,
      selection = d3_selection.select(root),
      transition0 = selection.transition().duration(0).on("end", function() { end0 = true; }),
      transition1 = selection.transition().duration(0).on("end", function() { end1 = true; }),
      transition2 = transition0.transition().duration(0).on("end", function() { end2 = true; });

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(end0, true);
    assert.strictEqual(end1, true);
    assert.strictEqual(end2, true);
}, 50);
});
