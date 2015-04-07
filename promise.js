

var expose = require('./expose');
require('./object').mport(function(create){
require('./curry').mport(function(curry,arrayFunction,argumentsToArray){
require('./primitives').mport(function(obj,fun,bul,arrayWrap){
require('./apply').mport(function(apply,bound,antitype){
require('./lists').mport(function(initTail,each,all,rest,push){
  var
  isPromise = function(p){
    return obj(p)
      && fun(p.then)
      && bul(p.resolved)
      && obj(p.observers)
      ;
  },
  bind = function(p,fn){
    if (p.resolved) {
      return apply(fn,p,[p.value]);
    } else {
      var
      nu = Promise();
      p.observers.push(function(){
        apply(fn,this,arguments)
        .then(function(v){
          nu.resolve(v);
        });
      });
      return nu;
    }
  },
  resolve = function(p,v){
    if(!p.resolved){
      p.value = v;
      p.resolved = true;
      var args = arguments;
      each(function(fn){
        apply(fn,p,rest(argumentsToArray(args)));
      },p.observers);
    }
    return p;
  },
  then = function(p,fn){
    //var me = this;
    var nu = Promise();
    if (p.resolved) {
      var result = apply(fn,p,[p.value]);
      return isPromise(result)
      ? result
      : nu.resolve(result)
      ;
    } else {
      p.observers.push(function(){
        var result = apply(fn,this,arguments);
        //don't like this branch, not real monad
        if (isPromise(result))  {
          result.then(function(v){
            nu.resolve(v);
          });
        } else {
          nu.resolve(result);
        }
      });
      return nu;
    }
  },
  promisePrototype = {
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
    var
    all = initTail(function(promises,promise){
      //Recursive promise consolidation, yay!
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
  all = arrayFunction(function(promises){
    var nu = Promise();
    allIn(promises).then(function(results){
      //apply(resolve(nu),nu,results);
      apply(nu.resolve,nu,results);
    });
    return nu;
  });

  Promise.s = {
    allIn: allIn,
    all: all
  };

  expose(module,{
    Promise: Promise
  });
});});});});});
