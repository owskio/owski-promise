
require('must');

var
c       = require('./curry'),
curry         = c.curry,
partial       = c.partial,
applyStrict   = c.applyStrict,
arrayFunction = c.arrayFunction,
getArity      = c.getArity,
partial       = c.partial,

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

  var
  sum = function(a,b,c){
    return a + b + c;
  },
  f = curry(sum);

  it('should generalize application',function(){
    f('a','b','c')
      .must
      .equal(
        f('a')('b')('c')
      );
  });

  it('should generalize partial application',function(){
    partial(sum,['a','b'])()
      .must
      .equal(
        f('a')('b')()
      );
  });
});
