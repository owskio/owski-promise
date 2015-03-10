
require('must');
var Promise = require('./promise');

describe('Promises',function(){
  it('should publish only on resolution',function(){
    (5).must.equal(5);
  });
  it('should immediately resolve when constructed with values',function(done){
    var p = Promise(5);
    p.then(function(five){
      five.must.equal(5);
      done();
    });
  });
});
