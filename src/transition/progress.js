import {get} from "./schedule.js";

function progressFunction(id, value) {
  return function() {
    get(this, id).progress = +value.apply(this, arguments);
  };
}

function progressConstant(id, value) {
  return value = +value, function() {
    get(this, id).progress = value;
  };
}

function abs(value) {
  if (value < 0) value = -value;
  return value;
}

export default function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? progressFunction
          : progressConstant)(id, value))
      : abs(get(this.node(), id).progress);
}
