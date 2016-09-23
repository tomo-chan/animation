var ChapterBase = (function(){
  var ChapterBase = function(render){
    if(!(this instanceof ChapterBase)) {
      throw new Error('Please use new!');
    }
    this.render  = render;
    this.sprite  = undefined;
    this.sprites = [];
    this.mouseX  = 0;
    this.mouseY  = 0;

    var self = this;
    function getMouseInfo(evt) {
      var rect    = evt.target.getBoundingClientRect();
      self.mouseX = Math.round(evt.clientX - rect.left);
      self.mouseY = Math.round(evt.clientY - rect.top);
    }

    render.canvas.addEventListener('mousedown', function(evt){
      getMouseInfo(evt);
      self.onMouseDown(evt);
    }, false);
    render.canvas.addEventListener('mousemove', function(evt){
      getMouseInfo(evt);
      self.onMouseMove(evt);
    }, false);
    render.canvas.addEventListener('mouseup', function(evt){
      getMouseInfo(evt);
      self.onMouseUp(evt);
    }, false);
    document.addEventListener('keydown', function(evt){
      self.onKeyDown(evt);
    }, false);
    document.addEventListener('keyup', function(evt){
      self.onKeyUp(evt);
    }, false);
  };
  var p = ChapterBase.prototype;
  p.width = function(){
    return this.render.canvas.width;
  };
  p.height = function(){
    return this.render.canvas.height;
  };
  p.centerX = function() {
    return this.render.canvas.width / 2;
  };
  p.centerY = function() {
    return this.render.canvas.height / 2;
  };
  p.addChild = function(sprite) {
    if(!sprite) {
      sprite = this.sprite;
    }
    if(sprite) {
      this.render.addChild(sprite);
      this.sprites.push(sprite);
    }
  };
  p.removeChild = function(sprite) {
    if(!sprite) {
      sprite = this.sprite;
    }
    if(sprite) {
      this.render.removeChild(sprite);
      this.sprites = this.sprites.filter(function(v, i){
        return !(v === sprite);
      });
    }
  };
  p.destory = function() {
    for(var i = this.sprites.length - 1; i <= 0; i--) {
      this.removeChild(this.sprites[i]);
    }
  };
  p.onMouseDown = function(evt){
    evt.preventDefault();
    for(var i in this.sprites) {
      var sprite = this.sprites[i];
      if(this.isInRange(sprite)) {
        sprite.fire(evt.type, evt);
      }
    }
  };
  p.onMouseMove = function(evt){
    evt.preventDefault();
    for(var i in this.sprites) {
      var sprite = this.sprites[i];
      if(this.isInRange(sprite)) {
        sprite.fire(evt.type, evt);
      }
    }
  };
  p.onMouseUp = function(evt){
    evt.preventDefault();
    for(var i in this.sprites) {
      var sprite = this.sprites[i];
      if(this.isInRange(sprite)) {
        sprite.fire(evt.type, evt);
      }
    }
  };
  p.onKeyDown = function(evt){};
  p.onKeyUp = function(evt){};
  p.isInRange = function(sprite) {
    var bounds = sprite.getBounds();
    if(bounds.x < this.mouseX && this.mouseX < (bounds.x + bounds.width) &&
       bounds.y < this.mouseY && this.mouseY < (bounds.y + bounds.height)) {
      return true;
    } else {
      return false;
    }
  }
  return ChapterBase;
})();