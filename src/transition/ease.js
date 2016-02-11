import {get, set} from "./schedule";

function easeConstant(key, id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set(this, key, id).ease = value;
  };
}

export default function(value) {
  var key = this._key,
      id = this._id;

  return arguments.length
      ? this.each(easeConstant(key, id, value))
      : get(this.node(), key, id).ease;
}
