var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("../../");

tape("d3.transition() returns a transition on the document element", function(test) {
  var document = global.document = jsdom.jsdom();
  try {
    test.equal(d3.transition().node(), document.documentElement);
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
