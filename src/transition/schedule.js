import {dispatch as newDispatch} from "d3-dispatch";
import {timer, timerOnce} from "d3-timer";

export var emptyDispatch = newDispatch("start", "end", "interrupt");

export default function(node, key, id, index, group, timing) {
  var schedules = node[key];
  if (!schedules) node[key] = schedules = {active: null, pending: []};
  else if (getSchedule(node, key, id)) return;
  startSchedule(node, key, {
    id: id,
    index: index, // For restoring context during callbacks.
    group: group, // For restoring context during callbacks.
    dispatch: emptyDispatch,
    tweens: [],
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null
  });
}

export function getSchedule(node, key, id) {
  var schedules = node[key];
  if (!schedules) return;
  var schedule = schedules.active;
  if (schedule && schedule.id === id) return schedule;
  var pending = schedules.pending, i = pending.length;
  while (--i >= 0) if ((schedule = pending[i]).id === id) return schedule;
}

function startSchedule(node, key, self) {
  var schedules = node[key];

  // Initialize the self timer when the transition is created. The delay is not
  // known until the first callback! If the delay is greater than this first
  // sleep, sleep again; otherwise, start immediately.
  schedules.pending.push(self);
  self.timer = timer(function(elapsed, now) {
    if (self.delay <= elapsed) start(elapsed - self.delay, now);
    else self.timer.restart(start, self.delay, self.time);
  }, 0, self.time);

  function start(elapsed, now) {
    var interrupted = schedules.active,
        pending = schedules.pending,
        tweens = self.tweens,
        i, j, n, o;

    // Cancel any pre-empted transitions. No interrupt event is dispatched
    // because the cancelled transitions never started. Note that this also
    // removes this transition from the pending list!
    // TODO Would a map or linked list be more efficient here?
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
    timerOnce(function() {
      if (schedules.active === self) {
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    }, 0, now);

    // Interrupt the active transition, if any.
    // Dispatch the interrupt event.
    // TODO Dispatch the interrupt event before updating the active transition?
    if (interrupted) {
      interrupted.timer.stop();
      interrupted.dispatch.interrupt.call(node, node.__data__, interrupted.index, interrupted.group); // TODO try-catch?
    }

    // Dispatch the start event.
    // Note this must be done before the tweens are initialized.
    self.dispatch.start.call(node, node.__data__, self.index, self.group); // TODO try-catch?

    // Initialize the tweens, deleting null tweens.
    // TODO Would a map or linked list be more efficient here?
    // TODO Overwriting the tweens array could be exposed through getSchedule?
    for (i = 0, j = -1, n = tweens.length; i < n; ++i) {
      if (o = tweens[i].value.call(node, node.__data__, self.index, self.group)) { // TODO try-catch?
        tweens[++j] = o;
      }
    }
    tweens.length = j + 1;
  }

  function tick(elapsed) {
    var tweens = self.tweens,
        t = elapsed / self.duration, // TODO capture duration to ensure immutability?
        e = t >= 1 ? 1 : self.ease.call(null, t), // TODO try-catch?
        i, n;

    for (i = 0, n = tweens.length; i < n; ++i) {
      tweens[i].call(null, e); // TODO try-catch?
    }

    // Dispatch the end event.
    // TODO Dispatch the end event before clearing the active transition?
    if (t >= 1) {
      schedules.active = null;
      if (!schedules.pending.length) delete node[key];
      self.timer.stop();
      self.dispatch.end.call(node, node.__data__, self.index, self.group); // TODO try-catch
    }
  }
}
