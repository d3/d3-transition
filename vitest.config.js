import {defineConfig} from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*-test.js"],
    setupFiles: ["test/setup.js"],
    fileParallelism: false // timing-sensitive tests
  }
});
