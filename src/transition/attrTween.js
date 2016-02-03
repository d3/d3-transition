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
  if (arguments.length < 2) return this.tween("attr." + name)._value;
  var fullname = namespace(name);
  return this.tween("attr." + name, (fullname.local
      ? attrTweenNS
      : attrTween)(fullname, value));
}
