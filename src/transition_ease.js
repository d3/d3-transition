import {ease} from "d3-ease";

export default function(type, a, b) {
  var e = typeof type === "function" ? type : ease(type, a, b);
  return this.each(function() {
    // TODO
  });
};
