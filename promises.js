var

undefined = I(),
create = curry(function(p,o,_){
  var B = function(){};
  B.prototype = p;
  return extend(new B(),o);
}),
promiseLeaf = create(promisePrototype,{
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
    each(function(i,fn){
      apply(fn,me,args); 
    },this.observers);
    return this;
  },
  then: function(fn){
    var nu = Promise();
    if (this.resolved) {
      var result = apply(fn,this,[this.value]);
      if (result instanceof Promise) {
        return result;
      } else {
        return nu.resolve(result);
      }
    } else {
      this.observers.push(function(){
        var result = apply(fn,this,arguments);
        if (result instanceof Promise)  {
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

need = (function(){
  var modules = {};
  return function(module){

  };
})(),

z;
