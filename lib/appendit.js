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
  if (options.matchIndex === undefined || options.matchIndex === 'last') options.matchIndex = -1;
  if (options.matchIndex === 'first') options.matchIndex = 0;

  return rewrite(options);
};

// The following code contains logic from the generator-backbone.
// https://github.com/yeoman/generator-backbone/blob/master/util.js

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite(args) {

  // check if content is already in the body text
  if (args.check) {
    var re = new RegExp(args.content.map(function (line) {
      return '\s*' + escapeRegExp(line);
    })
      .join('\n'));

    if (re.test(args.source)) {
      return args.source;
    }
  }

  var lines = args.source.split('\n');

  var findMethod = null;
  if (args.matchIndex === -1) {
    findMethod = _.findLastIndex;
  } else {
    findMethod = _.findIndex;
  }

  var count = 0;
  var otherwiseLineIndex = findMethod(lines, function (line, i) {
    var result = line.indexOf(args.anchor) !== -1;
    if (result && args.matchIndex > 0) {
      result = args.matchIndex === count;
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

  lines.splice(otherwiseLineIndex, 0, args.content.map(function (line) {
    return spaceStr + line;
  })
    .join('\n'));

  return lines.join('\n');
}