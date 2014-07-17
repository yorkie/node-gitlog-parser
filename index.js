
var assert = require('assert');
var Writable = require('stream').Writable;
var util = require('util');
var byline = require('byline');

var READY = 0x00;
var WAIT_COMMIT = 0x01;

function Gitlog() {
  if (!(this instanceof Gitlog))
    return new Gitlog();

  Writable.call(this, arguments);
  this._current = null;
}
util.inherits(Gitlog, Writable);

Gitlog.prototype._write = function(chunk, encoding, callback) {
  if (isFirstLine(chunk)) {
    if (this._current) {
      this.emit('commit', this._current);
    }
    this._current = { hash: chunk.slice(8, 47)+'', message: '' };
  } else {
    var pair = (chunk+'').split(': ');
    if (pair && pair.length >= 2) {
      if (pair[0].toLowerCase() == 'author') {
        var sp = pair[1].split(' <');
        this._current.author = {
          name: sp[0],
          email: sp[1].slice(0, sp[1].length-1)
        };
      } else {
        this._current[pair[0]] = pair[1];
      }
    } else {
      this._current.message += ('\n'+chunk);
    }
  }
  callback(null);
}

function isFirstLine(chunk) {
  return chunk.length == 47 && chunk.slice(0, 6)+'' === 'commit'
}

exports.parse = function(src) {
  if (!src.pipe) throw new Error('first argument must be Readable');
  return byline(src).pipe(Gitlog());
}

