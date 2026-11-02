/* GateTrack 上报版：cid + 上报到 income-tax.my.id/log_click.php */
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
    var q = 'client_id=' + encodeURIComponent(cid) + '&click=' + click + '&t=' + Date.now();
    try{
      var img = new Image();
      img.src = ENDPOINT + '?' + q;
    }catch(e){}
  }
  window.GateTrack = {
    getCid: getCid,
    entry: function(d){ send({type:'entry'}); },
    land: function(group){ send({type:'land'}); },
    dl: function(group){ send({type:'dl'}); }
  };
})();
