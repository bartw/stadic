const argsLength = process.argv.length;

const getArg = (arg) => {
  const index = process.argv.indexOf(arg);

  if (index === -1 || index >= argsLength - 1) {
    throw new Error(`Please pass the ${arg} argument`);
  }

  return process.argv[index + 1];
};

const config = {
  htmlPath: getArg("--html"),
  pagesPath: getArg("--pages"),
  outputPath: getArg("--ouput"),
  tempPath: "./.stadic_temp",
};

module.exports = config;
