
var parselog = require('./index').parse;
var fs = require('fs');

parselog(fs.createReadStream('./sample.log')).on('commit', function(commit) {
  console.log(commit);
});

