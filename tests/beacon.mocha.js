
require('must');
require('../beacon').mport(function(Beacon){

  describe('beacon',function(){
    it('observer: should observe',function(done){
      var b = Beacon(5);
      b.observer(function(v){
        v.must.equal(6);
        done();
      });
      b.set(6);
    });
  });
});
