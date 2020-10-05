const { commandLineArgv } = require("./cliCommands");
const caesarEncode = require("./caesarEncode.js");
const { encodeText, encodeLine } = require("./encodeFunc");

function script() {
  if (commandLineArgv.input) {
    encodeText(commandLineArgv, caesarEncode);
  } else {
    encodeLine(caesarEncode);
  }
}

module.exports = script;
