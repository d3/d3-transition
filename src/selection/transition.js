import {Transition, newId, namekey} from "../transition/index";
import schedule from "../transition/schedule";
import {easeCubicInOut} from "d3-ease";
import {now} from "d3-timer";

export default function(name) {
  var id = newId(),
      key = namekey(name),
      timing = {time: now(), delay: 0, duration: 250, ease: easeCubicInOut};

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, key, id, i, group, timing);
      }
    }
  }

  return new Transition(groups, this._parents, key, id);
}
