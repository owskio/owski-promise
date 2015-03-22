var

u      = require('./util'),
create = u.create,
each   = u.each,
apply  = u.apply,
all    = u.all,
c = require('./curry'),
arrayFunction = c.arrayFunction,

isPromise = function(obj){
  return typeof(obj) !== 'undefined'
  && typeof(obj.then) === 'function'
  && typeof(obj.resolved) === 'boolean'
  && typeof(obj.observers) === 'object';
},
promisePrototype = {
  //We need to maintain a stack initially
  //but then upon resolution, to call to
  //each fn in the stack, but then after
  //to only call observers as they are
  //registered.
  resolve: function(v){
    this.value = v;
    this.resolved = true;
    var
    args = arguments,
    me = this;
    each(function(i,fn){
      apply(fn,me,args);
    },this.observers);
    return this;
  },
  then: function(fn){
    //var me = this;
    var nu = Promise();
    if (this.resolved) {
      var result = apply(fn,this,[this.value]);
      return isPromise(result)
        ? result
        : nu.resolve(result)
        ;
    } else {
      this.observers.push(function(){
        var result = apply(fn,this,arguments);
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
  }
},
promiseHusk = create(promisePrototype),
Promise = function(v){
  return promiseHusk({
    observers: [],
    value:     v,
    resolved:  v ? true : false
  });
},

z;

Promise.s = {
  all: arrayFunction(function(promises){
    var
    nu = Promise(),
    results = [],
    every;
    each(function(i,promise){
      every = promise.then(function(v){
        console.log('i,value: ',i,v);
        results[i] = v;
        console.log('typeof(promises[i+1])',typeof(promises[i+1]));
        return promises[i+1] || Promise('dontCare');
      });
    },promises);
    every.then(function(){
      console.log('results: ',results);
      apply(nu.resolve,nu,results);
    });
    return nu;
  })
  // all: function(promises){
  //   var
  //   nu = Promise(),
  //   resolutions = [],
  //   results = [];
  //   each(function(i,promise){
  //     resolutions[i] = false;
  //     promise.then(function(v){
  //       resolutions[i] = true;
  //       results[i] = v;
  //       if(all(resolutions)){
  //         apply(nu.resolve,nu,results);
  //       }
  //     });
  //   },promises);
  //   return nu;
  // }
};

module.exports = Promise;
