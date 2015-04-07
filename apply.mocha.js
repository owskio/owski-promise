
require('must');
require('./apply').mport(function(proxy,proxied,compose2,reverseArguments,antitype,apply,splat,chew){
require('./primitives').mport(function(add,multiply,I){
require('./curry').mport(function(curry){
require('./object').mport(function(create){
require('./lists').mport(function(reduceNumbers){

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
    it('apply: should not require arguments',function(){
      var
      partialAdd = add('56'),
      applied = apply(partialAdd,this,[]),
      applied2 = apply(partialAdd,this)(),
      z;
      applied.must.equal('56undefined');
      applied2.must.equal('56undefined');
    });
    it('splat: stuffs remaining args into array',function(){
      var
      fn = splat(function(a,b,c,stuff){
        return a + b + c + reduceNumbers(add,stuff);
      });
      fn(1,2,3,4,5,6,7).must.equal(28);
    });
    it('chew: should preprocess arguments',function(){
      var linear = chew(add,[multiply(2),I]);
      linear(3,4).must.equal(10);
    });
    it('proxy: binds a fn to a context',function(){
      var a = function(c){
        return this.b + c;
      },
      d = proxy(a,{b:'b'});
      d('c').must.equal('bc');
      d.apply({c:'wtf'},['c']).must.equal('bc');
    });
    it('proxied: returns an fn already proxied',function(){
      var a = {
        d: 'd',
        b: function(c){
          return this.d + c;
        }
      },
      e = proxied(a,'b');
      e('c').must.equal('dc');
    });

  });
});});});});});
