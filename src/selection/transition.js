import {Transition, newId} from "../transition/index";
import schedule, {get} from "../transition/schedule";
import {easeCubicInOut} from "d3-ease";
import {now} from "d3-timer";

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: easeCubicInOut
};

export default function(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, timing = get(name.node(), id), name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing);
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}
