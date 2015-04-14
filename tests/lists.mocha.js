
require('must');
require('../primitives').mport(function(add){
require('../lists').mport(function(each,map,head,eachOwn,rest,reduceStrings,reverse){
  describe('Lists',function(){
    it('map should work for arrays',function(){
      map(function(i){
        return '<' + i + '>';
      },['a','b','c'])
      .must.eql(
        ['<a>','<b>','<c>']
      );
    });
    it('each should work for arrays',function(){
      var acc = ''
      each(function(a_i,i){
        acc += i + a_i;
      },['a','b','c','d']);
      acc.must.equal('0a1b2c3d');
    });
    it('each should work for objects',function(){
      var acc = ''
      each(function(i,a_i){
        acc += i + a_i;
      },{a:1,b:2,c:3,d:4});
      acc.must.equal('1a2b3c4d');
    });
    it('eachOwn should work for arrays',function(){
      var acc = ''
      eachOwn(function(a_i,i){
        acc += a_i + i ;
      },['a','b','c','d']);
      acc.must.equal('a0b1c2d3');
    });
    it('eachOwn should work for objects',function(){
      var acc = ''
      eachOwn(function(a_i,i){
        acc += i + a_i ;
      },{a:1,b:2,c:3,d:4});
      acc.must.equal('a1b2c3d4');
    });
    it('reduceStrings should reduce string '
    + 'collections without having to supply '
    + 'an initial accumulator value',function(){
      reduceStrings(add,['a','b','c','d'])
      .must.equal('abcd');
    });
    it('reverse should reverse an array',function(){
      reverse(['a','b','c','d'])
      .must
      .eql(['d','c','b','a']);
    });
  });
});});
