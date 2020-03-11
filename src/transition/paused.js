import {get} from "./schedule.js";

function pausedFunction(id, value) {
  return function() {
    get(this, id).paused = Boolean(value.apply(this, arguments));
  };
}

function pausedConstant(id, value) {
  return value = Boolean(value), function() {
    get(this, id).paused = value;
  };
}

export default function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? pausedFunction
          : pausedConstant)(id, value))
      : get(this.node(), id).paused;
}
