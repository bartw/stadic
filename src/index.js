#!/usr/bin/env node

const config = require("./config");
const { transformPages } = require("./transformer");
const { renderPages } = require("./renderer");
const { promises: fs } = require("fs");

(async () => {
  await transformPages(config);
  await renderPages(config);
  await fs.rmdir(config.tempPath, { recursive: true });
})();
