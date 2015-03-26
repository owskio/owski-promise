
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
reduceBools   = reduce(false),

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
hasOwnProperty = curry(function(obj,prop){
  var theHasOwnProperty = Object.prototype.hasOwnProperty;
  return apply(theHasOwnProperty,obj,[prop]);
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

extend = arrayFunction(headRest(function(target,sources){
  each(function(source){
    eachOwn(function(v,k){
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

I = function(x){ return x; },
K = function(x){
  return function(){
    return x;
  };
},
undefined = I(),
and = function(a,b){ return a && b; },
all = reduceBools(and),
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
  I : I,
  K : K,
  undefined: undefined,
  rest: rest,
  head: head,
  all: all,
  headRest: headRest,
  initTail: initTail,
  map: map
};
