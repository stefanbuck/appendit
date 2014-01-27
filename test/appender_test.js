
var appender = require('../lib/appender')
  , fs = require('fs')
  , read = fs.readFileSync
  , assert = require('should');

function fixture(name) {
  return read('test/fixtures/' + name, 'utf8').replace(/\r/g, '');
}

function expected(name) {
  return read('test/expected/' + name, 'utf8').replace(/\r/g, '');
}

describe('html', function(){

  it('default', function(){
    appender({
      source: fixture('default.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('default.html'));
  })

  it('already there', function(){
    appender({
      source: fixture('already_there.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('already_there.html'));
  })

  it('already there multiple', function(){
    appender({
      source: fixture('already_there_multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('already_there_multiple.html'));
  })

  it('multiple last', function(){
    appender({
      matchIndex:'last',
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('multiple_last.html'));
  })

  it('multiple -1', function(){
    appender({
      matchIndex: -1,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('multiple_last.html'));
  })

  it('multiple first', function(){
    appender({
      matchIndex: 'first',
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('multiple_first.html'));
  })

  it('multiple 0', function(){
    appender({
      matchIndex: 0,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('multiple_first.html'));
  })

  it('multiple second', function(){
    appender({
      matchIndex: 1,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('multiple_second.html'));
  })

  it('without options', function(){
    (function(){
      appender()
    }).should.throw('No options are given.');
  });

  it('empty options', function(){
    (function(){
      appender({})
    }).should.throw('No source given.');
  });

  it('options with source', function(){
    (function(){
      appender({
        source: fixture('multiple.html')
      })
    }).should.throw('No content given.');
  });

  it('options with content', function(){
    (function(){
      appender({
        source: fixture('multiple.html'),
        content: [
          '<script src="a.js"></script>'
        ]
      })
    }).should.throw('No anchor given.');
  });

  it('options with all required parameters', function(){
    (function(){
      appender({
        source: fixture('multiple.html'),
        anchor: '<!-- anchor -->',
        content: [
          '<script src="a.js"></script>'
        ]
      })
    }).should.not.throw();
  });
})


