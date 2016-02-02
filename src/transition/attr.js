import {interpolate} from "d3-interpolate";
import {namespace} from "d3-selection";

// TODO transform interpolation

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value1) {
  return value1 += "", function() {
    var node = this, value0 = node.getAttribute(name), i;
    return value0 !== value1 && (i = interpolate(value0, value1), function(t) {
      node.setAttribute(name, i(t));
    });
  };
}

function attrConstantNS(fullname, value1) {
  return value1 += "", function() {
    var node = this, value0 = node.getAttributeNS(fullname.space, fullname.local), i;
    return value0 !== value1 && (i = interpolate(value0, value1), function(t) {
      node.setAttributeNS(fullname.space, fullname.local, i(t));
    });
  };
}

function attrFunction(name, value) {
  return function() {
    var node = this, value0, value1 = value.apply(node, arguments), i;
    if (value1 == null) return node.removeAttribute(name);
    value0 = node.getAttribute(name), value1 += "";
    return value0 !== value1 && (i = interpolate(value0, value1), function(t) {
      node.setAttribute(name, i(t));
    });
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var node = this, value0, value1 = value.apply(node, arguments), i;
    if (value1 == null) return node.removeAttributeNS(fullname.space, fullname.local);
    value0 = node.getAttributeNS(fullname.space, fullname.local), value1 += "";
    return value0 !== value1 && (i = interpolate(value0, value1), function(t) {
      node.setAttributeNS(fullname.space, fullname.local, i(t));
    });
  };
}

export default function(name, value) {
  if (arguments.length < 2) return this.tween("attr." + name);
  var fullname = namespace(name);
  return this.tween("attr." + name, (value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}
