import {interpolate} from "d3-interpolate";

// TODO namespaced attributes
// TODO transform interpolation
// TODO null tween when start and end attribute values are equal
// TODO remove attribute when end value is null

function attrFunction(name, value) {
  return function() {
    var node = this, i = interpolate(node.getAttribute(name), value.apply(this, arguments) + "");
    return function(t) {
      node.setAttribute(name, i(t));
    };
  };
}

function attrConstant(name, value) {
  return value += "", function() {
    var node = this, i = interpolate(node.getAttribute(name), value);
    return function(t) {
      node.setAttribute(name, i(t));
    };
  };
}

export default function(name, value) {
  return arguments.length
      ? this.tween("attr." + name, (typeof value === "function"
          ? attrFunction
          : attrConstant)(name, value))
      : this.tween("attr." + name);
}
