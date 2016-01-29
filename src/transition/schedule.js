import {timer} from "d3-timer";

export function initializeScheduleEntry(node, key, id, index, timing) {
  var schedule = node[key];
  if (!schedule) node[key] = schedule = new Schedule;
  else if (getScheduleEntry(node, key, id)) return;
  addScheduleEntry(node, key, id, index, timing);
}

function addScheduleEntry(node, key, id, index, timing) {
  var schedule = node[key], entry = {
    id: id,
    index: index,
    tweens: [],
    time: timing.time, // TODO capture to var?
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: timer(wait, 0, timing.time)
  };

  timing = null; // allow gc

  function wait(elapsed) {
    console.log("wait", elapsed);
    if (entry.delay <= elapsed) start(elapsed - entry.delay);
    else entry.timer.restart(start, entry.delay, entry.time);
  }

  function start(elapsed) {
    console.log("start", elapsed);
    // TODO if (schedule.active) interrupt(schedule.active);
    schedule.pending.splice(schedule.pending.indexOf(entry), 1);
    schedule.active = entry;
    entry.timer.restart(tick, entry.delay, entry.time);
    // TODO first tick
  }

  function tick(elapsed) {
    console.log("tick", elapsed);
    if (elapsed >= entry.duration) {
      console.log("stop", elapsed);
      schedule.active = null;
      if (!schedule.pending.length) delete node[key];
      entry.timer.stop();
    }
  }

  console.log("schedule");
  schedule.pending.push(entry);
}

export function getScheduleEntry(node, key, id) {
  var schedule = node[key], entry = schedule.active;
  if (entry && entry.id === id) return entry;
  var pending = schedule.pending, i = pending.length;
  while (--i >= 0) if ((entry = pending[i]).id === id) return entry;
}

function Schedule() {
  this.active = null;
  this.pending = [];
}
