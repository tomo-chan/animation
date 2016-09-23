var Friction2 = (function(){
  var Friction2 = function(render){
    Friction1.call(this, render);
    // Start
    this.friction = 0.9;
    // End
  };
  Friction2.prototype = Object.create(Friction1.prototype);
  Friction2.prototype.constructor = Friction2;
  Friction2.prototype.init = function(){
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
  Friction2.prototype.update = function(){
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
  };
  return Friction2;
})();