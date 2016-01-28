import {selection} from "d3-selection";
// TODO import {timer} from "d3-timer";
import transition_ease from "./ease";

var root = [null],
    maxId = 0;

export function Transition(nodes, parents, name, id) {
  var key = name ? "__transition_" + name + "__" : "__transition__";
  this._nodes = nodes;
  this._parents = parents;
  this._name = name;
  this._id = id || (id = ++maxId);
  this.each(function() {
    var lock = this[key] || (this[key] = new Lock);
    if (lock.scheduled(id)) return;
    // TODO start a timer
  });
}

function transition() {
  return new Transition([[document.documentElement]], root);
}

function subtransition(method) {
  return function() {
    var selection = method.apply(this, arguments);
    return new Transition(selection._nodes, selection._parents, this._name, this._id);
  };
}

export var _selection = selection.prototype;

Transition.prototype = transition.prototype = {
  select: subtransition(_selection.select),
  selectAll: subtransition(_selection.selectAll),
  filter: subtransition(_selection.filter),
  call: _selection.call,
  nodes: _selection.nodes,
  node: _selection.node,
  size: _selection.size,
  empty: _selection.empty,
  each: _selection.each,
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
