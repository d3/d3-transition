import Transition from "./transition";

export default function() {
  return new Transition(this._root, this._depth);
};
