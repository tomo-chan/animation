var FollowMouse = (function(){
  var FollowMouse = function(render){
    ChapterBase.call(this, render);
    // Start
    this.x       = this.centerX();
    this.y       = this.centerY();
    this.angle   = 0;
    this.speed   = 5;
    // End
  };
  FollowMouse.prototype = Object.create(ChapterBase.prototype);
  FollowMouse.prototype.constructor = FollowMouse;
  FollowMouse.prototype.init = function(){
    //Start
    var sprite = new Arrow();
    sprite.x = this.x;
    sprite.y = this.y;
    // End
    var self = this;
    sprite.update = function(){
      self.update();
    };
    this.sprite = sprite;
    this.addChild();
  };
  FollowMouse.prototype.update = function(){
    var dx    = this.mouseX - this.sprite.x;
    var dy    = this.mouseY - this.sprite.y;
    var angle = Math.atan2(dy, dx);
    var vx    = Math.cos(angle) * this.speed;
    var vy    = Math.sin(angle) * this.speed;
    this.sprite.x        += vx;
    this.sprite.y        += vy;
    this.sprite.rotation  = angle;
  };
  return FollowMouse;
})();