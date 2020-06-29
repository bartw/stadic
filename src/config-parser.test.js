const { parseArguments } = require("./config-parser");

describe("parseArguments", () => {
  it("returns the config when the correct args are passed in all orders", () => {
    // GIVEN
    const expected = {
      htmlPath: "the html",
      pagesPath: "the pages",
      outputPath: "the output",
      tempPath: "./.stadic_temp",
    };

    const argsCollection = [
      [
        "--html",
        expected.htmlPath,
        "--pages",
        expected.pagesPath,
        "--output",
        expected.outputPath,
      ],
      [
        "--pages",
        expected.pagesPath,
        "--html",
        expected.htmlPath,
        "--output",
        expected.outputPath,
      ],
      [
        "--output",
        expected.outputPath,
        "--pages",
        expected.pagesPath,
        "--html",
        expected.htmlPath,
      ],
      [
        "--pages",
        expected.pagesPath,
        "--output",
        expected.outputPath,
        "--html",
        expected.htmlPath,
      ],
      [
        "--output",
        expected.outputPath,
        "--html",
        expected.htmlPath,
        "--pages",
        expected.pagesPath,
      ],
    ];

    argsCollection.forEach((args) => {
      // WHEN
      const actual = parseArguments(args);

      // THEN
      expect(actual).toEqual(expected);
    });
  });

  it("throws when the html argument is not passed", () => {
    // GIVEN
    const argsCollection = [
      ["-html", "the html", "--pages", "the pages", "--output", "the output"],
      ["--pages", "the pages", "--output", "the output", "--html"],
      ["the html", "--pages", "the pages", "--output", "the output"],
    ];

    argsCollection.forEach((args) => {
      // WHEN - THEN
      expect(() => parseArguments(args)).toThrow(
        `Please pass the --html argument`
      );
    });
  });
  
  it("throws when the pages argument is not passed", () => {
    // GIVEN
    const argsCollection = [
      ["--html", "the html", "-pages", "the pages", "--output", "the output"],
      ["--output", "the output", "--html", "the html", "--pages"],
      ["--html", "the html", "the pages", "--output", "the output"],
    ];

    argsCollection.forEach((args) => {
      // WHEN - THEN
      expect(() => parseArguments(args)).toThrow(
        `Please pass the --pages argument`
      );
    });
  });
  
  it("throws when the output argument is not passed", () => {
    // GIVEN
    const argsCollection = [
      ["--html", "the html", "--pages", "the pages", "-output", "the output"],
      ["--html", "the html", "--pages", "the pages", "--output"],
      ["--html", "the html", "--pages", "the pages", "the output"],
    ];

    argsCollection.forEach((args) => {
      // WHEN - THEN
      expect(() => parseArguments(args)).toThrow(
        `Please pass the --output argument`
      );
    });
  });
});
