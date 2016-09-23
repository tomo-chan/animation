var Wave1 = (function(){
  var clazz = function(render){
    Bobbing.call(this, render);
    // Start
    this.y       = 200;
    this.range   = 50;
    this.xspeed  = 1;
    this.yspeed  = 0.05;
    // End
  };
  clazz.prototype = Object.create(Bobbing.prototype);
  clazz.prototype.constructor = clazz;
  clazz.prototype.init = function(){
    //Start
    var sprite = new Ball();
    sprite.y = this.y;
    // End
    var self = this;
    sprite.update = function(){
      self.update();
    };
    this.sprite = sprite;
    this.addChild();
  };
  clazz.prototype.update = function(){
    this.sprite.x += this.xspeed;
    this.sprite.y += Math.sin(this.angle) * this.range;
    this.angle    += this.yspeed;
  };
  return clazz;
})();