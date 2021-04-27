const tape = require("tape"),
    jsdom = require("../jsdom"),
    d3 = require("../../");

it("d3.transition() returns a transition on the document element with the null name", () => {
  const document = global.document = jsdom(),
      root = document.documentElement;
  try {
    const transition = d3.transition(),
        schedule = root.__transition[transition._id];
    assert.strictEqual(transition.node(), root);
    assert.strictEqual(schedule.name, null);
} finally {
    delete global.document;
  }
});

it("d3.transition(null) returns a transition on the document element with the null name", () => {
  const document = global.document = jsdom(),
      root = document.documentElement;
  try {
    const transition = d3.transition(null),
        schedule = root.__transition[transition._id];
    assert.strictEqual(transition.node(), root);
    assert.strictEqual(schedule.name, null);
} finally {
    delete global.document;
  }
});

it("d3.transition(undefined) returns a transition on the document element with the null name", () => {
  const document = global.document = jsdom(),
      root = document.documentElement;
  try {
    const transition = d3.transition(undefined),
        schedule = root.__transition[transition._id];
    assert.strictEqual(transition.node(), root);
    assert.strictEqual(schedule.name, null);
} finally {
    delete global.document;
  }
});

it("d3.transition(name) returns a transition on the document element with the specified name", () => {
  const document = global.document = jsdom(),
      root = document.documentElement;
  try {
    const transition = d3.transition("foo"),
        schedule = root.__transition[transition._id];
    assert.strictEqual(transition.node(), root);
    assert.strictEqual(schedule.name, "foo");
} finally {
    delete global.document;
  }
});

it("d3.transition.prototype can be extended", () => {
  global.document = jsdom();
  try {
    const pass = 0;
    d3.transition.prototype.test = function() { return ++pass; };
    assert.strictEqual(d3.transition().test(), 1);
    assert.strictEqual(pass, 1);
} finally {
    delete d3.transition.prototype.test;
    delete global.document;
  }
});

it("transitions are instanceof d3.transition", () => {
  global.document = jsdom();
  try {
    assert.strictEqual(d3.transition() instanceof d3.transition, true);
} finally {
    delete global.document;
  }
});
