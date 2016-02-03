function textConstant(value) {
  return value = value == null ? "" : value + "", function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) v = "";
    this.textContent = v;
  };
}

export default function(value) {
  return this.tween("text", (typeof value === "function"
      ? textFunction
      : textConstant)(value));
}
