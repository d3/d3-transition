import {Transition} from "../transition/index";

export default function(name) {
  return new Transition(this._nodes, this._parents, name);
}
