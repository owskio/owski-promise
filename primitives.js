

var
curry = require('./curry').curry,
type = curry(function(typeName,x){
  return typeof(x) === typeName;
}),
obj           = type('object'),
fun           = type('function'),
bul           = type('boolean'),
arrayWrap     = function(x){ return [x];},
add = curry(function(a,b){ return a + b; }),
I = function(x){ return x; },
K = function(x){
  return function(){
    return x;
  };
},
undefined = I(),
and = function(a,b){ return a && b; },


//DOM primitives
log = function(message){
  if(window.console) console.log(message);
},

hasOwnProperty = curry(function(obj,prop){
  return obj.hasOwnProperty(prop);
}),

z;
module.exports = {
  obj           : obj,
  fun           : fun,
  bul           : bul,
  add: add,
  arrayWrap     : arrayWrap,
  I : I,
  K : K,
  undefined: undefined,
  and:and,
  log: log,
  hasOwnProperty:hasOwnProperty,
  z:z
};
