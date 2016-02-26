import {get, set, init} from "./schedule";

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(key, id, name, listener) {
  if (typeof listener !== "function") throw new Error;
  var on0, on1, sit = start(name) ? init : set;
  return function() {
    var schedule = sit(this, key, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

export default function(name, listener) {
  var key = this._key,
      id = this._id;

  return arguments.length < 2
      ? get(this.node(), key, id).on.on(name)
      : this.each(onFunction(key, id, name, listener));
}
