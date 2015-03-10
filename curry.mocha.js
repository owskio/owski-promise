
require('must');

var
haskell = require('./curry'),
curry = haskell.curry,
partial = haskell.partial,
applyStrict = haskell.applyStrict,
arrayFunction = haskell.arrayFunction,
getArity = haskell.getArity,
partial = haskell.partial,

product = function(a,b,c){
  return a*b*c;
};

describe('applyStrict',function(){
  it('should work on ordinary functions',function(){
    applyStrict(product,null,[2,3,4])
      .must
      .equal(
        product(2,3,4)
      );
  });
});
describe('argumentsToArray',function(){
  it('should call callbacks with argument arrays',function(){
    arrayFunction(function(args){
      args.must.eql([4,5,6]);
    })(4,5,6);
  });
});
describe('getArity',function(){
  it('should get an array of expected args',function(){
    getArity(function(x,y,z){
      /* Dont care */
    })
    .must.eql(
      ['x','y','z']
    );
  });
});
describe('partial',function(){
  it('should return a partially applied ref',function(){
    partial(product,[5,5])(5)
    .must.equal(125);
  });
});

describe('curry',function(){

  var f = curry(function(a,b,c){
    return a + b + c;
  });

  it('should generalize application',function(){
    f('a','b','c')
      .must
      .equal(
        f('a')('b')('c')
      );
  });

  it('should generalize partial application',function(){
    partial(f,['a','b'])()
      .must
      .equal(
        f('a')('b')()
      );
  });
});
