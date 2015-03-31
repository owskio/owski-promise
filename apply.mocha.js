var
m = require('must'),
a = require('./apply'),
compose2 = a.compose2,
reverseArguments = a.reverseArguments,
antitype = a.antitype,
p = require('./primitives'),
add = p.add,
u = require('./util'),
create = u.create,
z;

describe('Apply',function(){
  it('compose2: should compose 2 functions',function(){
    compose2(add(1),add(2))(3).must.equal(6);
  });
  it('reverseArguments: should alter a fn to reverse args input',function(){
    reverseArguments(add)('a','b')
    .must
    .equal('ba');
  });
  it('antitype: should make an fn monkey patchable',function(){
    var
    a = function(thing,num){
      return thing.c + num;
    },
    b = create({
      c: 6,
      d: antitype(a)
    },{}),
    z;
    b.d(5).must.equal(11);
  });
  it('antitype: should work without arguments',function(){
    var
    a = function(thing){      
      return thing.c + 5;
    },
    b = create({
      c: 6,
      d: antitype(a)
    },{
      e:8
    }),
    z;
    b.d().must.equal(11);
  });
});
