var

u = require('./util'),
createLazy = u.createLazy,
each = u.each,
apply = u.apply,

isPromise = function(obj){
  return typeof(obj) !== 'undefined'
  && typeof(obj.then) === 'function'
  && typeof(obj.resolved) === 'boolean';
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
    me = this,
    z;
    console.log('observers: ',this.observers);
    each(function(i,fn){
      apply(fn,me,args);
    },this.observers);
    return this;
  },
  then: function(fn){
    //var me = this;
    var nu = Promise();
    if (this.resolved) {
      console.log('resolved');
      var result = apply(fn,this,[this.value]);
      if (isPromise(result)) {
        return result;
      } else {
        return nu.resolve(result);
      }
    } else {
      this.observers.push(function(){
        console.log('arguments: ',arguments);
        console.log('fn: ',fn);
        var result = apply(fn,this,arguments);
        console.log('result: ',result);
        if (isPromise(result))  {
          result.then(function(v){
            nu.resolve(v);
          });
        } else {
          console.log('D');
          nu.resolve(result);
        }
      });
      return nu;
    }
  }
},
promiseLeaf = createLazy(promisePrototype,{
  observers: [],
  value:     undefined,
  resolved:  false
}),
Promise = function(v){
  var p = promiseLeaf();
  return v
    ? p.resolve(v)
    : p;
},

z;

Promise.s = {
  all: function(promises){

  }
};

module.exports = Promise;
