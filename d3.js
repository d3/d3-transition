import {
  event,
  mouse,
  namespace,
  namespaces,
  requote,
  select,
  selectAll,
  selection,
  touch,
  touches
} from "d3-selection";

import {
  timer,
  timerReplace,
  timerFlush
} from "d3-timer"

import {
  transition
} from "./index";

import "./index";

export default {
  get event() { return event; },
  mouse: mouse,
  namespace: namespace,
  namespaces: namespaces,
  requote: requote,
  select: select,
  selectAll: selectAll,
  selection: selection,
  touch: touch,
  touches: touches,
  timer: timer,
  timerReplace: timerReplace,
  timerFlush: timerFlush,
  transition: transition
};
