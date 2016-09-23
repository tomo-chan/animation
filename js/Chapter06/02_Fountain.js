var Fountain = (function(){
  var Fountain = function(render){
    ChapterBase.call(this, render);
    // Start
    this.x       = this.centerX();
    this.y       = this.height();
    this.count   = 20;
    this.gravity = 0.5;
    // End
  };
  Fountain.prototype = Object.create(ChapterBase.prototype);
  Fountain.prototype.constructor = Fountain;
  Fountain.prototype.init = function(){
    //Start
    for(var i = 0; i < this.count; i++) {
      var sprite = new Ball();
      sprite.x  = this.x;
      sprite.y  = this.y;
      sprite.vx = Math.random() * 2 - 1;
      sprite.vy = Math.random() * -10 - 10;
      // End
      var self = this;
      sprite.update = function(){
        self.update(this);
      };
      this.addChild(sprite);
    }
  };
  Fountain.prototype.update = function(sprite){
    sprite.vy += this.gravity;
    sprite.x  += sprite.vx;
    sprite.y  += sprite.vy;
    if( sprite.x - sprite.radius > this.width() ||
        sprite.x + sprite.radius < 0 ||
        sprite.y - sprite.radius > this.height() ||
        sprite.y + sprite.radius < 0) {
      sprite.x  = this.centerX();
      sprite.y  = this.height();
      sprite.vx = Math.random() * 2 - 1;
      sprite.vy = Math.random() * -10 - 10;
    }
  };
  return Fountain;
})();