import {interpolate, interpolateTransform} from "d3-interpolate";
import {namespace, namespaces} from "d3-selection";

function attrInterpolate(node, name) {
  return name === "transform" && node.namespaceURI === namespaces.svg
      ? interpolateTransform
      : interpolate;
}

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
    var value0 = this.getAttribute(name);
    if (value0 !== value1) return attrInterpolate(this, name)(value0, value1);
  };
}

function attrConstantNS(fullname, value1) {
  return value1 += "", function() {
    var value0 = this.getAttributeNS(fullname.space, fullname.local);
    if (value0 !== value1) return interpolate(value0, value1);
  };
}

function attrFunction(name, value) {
  return function() {
    var value0, value1 = value.apply(this, arguments);
    if (value1 == null) return void this.removeAttribute(name);
    value0 = this.getAttribute(name), value1 += "";
    if (value0 !== value1) return attrInterpolate(this, name)(value0, value1);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var value0, value1 = value.apply(this, arguments);
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    value0 = this.getAttributeNS(fullname.space, fullname.local), value1 += "";
    if (value0 !== value1) return interpolate(value0, value1);
  };
}

export default function(name, value) {
  var fullname = namespace(name);
  return this.attrTween(name, (value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}
