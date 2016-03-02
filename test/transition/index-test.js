var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("../../");

tape("d3.transition() returns a transition on the document element with the null name", function(test) {
  var document = global.document = jsdom.jsdom();
  try {
    var transition = d3.transition(),
        schedule = document.documentElement.__transition[transition._id];
    test.equal(transition.node(), document.documentElement);
    test.strictEqual(schedule.name, null);
    test.end();
  } finally {
    delete global.document;
  }
});

tape("d3.transition(null) returns a transition on the document element with the null name", function(test) {
  var document = global.document = jsdom.jsdom();
  try {
    var transition = d3.transition(null),
        schedule = document.documentElement.__transition[transition._id];
    test.equal(transition.node(), document.documentElement);
    test.strictEqual(schedule.name, null);
    test.end();
  } finally {
    delete global.document;
  }
});

tape("d3.transition(undefined) returns a transition on the document element with the null name", function(test) {
  var document = global.document = jsdom.jsdom();
  try {
    var transition = d3.transition(undefined),
        schedule = document.documentElement.__transition[transition._id];
    test.equal(transition.node(), document.documentElement);
    test.strictEqual(schedule.name, null);
    test.end();
  } finally {
    delete global.document;
  }
});

tape("d3.transition(name) returns a transition on the document element with the specified name", function(test) {
  var document = global.document = jsdom.jsdom();
  try {
    var transition = d3.transition("foo"),
        schedule = document.documentElement.__transition[transition._id];
    test.equal(transition.node(), document.documentElement);
    test.strictEqual(schedule.name, "foo");
    test.end();
  } finally {
    delete global.document;
  }
});

tape("d3.transition.prototype can be extended", function(test) {
  global.document = jsdom.jsdom();
  try {
    var pass = 0;
    d3.transition.prototype.test = function() { return ++pass; };
    test.equal(d3.transition().test(), 1);
    test.equal(pass, 1);
    test.end();
  } finally {
    delete d3.transition.prototype.test;
    delete global.document;
  }
});

tape("transitions are instanceof d3.transition", function(test) {
  global.document = jsdom.jsdom();
  try {
    test.equal(d3.transition() instanceof d3.transition, true);
    test.equal(d3.transition().constructor.name, "Transition");
    test.end();
  } finally {
    delete global.document;
  }
});
