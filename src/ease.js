var halfPi = Math.PI / 2;

export default {
  linear: linearIn,
  linearIn: linearIn,
  linearOut: linearIn,
  linearInOut: linearIn,
  linearOutIn: linearIn,
  quad: quadIn,
  quadIn: quadIn,
  quadOut: quadOut,
  quadInOut: quadInOut,
  quadOutIn: quadOutIn,
  cubic: cubicIn,
  cubicIn: cubicIn,
  cubicOut: cubicOut,
  cubicInOut: cubicInOut,
  cubicOutIn: cubicOutIn
};

function linearIn(t) {
  return t <= 0 ? 0
      : t >= 1 ? 1
      : t;
}

function quadIn(t) {
  return t <= 0 ? 0
      : t >= 1 ? 1
      : t * t;
}

function quadOut(t) {
  return t <= 0 ? 0
      : t >= 1 ? 1
      : 2 * t - t * t;
}

function quadInOut(t) {
  return t <= 0 ? 0
      : t <= .5 ? 2 * t * t
      : t >= 1 ? 1
      : 4 * t - 2 * t * t - 1;
}

function quadOutIn(t) {
  return t <= 0 ? 0
      : t <= .5 ? 2 * t - 2 * t * t
      : t >= 1 ? 1
      : 1 - 2 * t + 2 * t * t;
}

function cubicIn(t) {
  return t <= 0 ? 0
      : t >= 1 ? 1
      : t * t * t;
}

function cubicOut(t) {
  return t <= 0 ? 0
      : t >= 1 ? 1
      : 3 * t - 3 * t * t + t * t * t;
}

function cubicInOut(t) {
  return t <= 0 ? 0
      : t <= .5 ? 4 * t * t * t
      : t >= 1 ? 1
      : 12 * t - 12 * t * t + 4 * t * t * t - 3;
}

function cubicOutIn(t) {
  return t <= 0 ? 0
      : t <= .5 ? 3 * t - 6 * t * t + 4 * t * t * t
      : t >= 1 ? 1
      : 3 * t - 6 * t * t + 4 * t * t * t;
}

function sinIn(t) {
  return t <= 0 ? 0
      : t >= 1 ? 1
      : 1 - Math.cos(t * halfPi);
}
