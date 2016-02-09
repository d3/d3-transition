import {get, init} from "./schedule";

function delayFunction(key, id, value) {
  return function() {
    init(this, key, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(key, id, value) {
  return value = +value, function() {
    init(this, key, id).delay = value;
  };
}

export default function(value) {
  var key = this._key,
      id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(key, id, value))
      : get(this.node(), key, id).delay;
}
