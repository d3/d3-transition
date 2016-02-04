import {getScheduleEntry} from "./schedule";

function durationFunction(key, id, value) {
  return function() {
    getScheduleEntry(this, key, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(key, id, value) {
  return value = +value, function() {
    getScheduleEntry(this, key, id).duration = value;
  };
}

export default function(value) {
  var key = this._key,
      id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(key, id, value))
      : getScheduleEntry(this.node(), key, id).duration;
}
