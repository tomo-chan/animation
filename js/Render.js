var Render = (function(){
  var Render = function(canvas){
    this.canvas                 = canvas;
    this.context                = canvas.getContext('2d');
    this.sprites                = [];
    this.addSpriteQueue         = [];
    this.removeSpriteQueue      = [];
    this.isStarted              = false;
    this.isCanceled             = false;
    this.requestAnimationFrame  = window.requestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  function(callback, time) {
                                    var time = time ? time : 1000/60;
                                    window.setTimeout(callback, time);
                                  };
    this.cancelAnimationFrame   = window.cancelAnimationFrame ||
                                  window.mozcancelAnimationFrame ||
                                  window.webkitcancelAnimationFrame ||
                                  window.oCancelRequestAnimationFrame ||
                                  window.mscancelAnimationFrame ||
                                  function(timerId) {
                                    window.clearimeout(timerId);
                                  };
  };
  Render.prototype.addChild = function(sprite){
    if(! sprite instanceof Sprite) {
      throw new Error('Invalid sprite');
    }
    this.addSpriteQueue.push(sprite);
  };
  Render.prototype.removeChild = function(sprite){
    if(! sprite instanceof Sprite) {
      throw new Error('Invalid sprite');
    }
    this.removeSpriteQueue.push(sprite);
  }
  Render.prototype.start = function(){
    if(!!this.isStarted) { return; }
    this.isCanceled = false;
    var self = this;
    var renderInternal = function(){
      var requestId = self.requestAnimationFrame.call(window, renderInternal);
      self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
      for(var i in self.sprites) {
        var sprite = self.sprites[i];
        try {
          sprite.onEnterFrame();
        } catch(e) {
          console.log(e);
        }
      }
      while(self.removeSpriteQueue.length > 0) {
        var removeSprite = self.removeSpriteQueue.pop();
        self.sprites = self.sprites.filter(function(v, i){
          return !(v === removeSprite);
        });
      }
      while(self.addSpriteQueue.length > 0) {
        var addSprite = self.addSpriteQueue.pop();
        addSprite.context = self.context;
        self.sprites.push(addSprite);
      }
      if(self.isCanceled) {
        self.cancelAnimationFrame.call(window, requestId);
        self.isStarted = false;
      }
    }
    renderInternal();
    this.isStarted = true;
  };
  Render.prototype.stop = function(){
    this.isCanceled = true;
  };
  return Render;
})();