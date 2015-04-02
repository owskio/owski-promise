
var

u = require('./util'),
createLazy = u.createLazy,

publish = function(b,v){
  each(function(fn){
    apply(fn,b,[v]);
  },b.observers);
},
Beaconify = create({
  publish: antitype(publish),
  set: function(v){
    this.value = v;
    this.publish(v);
  },
  observer: function(fn){
    this.observers.push(fn);
  },
  sets: function(b){
    return this.observer(function(v){
      return b.set(v);
    });
  },
  map: function(fn){
    var b = Beacon();
    this.observer(function(v){
      return b.set(fn(v));
    });
    return b;
  },
  z:z
}),
Beacon = function(v){
  return Beaconify({
    observers: [],
    value: v,
  });
},
Beaconsify = create(create(
  Array.prototype,{

  }
)),
Beacons = arrayFunction(function(beaconList){
  return Beaconsify({

  }).concat(beaconList);
}),
z;

module.exports = Beacon;
