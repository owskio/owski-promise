

require('must');
require('./curry').mport(function(curry,partial,applyStrict,arrayFunction,argList,partial,mportFn){
  product = function(a,b,c){
    return a*b*c;
  },
  describe('Curry',function(){
    it('applyStrict: should work on ordinary functions',function(){
      applyStrict(product,null,[2,3,4])
        .must
        .equal(
          product(2,3,4)
        );
    });
    it('argumentsToArray: should call callbacks with argument arrays',function(){
      arrayFunction(function(args){
        args.must.eql([4,5,6]);
      })(4,5,6);
    });
    it('argList: should get an array of expected args',function(){
      argList(function(x,y,z){
        /* Dont care */
      })
      .must.eql(
        ['x','y','z']
      );
    });
    it('partial: should return a partially applied ref',function(){
      partial(product,[5,5])(5)
      .must.equal(125);
    });

    var
    sum = function(a,b,c){
      return a + b + c;
    },
    f = curry(sum);
    it('curry: should generalize application',function(){
      f('a','b','c')
        .must
        .equal(
          f('a')('b')('c')
        );
    });
    it('curry: should generalize partial application',function(){
      partial(sum,['a','b'])()
        .must
        .equal(
          f('a')('b')()
        );
    });
  });
});
