import {Transition, selection_prototype} from "./index";
import {initializeScheduleEntry, getScheduleEntry} from "./schedule";

export default function() {
  var id = this._id,
      key = this._key,
      selection = selection_prototype.select.apply(this, arguments); // TODO wastes a Selection object

  for (var groups = this._nodes, subgroups = selection._nodes, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], subgroup = subgroups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        initializeScheduleEntry(subgroup[i], key, id, i, subgroup, getScheduleEntry(node, key, id));
      }
    }
  }

  return new Transition(subgroups, selection._parents, key, id);
}
