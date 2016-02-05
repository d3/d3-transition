import {dispatch as newDispatch} from "d3-dispatch";
import {getSchedule, emptyDispatch} from "./schedule";

function onFunction(key, id, name, listener) {
  return function() {
    var schedule = getSchedule(this, key, id);
    if (schedule.dispatch === emptyDispatch) schedule.dispatch = newDispatch("start", "end", "interrupt");
    schedule.dispatch.on(name, listener);
  };
}

export default function(name, listener) {
  var key = this._key,
      id = this._id;

  if (arguments.length < 2) {
    var schedule = getSchedule(this.node(), key, id);
    return schedule && schedule.dispatch.on(name);
  }

  return this.each(onFunction(key, id, name, listener));
}
