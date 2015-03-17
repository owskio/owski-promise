
require('must');
var Promise = require('./promise');

describe('Promises',function(){
  it('Promise should be an object',function(){
    Promise().must.be.an.object();
  });
  it('Promise should be an object',function(){
    Promise().must.be.an.object();
  });

  // it('Promise should be thenable',function(){
  //   Promise().must.have.property('then');
  // });
  // it('should immediately-automatically resolve',function(done){
  //   Promise(5).then(function(five){
  //     five.must.equal(5);
  //     done();
  //   });
  // });
  it('should defer execution for unresolved values',function(done){
    var p = Promise();
    p.then(function(five){
      five.must.equal(5);
      done();
    return 8;
    });
    p.resolve(5);
  });
  // it('should provide a consolidation mechanism',function(){
  //   var
  //   p1 = Promise(),
  //   p2 = Promise();
  //
  //   Promise.s.all(p1,p2)
  //   .then(function(v1,v2){
  //     (v1 + v2).must.equal(9);
  //     done();
  //   });
  //   p1.resolve(5);
  //   p2.resolve(4);
  // });
  // it('should accomodate many listeners',function(done){
  //   var
  //   p = Promise(),
  //   p1 = p.then(function(five){
  //     return five;
  //   }),
  //   p2 = p.then(function(five){
  //     return five;
  //   });
  //   Promise.s.all(p1,p2)
  //   .then(function(v1,v2){
  //     v1.must.equal(5);
  //     v2.must.equal(5);
  //     done();
  //   });
  //   p.resolve(5);
  // });
});
