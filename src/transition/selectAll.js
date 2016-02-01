import {Transition, selection_prototype} from "./index";
import {initializeScheduleEntry, getScheduleEntry} from "./schedule";

export default function() {
  var id = this._id,
      key = this._key,
      selection = selection_prototype.selectAll.apply(this, arguments); // TODO wastes a Selection object

  for (var parents = selection._parents, groups = selection._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var timing = getScheduleEntry(parents[j], key, id), group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        initializeScheduleEntry(node, key, id, i, group, timing);
      }
    }
  }

  return new Transition(groups, parents, key, id);
}
