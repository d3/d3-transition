import {interpolate} from "d3-interpolate";
import defaultView from "../defaultView";

function styleRemove(name, value, priority) {
  return function() {
    var node = this, style = defaultView(node).getComputedStyle(node, null), value0 = style.getPropertyValue(name), value1 = (node.style.removeProperty(name), style.getPropertyValue(name)), i;
    return value0 !== value1 && (i = interpolate(value0, value1), function(t) {
      if (t === 1) node.style.removeProperty(name);
      else node.style.setProperty(name, i(t), priority);
    });
  };
}

function styleConstant(name, value1, priority) {
  return value1 += "", function() {
    var node = this, value0 = defaultView(node).getComputedStyle(node, null).getPropertyValue(name), i;
    return value0 !== value1 && (i = interpolate(value0, value1), function(t) {
      node.style.setProperty(name, i(t), priority);
    });
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var node = this, value0, value1 = value.apply(node, arguments), i;
    if (value1 == null) return node.style.removeProperty(name);
    value0 = defaultView(node).getComputedStyle(node, null).getPropertyValue(name), value1 += "";
    return value0 !== value1 && (i = interpolate(value0, value1), function(t) {
      node.style.setProperty(name, i(t), priority);
    });
  };
}

export default function(name, value, priority) {
  return arguments.length < 2
      ? this.tween("style." + name)
      : this.tween("style." + name, (value == null
          ? styleRemove : (typeof value === "function"
          ? styleFunction
          : styleConstant))(name, value, priority == null ? "" : priority));
}
