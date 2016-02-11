import {get, set} from "./schedule";

function tweenFunction(key, id, name, value) {
  var tweens0, tweens1;
  return function() {
    var schedule = set(this, key, id),
        tweens = schedule.tweens;

    // If this node shared tweens with the previous node,
    // just assign the updated shared tweens and we’re done!
    // Otherwise, copy-on-write.
    if (tweens !== tweens0) {
      tweens1 = (tweens0 = tweens).slice();
      for (var t = {name: name, value: value}, i = 0, n = tweens1.length; i < n; ++i) {
        if (tweens1[i].name === name) {
          tweens1[i] = t;
          break;
        }
      }
      if (i === n) tweens1.push(t);
    }

    schedule.tweens = tweens1;
  };
}

export default function(name, value) {
  var key = this._key,
      id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tweens = get(this.node(), key, id).tweens;
    for (var i = 0, n = tweens.length, t; i < n; ++i) {
      if ((t = tweens[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  if (typeof value !== "function") throw new Error;
  return this.each(tweenFunction(key, id, name, value));
}
