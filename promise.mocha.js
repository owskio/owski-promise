

require('must');
require('./promise').mport(function(Promise){

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

    it('should resolve',function(done){
      var p = Promise();
      p.then(function(five){
        five.must.equal(5);
        done();
      });
      p.resolve(5);
    });
    it('should resolve without arguments',function(done){
      var
      p = Promise(),
      one = 1;
      p.then(function(){
        one.must.equal(1);
        done();
      });
      p.resolve();
    });
    it('should provide a consolidation mechanism',function(done){
      var
      p1 = Promise(),
      p2 = Promise();

      Promise.s.all(p1,p2)
      .then(function(v1,v2){
        (v1 + v2).must.equal(9);
        done();
      });
      p1.resolve(5);
      p2.resolve(4);
    });
    it('should accomodate many listeners',function(done){
      var
      p = Promise(),
      p1 = p.then(function(five){
        return five + '6';
      }),
      p2 = p.then(function(five){
        return five + '7';
      }),
      p3 = p.then(function(five){
        return five + '8';
      }),
      p4 = p.then(function(five){
        return five + '9';
      }),
      z;
      Promise.s.all(p1,p2,p3,p4)
      .then(function(v1,v2,v3,v4){
        v1.must.equal('56');
        v2.must.equal('57');
        v3.must.equal('58');
        v4.must.equal('59');
        done();
      });
      p.resolve(5);
    });
    it('resolve: cannot be resolved twice',function(done){
      var
      p = Promise(),
      pause = Promise(),
      acc = 0;
      p.then(function(){
        acc = acc + 1;
        return pause;
      })
      .then(function(){
        done();
      });
      p.resolve();
      p.resolve(4);
      p.resolve('asdf');
      acc.must.equal(1);
      pause.resolve();
    });
    it('bind: should not assimilate, and force "return Promise(blah);"',function(done){
      var p = Promise();
      p.bind(function(five){
        five.must.equal(5);
        return Promise(6 + five);
      }).bind(function(eleven){
        eleven.must.equal(11);
        done();
        return Promise('dont care');
      });
      p.resolve(5);
    });
  });
});
