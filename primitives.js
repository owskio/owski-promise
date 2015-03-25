

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
z;
module.exports = {
  obj           : obj,
  fun           : fun,
  bul           : bul,
  add: add,
  arrayWrap     : arrayWrap
};
