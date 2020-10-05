const { pipeline, Transform } = require("stream");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const { checkFileAvailability } = require("./utils");
const { ACTION_TYPES, ERRORS } = require("./constants");

function encodeText(commandLineArgv, encodeStr) {
  const { input, output, shift, action } = commandLineArgv;

  const inputFile = path.resolve(input);
  const outputFile = path.resolve(output);

  const read = fs.createReadStream(inputFile, "utf-8");
  const write = fs.createWriteStream(outputFile, {
    flags: "a",
  });

  function readTransformWhiteTextFromFile() {
    const transform = new Transform({
      transform(chunk, _, callback) {
        const str = new TextDecoder().decode(chunk);
        this.push(encodeStr(str, shift, action));
        callback();
      },
    });

    pipeline(read, transform, write, (err) => {
      if (err) {
        process.stderr.write(`Error: unknown error(${err.code})\n`);
        process.exit(3);
      }
    });

    write.on("finish", () => {
      process.exit(0);
    });
  }

  checkFileAvailability(input);

  if (output) {
    checkFileAvailability(output, readTransformWhiteTextFromFile);
  } else {
    read.on("data", (data) => {
      process.stdout.write(encodeStr(data, shift, action));
      process.exit(0);
    });
  }
}

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Phrase to encode: ",
});

function encodeLine(commandLineArgv, callback) {
  const { input, output, shift, action } = commandLineArgv;

  if (action !== ACTION_TYPES.encode && action !== ACTION_TYPES.decode) {
    process.stderr.write(ERRORS.action());
    process.exit(1);
  }
  if (shift < 0) {
    process.stderr.write(ERRORS.shift());
    process.exit(1);
  }

  readLine.prompt();

  readLine.on("line", (line) => {
    if (line === "--exit") {
      readLine.close();
      process.exit(0);
    } else {
      if (output) {
        const outputFile = path.resolve(output);

        function createFile() {
          fs.writeFile(
            outputFile,
            callback(line, shift, action),
            { flag: "a" },
            (err) => {
              if (err) process.stderr.write(ERRORS.write());
              readLine.prompt();
            }
          );
        }

        checkFileAvailability(output, createFile);
      } else {
        console.log("Output: ", callback(line, shift, action));
        readLine.prompt();
      }
    }
  });
}

module.exports = { encodeText, encodeLine };
