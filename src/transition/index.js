import {selection} from "d3-selection";
import transition_ease from "./ease";
import transition_filter from "./filter";
import transition_select from "./select";
import transition_selectAll from "./selectAll";

var root = [null],
    maxId = 0;

export function Transition(nodes, parents, key, id) {
  this._nodes = nodes;
  this._parents = parents;
  this._key = key;
  this._id = id || (id = ++maxId);
}

function transition(name) {
  return new Transition([[document.documentElement]], root, namekey(name));
}

export function namekey(name) {
  return name ? "__transition_" + name + "__" : "__transition__";
}

export var selection_prototype = selection.prototype;

Transition.prototype = transition.prototype = {
  select: transition_select,
  selectAll: transition_selectAll,
  filter: transition_filter,
  // TODO transition
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

export default transition;
