
require('must');
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
    // it('must provide property access',function(){
    //   var
    //   cow = lens(acc('cow')),
    //   milk = lens(acc('milk'));
    //   compose(cow,milk)(function(l,o){
    //     console.log(l(o));
    //   })(farm);
    // });
  });
});
