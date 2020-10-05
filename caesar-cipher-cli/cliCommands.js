const { program } = require("commander");

program
  .storeOptionsAsProperties(false)
  .option("-i, --input <input_file>", "input file")
  .option("-o, --output <output_file>", "output file")
  .requiredOption("-s, --shift <value>", "shift", (str) => parseInt(str, 10))
  .requiredOption("-a, --action <action>", "encode/decode action")
  .parse(process.argv);

module.exports = {
  commandLineArgv: program.opts(),
};
