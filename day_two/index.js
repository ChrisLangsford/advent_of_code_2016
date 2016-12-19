var input = require('./input.js');
var keypad = [
  [null,null,1,null,null],
  [null,2,3,4,null],
  [5,6,7,8,9],
  [null,'A','B','C',null],
  [null,null,'D',null,null]
];


var currentX = 0;
var currentY = 2;

var up = function(){
  if (currentY >=1 && keypad[currentY-1][currentX] != null) {
    currentY--;
  }
};
var down = function(){
  if (currentY <=3 && keypad[currentY+1][currentX] != null) {
    currentY++;
  }
};
var left = function(){
  if (currentX >= 1 && keypad[currentY][currentX-1] != null) {
    currentX--;
  }
};
var right = function(){
  if (currentX <= 3 && keypad[currentY][currentX+1] != null) {
    currentX++;
  }
};

var moves = new Map();
moves.set('U',up);
moves.set('D',down);
moves.set('L',left);
moves.set('R',right);

input.forEach((line)=>{
  instruction = line.split('');
  instruction.forEach((move)=>{
    moves.get(move)();
  });
  console.log(keypad[currentY][currentX]);
});
