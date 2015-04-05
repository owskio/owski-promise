
var

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
argList = function(fn){
  //a more naive implementation,
  //but  much simpler
  // return fn
  //   .toString()
  //   .split('{')[0]
  //   .split(')')[0]
  //   .split('(')[1]
  //   .split(',');
  var args = fn
    .toString()
    .split('{')[0]
    .replace(' ','')
    .match(/[^,\(\)\s]+/g);
  args.shift();
  return args;
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
mport = curry(function(obj,fn){
  var results = [],
  desired = argList(fn);
  for(var i in desired){
    results.push(obj[desired[i]]);
  }
  return fn.apply(this,results);
}),
xports = {
  applyStrict: applyStrict,
  argumentsToArray: argumentsToArray,
  arrayFunction: arrayFunction,
  argList: argList,
  partial: partial,
  curry: curry,
  curry2: curry2,
  curry3: curry3,
  mportFn: mport,
  z:z
},
z;
xports.mport = mport(xports);
module.exports = xports;
