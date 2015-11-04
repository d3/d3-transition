import {selection} from "d3-selection";
import selection_interrupt from "./src/selection-interrupt";
import selection_transition from "./src/selection-transition";

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

export {default as transition} from "./src/transition";
