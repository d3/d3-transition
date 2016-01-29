// TODO import {timer} from "d3-timer";

export function initialize(node, index, key, id, inherit) {
  var lock = node[key] || (node[key] = new Lock);
  if (find(lock, id)) return;

  lock.pending.push({
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

export function find(lock, id) {
  var node = lock.active;
  if (node && node.id === id) return node;
  var pending = lock.pending, i = pending.length;
  while (--i >= 0) if ((node = pending[i]).id === id) return node;
}

function Lock() {
  this.active = null;
  this.pending = [];
}
