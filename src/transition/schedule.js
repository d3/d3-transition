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
    if (schedule.active) {
      console.log("interrupt@" + entry.id, "@" + schedule.active.id);
      schedule.active.timer.stop();
    }

    // Cancel any pre-empted transitions. No interrupt event is dispatched
    // because the cancelled transitions never started. Note that this also
    // removes this transition from the pending list!
    schedule.pending = schedule.pending.filter(function(pending) {
      if (pending.id < entry.id) console.log("cancel@" + entry.id, "@" + pending.id), pending.timer.stop();
      else return pending.id > entry.id;
    });

    // Mark this transition as active.
    schedule.active = entry;

    // Defer first tick to end of current frame; see mbostock/d3#1576.
    // Note: the transition may be canceled after start and before the first tick!
    // Note: this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    // TODO Should ALL ticks use this new timer, not just the first?
    entry.timer.stop();
    entry.timer.restart(tick, entry.delay, entry.time);

    // var startTimer = timer(function() {
    //   startTimer.stop();
    //   if (schedule.active === entry) {
    //     entry.timer.restart(tick, entry.delay, entry.time);
    //     tick(elapsed);
    //   }
    // });

    // TODO Dispatch the start event (within try-catch).
    // Note: this must be done before the tweens are initialized.

    // Initialize the tweens, deleting null tweens.
    for (var tweens = entry.tweens, i = 0, j = -1, n = tweens.length; i < n; ++i) {
      tweens[++j] = tweens[i].value.call(node, node.__data__, entry.index, entry.group);
    }
    tweens.length = j + 1;
  }

  function tween(t) {
    console.log("tick@" + entry.id, t);
    for (var i = 0, n = entry.tweens.length; i < n; ++i) {
      entry.tweens[i].call(node, t);
    }
  }

  // TODO Dispatch the end event (within try-catch).
  function tick(elapsed) {
    if (elapsed >= entry.duration) { // TODO capture duration to ensure immutability?
      tween(1);
      console.log("stop@" + entry.id, elapsed);
      schedule.active = null;
      if (!schedule.pending.length) delete node[key];
      entry.timer.stop();
    } else {
      // TODO Ease could throw an error; make sure the timer is still stopped?
      tween(entry.ease.ease(elapsed / entry.duration));
    }
  }

  console.log("schedule@" + entry.id);
  schedule.pending.push(entry);
  entry.timer = timer(reschedule, 0, entry.time);
}
