import {getScheduleEntry} from "./schedule";

function delayFunction(key, id, value) {
  return function() {
    getScheduleEntry(this, key, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(key, id, value) {
  return value = +value, function() {
    getScheduleEntry(this, key, id).delay = value;
  };
}

export default function(value) {
  var id = this._id,
      key = this._key;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(key, id, value))
      : getScheduleEntry(this.node(), key, id).delay;
}
