import {Transition} from "./transition";

export default function(name) {
  return new Transition(this._root, this._depth, name && ("__transition_ " + name + "_"));
};
