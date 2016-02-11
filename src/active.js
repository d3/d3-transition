import {Transition, namekey} from "./transition/index";

var root = [null];

export default function(node, name) {
  var key = namekey(name), active = node[key];
  if (!active || !(active = active.active)) return null;
  return new Transition([[node]], root, key, active.id);
}
