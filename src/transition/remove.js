function removeFunction(key) {
  return function() {
    var parent = this.parentNode;
    if (parent && !this[key]) parent.removeChild(this);
  };
}

export default function() {
  return this.on("end.remove", removeFunction(this._key));
}
