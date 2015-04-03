
var

c = require('./curry'),
curry = c.curry,
applyStrict = c.applyStrict,
arrayFunction = c.arrayFunction,
argList = c.argList,

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
  return arrayFunction(function(args){
    args.unshift(this);
    return apply(fn,this,args);
  });
},
splat = function(fn){
  var
  breakPoint = argList(fn).length - 1;
  return arrayFunction(function(arr){
    var
    beginning = arr.slice(0,breakPoint),
    ending = arr.slice(breakPoint,arr.length),
    next = beginning.concat([ending]);
    return apply(fn,this,next);
  });
},
chew = function(target,adapters){
  return arrayFunction(function(args){
    for(var i in args){
      args[i] = (adapters[i] || I)(args[i]);
    }
    return apply(target,this,args);
  });
},
z;

module.exports = {
  apply: apply,
  reverseArguments: reverseArguments,
  compose2: compose2,
  proxy: proxy,
  bound: bound,
  antitype:antitype,
  splat: splat,
  chew:chew,
  z:z
};
