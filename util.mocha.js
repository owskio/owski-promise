
var
m          = require('must'),
u          = require('./util'),
createLazy = u.createLazy,
extend     = u.extend,
z;

describe('Util',function(){
  it('extend should work',function(){
    extend({},{c:3}).must.have.property('c',3);
  });
  it('createLazy should create objects',function(){
    var created = createLazy({a:1},{b:2})();
    created.must.have.property('a',1);
    created.must.have.property('b',2);
  });
  it('createLazy must create distinct objects',function(){
    var
    c = createLazy({a:1},{b:2}),
    created1 = c(),
    created2 = c();

    created1.must.not.equal(created2);
    (created1 === created2).must.not.be.true();
  });
});
