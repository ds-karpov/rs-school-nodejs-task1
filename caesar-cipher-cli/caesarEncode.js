const { ACTION_TYPES } = require("./constants");

function caesarEncode(string = "", shift = 0, action = ACTION_TYPES.encode) {
  const charsBuf = [];
  shift = +shift % 26;

  if (action === ACTION_TYPES.decode) {
    shift = -shift;
  }

  for (let i = 0; i < string.length; i++) {
    let charCode = string[i].charCodeAt();

    if (charCode > 96 && charCode < 123) {
      charsBuf.push(((charCode - 97 + 26 + shift) % 26) + 97);
    } else if (charCode > 64 && charCode < 91) {
      charsBuf.push(((charCode - 65 + 26 + shift) % 26) + 65);
    } else {
      charsBuf.push(charCode);
    }
  }

  return String.fromCharCode(...charsBuf);
}

module.exports = caesarEncode;
