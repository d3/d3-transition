import {get, set} from "./schedule";

function tweenFunction(key, id, name, value) {
  var tween0, tween1;
  return function() {
    var schedule = set(this, key, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

export default function(name, value) {
  var key = this._key,
      id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get(this.node(), key, id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  if (typeof value !== "function") throw new Error;
  return this.each(tweenFunction(key, id, name, value));
}

export function tweenValue(transition, name, value) {
  var key = transition._key,
      id = transition._id;

  transition.each(function() {
    var schedule = set(this, key, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get(node, key, id).value[name];
  };
}
