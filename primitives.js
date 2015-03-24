
var
c = require('./curry'),
curry = c.curry,



add = function(a,b){ return a + b;},
and = function(a,b){ return a && b;},
not = function(x){ return !x; },
arrayWrap = function(x){ return [x];},
I = function(x){ return x; },
K = function(x){
  return function(){
    return x;
  };
},
undefined = I(),

type = curry(function(type,x){
  return typeof(x) === type;
}),
und = type('undefined'),
fun = type('function'),
bul = type('boolean'),
obj = type('object'),
z;

module.exports = {
  add: add
, and: and
, not: not
, arrayWrap: arrayWrap
, und: und
, fun: fun
, bul: bul
, obj: obj
, I : I
, K : K
, undefined: undefined
};
