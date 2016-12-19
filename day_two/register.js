var Register = function(id,value){
this.id = id;
this.value = value;

this.increment = ()=>{
  this.value++;
}
this.decrement = ()=>{
  this.value--;
}
};

module.exports = Register;
