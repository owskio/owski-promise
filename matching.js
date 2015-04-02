

var
c             = require('./curry'),
argList       = c.argList,
curry         = c.curry,
a             = require('./apply'),
apply         = a.apply,
l             = require('./lists'),
each          = l.each,
map           = l.map,
p             = require('./primitives'),
attributesFor = p.attributesFor,

use = function(obj,fn){
  var
  desired = argList(fn);
  args = map(attributesFor(obj),desired);
  return apply(fn,this,args);
},
z;
module.exports = {
  use:use,
  z:z
};
