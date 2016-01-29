import {Transition, selection_prototype} from "./index";

export default function() {
  var selection = selection_prototype.filter.apply(this, arguments); // TODO wastes a Selection object
  return new Transition(selection._nodes, selection._parents, this._key, this._id);
}
