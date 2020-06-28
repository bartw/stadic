const { bold, green } = require("kleur");
const { promises: fs } = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const ReactDOM = require("react-dom");
const prettier = require("prettier");

const renderPages = async ({ htmlPath, tempPath, outputPath }) => {
  const html = await fs.readFile(htmlPath, "utf8");
  const pages = await fs.readdir(tempPath);

  await fs.rmdir(outputPath, { recursive: true });
  await fs.mkdir(outputPath);

  return Promise.all(
    pages.map(async (page) => {
      const module = require(path.resolve(tempPath, page));
      const Component = module[page];

      const dom = new JSDOM(html);
      global.window = dom.window;

      ReactDOM.render(Component(), dom.window.document.getElementById("root"));

      const serialized = dom.serialize();

      const formatted = prettier.format(serialized, { parser: "html" });

      const filePath = path.join(outputPath, page.replace(".js", ".html"));
      await fs.writeFile(filePath, formatted);

      console.log(
        green(`Successfully rendered ${bold(page)} to ${bold(outputPath)}.`)
      );
    })
  );
};

module.exports = { renderPages };
