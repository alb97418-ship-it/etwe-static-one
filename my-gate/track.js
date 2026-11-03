/* GateTrack：entry/land/dl 三类事件上报（带页面域名） */
(function(){
  var ENDPOINT = 'https://income-tax.my.id/log_click.php';
  function getCid(){
    try{
      var c = localStorage.getItem('gate_cid');
      if(!c){
        c = (crypto.randomUUID ? crypto.randomUUID() :
          'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(ch){
            var r = Math.random()*16|0, v = ch==='x'?r:(r&0x3|0x8);
            return v.toString(16);
          }));
        localStorage.setItem('gate_cid', c);
      }
      return c;
    }catch(e){ return ''; }
  }
  function send(ev){
    var cid = getCid();
    var click = (ev.type === 'dl') ? 1 : 0;
    var q = 'client_id=' + encodeURIComponent(cid)
          + '&click=' + click
          + '&type=' + encodeURIComponent(ev.type)
          + '&group=' + encodeURIComponent(ev.group || '')
          + '&domain=' + encodeURIComponent(location.hostname)
          + '&t=' + Date.now();
    try{ var img = new Image(); img.src = ENDPOINT + '?' + q; }catch(e){}
  }
  window.GateTrack = {
    getCid: getCid,
    entry: function(d){ send({type:'entry', group:(d&&d.group)||'gate'}); },
    land: function(group){ send({type:'land', group: group}); },
    dl: function(group){ send({type:'dl', group: group}); }
  };
})();
