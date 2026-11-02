(function(){
  var u='body.html?t='+Date.now();
  try{var c=localStorage.getItem('gate_cid');if(c)u+='&cid='+encodeURIComponent(c);}catch(e){}
  fetch(u,{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error(r.status);return r.text();}).then(function(h){document.open();document.write(h);document.close();}).catch(function(e){document.body.innerHTML='<pre>'+e+'</pre>';});
})();