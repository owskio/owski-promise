
var

c = require('./curry'),
curry = c.curry,
applyStrict = c.applyStrict,
arrayFunction = c.arrayFunction,

apply = curry(applyStrict),
compose2 = function(fnA,fnB){
  return function(){
    var intermediate = apply(fnB,this,arguments);
    return apply(fnA,this,[intermediate]);
  };
},
reverseArguments = function(fn){
  return arrayFunction(function(args){
    return apply(fn,this,args.reverse());
  });
},
z;

module.exports = {
  apply: apply,
  reverseArguments: reverseArguments,
  compose2: compose2,
  z:z
};
