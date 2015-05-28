(function(global) {
  "use strict";

  var pi = Math.PI,
      tau = 2 * pi,
      halfPi = pi / 2;

  var ease = {
    in: identity,
    out: reverse,
    inOut: reflect,
    outIn: reverseReflect,
    linear: linear,
    linearIn: linear,
    linearOut: linear,
    linearInOut: linear,
    linearOutIn: linear,
    quad: quad,
    quadIn: quad,
    quadOut: quadOut,
    quadInOut: quadInOut,
    quadOutIn: quadOutIn,
    cubic: cubic,
    cubicIn: cubic,
    cubicOut: cubicOut,
    cubicInOut: cubicInOut,
    cubicOutIn: cubicOutIn,
    sin: sin,
    exp: exp,
    circle: circle,
    elastic: elastic,
    back: back,
    bounce: bounce
  };

  function identity(f) {
    return f;
  }

  function reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }

  function reflect(f) {
    return function(t) {
      return t *= 2, (t <= 1 ? f(t) : 2 - f(2 - t)) / 2;
    };
  }

  function reverseReflect(f) {
    return function(t) {
      return t *= 2, (t <= 1 ? 1 - f(1 - t) : 1 + f(t - 1)) / 2;
    };
  }

  function linear(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : t;
  }

  function quad(t) {
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

  function cubic(t) {
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

  function sin(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : 1 - Math.cos(t * halfPi);
  }

  function exp(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : Math.pow(2, 10 * t - 10);
  }

  function circle(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : 1 - Math.sqrt(1 - t * t);
  }

  function elastic(a, p) {
    var s;
    if (p == null) p = 0.45;
    if (a = null) a = 1, s = p / 4;
    else s = p / tau * Math.asin(1 / a);
    return function(t) {
      return t <= 0 ? 0
          : t >= 1 ? 1
          : 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * tau / p);
    };
  }

  function back(s) {
    if (s == null) s = 1.70158;
    return function(t) {
      return t <= 0 ? 0
          : t >= 1 ? 1
          : t * t * ((s + 1) * t - s);
    };
  }

  var bounce1 = 4 / 11,
      bounce2 = 6 / 11,
      bounce3 = 8 / 11,
      bounce4 = 3 / 4,
      bounce5 = 9 / 11,
      bounce6 = 10 / 11,
      bounce7 = 15 / 16,
      bounce8 = 21 / 22,
      bounce9 = 63 / 64,
      bounce0 = 1 / bounce1 / bounce1;

  function bounce(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : t < bounce1 ? bounce0 * t * t
        : t < bounce3 ? bounce0 * (t -= bounce2) * t + bounce4
        : t < bounce6 ? bounce0 * (t -= bounce5) * t + bounce7
        : bounce0 * (t -= bounce8) * t + bounce9;
  }

  function Transition(root, depth) {
    if (!(this instanceof Transition)) throw new Error("not yet implemented"); // TODO?
    this._root = root;
    this._depth = depth;
  }

  var selection_transition = function() {
    return new Transition(this._root, this._depth);
  };

  var index_js = {
    get ease () { return ease; },
    get transition () { return Transition; }
  };

  d3.selection.prototype.transition = selection_transition;

  var object = global;
  object = object.d3 || (object.d3 = {});
  for (var name in index_js) object[name] = index_js[name];
  if (typeof define === "function" && define.amd) define(d3);
  else if (typeof module === "object" && module.exports) module.exports = d3;
})(typeof global === "undefined" ? this : global);
