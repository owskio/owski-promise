# TOC
   - [Apply](#apply)
     - [Nesting:](#apply-nesting)
   - [Curry](#curry)
   - [Lists](#lists)
   - [Matching](#matching)
   - [Primitives](#primitives)
   - [Promises](#promises)
   - [Util](#util)
<a name=""></a>
 
<a name="apply"></a>
# Apply
reverseArguments: should alter a fn to reverse args input.

```js
reverseArguments(add)('a','b')
.must
.equal('ba');
```

antitype: should make an fn monkey patchable.

```js
var
a = function(thing,num){
  return thing.c + num;
},
b = create({
  c: 6,
  d: antitype(a)
},{}),
z;
b.d(5).must.equal(11);
```

antitype: should work without arguments.

```js
var
a = function(thing){
  return thing.c + 5;
},
b = create({
  c: 6,
  d: antitype(a)
},{
  e:8
}),
z;
b.d().must.equal(11);
```

apply: should not require arguments.

```js
var
partialAdd = add('56'),
applied = apply(partialAdd,this,[]),
applied2 = apply(partialAdd,this)(),
z;
applied.must.equal('56undefined');
applied2.must.equal('56undefined');
```

splat: stuffs remaining args into array.

```js
var
fn = splat(function(a,b,c,stuff){
  return a + b + c + reduceNumbers(add,stuff);
});
fn(1,2,3,4,5,6,7).must.equal(28);
```

<a name="apply-nesting"></a>
## Nesting:
compose2: should compose 2 functions.

```js
compose2(add(1),add(2))(3).must.equal(6);
```

<a name="curry"></a>
# Curry
applyStrict: should work on ordinary functions.

```js
applyStrict(product,null,[2,3,4])
  .must
  .equal(
    product(2,3,4)
  );
```

argumentsToArray: should call callbacks with argument arrays.

```js
arrayFunction(function(args){
  args.must.eql([4,5,6]);
})(4,5,6);
```

argList: should get an array of expected args.

```js
argList(function(x,y,z){
  /* Dont care */
})
.must.eql(
  ['x','y','z']
);
```

partial: should return a partially applied ref.

```js
partial(product,[5,5])(5)
.must.equal(125);
```

curry: should generalize application.

```js
f('a','b','c')
  .must
  .equal(
    f('a')('b')('c')
  );
```

curry: should generalize partial application.

```js
partial(sum,['a','b'])()
  .must
  .equal(
    f('a')('b')()
  );
```

<a name="lists"></a>
# Lists
map should work for arrays.

```js
map(function(i){
  return '<' + i + '>';
},['a','b','c'])
.must.eql(
  ['<a>','<b>','<c>']
);
```

each should work for arrays.

```js
var acc = ''
each(function(a_i,i){
  acc += i + a_i;
},['a','b','c','d']);
acc.must.equal('0a1b2c3d');
```

each should work for objects.

```js
var acc = ''
each(function(i,a_i){
  acc += i + a_i;
},{a:1,b:2,c:3,d:4});
acc.must.equal('1a2b3c4d');
```

eachOwn should work for arrays.

```js
var acc = ''
eachOwn(function(a_i,i){
  acc += a_i + i ;
},['a','b','c','d']);
acc.must.equal('a0b1c2d3');
```

eachOwn should work for objects.

```js
var acc = ''
eachOwn(function(a_i,i){
  acc += i + a_i ;
},{a:1,b:2,c:3,d:4});
acc.must.equal('a1b2c3d4');
```

reduceStrings should reduce string collections without having to supply an initial accumulator value.

```js
reduceStrings(add,['a','b','c','d'])
.must.equal('abcd');
```

reverse should reverse an array.

```js
reverse(['a','b','c','d'])
.must
.eql(['d','c','b','a']);
```

head should work.

```js
head([1,2,3,4]).must.eql(1);
```

rest should work.

```js
rest([1,2,3,4]).must.eql([2,3,4]);
```

<a name="matching"></a>
# Matching
use: pattern matches arguments to object keys.

```js
var a = {b:'2',c:'3'};
use(a,function(c,b){
  (c + b).must.equal('32');
});
```

<a name="primitives"></a>
# Primitives
hasOwnProperty: should work.

```js
var
A = function(){ this.b = 2; },
c = { d: 3 },
z;
A.prototype = c;
e = new A();
hasOwnProperty(e,'b').must.be.true();
```

<a name="promises"></a>
# Promises
Promises should be objects.

```js
Promise().must.be.an.object();
```

Promise should be thenable.

```js
Promise().must.have.property('then');
```

Promises should have observers.

```js
Promise().observers.must.be.an.array();
```

Promises thenned should create new promises.

```js
var
p1 = Promise(),
p2 = p1.then();
p1.must.not.equal(p2);
p1.observers.must.not.equal(p2.observers);
```

should immediately-automatically resolve.

```js
Promise(5).then(function(five){
  five.must.equal(5);
  done();
});
```

should resolve.

```js
var p = Promise();
p.then(function(five){
  five.must.equal(5);
  done();
});
p.resolve(5);
```

should resolve without arguments.

```js
var
p = Promise(),
one = 1;
p.then(function(){
  one.must.equal(1);
  done();
});
p.resolve();
```

should provide a consolidation mechanism.

```js
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
```

should accomodate many listeners.

```js
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
```

resolve: cannot be resolved twice.

```js
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
```

bind: should not assimilate, and force "return Promise(blah);".

```js
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
```

<a name="util"></a>
# Util
extend should work.

```js
extend({},{c:3}).must.have.property('c',3);
```

create: should create objects.

```js
var created = create({a:1},{b:2});
created.must.have.property('a',1);
created.must.have.property('b',2);
```

create: should create blank objects.

```js
var created = create({a:1})();
created.must.have.property('a',1);
```

createLazy should create objects.

```js
var created = createLazy({a:1},{b:2})();
created.must.have.property('a',1);
created.must.have.property('b',2);
```

createLazy must create distinct objects.

```js
var
c = createLazy({a:1},{b:2}),
created1 = c(),
created2 = c();
created1.must.not.equal(created2);
(created1 === created2).must.not.be.true();
```

