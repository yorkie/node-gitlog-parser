
var assert = require('assert');
var parselog = require('./index').parse;
var fs = require('fs');
var n = 0;

parselog(fs.createReadStream('./sample.log')).on('commit', function(commit) {
  assert.ok(commit.hash);
  assert.ok(commit.author.name);
  assert.ok(commit.author.email);
  assert.equal(
    Object.prototype.toString.call(commit.date),
    '[object Date]'
  );
  if (n === 0) {
    assert.equal(commit.message, '\n    add boxes and vector');
  } else if (n === 1) {
    assert.equal(commit.message, '\n    update');
  } else if (n === 2) {
    assert.equal(commit.message, '\n  :arrow_up: solarized syntax themes\n  Thanks @IonicaBizau');
  }
  n += 1;
  console.log(commit);
});

