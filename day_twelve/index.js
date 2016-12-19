var input = require('./input.js');
var Register = require('./register.js');
var i =0;
// console.log(input);
var a = new Register('a',0);
var b = new Register('b',0);
var c = new Register('c',0);
var d = new Register('d',0);
var registers = new Map();
registers.set(a.id,a);
registers.set(b.id,b);
registers.set(c.id,c);
registers.set(d.id,d);


var jnz = function(instructionNumber, decisionVal, jumpVal){
  var newInstructionVal = instructionNumber;
  if (parseInt(decisionVal)){
    if (decisionVal!=0) {
      newInstructionVal += parseInt(jumpVal);
    }
  }else{
    if (registers.get(decisionVal).value)!= 0) {
      newInstructionVal += parseInt(jumpVal);
    }
  }
  return newInstructionVal;
};

var cpy = function(value,target){
  (parseInt(value)) ? target.value = value : target.value = registers.get(value).value;
};
var inc = function(target, sad){
  target.increment();
};
var dec = function(target, sad){
  target.decrement();
};

var functions = new Map();
functions.set('jnz', jnz);
functions.set('cpy', cpy);
functions.set('inc', inc);
functions.set('dec',dec);

do {
  var line = input[i].split(' ');
  //console.log(line);
  i++;
} while (i <= 22);
