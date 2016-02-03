import {interpolate} from "d3-interpolate";
import defaultView from "../defaultView";

function styleRemove(name) {
  return function() {
    var style = defaultView(this).getComputedStyle(this, null),
        value0 = style.getPropertyValue(name),
        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
    if (value0 !== value1) return interpolate(value0, value1); // TODO delete property at end
  };
}

function styleConstant(name, value1) {
  return function() {
    var value0 = defaultView(this).getComputedStyle(this, null).getPropertyValue(name);
    if (value0 !== value1) return interpolate(value0, value1);
  };
}

function styleFunction(name, value) {
  return function() {
    var value0, value1 = value.apply(this, arguments);
    if (value1 == null) return void this.style.removeProperty(name);
    value0 = defaultView(this).getComputedStyle(this, null).getPropertyValue(name), value1 += "";
    if (value0 !== value1) return interpolate(value0, value1);
  };
}

export default function(name, value, priority) {
  return this.styleTween(name, (value == null
      ? styleRemove : (typeof value === "function"
      ? styleFunction
      : styleConstant))(name, value), priority);
}
