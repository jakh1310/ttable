// main.js
// Main truth table generator file
// Jake Henderson

n2p = require('./n2p'); // Loading my own conversion module
eval = require('./eval'); // Loading my evaluation module
fs = require('fs');

var inputFile = process.argv[2];
if(inputFile.indexOf(".txt") > 0) {
  console.log("Truth Table Generator\nWritten by Jake Henderson")
  var file = fs.readFileSync(inputFile, 'utf8').split('\r\n');
  for(var i = 0; i < file.length - 1; i++) {
    console.log("\nExpression " + i + ":\nInput Expression: " + file[i]);
    var postFix = n2p.inFixToPostFix(file[i].replace(/\s/g, ''));
    console.log("Postfix Expression: " + postFix.split + "\n");

    eval.printTable(postFix.raw, file[i]);
  }
} else {
  console.log("Input file isn't valid. Please try a .txt file.");
}
