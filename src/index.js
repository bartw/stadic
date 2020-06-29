#!/usr/bin/env node

const { parseArguments } = require("./config-parser");
const { transformPages } = require("./transformer");
const { renderPages } = require("./renderer");
const { promises: fs } = require("fs");

(async () => {
  const config = parseArguments([...process.argv]);
  await transformPages(config);
  await renderPages(config);
  await fs.rmdir(config.tempPath, { recursive: true });
})();
