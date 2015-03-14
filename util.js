
var
c = require('./curry'),
curry = c.curry,
appltStrict = c.applyStrict,

log = function(message){
  if(window.console) console.log(message);
},
apply = curry(applyStrict),

curry2 = curry(2),
curry3 = curry(3),

reduce = curry(function(acc,fn,list){
  for(var i in list){
    acc = fn(acc,i,list[i]);
  }
  return acc;
}),
reduceStrings = reduce(''),
reduceNumbers = reduce(0),

each = curry(function(fn,obj){
  reduceStrings(function(acc,i,obj_i){
    fn(i,obj_i);
  },obj);
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
}),
create = curry3(function(p,o){
  create(prot,Cons)
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
  create: create,
  I : I,
  K : K,
  undefined: undefined
};
