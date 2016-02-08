// eval.js
// Evaluates postfix to a truth table
// Jake Henderson

module.exports = {
  printTable: function(input, orig) {
    var Variables = [];
    var VariableLetters = [];
    var rows = 0;

    var temp = input;
    for(var i = 0; i < temp.length; i++) {
      if(checkForOperator(temp[i]) < 0) {
        Variables.push(0);
        VariableLetters.push(temp[i]);
        var repl = new RegExp(temp[i], "gi");
        temp = temp.replace(repl, "|");
      }
    }
    rows = Math.pow(2, Variables.length);

    var header = " ";
    for(var i = 0; i < VariableLetters.length; i++) {
      header += VariableLetters[i] + " ";
    }
    header += "| " + orig + " ";
    console.log(header);
    console.log("-".repeat(VariableLetters.length * 2 + 1) + "+--" + "-".repeat(orig.length));

    for(var i = 0; i < rows; i++) {
      for(var j = 0; j < Variables.length; j++) {
        Variables[j] = (i >> j) & 1;
      }
      var result = evalRow(Variables, VariableLetters, input);

      var outputRow = " ";
      for(var j = 0; j < VariableLetters.length; j++) {
        outputRow += Variables[j] + " ";
      }
      outputRow += "| " + " ".repeat(orig.length / 2) + result;
      console.log(outputRow);
    }

    function checkForOperator(str) {
      var Ops = ["=", ">", "|", "&", "!"];
      // Check if string is an operator
      for(var i = 0; i < Ops.length; i++) {
        if(str == Ops[i]) {
          return 1;
        }
      }
      // If operand return -1
      return -1;
    }

    // Function to evaluate one row of the truth table
    function evalRow(vars, letters, str) {
      for(var i = 0; i < letters.length; i++) {
        var rStr = new RegExp(letters[i], "gi");
        str = str.replace(rStr, vars[i]);
      }

      var Stack = [];
      for(var i = 0; i < str.length; i++) {
        var first = 0;
        var second = 0;
        if(checkForOperator(str[i]) < 0) {
          Stack.push(str[i]);
        } else if(str[i] == "=") {
          first = Stack.pop();
          second = Stack.pop();
          if((first == "0" && second == "0") || (first == "1" && second == "1")) {Stack.push("1")} else {Stack.push("0")}
        } else if(str[i] == ">") {
          first = Stack.pop();
          second = Stack.pop();
          if((second == "0") || (second == "1" && first == "1")) {Stack.push("1")} else {Stack.push("0")}
        } else if(str[i] == "|") {
          first = Stack.pop();
          second = Stack.pop();
          if(first == "1" || second == "1") {Stack.push("1")} else {Stack.push("0")}
        } else if(str[i] == "&") {
          first = Stack.pop();
          second = Stack.pop();
          if(first == "1" && second == "1") {Stack.push("1")} else {Stack.push("0")}
        } else if(str[i] == "!") {
          first = Stack.pop();
          if(first == "1") {Stack.push("0")} else {Stack.push("1")}
        }
      }
      return Stack.pop();
    }
  }
};
