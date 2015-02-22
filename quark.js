
var

I = function(x){ return x; },
K = function(x){
  return function(){
    return x;
  };
},
undefined = I(),
applyStrict = function(fn,context,argumentArray){
  return typeof(fn) === 'function'
  ?  fn.apply(context,argumentArray)
  :  Function.prototype.apply.apply(fn,[context,[argumentArray]]);
},
argumentsToArray = function(argumentsObject){
  var theSlice = Array.prototype.slice;
  return applyStrict(slice,argumentsObject,[0]);
},
arrayFunction = function(fn){
  return function(){
    var argumentArray = argumentsToArray(arguments);
    return applyStrict(fn,this,[argumentArray]);
  };
},
getArity = function(fn){
  var args = fn
    .toString()
    .split('{')[0]
    .replace(' ','')
    .match(/[^,\(\)\s]+/g);
  args.unshift();
  return args;
},
curry = function(arity,fn){
  if(typeof(fn) === 'undefined'){
    return function(){};
  }
  arity = arity || getArity(fn);
  return function () {
    var len = arguments.length;
    return len >= arity || !len
    ? applyStrict(fn,this, arguments)
    : curry(
      arity - arguments.length,
      applyStrict(
        curry,
        this,
        [fn].concat(argumentsToArray(arguments))
      )
    );
  };
},
apply = curry(function(fn,context,args){
  return applyStrict(fn,context,args);
}),
curry3 = curry(3),
create = curry3(function(p,o){
  var B = function(){};
  B.prototype = p;
  return extend(new B(),o);
}),

z;
