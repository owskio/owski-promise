

var
a = require('./apply'),
apply = a.apply,
l = require('./lists'),
each = l.each,
map = l.map,

use = function(obj,fn){
  var
  argList = fn
    .toString()
    .split('{')[0]
    .split(')')[0]
    .split('(')[1]
    .split(',');
  args = map(function(a){ return obj[a]; },argList);
  return apply(fn,this,args);
},
z;
module.exports = {
  use:use,
  z:z
};
