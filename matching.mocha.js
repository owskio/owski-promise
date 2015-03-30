
var
must = require('must'),
m = require('./matching'),
use = m.use,
z;

describe('Matching',function(){
  it('use: pattern matches arguments to object keys',function(){
    var a = {b:'2',c:'3'};
    use(a,function(c,b){
      (c + b).must.equal('32');
    });
  });
});
