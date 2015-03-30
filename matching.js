

var
a = require('./apply'),
apply = a.apply,
l = require('./lists'),
each = l.each,
map = l.map,
p = require('./primitives'),
attributesFor = p.attributesFor,

use = function(obj,fn){
  var
  argList = fn
    .toString()
    .split('{')[0]
    .split(')')[0]
    .split('(')[1]
    .split(',');
  args = map(attributesFor(obj),argList);
  return apply(fn,this,args);
},
z;
module.exports = {
  use:use,
  z:z
};
