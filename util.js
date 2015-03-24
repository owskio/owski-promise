
var
c = require('./curry'),
curry = c.curry,
applyStrict = c.applyStrict,
arrayFunction = c.arrayFunction,
curry2 = c.curry2,
curry3 = c.curry3,

p = require('./primitives'),
and = p.and,

log = function(message){
  if(window.console) console.log(message);
},
apply = curry(applyStrict),

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
reduceBools   = reduce(false),
all = reduceBools(and),

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
rest = function(arr){
  arr.shift();
  return arr;
},
headRest = curry(function(fn,args){
  return apply(fn,this,[
    head(args),
    rest(args)
  ]);
}),
init = function(arr){
  arr.pop();
  return arr;
},
tail = function(arr){
  return arr[arr.length-1];
},
initTail = curry(function(fn,args){
  var t = tail(args);
  return apply(fn,this,[
    init(args),
    t
  ]);
}),

extend = arrayFunction(headRest(function(target,sources){
  each(function(i,source){
    eachOwn(function(k,v){
      target[k] = v;
    },source);
  },sources);
  return target;
})),
create = curry(function(p,o){
  var B = function(){};
  B.prototype = p;
  return extend(new B(),o);
}),
createLazy = curry3(create),

z;

module.exports = {
  log: log,
  apply: apply,
  curry2: curry2,
  curry3: curry3,
  extend: extend,
  create: create,
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

  rest: rest,
  head: head,
  all: all,
  headRest: headRest,
  initTail: initTail
};
