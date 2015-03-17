
var
c = require('./curry'),
curry = c.curry,
applyStrict = c.applyStrict,
arrayFunction = c.arrayFunction,

log = function(message){
  if(window.console) console.log(message);
},
apply = curry(applyStrict),

curry2 = curry(2),
curry3 = curry(3),
compose2 = function(fnA,fnB){
  return function(){
    var intermediate = apply(fnB,this,arguments);
    return apply(fnA,this,[intermediate]);
  };
},
reverse = function(arr){
  var theReverse = Array.prototype.reverse;
  return apply(theReverse,arr,[]);
},
reverseArguments = function(fn){
  return arrayFunction(function(args){
    return apply(fn,this,reverse(args));
  });
},
reduce = curry(function(acc,fn,list){
  for(var i in list){
    acc = fn(acc,list[i],i);
  }
  return acc;
}),
reduceStrings = reduce(''),
reduceNumbers = reduce(0),
// chew = function(target,adapters){
//   return arrayFunction(function(args){
//     for(var i in args){
//       args[i] = (adapters[i] || I)(args[i]);
//     }
//     return apply(target,this,args);
//   });
// },
//each = chew(reduceStrings,[reverseArguments,I]),
hasOwnProperty = curry(function(obj,prop){
  var theHasOwnProperty = Object.prototype.hasOwnProperty;
  return apply(theHasOwnProperty,obj,[prop]);
}),
each = curry(function(fn,obj){
  reduceStrings(reverseArguments(fn),obj);
}),
eachOwn = curry(function(fn,obj){
  each(function(i,obj_i){
    if(hasOwnProperty(obj,i)){
      fn(i,obj_i);
    }
  },obj);
}),
head = function(arr){
  return arr[0];
},
tail = function(arr){
  arr.shift();
  return arr;
},
extend = arrayFunction(function(args){
  var
  target = head(args),
  sources = tail(args);
  each(function(i,source){
    eachOwn(function(k,v){
      target[k] = v;
    },source);
  },sources);
  return target;
}),
createLazy = curry3(function(p,o){
  //create(prot,Cons)
  var B = function(){};
  B.prototype = p;
  return extend(new B(),o);
}),

I = function(x){ return x; },
K = function(x){
  return function(){
    return x;
  };
},
undefined = I(),
z;

module.exports = {
  log: log,
  apply: apply,
  curry2: curry2,
  curry3: curry3,
  extend: extend,
  createLazy: createLazy,
  reduce: reduce,
  reduceStrings: reduceStrings,
  reduceNumbers: reduceNumbers,
  reverseArguments: reverseArguments,
  compose2: compose2,
  reverse: reverse,
  each: each,
  eachOwn: eachOwn,
  hasOwnProperty: hasOwnProperty,
  I : I,
  K : K,
  undefined: undefined,
  tail: tail,
  head: head
};
