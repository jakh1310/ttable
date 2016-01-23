var n2p = require('./n2p');

var input = process.argv[2].replace(/\s/g, '');
var postFix = n2p.inFixToPostFix(input);

console.log(postFix.raw, postFix.split);
