#!/usr/bin/env node

import { promises as fs } from "fs";
import path from "path";
import React from "react";
import ReactDOM from "react-dom";
import { JSDOM } from "jsdom";
import prettier from "prettier";

const argsLength = process.argv.length;

const getArg = (arg) => {
  const index = process.argv.indexOf(arg);

  if (index === -1 || index >= argsLength - 1) {
    throw new Error(`Please pass the ${arg} argument`);
  }

  return process.argv[index + 1];
};

const htmlPath = getArg("--html");
const pagesPath = getArg("--pages");
const outputPath = getArg("--ouput");

(async () => {
  const html = await fs.readFile(htmlPath, "utf8");
  const pages = await fs.readdir(pagesPath);

  await fs.rmdir(outputPath, { recursive: true });
  await fs.mkdir(outputPath);

  pages.forEach(async (page) => {
    const modulePath = path.resolve(pagesPath, page);
    const module = await import(modulePath);
    const Page = module.default;
    const dom = new JSDOM(html);
    global.window = dom.window;
    ReactDOM.render(<Page />, dom.window.document.getElementById("root"));
    const serialized = dom.serialize();
    const formatted = prettier.format(serialized, { parser: "html" });
    const filePath = path.join(outputPath, page.replace(".js", ".html"));
    await fs.writeFile(filePath, formatted);
  });
})();
