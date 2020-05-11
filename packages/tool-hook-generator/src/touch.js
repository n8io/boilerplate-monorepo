/* eslint-disable no-sync */
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const touch = (filepath) => {
  const time = new Date();

  mkdirp.sync(path.dirname(filepath));

  try {
    fs.utimesSync(filepath, time, time);
  } catch (err) {
    fs.closeSync(fs.openSync(filepath, 'w'));
  }
};

module.exports = touch;
/* eslint-enable no-sync */
