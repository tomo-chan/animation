var Bouncing2 = (function(){
  var Bouncing2 = function(render){
    Bouncing.call(this, render);
    // Start
    this.bounce = -0.7;
    // End
  };
  Bouncing2.prototype = Object.create(Bouncing.prototype);
  Bouncing2.prototype.constructor = Bouncing2;
  Bouncing2.prototype.init = function(){
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
  Bouncing2.prototype.update = function(){
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
    var left   = 0;
    var right  = this.width();
    var top    = 0;
    var bottom = this.height();
    if(this.sprite.x + this.sprite.radius > right) {
      this.sprite.x = right - this.sprite.radius;
      this.vx *= this.bounce;
    } else if(this.sprite.x - this.sprite.radius < left) {
      this.sprite.x = left + this.sprite.radius;
      this.vx *= this.bounce;
    } else if(this.sprite.y + this.sprite.radius > bottom) {
      this.sprite.y = bottom - this.sprite.radius;
      this.vy *= this.bounce;
    } else if(this.sprite.y - this.sprite.radius < top) {
      this.sprite.y = top + this.sprite.radius;
      this.vy *= this.bounce;
    }
  };
  return Bouncing2;
})();