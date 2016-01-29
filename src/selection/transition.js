import {Transition} from "../transition/index";
import {initialize, namekey} from "../transition/lock";
import {easeCubicInOut} from "d3-ease";

export default function(name) {
  var key = namekey(name),
      transition = new Transition(this._nodes, this._parents, key),
      inherit = {time: Date.now(), delay: 0, duration: 250, ease: easeCubicInOut};
  return transition.each(function(d, i) {
    initialize(this, i, key, transition._id, inherit);
  });
}
