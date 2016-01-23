// n2p.js
// Infix to postfix
// Written by Jake Henderson

module.exports = {
  inFixToPostFix: function(input) {
    // Variables
    var postFix = "";
    var prec = {"=": 0, ">": 1, "|": 2, "&": 3, "!": 4, "(": 0};

    // Replace all implies and biconditionals with single characters
    input = input.replace(/<->/g, '=').replace(/->/g, '>');

    postFix = inFixToPostFix(input);

    // Main function to convert infix to postfix
    function inFixToPostFix(input) {
      var Stack = [];
      var str = "";
      while(input.length > 0) {
        var subStr = input.substring(0,1);
        if(checkForOperator(subStr) == -1) {
          // This puts operands onto the output string
          str += input.substring(0,1);
          input = input.slice(1);
        } else if(checkForOperator(subStr) == 0) {
          // This deals with parentheses
          input = input.slice(1);
          while(Stack[Stack.length - 1] != "(") {
            // Popping off all operators until an open parenthesis
            str += Stack.pop();
          }
          Stack.pop(); // Discard the (
        } else {
          // Below checks for precedence
          if(Stack.length > 0) {
            while(prec[subStr] <= prec[Stack[Stack.length - 1]] && Stack[Stack.length -1] != "(") {
              str += Stack.pop();
            }
          }
          // Push the operator onto the stack
          Stack.push(subStr);
          input = input.slice(1);
        }
      }
      // Afterwards pop all operators left on the stack off
      while(Stack.length > 0) {
        str += Stack.pop();
      }
      return str;
    }

    // Checks if a character is an operator
    function checkForOperator(str) {
      var Operators = ["=", ">", "|", "&", "!", "("];
      // Check for closed parenthesis
      if(str == ")") {
        return 0;
      }
      // Check if any other operators
      for(var i = 0; i < Operators.length; i++) {
        if(str == Operators[i]) {
          return 1;
        }
      }
      // If operand return -1
      return -1;
    }

    // Adds spaces between characters and converts back > and =
    function splitPostFix(postFix) {
      var output = "";
      for(var i = 0; i < postFix.length; i++) {
        output += postFix.substring(i, i+1) + " ";
      }
      return output.replace(/>/g, '->').replace(/=/g, '<->');
    }

    return {raw: postFix, split: splitPostFix(postFix)};
  }
};
