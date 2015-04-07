
var
expose = require('./expose'),
z;

require('./apply').mport(function(apply){
require('./primitives').mport(function(and,hasOwnProperty){
require('./curry').mport(function(curry,applyStrict,arrayFunction){
  var
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
    });

  expose(module,{
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
    push: push
  });

});});});
