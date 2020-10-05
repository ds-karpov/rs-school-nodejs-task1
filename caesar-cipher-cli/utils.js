const fs = require("fs");
const path = require("path");
const { ERRORS } = require("./constants");

function checkFileAvailability(filePath, callback = () => null) {
  if (!filePath) {
    return;
  }

  fs.access(path.resolve(filePath), fs.constants.R_OK, (err) => {
    if (err) {
      process.stderr.write(ERRORS.path(err.path));
      process.exit(2);
    }
    callback();
  });
}

module.exports = { checkFileAvailability };
