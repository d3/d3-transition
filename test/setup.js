import {beforeEach} from "vitest";

// d3-timer’s now() caches the current time until the next frame (setTimeout
// 17ms in Node), so wait for any time cached by a previous test to be cleared.
beforeEach(() => new Promise(resolve => setTimeout(resolve, 20)));

// Give each test a fresh document element so that transitions and attributes
// from a previous test don’t leak into the next test.
beforeEach(() => {
  const root = document.createElement("html");
  root.append(document.createElement("head"), document.createElement("body"));
  document.documentElement.replaceWith(root);
});
