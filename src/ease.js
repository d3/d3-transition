var pi = Math.PI,
    tau = 2 * pi,
    halfPi = pi / 2,
    b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

var elasticDefault = elastic(),
    backDefault = back();

var eases = (new Map)
    .set("linear", linear)
    .set("linear-in", linear)
    .set("linear-out", linear)
    .set("linear-in-out", linear)
    .set("quad", quad)
    .set("quad-in", quad)
    .set("quad-out", quadOut)
    .set("quad-in-out", quadInOut)
    .set("cubic", cubic)
    .set("cubic-in", cubic)
    .set("cubic-out", cubicOut)
    .set("cubic-in-out", cubicInOut)
    .set("poly", cubic)
    .set("poly-in", cubic)
    .set("poly-out", cubicOut)
    .set("poly-in-out", cubicInOut)
    .set("sin", sin)
    .set("sin-in", sin)
    .set("exp", exp)
    .set("exp-in", exp)
    .set("circle", circle)
    .set("circle-in", circle)
    .set("elastic", elasticDefault)
    .set("elastic-in", elasticDefault)
    .set("back", backDefault)
    .set("back-in", backDefault)
    .set("bounce", bounce)
    .set("bounce-in", bounce);

export default function(type, a, b) {
  type += "";

  if (arguments.length < 2 && (ease = eases.get(type))) return ease;

  var ease,
      i = type.indexOf("-"),
      base = type,
      mode = i < 0 ? null : (base = type.slice(0, i), type.slice(i + 1));

  switch (base) {
    case "quad": ease = quad; break;
    case "cubic": ease = cubic; break;
    case "poly": ease = poly(a); break;
    case "sin": ease = sin; break;
    case "exp": ease = exp; break;
    case "circle": ease = circle; break;
    case "elastic": ease = elastic(a, b); break;
    case "back": ease = back(a); break;
    case "bounce": ease = bounce; break;
    default: ease = linear; break;
  }

  switch (mode) {
    case "out": ease = outOf(ease); break;
    case "in-out": ease = inOutOf(ease); break;
  }

  return ease;
};

function outOf(f) {
  return function(t) {
    return 1 - f(1 - t);
  };
}

function inOutOf(f) {
  return function(t) {
    return t *= 2, (t <= 1 ? f(t) : 2 - f(2 - t)) / 2;
  };
}

function linear(t) {
  return +t;
}

function quad(t) {
  return t * t;
}

function quadOut(t) {
  return 2 * t - t * t;
}

function quadInOut(t) {
  return t <= .5 ? 2 * t * t : 4 * t - 2 * t * t - 1;
}

function cubic(t) {
  return t * t * t;
}

function cubicOut(t) {
  return 3 * t - 3 * t * t + t * t * t;
}

function cubicInOut(t) {
  return t <= .5 ? 4 * t * t * t : 12 * t - 12 * t * t + 4 * t * t * t - 3;
}

function sin(t) {
  return 1 - Math.cos(t * halfPi);
}

function exp(t) {
  return Math.pow(2, 10 * t - 10);
}

function circle(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function bounce(t) {
  return t = 1 - t, 1 - (t < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9);
}

function poly(e) {
  return function(t) {
    return Math.pow(t, e);
  };
}

function elastic(a, p) {
  var s;
  if (p == null) p = .45;
  if (a == null) a = 1, s = p / 4;
  else s = p / tau * Math.asin(1 / a);
  return function(t) {
    return t = 1 - t, -a * Math.pow(2, -10 * t) * Math.sin((t - s) * tau / p);
  };
}

function back(s) {
  if (s == null) s = 1.70158;
  return function(t) {
    return t * t * ((s + 1) * t - s);
  };
}
