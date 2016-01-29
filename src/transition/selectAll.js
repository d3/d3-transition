import {Transition, selection_prototype} from "./index";
import {initialize, find} from "./lock";

export default function() {
  var id = this._id,
      key = this._key,
      selection = selection_prototype.selectAll.apply(this, arguments);

  for (var parents = selection._parents, groups = selection._nodes, m = groups.length, j = 0; j < m; ++j) {
    for (var inherit = find(parents[j][key], id), group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        initialize(node, i, key, id, inherit);
      }
    }
  }

  return new Transition(groups, parents, key, id);
}
