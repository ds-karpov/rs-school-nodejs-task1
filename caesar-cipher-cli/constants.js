const ACTION_TYPES = {
  encode: "encode",
  decode: "decode",
};

const ERRORS = {
  shift: () =>
    'Argument "shift" (--shift, -s) is required! "shift" has to be a number!',
  action: () =>
    'Argument "action" (--action, -a) is required! "action" has value "encode" or "decode"!',
  path: (path) => `Error: file ${path} does not exist or not readable\n`,
  white: () => "Error: can not write file\n",
};

const CHAR_CODE = {
  A: "A".charCodeAt(0),
  Z: "Z".charCodeAt(0),
  a: "a".charCodeAt(0),
  z: "z".charCodeAt(0),
};

const ALPHABET_LENGTH = 26;

module.exports = { ACTION_TYPES, ERRORS, CHAR_CODE, ALPHABET_LENGTH };
