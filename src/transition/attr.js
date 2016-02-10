import {interpolate, interpolateTransform} from "d3-interpolate";
import {namespace, namespaces} from "d3-selection";

// TODO Assumes either ALL selected nodes are SVG, or none are.
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
  var value00,
      interpolate0;
  return value1 += "", function() {
    var value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = attrInterpolate(this, name)(value00 = value0, value1);
  };
}

function attrConstantNS(fullname, value1) {
  var value00,
      interpolate0;
  return value1 += "", function() {
    var value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value1);
  };
}

function attrFunction(name, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0,
        value1 = value.apply(this, arguments);
    if (value1 == null) return void this.removeAttribute(name);
    value0 = this.getAttribute(name), value1 += "";
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = attrInterpolate(this, name)(value00 = value0, value10 = value1);
  };
}

function attrFunctionNS(fullname, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value.apply(this, arguments);
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    value0 = this.getAttributeNS(fullname.space, fullname.local), value1 += "";
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

export default function(name, value) {
  var fullname = namespace(name);
  return this.attrTween(name, (value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}
