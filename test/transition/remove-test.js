const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3_timer = require("d3-timer"),
    d3_selection = require("d3-selection");

require("../../");

it("transition.remove() creates an end listener to remove the element", () => {
  const document = jsdom(),
      root = document.documentElement,
      body = document.body,
      selection = d3_selection.select(body),
      transition = selection.transition().remove().on("start", started).on("end", ended);

  function started() {
    assert.strictEqual(body.parentNode, root);
  }

  function ended() {
    assert.strictEqual(body.parentNode, null);
}

  d3_timer.timeout(function(elapsed) {
    assert.strictEqual(body.parentNode, root);
  });
});

it("transition.remove() creates an end listener named end.remove", () => {
  const document = jsdom(),
      root = document.documentElement,
      body = document.body,
      selection = d3_selection.select(body),
      transition = selection.transition().remove().on("start", started).on("end", ended);

  transition.on("end.remove").call(body);
  assert.strictEqual(body.parentNode, null);
  transition.on("end.remove", null);
  root.appendChild(body);

  function started() {
    assert.strictEqual(body.parentNode, root);
  }

  function ended() {
    assert.strictEqual(body.parentNode, root);
}
});
