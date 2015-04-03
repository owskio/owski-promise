
var
m = require('must'),
Beacon = require('./beacon'),
z;

describe('beacon',function(){
  it('observer: should observe',function(done){
    var
    b = Beacon(5),
    z;
    b.observer(function(v){
      v.must.equal(6);
      done();
    });
    b.set(6);
  });
  
});
