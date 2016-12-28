var input = require('./input.js');
var Register = require('./register.js');
var programCounter = 0;
// console.log(input);
var a = new Register('a',7);
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
  if (zeroVal != 0) {
    (parseInt(value)) ? programCounter += parseInt(value) : programCounter += registers.get(value).value;
  }
  else {programCounter++;}
  //console.log('JUMP '+zeroVal+' '+value);
};
var cpy = function(value,target){
  var reg = registers.get(target);
  if (reg != null) {
    (parseInt(value) || parseInt(value) == 0) ? reg.value = parseInt(value) : reg.value = registers.get(value).value;
  }
  programCounter++;
};
var inc = function(target, sad){
  registers.get(target).increment();
  programCounter++;
};
var dec = function(target, sad){
  registers.get(target).decrement();
  programCounter++;
};
var tgl = function(target, sad){
  var instrModifier;
  var tglInst;
  (parseInt(target)) ? instrModifier = parseInt(target) : instrModifier = registers.get(target).value;
  tglInst = programCounter + instrModifier-1;
  // console.log(i);
  // console.log(instrModifier);
  // console.log(tglInst);
  // console.log(input[25]);

  if (tglInst > 0 || tglInst < input.length) {
    switch (input[tglInst].substr(0,3)) {
      case 'cpy':
      input[tglInst] = input[tglInst].replace(/^.{3}/g, 'jnz');
      break;
      case 'inc':
      input[tglInst] = input[tglInst].replace(/^.{3}/g, 'dec');
      break;
      case 'dec':
      input[tglInst] = input[tglInst].replace(/^.{3}/g, 'inc');
      break;
      case 'jnz':
      //console.log('old instr '+input[tglInst]);
      input[tglInst] = input[tglInst].replace(/^.{3}/g, 'cpy');
      //console.log('new instr '+input[tglInst]);
      break;
      case 'tgl':
      input[tglInst] = input[tglInst].replace(/^.{3}/g, 'inc');
      break;
    }
  }
  programCounter++;
  //console.log(input);
};

var functions = new Map();
functions.set('jnz', jnz);
functions.set('cpy', cpy);
functions.set('inc', inc);
functions.set('dec', dec);
functions.set('tgl', tgl);

do {
  var line = input[programCounter].split(' ');
  //console.log(line);
  functions.get(line[0])(line[1], line[2]);
  console.log(programCounter+') '+input[programCounter]);
} while (programCounter < input.length-1);
console.log(registers);
//console.log(input);
