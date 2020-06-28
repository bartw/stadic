const { red, bold, green } = require("kleur");
const { promises: fs } = require("fs");
const path = require("path");
const webpack = require("webpack");

const transformPages = async ({ pagesPath, tempPath }) => {
  const pages = await fs.readdir(pagesPath);

  await fs.rmdir(tempPath, { recursive: true });
  await fs.mkdir(tempPath);

  return Promise.all(
    pages.map(
      async (page) =>
        new Promise((resolve, reject) => {
          const pagePath = path.resolve(pagesPath, page);
          webpack(
            {
              entry: pagePath,
              output: {
                path: path.resolve(tempPath),
                filename: page,
                library: page,
                libraryExport: "default",
                libraryTarget: "commonjs",
              },
              module: {
                rules: [
                  {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: { loader: "babel-loader" },
                  },
                ],
              },
            },
            (err, stats) => {
              if (err || stats.hasErrors()) {
                console.log(
                  red(`Something went wrong when transforming ${bold(page)}.`)
                );
                reject();
              }
              console.log(green(`Transformed ${bold(page)}.`));
              resolve();
            }
          );
        })
    )
  );
};

module.exports = { transformPages };
