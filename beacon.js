
var expose = require('owski-expose');
require('owski-curry').mport(function(arrayFunction,curry){
require('owski-object').mport(function(createLazy,create){
require('owski-apply').mport(function(antitype,apply){
require('owski-lists').mport(function(each){

  var
  publish = curry(function(v,b){
    each(function(fn){
      apply(fn,b,[v]);
    },b.observers);
    return b;
  }),
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
    }
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
  });

  expose(module,{
    Beacon: Beacon
  });
});});});});
