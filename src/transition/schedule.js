import {dispatch} from "d3-dispatch";
import {timer, timeout} from "d3-timer";

var emptyOn = dispatch("start", "end", "interrupt");
var emptyTweens = [];

var CREATED = 0,
    SCHEDULED = 1,
    STARTED = 2;

export default function(node, key, id, index, group, timing) {
  var schedules = node[key];
  if (!schedules) node[key] = schedules = {active: null, pending: []};
  else if (has(node, key, id)) return;
  start(node, key, {
    id: id,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tweens: emptyTweens,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function has(node, key, id) {
  var schedules = node[key];
  if (!schedules) return;
  var schedule = schedules.active;
  if (schedule && schedule.id === id) return schedule;
  var pending = schedules.pending, i = pending.length;
  while (--i >= 0) if ((schedule = pending[i]).id === id) return schedule;
}

export function init(node, key, id) {
  var schedule = has(node, key, id);
  if (!schedule || schedule.state > CREATED) throw new Error("too late");
  return schedule;
}

export function set(node, key, id) {
  var schedule = has(node, key, id);
  if (!schedule || schedule.state > SCHEDULED) throw new Error("too late");
  return schedule;
}

export function get(node, key, id) {
  var schedule = has(node, key, id);
  if (!schedule) throw new Error("too late");
  return schedule;
}

function start(node, key, self) {
  var schedules = node[key],
      tweens;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules.pending.push(self);
  self.timer = timer(schedule, 0, self.time);

  // If the delay is greater than this first sleep, sleep some more;
  // otherwise, start immediately.
  function schedule(elapsed) {
    self.state = SCHEDULED;
    if (self.delay <= elapsed) start(elapsed - self.delay);
    else self.timer.restart(start, self.delay, self.time);
  }

  function start(elapsed) {
    var interrupted = schedules.active,
        pending = schedules.pending,
        i, j, n, o;

    // Interrupt the active transition, if any.
    // Dispatch the interrupt event.
    if (interrupted) {
      interrupted.timer.stop();
      interrupted.on.call("interrupt", node, node.__data__, interrupted.index, interrupted.group);
    }

    // Cancel any pre-empted transitions. No interrupt event is dispatched
    // because the cancelled transitions never started. Note that this also
    // removes this transition from the pending list!
    for (i = 0, j = -1, n = pending.length; i < n; ++i) {
      o = pending[i];
      if (o.id < self.id) o.timer.stop();
      else if (o.id > self.id) pending[++j] = o;
    }
    pending.length = j + 1;

    // Mark this transition as active.
    schedules.active = self;

    // Defer the first tick to end of the current frame; see mbostock/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout(function() {
      if (schedules.active === self) {
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tweens are initialized.
    self.on.call("start", node, node.__data__, self.index, self.group);
    self.state = STARTED;

    // Initialize the tweens, deleting null tweens.
    tweens = new Array(n = self.tweens.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tweens[i].value.call(node, node.__data__, self.index, self.group)) {
        tweens[++j] = o;
      }
    }
    tweens.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed / self.duration,
        e = t >= 1 ? 1 : self.ease.call(null, t),
        i, n;

    for (i = 0, n = tweens.length; i < n; ++i) {
      tweens[i].call(null, e);
    }

    // Dispatch the end event.
    if (t >= 1) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      schedules.active = null;
      if (!schedules.pending.length) delete node[key];
      self.timer.stop();
    }
  }
}
