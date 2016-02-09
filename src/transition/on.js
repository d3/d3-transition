import {get, init} from "./schedule";

function onFunction(key, id, name, listener) {
  var on0,
      on1;
  return function() {
    var schedule = init(this, key, id),
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

  if (arguments.length < 2) {
    var schedule = get(this.node(), key, id);
    return schedule && schedule.on.on(name);
  }

  return this.each(onFunction(key, id, name, listener));
}
