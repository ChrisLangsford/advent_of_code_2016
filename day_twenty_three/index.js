var input = require('./input.js');
var Register = require('./register.js');
var i = 0;
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


var jnz = function(checkZero, value){
  var zeroVal;
  (parseInt(checkZero)) ? zeroVal = parseInt(checkZero) : zeroVal = registers.get(checkZero).value;
  // console.log('JUMP! '+ zeroVal+ ' '+value);
  if (zeroVal != 0) {i+= parseInt(value);}
  else {i++;}
};
var cpy = function(value,target){
  var reg = registers.get(target);
  (parseInt(value)) ? reg.value = parseInt(value) : reg.value = registers.get(value).value;
  i++;
};
var inc = function(target, sad){
  registers.get(target).increment();
  i++;
};
var dec = function(target, sad){
  registers.get(target).decrement();
  i++;
};
var tgl = function(){
  console.log('TOGGLE!');
};

var functions = new Map();
functions.set('jnz', jnz);
functions.set('cpy', cpy);
functions.set('inc', inc);
functions.set('dec',dec);
functions.set('tgl', tgl);

do {
  var line = input[i].split(' ');
  //console.log(line);
  functions.get(line[0])(line[1], line[2]);
  //console.log(i);
} while (i <= 22);
console.log(registers);
