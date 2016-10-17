var Line3D2 = (function(){
  var Super = ChapterBase;
  var Line3D2 = function(render){
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
  var Sub = Super.prototype.inherit.call(Super, Line3D2);
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
      ball.fl = this.fl;
      ball.setVanishingPoint(this.vpX, this.vpY);
      ball.update = update;
      this.addChild(ball);
      this.balls.push(ball);
    }
  };
  p.update = function(sprite){
    sprite.rotateX(this.angleX);
    sprite.rotateY(this.angleY);
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
  return Sub;
})();