var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("../");

tape("d3.transition returns a transition on the document element", function(test) {
  var document = global.document = jsdom.jsdom(),
      t = d3.transition();
  test.ok(t instanceof d3.transition);
  test.equal(t._depth, 1);
  test.ok(Array.isArray(t._root));
  test.equal(t._root.length, 1);
  test.equal(t._root[0], document.documentElement);
  test.equal(t._root._parent, undefined);
  test.end();
  delete global.document;
});
