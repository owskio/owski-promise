
require('must');
var eyes = require('eyes');
require('./apply').mport(function(compose){
require('./primitives').mport(function(I){
require('./lens').mport(function(lens,acc){
  var farm = {
    cow:{
      milk: 'yumm'
    }
  };
  var json = {
    a: [
      {
        b: 1,
        c: 2,
        d: [
          {
            e:3,
            f:4
          },{
            g: 5
          }
        ]
      },{
        h:6,
        i: { j: 7}
      }
    ]
  };
  describe('lens',function(){
    it('must provide property getting',function(){
      //eyes.inspect(farm);
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk')),
      got = compose(cow,milk)(function(o,l){
        return l(o);
      })(farm,I);
      got.must.be('yumm');
    });
    it('must provide property setting',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(function(o,l){
        l(o,'yuck');
      })(farm,I);
      // eyes.inspect(farm);
    });
    it('must provide property mapping',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(function(o,l){
        //f(f() + 'y!');
        l(o,l(o) + 'y!');
      })(farm,I);
      eyes.inspect(farm);
    });
  });
});});});
