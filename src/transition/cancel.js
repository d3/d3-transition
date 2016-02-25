import schedule, {get} from "./schedule";

function cancel(key, id) {
  return function() {
    var schedules = this[key];
    if (!schedules) return;

    var schedule = schedules.active,
        pending = schedules.pending,
        i = pending.length;
    if (schedule && schedule.id === id) {
      schedules.active = null;
      schedule.timer.stop();
      if (!i) delete this[key];
      schedule.on.call("interrupt", this, this.__data__, schedule.index, schedule.group);
      return;
    }

    while (--i >= 0) {
      if ((schedule = pending[i]).id === id) {
        schedule.timer.stop();
        pending.splice(i, 1);
        if (!pending.length && !schedules.active) delete this[key];
        return;
      }
    }
  };
}

export default function(select) {
  return this.each(cancel(this._key, this._id));
}
