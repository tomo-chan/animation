var FollowMouse2 = (function(){
  var FollowMouse2 = function(render){
    ChapterBase.call(this, render);
    // Start
    this.vx    = 0;
    this.vy    = 0;
    this.force = 0.5;
    // End
  };
  FollowMouse2.prototype = Object.create(ChapterBase.prototype);
  FollowMouse2.prototype.constructor = FollowMouse2;
  FollowMouse2.prototype.init = function(){
    //Start
    var sprite = new Arrow();
    // End
    var self = this;
    sprite.update = function(){
      self.update();
    };
    this.sprite = sprite;
    this.addChild();
  };
  FollowMouse2.prototype.update = function(){
    var dx    = this.mouseX - this.sprite.x;
    var dy    = this.mouseY - this.sprite.y;
    var angle = Math.atan2(dy, dx);
    var ax    = Math.cos(angle) * this.force;
    var ay    = Math.sin(angle) * this.force;
    this.vx              += ax;
    this.vy              += ay;
    this.sprite.x        += this.vx;
    this.sprite.y        += this.vy;
    this.sprite.rotation  = angle;
  };
  return FollowMouse2;
})();