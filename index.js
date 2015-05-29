import {selection} from "d3-selection";
import ease from "./src/ease";
import selection_transition from "./src/selection_transition";
import Transition from "./src/transition";

selection.prototype.transition = selection_transition;

export {
  ease,
  Transition as transition
};
