var Removal = (function(){
  var Removal = function(render){
    ChapterBase.call(this, render);
    // Start
    this.x     = this.centerX();
    this.y     = this.centerY();
    this.count = 20;
    // End
  };
  Removal.prototype = Object.create(ChapterBase.prototype);
  Removal.prototype.constructor = Removal;
  Removal.prototype.init = function(){
    //Start
    for(var i = 0; i < this.count; i++) {
      var sprite = new Ball();
      sprite.x  = Math.random() * this.x;
      sprite.y  = Math.random() * this.y;
      sprite.vx = Math.random() * 2 - 1;
      sprite.vy = Math.random() * 2 - 1;
      // End
      var self = this;
      sprite.update = function(){
        self.update(this);
      }
      this.addChild(sprite);
    }
  };
  Removal.prototype.update = function(sprite){
    sprite.x += sprite.vx;
    sprite.y += sprite.vy;
    if( sprite.x - sprite.radius > this.width() ||
        sprite.x + sprite.radius < 0 ||
        sprite.y - sprite.radius > this.height() ||
        sprite.y + sprite.radius < 0) {
      this.removeChild(sprite);
    }
  };
  return Removal;
})();