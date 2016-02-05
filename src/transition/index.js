import {selection} from "d3-selection";
import transition_attr from "./attr";
import transition_attrTween from "./attrTween";
import transition_delay from "./delay";
import transition_duration from "./duration";
import transition_ease from "./ease";
import transition_filter from "./filter";
import transition_on from "./on";
import transition_select from "./select";
import transition_selectAll from "./selectAll";
import transition_style from "./style";
import transition_styleTween from "./styleTween";
import transition_text from "./text";
import transition_transition from "./transition";
import transition_tween from "./tween";

var id = 0;

export function Transition(groups, parents, key, id) {
  this._groups = groups;
  this._parents = parents;
  this._key = key;
  this._id = id;
}

function transition(name) {
  return selection().transition(name);
}

export function newId() {
  return ++id;
}

export function namekey(name) {
  return name ? "__transition_" + name + "__" : "__transition__";
}

var selection_prototype = selection.prototype;

Transition.prototype = transition.prototype = {
  select: transition_select,
  selectAll: transition_selectAll,
  filter: transition_filter,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  // TODO remove
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease
};

export default transition;
