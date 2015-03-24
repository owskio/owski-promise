
require('must');
var Promise = require('./promise');

describe('Promises',function(){
  it('Promises should be objects',function(){
    Promise().must.be.an.object();
  });
  it('Promise should be thenable',function(){
    Promise().must.have.property('then');
  });
  it('Promises should have observers',function(){
    Promise().observers.must.be.an.array();
  });
  it('Promises thenned should create new promises',function(){
    var
    p1 = Promise(),
    p2 = p1.then();
    p1.must.not.equal(p2);
    p1.observers.must.not.equal(p2.observers);
  });

  it('should immediately-automatically resolve',function(done){
    Promise(5).then(function(five){
      five.must.equal(5);
      done();
    });
  });

  it('should defer execution for unresolved values',function(done){
    var p = Promise();
    p.then(function(five){
      five.must.equal(5);
      done();
      return 8;
    });
    p.resolve(5);
  });
  it('should provide a consolidation mechanism',function(done){
    var
    p1 = Promise(),
    p2 = Promise(),
    p3 = Promise(),
    p4 = Promise();

    Promise.s.all(p1,p2,p3,p4)
    .then(function(v1,v2,v3,v4){
      (v1 + v2 + v3 + v4).must.equal('5432');
      done();
    });
    p1.resolve('5');
    p2.resolve('4');
    p3.resolve('3');
    p4.resolve('2');
  });
  it('should accomodate many listeners',function(done){
    var
    p = Promise(),
    p1 = p.then(function(five){
      return five;
    }),
    p2 = p.then(function(five){
      return five;
    });
    Promise.s.all(p1,p2)
    .then(function(v1,v2){
      (v1 + v2).must.equal(10);
      done();
    });
    p.resolve(5);
  });
});
