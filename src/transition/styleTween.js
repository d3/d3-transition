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
  var key = "style." + name;
  return arguments.length < 2
      ? this.tween(key)._value // TODO handle null tween
      : this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
