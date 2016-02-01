import {getScheduleEntry} from "./schedule";

function easeFunction(key, id, value) {
  return function() {
    getScheduleEntry(this, key, id).ease = value.apply(this, arguments);
  };
}

function easeConstant(key, id, value) {
  return function() {
    getScheduleEntry(this, key, id).ease = value;
  };
}

export default function(value) {
  var id = this._id,
      key = this._key;

  return arguments.length
      ? this.each((typeof value === "function"
          ? easeFunction
          : easeConstant)(key, id, value))
      : getScheduleEntry(this.node(), key, id).ease;
}
