import {STARTED, ENDED} from "../transition/schedule";

export default function(name) {
  name = name == null ? null : name + "";
  return this.each(function() {
    var schedules = this.__transition,
        schedule,
        empty = true,
        i;

    if (!schedules) return;

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      var active = schedule.state === STARTED;
      schedule.state = ENDED;
      schedule.timer.stop();
      if (active) schedule.on.call("interrupt", this, this.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete this.__transition;
  });
}
