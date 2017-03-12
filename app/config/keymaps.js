const {readFileSync} = require('fs');
const {join} = require('path');
const _paths = require('./paths');

const commands = {};
const keys = {};

const _import = function (customsKeys) {
  const path = () => {
    switch (process.platform) {
      case 'darwin': return join(_paths.keymapPath, 'darwin.json');
      case 'win32': return join(_paths.keymapPath, 'win32.json');
      case 'linux': return join(_paths.keymapPath, 'linux.json');
      default: return join(_paths.keymapPath, 'darwin.json');
    }
  };
  try {
    const cmds = JSON.parse(readFileSync(path()));
    for (const command in cmds) {
      if (command) {
        commands[command] = cmds[command];
        keys[commands[command]] = command;
      }
    }

    if (customsKeys) {
      for (const command in customsKeys) {
        if (command) {
          commands[command] = customsKeys[command];
          keys[customsKeys[command]] = command;
        }
      }
    }

    return {commands, keys};
  } catch (err) {
  }
};

const _extend = function (customsKeys) {
  if (customsKeys) {
    for (const command in customsKeys) {
      if (command) {
        commands[command] = customsKeys[command];
        keys[customsKeys[command]] = command;
      }
    }
  }
  return {commands, keys};
};

module.exports = {
  import: _import,
  extend: _extend
};
