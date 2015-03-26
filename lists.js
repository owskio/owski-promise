
var
c = require('./curry'),
curry = c.curry,
applyStrict = c.applyStrict,
arrayFunction = c.arrayFunction,
p = require('./primitives'),
and = p.and,
hasOwnProperty = p.hasOwnProperty,
a = require('./apply'),
apply = a.apply,

reverse = function(arr){
  var theReverse = Array.prototype.reverse;
  return apply(theReverse,arr,[]);
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
push = curry(function(i,t){
  var thePush = Array.prototype.push;
  apply(thePush,i,[t]);
  return i;
}),

map = curry(function(fn,obj){
  return reduce([],function(acc,obj_i,i){
    return push(acc,fn(obj_i,i));
    //push(a,f(o))
    //pull(f(o),a)
    //pull(f(o))(a)
    //pull.f(o)(a)
    //thunkify(pull.f)(o,a)
  },obj);
}),
each = curry(function(fn,obj){
  return reduce([],function(acc,obj_i,i){
    fn(obj_i,i);
  },obj);
}),
eachOwn = curry(function(fn,obj){
  each(function(obj_i,i){
    if(hasOwnProperty(obj,i)){
      fn(obj_i,i);
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



  z;

  module.exports = {
    reduce: reduce,
    reduceStrings: reduceStrings,
    reduceNumbers: reduceNumbers,
    all: all,
    reverse: reverse,
    each: each,
    eachOwn: eachOwn,
    rest: rest,
    head: head,
    headRest: headRest,
    initTail: initTail,
    map: map,
    z:z
  };
