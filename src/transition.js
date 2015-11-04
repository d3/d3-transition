import {selection} from "d3-selection";
import {timer} from "d3-timer";
import transition_ease from "./transition-ease";

var maxId = 0;

export function Transition(root, depth, key, id) {
  this._root = root;
  this._depth = depth;
  this._key = key || "__transition__";
  this._id = id || ++maxId;
  this.each(initialize(this._key, this._id));
};

function transition() {
  return new Transition([document.documentElement], 1);
}

Transition.prototype = transition.prototype = {
  each: selection.prototype.each,
  ease: transition_ease
};

function initialize(key, id) {
  return function() {
    var lock = this[key] || (this[key] = new Lock);
    if (lock.scheduled(id)) return;
  };
}

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
