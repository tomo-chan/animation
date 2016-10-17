var Fireworks = (function(){
  var Super = ChapterBase;
  var Fireworks = function(render){
    Super.call(this, render);
    // Start
    this.numBalls = 100;
    this.fl       = 250;
    this.vpX      = this.centerX();
    this.vpY      = this.centerY();
    this.gravity  = 0.2;
    this.floor    = 200;
    this.bounce   = -0.6;
    // End
  };
  var Sub = Super.prototype.inherit.call(Super, Fireworks);
  var p = Sub.prototype;
  p.init = function(){
    var self = this;
    //Start
    var update = function(){
      self.update(this);
    };
    for(var i = 0; i < this.numBalls; i++) {
      var ball = new Ball();
      ball.radius = 3;
      ball.color  = '#' + Math.floor((Math.random() * 0xffffff)).toString(16);
      ball.lineWidth = 1;
      ball.ypos = -100;
      ball.vx = Math.random() * 6 - 3;
      ball.vy = Math.random() * 6 - 3;
      ball.vz = Math.random() * 6 - 3;
      ball.update = update;
      this.addChild(ball);
    }
  };
  p.update = function(sprite){
    var radius = sprite.radius;
    sprite.vy += this.gravity;
    sprite.xpos += sprite.vx;
    sprite.ypos += sprite.vy;
    sprite.zpos += sprite.vz;

    if(sprite.ypos > this.floor) {
      sprite.ypos = this.floor;
      sprite.vy *= this.bounce;
    }

    if(sprite.zpos > -this.fl) {
      var scale = this.fl / (this.fl + sprite.zpos);
      sprite.scaleX = scale;
      sprite.scaleY = scale;
      sprite.x = this.vpX + sprite.xpos * scale;
      sprite.y = this.vpY + sprite.ypos * scale;
      sprite.visible = true;
    } else {
      sprite.visible = false;
    }
  };
  return Sub;
})();