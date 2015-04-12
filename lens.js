
var expose = require('./expose');
require('./primitives').mport(function(I){
require('./curry').mport(function(curry,curry2,curry3){
  var
  acc = curry2(function(k,o,v){
    return o[k] = v || o[k];
  }),
  lens = curry3(function(nextAcc,nextLens,o,prevAcc) {
    // if(typeof o === 'undefined' && typeof prevAcc === 'object'){
    //   o = prevAcc; prevAcc = I;
    // }
    return nextLens(prevAcc(o),nextAcc);
  });
  expose(module,{
    lens: lens,
    acc: acc
  });
});});
