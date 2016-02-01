import {Transition, namekey} from "../transition/index";
import {initializeScheduleEntry} from "../transition/schedule";
import {easeCubicInOut} from "d3-ease";

var nextId = 0;

export default function(name) {
  var id = ++nextId,
      key = namekey(name),
      timing = {time: Date.now(), delay: 0, duration: 250, ease: easeCubicInOut};

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        initializeScheduleEntry(subgroup[i] = node, key, id, i, subgroup, timing);
      }
    }
  }

  return new Transition(subgroups, this._parents, key, id);
}
