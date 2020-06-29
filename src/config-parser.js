const getArg = (args, arg) => {
  const index = args.indexOf(arg);

  if (index === -1 || index >= args.length - 1) {
    throw new Error(`Please pass the ${arg} argument`);
  }

  return args[index + 1];
};

const parseArguments = (args) => ({
  htmlPath: getArg(args, "--html"),
  pagesPath: getArg(args, "--pages"),
  outputPath: getArg(args, "--output"),
  tempPath: "./.stadic_temp",
});

module.exports = { parseArguments };
