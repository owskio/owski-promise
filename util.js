
define('util',function(){
  return {
    log: function(message){
      if(window.console) console.log(message);
    },
    apply: curry(function(fn,context,args){
      return applyStrict(fn,context,args);
    }),
    curry2: curry(2),
    curry3: curry(3),
    create: curry3(function(p,o){
      var B = function(){};
      B.prototype = p;
      return extend(new B(),o);
    }),
    I: function(x){ return x; },
    K: function(x){
      return function(){
        return x;
      };
    },
    undefined: I()
  };
};
