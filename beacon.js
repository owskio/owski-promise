
var

u = require('./util'),
createLazy = u.createLazy,

publish = function(b,v){
  each(function(fn){
    apply(fn,b,[v]);
  },b.observers);
},
Beacon = createLazy({
  publish: antitype(publish)
},{
  observers: [],
  value: undefined,
}),
z;

module.exports = Beacon;
