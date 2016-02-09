import {get, set} from "./schedule";

function durationFunction(key, id, value) {
  return function() {
    set(this, key, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(key, id, value) {
  return value = +value, function() {
    set(this, key, id).duration = value;
  };
}

export default function(value) {
  var key = this._key,
      id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(key, id, value))
      : get(this.node(), key, id).duration;
}
