
require('must');

var
u = require('./util'),
reduceStrings = u.reduceStrings,
add = function(a,b){ return a + b; },
z;

describe('Util',function(){

  it('should provide a simple reduction',function(){
    reduceStrings(add,['a','b','c','d'])
      .must.equal('abcd');
  });
});
