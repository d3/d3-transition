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
  timerFlush,
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
  timerFlush: timerFlush,
  transition: transition
};
