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
  return function() {
    var value0 = this.getAttribute(name);
    if (value0 !== value1) return interpolate(value0, value1);
  };
}

function attrConstantNS(fullname, value1) {
  return function() {
    var value0 = this.getAttributeNS(fullname.space, fullname.local);
    if (value0 !== value1) return interpolate(value0, value1);
  };
}

function attrFunction(name, value) {
  return function() {
    var value0, value1 = value.apply(this, arguments);
    if (value1 == null) return void this.removeAttribute(name);
    value0 = this.getAttribute(name), value1 += "";
    if (value0 !== value1) return interpolate(value0, value1);
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
