import {selectorAll} from "d3-selection";
import {Transition} from "./index";
import schedule, {getSchedule} from "./schedule";

export default function(select) {
  var key = this._key,
      id = this._id;

  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, timing = getSchedule(node, key, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, key, id, k, children, timing);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(groups, parents, key, id);
}
