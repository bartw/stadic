const { red, bold, green } = require("kleur");
const { promises: fs } = require("fs");
const path = require("path");
const webpack = require("webpack");

const transformPages = async ({ pagesPath, tempPath }) => {
  const pages = await fs.readdir(pagesPath);

  await fs.rmdir(tempPath, { recursive: true });
  await fs.mkdir(tempPath);

  const extraNodeModules = path.resolve(__dirname, "..", "node_modules");

  return Promise.all(
    pages.map(
      async (page) =>
        new Promise((resolve, reject) => {
          const pagePath = path.resolve(pagesPath, page);

          webpack(
            {
              mode: "production",
              entry: pagePath,
              output: {
                path: path.resolve(tempPath),
                filename: page,
                library: page,
                libraryExport: "default",
                libraryTarget: "commonjs",
              },
              resolve: {
                modules: ["node_modules", extraNodeModules],
              },
              module: {
                rules: [
                  {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                      loader: path.join(extraNodeModules, "babel-loader"),
                      options: {
                        presets: [
                          path.join(extraNodeModules, "@babel/preset-env"),
                          path.join(extraNodeModules, "@babel/preset-react"),
                        ],
                      },
                    },
                  },
                ],
              },
            },
            (err, stats) => {
              if (err || stats.hasErrors()) {
                console.log(
                  red(`Something went wrong when transforming ${bold(page)}.`)
                );
                console.log(stats.toJson());
                return reject();
              }
              console.log(green(`Transformed ${bold(page)}.`));
              return resolve();
            }
          );
        })
    )
  );
};

module.exports = { transformPages };
