
var
sourceMap = {
  'util':'util.js'
},
modules ={},
loadModule = function(name){
  var head = document.head
    ||document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = sourceMap[src];
  head.appendChild(script);
},
getPromise = function(name){
  return modules[name]
    =  modules[name]
    || loadModule(name);
},
define = function(name,reqs,fn){
  //needs overloading
  return modules[name] = chain(
    K(reqs),
    map(dot(modules)),
    Promise.s.all,
    dotApply('then',[fn])
  )();
};
