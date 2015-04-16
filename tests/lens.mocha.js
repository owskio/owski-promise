
require('must');
var eyes = require('eyes');
require('owski-apply').mport(function(compose){
require('owski-primitives').mport(function(I){
require('../lens').mport(function(lens,acc,get,set,map,filter){
  var farm = {
    cow:{
      milk: 'yumm',
      stomachs:[
        { contents: 'grass' },
        { contents: 'digested grass' },
        { contents: 'bullshit' },
      ]
    }
  };
  describe('lens',function(){
    it('must provide property getting',function(){
      //eyes.inspect(farm);
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk')),
      got = compose(cow,milk)(function(o,l){
        return l(o);
      })(farm);
      got.must.be('yumm');
    });
    it('must provide property setting',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(function(o,l){
        l(o,'yuck');
      })(farm);
      // eyes.inspect(farm);
    });
    it('must provide property mapping',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(function(o,l){
        //f(f() + 'y!');
        l(o,l(o) + 'y!');
      })(farm);
      eyes.inspect(farm);
    });
    it('must provide simple mapping',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(map(function(x){
        return x + 'alicious!';
      }))(farm);
      eyes.inspect(farm);
    });
    // it('must provide filtering',function(){
    //   var
    //   cow = lens(acc('cow')),
    //   milk = lens(acc('milk')),
    //   stomachs = lens(acc('stomachs')),
    //   where = compose(lens,filter);
    //   compose(cow,milk,stomachs,where(function(s){
    //     return s.contents === 'grass';
    //   }))(map(function(x){
    //     return x + 'alicious!';
    //   }))(farm);
    //   eyes.inspect(farm);
    // });
  });
});});});
