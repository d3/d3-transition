import {interpolate} from "d3-interpolate";
import {window} from "d3-selection";

function styleRemove(name) {
  return function() {
    var style = window(this).getComputedStyle(this, null),
        value0 = style.getPropertyValue(name),
        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
    if (value0 !== value1) return interpolate(value0, value1);
  };
}

function styleRemoveEnd(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value1) {
  return value1 += "", function() {
    var value0 = window(this).getComputedStyle(this, null).getPropertyValue(name);
    if (value0 !== value1) return interpolate(value0, value1);
  };
}

function styleFunction(name, value) {
  return function() {
    var value0, value1 = value.apply(this, arguments);
    if (value1 == null) return void this.style.removeProperty(name);
    value0 = window(this).getComputedStyle(this, null).getPropertyValue(name), value1 += "";
    if (value0 !== value1) return interpolate(value0, value1);
  };
}

export default function(name, value, priority) {
  return value == null ? this
          .styleTween(name, styleRemove(name))
          .on("end.style." + name, styleRemoveEnd(name))
      : this.styleTween(name, (typeof value === "function"
          ? styleFunction
          : styleConstant)(name, value), priority);
}
