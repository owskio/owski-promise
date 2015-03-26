
require('must');

var
c = require('./curry'),
curry = c.curry,
u = require('./util'),
reduceStrings = u.reduceStrings,
each = u.each,
eachOwn = u.eachOwn,
apply = u.apply,
reverse = u.reverse,
createLazy = u.createLazy,
rest = u.rest,
head = u.head,
extend = u.extend,
map = u.map,
p = require('./primitives'),
hasOwnProperty = p.hasOwnProperty,
add = p.add,
a = require('./apply'),
compose2 = a.compose2,
reverseArguments = a.reverseArguments,
z;

describe('Util',function(){

  it('hasOwnProperty should work',function(){
    var
    A = function(){ this.b = 2; },
    c = { d: 3 },
    z;
    A.prototype = c;
    e = new A();
    hasOwnProperty(e,'b').must.be.true();
  });

  it('reverseArguments should alter a fn to reverse args input',function(){
    reverseArguments(add)('a','b')
      .must
      .equal('ba');
  });
  it('compose2 should compose 2 functions',function(){
    compose2(add(1),add(2))(3).must.equal(6);
  });

  it('extend should work',function(){
    extend({},{c:3}).must.have.property('c',3);
  });
  it('createLazy should create objects',function(){
    var created = createLazy({a:1},{b:2})();
    created.must.have.property('a',1);
    created.must.have.property('b',2);
  });
  it('createLazy should create objects',function(){
    var created = createLazy({a:1},{b:2})();
    created.must.have.property('a',1);
    created.must.have.property('b',2);
  });
  it('createLazy must create distinct objects',function(){
    var
    c = createLazy({a:1},{b:2}),
    created1 = c(),
    created2 = c();

    created1.must.not.equal(created2);
    (created1 === created2).must.not.be.true();
  });
});
