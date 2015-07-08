
gitlog-parser
======================

parse git log stream(Readable)

### Installation

```sh
$ npm install gitlog-parser --save
```

### Usage

```js
var parselog = require('gitlog-parser').parse;
var exec = require('child_process').exec;

parselog(exec('git log').stdout).on('commit', function(commit) {
  // hash
  // author
  // message
  // ...
});

parselog(exec('git log index.js').stdout).on('commit', function(commit) {
  // just show the history of index.js
});
```

**NB**: Hi, what's the difference from node-gitlog

gitlog based on any text in `git log` command, so she is a text parser, not folder(.git) parser, so easy.

### License

MIT

