
var
sourceMap = {
  'util':'util.js'
},
modules = {},
scripts = {},
loadScript = function(url){
  var
  promise = Promise(),
  script = document.createElement('script'),
  head = document.getElementsByTagName('head')[0],
  afterLoad = function(){
    if(
        !this.readyState
      || this.readyState === 'loaded'
      || this.readyState === 'complete'
    ){
      script.onload
        = script.onreadystatechange
        = null;
      promise.resolve();
    }
  };
  script.src
    = url;
  script.onload
    = script.onreadystatechange
    = afterLoad;
  head.appendChild(script);
  return promise;
},
getModulePromise = function(name){
  return modules[name]
    =    modules[name]
    || (
      //Side-effect :-\
      getScriptPromise(sourceMap(name))
      && Promise()
    );
},
getScriptPromise = function(url){
  return scripts[url]
    =    scripts[url]
    ||   loadScript(url);
},

define = function(name,reqs,fn){
  //needs overloading
  var modulePromises = [];
  for (var i in reqs) {
    var
    req = reqs[i],
    modulePromise = getModulePromise(req);
    modulePromises.push(modulePromise);
  }
  var newPromise = Promise.s
    .all(modulePromises)
    .then(fn);
  // var
  // newPromise = chain(
  //   K(reqs),
  //   map(getModulePromise),
  //   Promise.s.all,
  //   dotApply('then',[fn])
  // )(),
  oldPromise = modules[name];
  newPromise.then(function(val){
    oldPromise.resolve(val);
  });
  return modules[name] = newPromise;
},

z;
