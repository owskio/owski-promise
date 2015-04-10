
var
expose = require('./expose'),
z;
require('./curry').mport(function(curry,curry2){
  var
  acc = curry2(function(k,o,v){
    return o[k] = v || o[k];
  }),
  compose(farm,cow,milk,set('eww'))
  ({farm:{cow:{milk:'mmm'}}})
  === {farm:{cow:{milk:'eww'}}}

  lens = curry(function(fn,l,o){
    return fn((l||I),(o));
  }),
  farm = lens(function(l,o){ return l(o).farm; }),
  cow = lens(function(l,o){ return l(o).cow; }),
  milk = lens(function(l,o){ return l(o).milk; }),
  set = curry(function(val,o){
    l(o)
  }),
a1 = {a:1}
l(a)(function(v){ return v+3;})(a1)
//{a:4}


lens = curry(function(how,next,prev,o) {
  return next(how,prev(o));
}),


  example = function(){

  },
  wheels = unit('wheels')

  attr = curry(function(attrName,obj,fn){
    return fn(obj[attrName]);
  }),

  ;

  expose(module,{
    lens: lens
  });
});
