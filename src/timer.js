var queueHead,
    queueTail,
    interval, // is an interval (or frame) active?
    timeout; // is a timeout active?

// The active timer is exposed so that the callback and time can be modified
// by transitions, but this isn’t intended to be public.
export var active;

// Execute all eligible timers,
// then flush completed timers to avoid concurrent queue modification.
// Returns the delay until the nextmost active timer.
export function flush() {
  var t0,
      t1 = queueHead,
      time = Infinity,
      now = Date.now();

  active = queueHead;
  while (active) {
    if (now >= active.time) active.flush = active.callback(now - active.time);
    active = active.next;
  }

  while (t1) {
    if (t1.flush) {
      t1 = t0 ? t0.next = t1.next : queueHead = t1.next;
    } else {
      if (t1.time < time) time = t1.time;
      t1 = (t0 = t1).next;
    }
  }

  queueTail = t0;
  return time - now;
};

// The timer will continue to fire until callback returns true.
export default function(callback, delay, then) {
  if (delay == null) delay = 0;
  if (then == null) then = Date.now();

  // Add the callback to the tail of the queue.
  var timer = new Timer(callback, then + delay);
  if (queueTail) queueTail.next = timer;
  else queueHead = timer;
  queueTail = timer;

  // Start animatin’!
  if (!interval) {
    timeout = clearTimeout(timeout);
    interval = 1;
    requestAnimationFrame(step);
  }
};

function Timer(callback, time) {
  this.callback = callback;
  this.time = time;
  this.flush = false;
  this.next = null;
}

function step() {
  var delay = flush();
  if (delay > 24) {
    if (isFinite(delay)) {
      clearTimeout(timeout);
      timeout = setTimeout(step, delay);
    }
    interval = 0;
  } else {
    interval = 1;
    requestAnimationFrame(step);
  }
}
