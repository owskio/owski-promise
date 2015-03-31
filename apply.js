
var

c = require('./curry'),
curry = c.curry,
applyStrict = c.applyStrict,
arrayFunction = c.arrayFunction,

apply = curry(applyStrict),
compose2 = curry(function(fnA,fnB){
  return function(){
    var intermediate = apply(fnB,this,arguments);
    return apply(fnA,this,[intermediate]);
  };
}),
compose = arrayFunction(function(args){
  var
  theShift = Array.prototype.shift,
  outer = apply(theShift,args,[]);
  return args.length
    ? compose2(outer,compose(args))
    : outer;
}),
reverseArguments = function(fn){
  return arrayFunction(function(args){
    return apply(fn,this,args.reverse());
  });
},
proxy = curry(function(fn,obj){
  return arrayFunction(apply(fn,obj));
}),
bound = curry(function(obj,fnName){
  return proxy(obj[fnName],obj);
}),
antitype = function(fn){
  return function(){
    var
    theUnshift = Array.prototype.unshift;
    apply(theUnshift,arguments,[this]);
    return apply(fn,this,arguments);
  };
},
z;

module.exports = {
  apply: apply,
  reverseArguments: reverseArguments,
  compose2: compose2,
  proxy: proxy,
  bound: bound,
  antitype:antitype,
  z:z
};
