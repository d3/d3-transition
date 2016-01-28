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
  });
}

function transition() {
  return new Transition([[document.documentElement]], root);
}

var selectionPrototype = selection.prototype;

Transition.prototype = transition.prototype = {
  call: selectionPrototype.call,
  nodes: selectionPrototype.nodes,
  node: selectionPrototype.node,
  size: selectionPrototype.size,
  empty: selectionPrototype.empty,
  each: selectionPrototype.each,
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
