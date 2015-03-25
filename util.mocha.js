
require('must');

var
c = require('./curry'),
curry = c.curry,
u = require('./util'),
reduceStrings = u.reduceStrings,
each = u.each,
hasOwnProperty = u.hasOwnProperty,
eachOwn = u.eachOwn,
reverseArguments = u.reverseArguments,
apply = u.apply,
compose2 = u.compose2,
reverse = u.reverse,
createLazy = u.createLazy,
rest = u.rest,
head = u.head,
extend = u.extend,
p = require('./primitives'),
add = p.add,
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
  it('each should work for arrays',function(){
    var acc = ''
    each(function(i,a_i){
      acc += i + a_i;
    },['a','b','c','d']);
    acc.must.equal('0a1b2c3d');
  });
  it('each should work for objects',function(){
    var acc = ''
    each(function(i,a_i){
      acc += i + a_i;
    },{a:1,b:2,c:3,d:4});
    acc.must.equal('a1b2c3d4');
  });
  it('eachOwn should work for arrays',function(){
    var acc = ''
    eachOwn(function(i,a_i){
      acc += i + a_i;
    },['a','b','c','d']);
    acc.must.equal('0a1b2c3d');
  });
  it('eachOwn should work for objects',function(){
    var acc = ''
    eachOwn(function(i,a_i){
      acc += i + a_i;
    },{a:1,b:2,c:3,d:4});
    acc.must.equal('a1b2c3d4');
  });
  it('reduceStrings should reduce string '
  + 'collections without having to supply '
  + 'an initial accumulator value',function(){
    reduceStrings(add,['a','b','c','d'])
      .must.equal('abcd');
  });
  it('reverseArguments should alter a fn to reverse args input',function(){
    reverseArguments(add)('a','b')
      .must
      .equal('ba');
  });
  it('compose2 should compose 2 functions',function(){
    compose2(add(1),add(2))(3).must.equal(6);
  });
  it('should provide an array reversal fn',function(){
    reverse(['a','b','c','d'])
      .must
      .eql(['d','c','b','a']);
  });
  it('should provide a simple iteration mechanism',function(){
    var acc = '';
    each(function(index,val){
      acc += index + val;
    },['a','b','c','d']);
    acc.must.equal('0a1b2c3d');
  });
  it('head should work',function(){
    head([1,2,3,4]).must.eql(1);
  });
  it('rest should work',function(){
    rest([1,2,3,4]).must.eql([2,3,4]);
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
