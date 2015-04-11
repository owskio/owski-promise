

var expose = require('./expose');
require('./curry').mport(function(curry){

  var
  type = curry(function(typeName,x){
    return typeof(x) === typeName;
  }),
  obj           = type('object'),
  fun           = type('function'),
  bul           = type('boolean'),
  arrayWrap     = function(x){ return [x];},
  add = curry(function(a,b){ return a + b; }),
  multiply = curry(function(a,b){ return a* b; }),
  I = function(x){ return x; },
  K = function(x){
    return function(){
      return x;
    };
  },
  undefined = I(),
  and = function(a,b){ return a && b; },
  neu = function(){ return {}; },

  //DOM primitives
  log = function(message){
    if(window.console) console.log(message);
  },

  hasOwnProperty = curry(function(obj,prop){
    return obj.hasOwnProperty(prop);
  }),
  attribute = curry(function(name,obj){
    return obj[name];
  }),
  attributesFor = curry(function(obj,name){
    return obj[name];
  }),
  thiss = function(){
    return this;
  };

  expose(module,{
    obj           : obj,
    fun           : fun,
    bul           : bul,
    add: add,
    multiply: multiply,
    arrayWrap     : arrayWrap,
    I : I,
    K : K,
    undefined: undefined,
    and:and,
    log: log,
    hasOwnProperty:hasOwnProperty,
    attribute: attribute,
    attributesFor: attributesFor,
    thiss:thiss
  });
});
