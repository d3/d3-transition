function styleTween(name, value, priority) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.style.setProperty(name, i(t), priority);
    };
  }
  tween._value = value;
  return tween;
}

export default function(name, value, priority) {
  return arguments.length < 2
      ? this.tween("style." + name)._value
      : this.tween("style." + name, styleTween(name, value, priority == null ? "" : priority));
}
