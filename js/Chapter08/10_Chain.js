var Chain = (function(){
  var Super = Spring5;
  var Chain = function(render){
    Super.call(this, render);
    // Start
    this.spring   = 0.02;
    this.friction = 0.9;
    this.gravity  = 2;
    this.ball0 = undefined;
    this.ball1 = undefined;
    this.ball2 = undefined;
    // End
  };
  Chain.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Chain,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = Chain.prototype;
  p.init = function(){
    //Start
    this.ball0 = new Ball();
    this.ball1 = new Ball();
    this.ball2 = new Ball();
    var self = this;
    this.ball0.update = function(){
      self.moveBall(self.ball0, self.mouseX, self.mouseY);
    };
    this.ball1.update = function(){
      self.moveBall(self.ball1, self.ball0.x, self.ball0.y);
    };
    this.ball2.update = function(){
      self.moveBall(self.ball2, self.ball1.x, self.ball1.y);
    };
    this.addChild(this.ball0);
    this.addChild(this.ball1);
    this.addChild(this.ball2);

    var sprite = new Sprite();
    sprite.update = function(){
      self.update(this);
    };
    this.addChild(sprite);
  };
  p.update = function(sprite){
    sprite.context.save();
    sprite.context.translate(0, 0);
    sprite.context.rotate(0);
    sprite.context.scale(1, 1);
    sprite.context.beginPath();
    sprite.context.moveTo(this.mouseX, this.mouseY);
    sprite.context.lineTo(this.ball0.x, this.ball0.y);
    sprite.context.lineTo(this.ball1.x, this.ball1.y);
    sprite.context.lineTo(this.ball2.x, this.ball2.y);
    sprite.context.stroke();
    sprite.context.restore();
  };
  p.moveBall = function(ball, targetX, targetY) {
    ball.vx += (targetX - ball.x) * this.spring;
    ball.vy += (targetY - ball.y) * this.spring;
    ball.vy += this.gravity;
    ball.vx *= this.friction;
    ball.vy *= this.friction;
    ball.x  += ball.vx;
    ball.y  += ball.vy;
  };
  return Chain;
})();