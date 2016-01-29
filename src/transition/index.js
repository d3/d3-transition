import {selection} from "d3-selection";
import {timer} from "d3-timer";
import transition_ease from "./ease";

var root = [null],
    maxId = 0;

export function Transition(nodes, parents, name, id) {
  var key = name ? "__transition_" + name + "__" : "__transition__";
  this._nodes = nodes;
  this._parents = parents;
  this._name = name;
  this._id = id || (id = ++maxId);
  this.each(function(d, i) {
    var lock = this[key] || (this[key] = new Lock);
    if (lock.scheduled(id)) return;

    lock.pending.push({
      id: id,
      index: i,
      // TODO tween
      // TODO time, inherited
      // TODO delay, inherited
      // TODO duration, inherited
      // TODO ease, inherited
      timer: timer(…)
    });
  });
}

function transition() {
  return new Transition([[document.documentElement]], root);
}

// TODO propagate time, delay, duration and easing to subtransition
function subtransition(method) {
  return function() {
    var selection = method.apply(this, arguments);
    return new Transition(selection._nodes, selection._parents, this._name, this._id);
  };
}

var selection_prototype = selection.prototype;

Transition.prototype = transition.prototype = {
  select: subtransition(selection_prototype.select),
  selectAll: subtransition(selection_prototype.selectAll),
  filter: subtransition(selection_prototype.filter),
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  // TODO each("event"), or on("event")?
  // TODO attr
  // TODO attrTween
  // TODO style
  // TODO styleTween
  // TODO text
  // TODO tween
  // TODO remove
  // TODO delay
  // TODO duration
  ease: transition_ease
};

function Lock() {
  this.active = null;
  this.pending = [];
}

Lock.prototype = {
  scheduled: function(id) {
    if (this.active && this.active.id === id) return true;
    var pending = this.pending, i = pending.length;
    while (--i >= 0) if (pending[i].id === id) return true;
    return false;
  }
};

export default transition;
