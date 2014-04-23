window.capturePageVideo = 
(function(){
var cpVideo = function(captureIntervalMs,maxMs){
  if(captureIntervalMs){}else{captureIntervalMs=500;}
  if(maxMs){}else{maxMs=10000;}
  
  var imagesa=[];
  var running = false;
  var working = false;
  var startcapture = function()
  {
    startMs=(new Date()).getTime();
    running = true;
    if(maxMs>0)
    {
      setTimeout(function(){stopCapture();},maxMs);
    }
  };
  var stopcapture = function()
  {
    if(!running){return;}
    else{running=false;}
    var w = window.open();
    setTimeout(function(){
      w.document.write(window.imagesa.join('\r\n'));
    },1000);
    if(ci){clearInterval(ci);}
  };
  var capture=function()
  {
    if(working){return;}
    if(!running){return;}
    working = true;
    html2canvas(document.body, {
      onrendered: function(canvas) {
      var dt = canvas.toDataURL('image/png');
        var style='style="border:1px solid silver;margin:5px 5px 5px 5px;"';
        imagesa.push('<div '+style+'><img src="'+dt+'"/></div>');
        working = false;
      }
    });
    
  }
  var ci = setInterval(function(){capture();},captureIntervalMs);
  this.captureBegin = startcapture;
  this.captureEnd = stopcapture;
  };
  return new cpVideo();
  })();
  
  
  window.capturePageVideo.captureBegin();
