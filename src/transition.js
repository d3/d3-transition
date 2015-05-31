export function Transition(root, depth) {
  this._root = root;
  this._depth = depth;
  this._name = "__transition__";
  this._id = 0;
};

function transition() {
  return new Transition([document.documentElement], 1);
}

Transition.prototype = transition.prototype = {
  // TODO
};

export default transition;
