// TODO import {timer} from "d3-timer";

export function initialize(node, index, key, id, inherit) {
  var schedule = node[key];
  if (!schedule) node[key] = schedule = new Schedule;
  else if (find(schedule, id)) return;
  schedule.pending.push({
    id: id,
    index: index,
    // TODO tween
    time: inherit.time,
    delay: inherit.delay,
    duration: inherit.duration,
    ease: inherit.ease
    // TODO timer
  });
}

export function find(schedule, id) {
  var entry = schedule.active;
  if (entry && entry.id === id) return entry;
  var pending = schedule.pending, i = pending.length;
  while (--i >= 0) if ((entry = pending[i]).id === id) return entry;
}

function Schedule() {
  this.active = null;
  this.pending = [];
}
