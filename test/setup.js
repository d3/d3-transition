import {beforeEach} from "vitest";

// d3-timer’s now() caches the current time until the next frame (setTimeout
// 17ms in Node), so wait for any time cached by a previous test to be cleared.
beforeEach(() => new Promise(resolve => setTimeout(resolve, 20)));
