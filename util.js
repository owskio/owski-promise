
var
c             = require('./curry'),
curry         = c.curry,
applyStrict   = c.applyStrict,
curry3        = c.curry3,
arrayFunction = c.arrayFunction,
l             = require('./lists'),
headRest      = l.headRest,
each          = l.each,
eachOwn       = l.eachOwn,
a             = require('./apply'),
apply         = a.apply,
//a = require(),
// chew = function(target,adapters){
//   return arrayFunction(function(args){
//     for(var i in args){
//       args[i] = (adapters[i] || I)(args[i]);
//     }
//     return apply(target,this,args);
//   });
// },
//each = chew(reduceStrings,[reverseArguments,I]),


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


z;

module.exports = {
  extend: extend,
  create: create,
  createLazy: createLazy,
  z:z
};
