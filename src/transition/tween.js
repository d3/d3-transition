import {getSchedule} from "./schedule";

function tweenFunction(key, id, name, value) {
  return function() {
    var tweens = getSchedule(this, key, id).tweens;

    for (var i = 0, n = tweens.length, t; i < n; ++i) {
      if ((t = tweens[i]).name === name) {
        return t.value = value;
      }
    }

    tweens.push({name: name, value: value});
  };
}

export default function(name, value) {
  var key = this._key,
      id = this._id,
      sname = name + "";

  if (arguments.length < 2) {
    var schedule = getSchedule(this.node(), key, id);
    if (schedule) for (var tweens = schedule.tweens, i = 0, n = tweens.length, t; i < n; ++i) {
      if ((t = tweens[i]).name === sname) {
        return t.value;
      }
    }
    return null;
  }

  return this.each(tweenFunction(key, id, sname, value));
}
