var appendit = require('../lib/appendit')
  , fs = require('fs')
  , read = fs.readFileSync
  , assert = require('should');

function fixture(name) {
  return read('test/fixtures/' + name, 'utf8');
}

function expected(name) {
  return read('test/expected/' + name, 'utf8');
}

var equalHelper = function (options, fixtureFilename, expectedFilename) {
  options.source = fixture(fixtureFilename);
  appendit(options).should.equal(expected(expectedFilename));
}

describe('html', function () {

  it('should append a script tag', function () {
    var options = {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'single.html', 'single.html');
  })

  it('should append two script tags', function () {
    var options = {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>',
        '<script src="b.js"></script>'
      ]
    };
    equalHelper(options, 'single.html', 'single_add_multiple.html');
  });

  it('shouldn\'t append a script tag', function () {
    var options = {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'single.html', 'single.html');
  })

  it('shouldn\'t append any script tag', function () {
    var options = {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple_with_content.html', 'multiple_with_content.html');
  })

  it('should append a script tag on the last anchor position. [matchIndex: \'last\']', function () {
    var options = {
      matchIndex: 'last',
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_last.html');
  })

  it('should append a script tag on the last anchor position. [matchIndex: -1]', function () {
    var options = {
      matchIndex: -1,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_last.html');
  })

  it('should append a script tag on the fist anchor position. [matchIndex: \'first\']', function () {
    var options = {
      matchIndex: 'first',
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_first.html');
  })

  it('should append a script tag on the fist anchor position. [matchIndex: 0]', function () {
    var options = {
      matchIndex: 0,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_first.html');
  })

  it('should append a script tag on the second anchor position. [matchIndex: 1]', function () {
    var options = {
      matchIndex: 1,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_second.html');
  })

  it('should append the same script tag again', function () {
    var options = {
      anchor: '<!-- anchor -->',
      check: false,
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'single_with_content.html', 'single_insert.html');
  });

  it('without options', function () {
    (function () {
      appendit()
    }).should.throw('No options are given.');
  });

  it('empty options', function () {
    (function () {
      appendit({})
    }).should.throw('No source given.');
  });

  it('options with source', function () {
    (function () {
      appendit({
        source: fixture('multiple.html')
      })
    }).should.throw('No content given.');
  });

  it('options with content', function () {
    (function () {
      appendit({
        source: fixture('multiple.html'),
        content: [
          '<script src="a.js"></script>'
        ]
      })
    }).should.throw('No anchor given.');
  });

  it('options with all required parameters', function () {
    (function () {
      appendit({
        source: fixture('multiple.html'),
        anchor: '<!-- anchor -->',
        content: [
          '<script src="a.js"></script>'
        ]
      })
    }).should.not.throw();
  });
})


