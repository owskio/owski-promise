

require('must');
require('./primitives').mport(function(hasOwnProperty){  
  describe('Primitives',function(){
    it('hasOwnProperty: should work',function(){
      var
      A = function(){ this.b = 2; },
      c = { d: 3 },
      z;
      A.prototype = c;
      e = new A();
      hasOwnProperty(e,'b').must.be.true();
    });
  });
});
