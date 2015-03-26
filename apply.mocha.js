var
m = require('must'),
a = require('./apply'),
compose2 = a.compose2,
reverseArguments = a.reverseArguments,
p = require('./primitives'),
add = p.add,
z;

describe('Apply',function(){
  it('compose2 should compose 2 functions',function(){
    compose2(add(1),add(2))(3).must.equal(6);
  });
  it('reverseArguments should alter a fn to reverse args input',function(){
    reverseArguments(add)('a','b')
    .must
    .equal('ba');
  });
});
