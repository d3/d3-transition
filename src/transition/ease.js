import {getScheduleEntry} from "./schedule";

function easeConstant(key, id, value) {
  return function() {
    getScheduleEntry(this, key, id).ease = value;
  };
}

// TODO immediately verify that value is a function
export default function(value) {
  var key = this._key,
      id = this._id;

  return arguments.length
      ? this.each(easeConstant(key, id, value))
      : getScheduleEntry(this.node(), key, id).ease;
}
