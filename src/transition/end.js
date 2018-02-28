// TODO Anonymous names for event listeners.
export default function() {
  var that = this, size = that.size();
  return new Promise(function(resolve, reject) {
    that.on("cancel.end interrupt.end", reject).on("end.end", function() {
      if (--size === 0) resolve();
    });
  });
}
