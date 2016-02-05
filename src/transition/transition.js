import {Transition, newId} from "./index";
import schedule, {getSchedule} from "./schedule";

export default function() {
  var key = this._key,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var timing = getSchedule(node, key, id0);
        schedule(node, key, id1, i, group, {
          time: timing.time,
          delay: timing.delay + timing.duration,
          duration: timing.duration,
          ease: timing.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, key, id1);
}
