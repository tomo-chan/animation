var Render = (function(){
  var Render = function(canvas){
    this.canvas                 = canvas;
    this.context                = canvas.getContext('2d');
    this.sprites                = [];
    this.addSpriteQueue         = [];
    this.removeSpriteQueue      = [];
    this.contents               = [];
    this.addContentQueue        = [];
    this.removeContentQueue     = [];
    this.isStarted              = false;
    this.isCanceled             = false;
    this.requestAnimationFrame  = window.requestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  function(callback, time) {
                                    var t = time ? time : 1000/60;
                                    window.setTimeout(callback, t);
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
  };
  Render.prototype.addContent = function(content) {
    if(! content instanceof ChapterBase) {
      throw new Error('Invalid content');
    }
    this.addContentQueue.push(content);
  };
  Render.prototype.removeContent = function(content) {
    if(! content instanceof ChapterBase) {
      throw new Error('Invalid content');
    }
    this.removeContentQueue.push(content);
  };
  Render.prototype.start = function(){
    if(!!this.isStarted) { return; }
    this.isCanceled = false;
    var self = this;
    var renderInternal = function(){
      var requestId = self.requestAnimationFrame.call(window, renderInternal);
      self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);

      for(var i1 in self.contents) {
        var content1 = self.contents[i1];
        content1.before();
      }
      var sprite;
      for(var i in self.sprites) {
        sprite = self.sprites[i];
        try {
          sprite.updateLayout();
        } catch(e) {
          console.log(e);
        }
      }
      for(var j in self.sprites) {
        sprite = self.sprites[j];
        try {
          sprite.onEnterFrame();
        } catch(e) {
          console.log(e);
        }
      }
      for(var i2 in self.contents) {
        var content2 = self.contents[i2];
        content2.after();
      }
      self.sprites.sort(function(a, b) { return (a.depth && b.depth) ? (b.depth() - a.depth()) : (b.zpos - a.zpos); });

      var removeSprite;
      var removeFilter = function(v, i){
          return (v !== removeSprite);
        };
      while(self.removeSpriteQueue.length > 0) {
        removeSprite = self.removeSpriteQueue.pop();
        self.sprites = self.sprites.filter(fremoveFilter);
      }
      while(self.addSpriteQueue.length > 0) {
        var addSprite = self.addSpriteQueue.pop();
        addSprite.context = self.context;
        self.sprites.push(addSprite);
      }
      var removeContent;
      var removeContentFilter = function(v, i){
          return (v !== removeContent);
        };
      while(self.removeContentQueue.length > 0) {
        removeContent = self.removeContentQueue.pop();
        self.contents = self.contents.filter(removeContentFilter);
      }
      while(self.addContentQueue.length > 0) {
        var addContent = self.addContentQueue.pop();
        self.contents.push(addContent);
      }
      if(self.isCanceled) {
        self.cancelAnimationFrame.call(window, requestId);
        self.isStarted = false;
      }
    };
    renderInternal();
    this.isStarted = true;
  };
  Render.prototype.stop = function(){
    this.isCanceled = true;
  };
  return Render;
})();