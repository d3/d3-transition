import {getScheduleEntry} from "./schedule";

function tweenFunction(key, id, name, value) {
  return function() {
    var tweens = getScheduleEntry(this, key, id).tweens;

    for (var i = 0, n = tweens.length, t; i < n; ++i) {
      if ((t = tweens[i]).name === name) {
        return t.value = value;
      }
    }

    tweens.push({name: name, value: value});
  };
}

export default function(name, value) {
  var sname = name + "";

  if (arguments.length < 2) {
    var tweens = getScheduleEntry(this.node(), this._key, this._id).tweens;
    for (var i = 0, n = tweens.length, t; i < n; ++i) {
      if ((t = tweens[i]).name === sname) {
        return t;
      }
    }
    return null;
  }

  return this.each(tweenFunction(this._key, this._id, sname, value));
}
