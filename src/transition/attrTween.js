import {namespace} from "d3-selection";

function attrTweenNS(fullname, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttributeNS(fullname.space, fullname.local, i(t));
    };
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttribute(name, i(t));
    };
  }
  tween._value = value;
  return tween;
}

export default function(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return this.tween(key)._value; // TODO handle null tween
  var fullname = namespace(name);
  return this.tween(key, (fullname.local
      ? attrTweenNS
      : attrTween)(fullname, value));
}
