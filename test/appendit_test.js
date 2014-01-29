
var appendit = require('../lib/appendit')
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
    appendit({
      source: fixture('default.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('default.html'));
  })

  it('already there', function(){
    appendit({
      source: fixture('already_there.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('already_there.html'));
  })

  it('already there multiple', function(){
    appendit({
      source: fixture('already_there_multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('already_there_multiple.html'));
  })

  it('multiple last', function(){
    appendit({
      matchIndex:'last',
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('multiple_last.html'));
  })

  it('multiple -1', function(){
    appendit({
      matchIndex: -1,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('multiple_last.html'));
  })

  it('multiple first', function(){
    appendit({
      matchIndex: 'first',
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('multiple_first.html'));
  })

  it('multiple 0', function(){
    appendit({
      matchIndex: 0,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }).should.equal(expected('multiple_first.html'));
  })

  it('multiple second', function(){
    appendit({
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
      appendit()
    }).should.throw('No options are given.');
  });

  it('empty options', function(){
    (function(){
      appendit({})
    }).should.throw('No source given.');
  });

  it('options with source', function(){
    (function(){
      appendit({
        source: fixture('multiple.html')
      })
    }).should.throw('No content given.');
  });

  it('options with content', function(){
    (function(){
      appendit({
        source: fixture('multiple.html'),
        content: [
          '<script src="a.js"></script>'
        ]
      })
    }).should.throw('No anchor given.');
  });

  it('options with all required parameters', function(){
    (function(){
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


