import {Transition, namekey} from "../transition/index";
import {initializeScheduleEntry} from "../transition/schedule";
import {easeCubicInOut} from "d3-ease";

export default function(name) {
  var key = namekey(name),
      transition = new Transition(this._groups, this._parents, key), // TODO selection._groups is mutable due to selection.data; must copy
      timing = {time: Date.now(), delay: 0, duration: 250, ease: easeCubicInOut};
  return transition.each(function(d, i, group) {
    initializeScheduleEntry(this, key, transition._id, i, group, timing);
  });
}
