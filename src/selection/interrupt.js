import {namekey} from "../transition/index";

export default function(name) {
  var key = namekey(name);
  return this.each(function() {
    var schedule = this[key];
    if (schedule) {
      var pending = schedule.pending,
          active = schedule.active;
      for (var i = 0, n = pending.length; i < n; ++i) {
        pending[i].timer.stop();
      }
      pending.length = 0;
      if (active) {
        schedule.active = null;
        active.timer.stop();
        active.dispatch.interrupt.call(this, this.__data__, active.index, active.group); // TODO try-catch?
      }
      delete this[key];
    }
  });
}
