import {timer} from "d3-timer";

export function initializeScheduleEntry(node, key, id, index, group, timing) {
  var schedule = node[key];
  if (!schedule) node[key] = schedule = {active: null, pending: []};
  else if (getScheduleEntry(node, key, id)) return;
  addScheduleEntry(node, key, {
    id: id,
    index: index,
    group: group,
    tweens: [],
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null
  });
}

export function getScheduleEntry(node, key, id) {
  var schedule = node[key], entry = schedule.active;
  if (entry && entry.id === id) return entry;
  var pending = schedule.pending, i = pending.length;
  while (--i >= 0) if ((entry = pending[i]).id === id) return entry;
}

function addScheduleEntry(node, key, entry) {
  var schedule = node[key];

  function reschedule(elapsed) {
    console.log("reschedule@" + entry.id, elapsed);
    if (entry.delay <= elapsed) start(elapsed - entry.delay);
    else entry.timer.restart(start, entry.delay, entry.time);
  }

  function start(elapsed) {
    console.log("start@" + entry.id, elapsed);

    // Interrupt the active transition, if any.
    // TODO Dispatch the interrupt event (within try-catch).
    if (schedule.active) console.log("interrupt@" + entry.id, "@" + schedule.active.id), schedule.active.timer.stop();

    // Cancel any pre-empted transitions. No interrupt event is dispatched
    // because the cancelled transitions never started.
    schedule.pending = schedule.pending.filter(function(pending) {
      if (pending.id < entry.id) console.log("cancel@" + entry.id, "@" + pending.id), pending.timer.stop();
      else return pending.id > entry.id;
    });

    schedule.pending.splice(schedule.pending.indexOf(entry), 1);
    schedule.active = entry;
    entry.timer.restart(tick, entry.delay, entry.time);

    // TODO Defer tween invocation to end of current frame; see mbostock/d3#1576.
    // Note that this transition may be canceled before then!
    // This must be scheduled before the start event; see d3/d3-transition#16!

    // TODO Dispatch the start event (within try-catch).
    // TODO Initialize the tweens.
  }

  function tick(elapsed) {
    console.log("tick@" + entry.id, elapsed);
    if (elapsed >= entry.duration) { // TODO capture duration to ensure immutability?
      console.log("stop@" + entry.id, elapsed);
      schedule.active = null;
      if (!schedule.pending.length) delete node[key];
      entry.timer.stop();
    }
  }

  console.log("schedule@" + entry.id);
  schedule.pending.push(entry);
  entry.timer = timer(reschedule, 0, entry.time);
}
