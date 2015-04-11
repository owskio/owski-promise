
var expose = require('./expose');
require('./primitives').mport(function(I){
require('./curry').mport(function(curry,curry2,curry3){
  var
  acc = curry2(function(k,o,v){
    return o[k] = v || o[k];
  }),
  lens = curry3(function(nextAcc,nextLens,prevAcc,o) {
    if(typeof o === 'undefined' && typeof prevAcc === 'object'){
      o = prevAcc; prevAcc = I;
    }
    return nextLens(nextAcc,prevAcc(o));
  });
  expose(module,{
    lens: lens,
    acc: acc
  });
});});
