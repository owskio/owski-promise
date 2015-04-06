
var
argList = require('./argList'),
xport = require('./xport'),

applyStrict = function(fn,context,argumentArray){
  return typeof(fn) === 'function'
  ?  fn.apply(context,argumentArray)
  :  Function.prototype.apply.apply(fn,[context,[argumentArray]]);
},
argumentsToArray = function(argumentsObject){
  var theSlice = Array.prototype.slice;
  return applyStrict(theSlice,argumentsObject,[0]);
},
arrayFunction = function(fn){
  return function(){
    var argumentArray = argumentsToArray(arguments);
    return applyStrict(fn,this,[argumentArray]);
  };
},
partial = function(fn,argumentArray){
  return arrayFunction(function(args){
    return applyStrict(
      fn,this,argumentArray.concat(args)
    );
  });
},
curry = function(arity,fn){
  if(typeof(fn) === 'undefined'){
    if(typeof(arity) === 'function'){
      fn = arity;
      arity = argList(fn).length;
    } else if(typeof(arity) === 'number'){
      return function(fn){
        return curry(arity,fn);
      };
    }
  }
  return arrayFunction(function (args) {
    var len = args.length;
    return len >= arity || !len
    ? applyStrict(fn,this,args)
    : curry(
        arity - len,
        partial(fn,args)
      );
  });
},
curry2 = curry(2),
curry3 = curry(3),
z;

xport(module,{
  applyStrict: applyStrict,
  argumentsToArray: argumentsToArray,
  arrayFunction: arrayFunction,
  argList: argList,
  partial: partial,
  curry: curry,
  curry2: curry2,
  curry3: curry3,
  z:z
});
