
var
expose         = require('./expose'),
a             = require('./apply'),
apply         = a.apply,
z;

require('./lists').mport(function(headRest,each,eachOwn){
require('./curry').mport(function(curry,applyStrict,curry3,arrayFunction){
  var
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

  expose(module,{
    extend: extend,
    create: create,
    createLazy: createLazy,
    z:z
  });

});});
