var Friction1 = (function(){
  var Friction1 = function(render){
    ChapterBase.call(this, render);
    // Start
    this.x        = this.centerX();
    this.y        = this.centerY();
    this.vx       = Math.random() * 10 - 5;
    this.vy       = Math.random() * 10 - 5;
    this.friction = 0.1;
    // End
  };
  Friction1.prototype = Object.create(ChapterBase.prototype);
  Friction1.prototype.constructor = Friction1;
  Friction1.prototype.init = function(){
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
  Friction1.prototype.update = function(){
    var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    var angle = Math.atan2(this.vy, this.vx);
    if(speed > this.friction) {
      speed -= this.friction;
    } else {
      speed = 0;
    }
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
  };
  return Friction1;
})();