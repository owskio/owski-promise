
var
expose = require('./expose'),
z;
require('./curry').mport(function(curry,curry2){
  var
  acc = curry2(function(k,o,v){
    return o[k] = v || o[k];
  }),
  lens = curry(function(how,next,o,prev) {
    return next(prev(o),how);
  }),
  farm = lens(acc('farm')),
  cow = lens(acc('cow')),
  farmCow = compose(farm,cow)
  farm = function(l,o){
    return l(o)
  },
  fn(next,prev,o){
    return next(acc('farm'),prev(o));
  }


  milk = lens(function(l,o){ return l(o).milk; }),
  set = curry(function(val,o){
    l(o)
  }),

  compose(farm,cow,milk,set('eww'))
  ({farm:{cow:{milk:'mmm'}}})
  === {farm:{cow:{milk:'eww'}}}

  lens = curry(function(fn,l,o){
    return fn((l||I),(o));
  }),

a1 = {a:1}
l(a)(function(v){ return v+3;})(a1)
//{a:4}

  ;

  expose(module,{
    lens: lens
  });
});
