
var expose = require('owski-expose');
require('owski-primitives').mport(function(I){
require('owski-lists').mport(function(eachOwn){
require('owski-curry').mport(function(curry,curry2,curry3){
  var
  lens = curry3(function(nextAcc,nextLens,o,prevAcc) {
    prevAcc = prevAcc || I;
    return nextLens(prevAcc(o),nextAcc);
  }),
  acc = curry2(function(k,o,v){
    return o[k] = v || o[k];
  }),
  // filter = curry2(function(fn,o,v){
  //   eachOwn(function(v,k){
  //     if(fn(v,k)){
  //       acc(k,o,v);
  //     }
  //   },o);
  // }),
  get = function(o,l){
    return l(o);
  },
  set = curry(function(value,o,l){
    l(o,value);
  }),
  map = curry(function(fn,o,l){
    l(o,fn(l(o)));
  });
  expose(module,{
    lens: lens,
    acc: acc,
    get:get,
    set:set,
    map: map
  });
});});});
