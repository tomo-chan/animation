var Bouncing = (function(){
  var Bouncing = function(render){
    ChapterBase.call(this, render);
    // Start
    this.x  = this.centerX();
    this.y  = this.centerY();
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    // End
  };
  Bouncing.prototype = Object.create(ChapterBase.prototype);
  Bouncing.prototype.constructor = Bouncing;
  Bouncing.prototype.init = function(){
    //Start
    var sprite = new Ball();
    sprite.x = this.x;
    sprite.y = this.y;
    // End
    var self = this;
    sprite.update = function(){
      self.update();
    }
    this.sprite = sprite;
    this.addChild();
  };
  Bouncing.prototype.update = function(){
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
    var left   = 0;
    var right  = this.width();
    var top    = 0;
    var bottom = this.height();
    if(this.sprite.x + this.sprite.radius > right) {
      this.sprite.x = right - this.sprite.radius;
      this.vx *= -1;
    } else if(this.sprite.x - this.sprite.radius < left) {
      this.sprite.x = left + this.sprite.radius;
      this.vx *= -1;
    } else if(this.sprite.y + this.sprite.radius > bottom) {
      this.sprite.y = bottom - this.sprite.radius;
      this.vy *= -1;
    } else if(this.sprite.y - this.sprite.radius < top) {
      this.sprite.y = top + this.sprite.radius;
      this.vy *= -1;
    }
  };
  return Bouncing;
})();