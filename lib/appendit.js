
// This file contains source code from the Yeoman Project, released under the BSD.
// License: http://opensource.org/licenses/bsd-license.php
// Yeoman:  https://github.com/yeoman

'use strict';

var _ = require('lodash');

module.exports = function (options) {

  if (!options) {
    throw new Error('No options are given.');
  }
  if (!options.source) {
    throw new Error('No source given.');
  }
  if (!options.content) {
    throw new Error('No content given.');
  }
  if (!options.anchor) {
    throw new Error('No anchor given.');
  }

  if (options.check === undefined) options.check = true;
  if (options.insertAfter === undefined) options.insertAfter = false;
  if (options.matchIndex === undefined || options.matchIndex === 'last') options.matchIndex = -1;
  if (options.matchIndex === 'first') options.matchIndex = 0;

  return rewrite(options);
};

// The following code was developed by the yeoman team.

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite(options) {

  // check if content is already in the body text
  if (options.check) {
    var re = new RegExp(options.content.map(function (line) {
      return '\s*' + escapeRegExp(line);
    })
      .join('\n'));

    if (re.test(options.source)) {
      return options.source;
    }
  }

  var lines = options.source.split('\n');

  var findMethod = null;
  if (options.matchIndex === -1) {
    findMethod = _.findLastIndex;
  } else {
    findMethod = _.findIndex;
  }

  var count = 0;
  var otherwiseLineIndex = findMethod(lines, function (line, i) {
    var result = line.indexOf(options.anchor) !== -1;
    if (result && options.matchIndex > 0) {
      result = options.matchIndex === count;
      count++;
    }
    return result;
  });

  var spaces = 0;
  while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
    spaces += 1;
  }

  var spaceStr = '';
  while ((spaces -= 1) >= 0) {
    spaceStr += ' ';
  }

  if(options.insertAfter) {
    otherwiseLineIndex++;
  }

  lines.splice(otherwiseLineIndex, 0, options.content.map(function (line) {
    return spaceStr + line;
  })
    .join('\n'));

  return lines.join('\n');
}