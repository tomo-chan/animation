var Line3D1 = (function(){
  var Super = ChapterBase;
  var Line3D1 = function(render){
    Super.call(this, render);
    // Start
    this.numBalls = 50;
    this.balls    = [];
    this.fl       = 250;
    this.vpX      = this.centerX();
    this.vpY      = this.centerY();
    this.angleX   = 0.0;
    this.angleY   = 0.0;
    // End
  };
  var Sub = Super.prototype.inherit.call(Super, Line3D1);
  var p = Sub.prototype;
  p.init = function(){
    var self = this;
    //Start
    var update = function(){
      self.update(this);
    };
    for(var i = 0; i < this.numBalls; i++) {
      var ball = new Ball();
      ball.radius = 5;
      ball.color = '#000000';
      ball.xpos = Math.random() * 200 - 100;
      ball.ypos = Math.random() * 200 - 100;
      ball.zpos = Math.random() * 200 - 100;
      ball.update = update;
      this.addChild(ball);
      this.balls.push(ball);
    }
  };
  p.update = function(sprite){
    this.rotateX(sprite);
    this.rotateY(sprite);
    this.doPerspective(sprite);
  };
  p.before = function(){
    this.angleX = (this.mouseY - this.vpY) * 0.001;
    this.angleY = (this.mouseX - this.vpX) * 0.001;
  };
  p.after = function(){
    this.render.context.save();
    this.render.context.translate(0, 0);
    this.render.context.rotate(0);
    this.render.context.scale(1, 1);
    this.render.context.beginPath();
    this.render.context.moveTo(this.balls[0].x, this.balls[0].y);
    for (var i = 1; i < this.numBalls; i++) {
      this.render.context.lineTo(this.balls[i].x, this.balls[i].y);
    }
    this.render.context.stroke();
    this.render.context.restore();
  };
  p.rotateX = function(sprite) {
    var cosX = Math.cos(this.angleX);
    var sinX = Math.sin(this.angleX);

    var y1 = sprite.ypos * cosX - sprite.zpos * sinX;
    var z1 = sprite.zpos * cosX + sprite.ypos * sinX;

    sprite.ypos = y1;
    sprite.zpos = z1;
  };
  p.rotateY = function(sprite) {
    var cosY = Math.cos(this.angleY);
    var sinY = Math.sin(this.angleY);

    var x1 = sprite.xpos * cosY - sprite.zpos * sinY;
    var z1 = sprite.zpos * cosY + sprite.xpos * sinY;

    sprite.xpos = x1;
    sprite.zpos = z1;
  };
  p.doPerspective = function(sprite) {
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