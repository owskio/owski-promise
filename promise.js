var

u             = require('./util'),
create        = u.create,
each          = u.each,
apply         = u.apply,
all           = u.all,
initTail      = u.initTail,
c             = require('./curry'),
arrayFunction = c.arrayFunction,
p             = require('./primitives'),
obj           = p.obj,
fun           = p.fun,
bul           = p.bul,
arrayWrap     = p.arrayWrap,

isPromise = function(p){
  return obj(p)
    && fun(p.then)
    && bul(p.resolved)
    && obj(p.observers)
    ;
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


allIn = function(promises){
  var
  all = initTail(function(promises,promise){
    return promises.length
    ? all(promises).then(function(results){
        return promise.then(function(v){
          results.push(v);
          return results;
        });
      })
    : promise.then(arrayWrap)
    ;
  });
  return all(promises);
},
all = arrayFunction(function(promises){
  var nu = Promise();
  allIn(promises).then(function(results){
    apply(nu.resolve,nu,results);
  });
  return nu;
}),

z;

Promise.s = {
  allIn: allIn,
  all: all
};

module.exports = Promise;
