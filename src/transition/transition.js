import {Transition, newId} from "./index";
import {initializeScheduleEntry, getScheduleEntry} from "./schedule";

export default function() {
  var key = this._key,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var entry = getScheduleEntry(node, key, id0);
        initializeScheduleEntry(node, key, id1, i, group, {
          time: entry.time,
          delay: entry.delay + entry.duration,
          duration: entry.duration,
          ease: entry.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, key, id1);
}
