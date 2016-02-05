import {dispatch} from "d3-dispatch";
import {getScheduleEntry, emptyDispatch} from "./schedule";

function onFunction(key, id, name, listener) {
  return function() {
    var entry = getScheduleEntry(this, key, id), d = entry.dispatch;
    if (d === emptyDispatch) entry.dispatch = d = dispatch("start", "end", "interrupt");
    d.on(name, listener);
  };
}

export default function(name, listener) {
  var key = this._key,
      id = this._id;

  if (arguments.length < 2) {
    var entry = getScheduleEntry(this.node(), key, id);
    return entry && entry.dispatch.on(name);
  }

  return this.each(onFunction(key, id, name, listener));
}
