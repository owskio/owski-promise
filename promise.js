

var expose = require('owski-expose');
require('./object').mport(function(create){
require('owski-curry').mport(function(curry,arrayFunction,argumentsToArray){
require('./primitives').mport(function(obj,fun,bul,arrayWrap,undefined){
require('./apply').mport(function(apply,bound,antitype,rest,initTail){
require('./lists').mport(function(each,all,push){
  var
  isPromise = function(p){
    return obj(p)
      && fun(p.then)
      && bul(p.resolved)
      && obj(p.observers)
      ;
  },
  bind = curry(function(fn,p){
    if (p.resolved) {
      return apply(fn,p,[p.value]);
    } else {
      var
      nu = Promise();
      p.observers.push(function(){
        apply(fn,this,arguments)
        .then(function(v){
          nu.resolveWith(v);
        });
      });
      return nu;
    }
  }),
  resolveWith = curry(function(v,p){
    if(!p.resolved){
      p.value = v;
      p.resolved = true;
      each(function(fn){
        apply(fn,p,[v]);
      },p.observers);
    }
    return p;
  }),
  resolve = resolveWith(undefined),
  then = curry(function(fn,p){
    //var me = this;
    var nu = Promise();
    if (p.resolved) {
      var result = apply(fn,p,[p.value]);
      return isPromise(result)
      ? result
      : nu.resolveWith(result)
      ;
    } else {
      p.observers.push(function(){
        var result = apply(fn,this,arguments);
        //don't like this branch, not real monad
        if (isPromise(result))  {
          result.then(function(v){
            nu.resolveWith(v);
          });
        } else {
          nu.resolveWith(result);
        }
      });
      return nu;
    }
  }),
  promisePrototype = {
    resolveWith: antitype(resolveWith),
    resolve: antitype(resolve),
    bind: antitype(bind),
    then: antitype(then)
  },
  Promise = function(v){
    return create(promisePrototype,{
      observers: [],
      value:     v,
      resolved:  v ? true : false
    });
  },

  allIn = function(promises){
    var //Recursive promise consolidation, yay!
    all = initTail(function(promises,promise){
      return promises.length
      ? all(promises).then(function(results){
          return promise
            .then(push(results));
        })
      : promise.then(arrayWrap)
      ;
    });
    return all(promises);
  },
  all = arrayFunction(allIn);

  Promise.s = {
    allIn: allIn,
    all: all
  };

  expose(module,{
    Promise: Promise,
    then: then,
    resolveWith: resolveWith,
    resolve:resolve,
    isPromise:isPromise
  });
});});});});});
