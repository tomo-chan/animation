var MultiSpring = (function(){
  var Super = ChapterBase;
  var MultiSpring = function(render){
    Super.call(this, render);
    // Start
    this.ball       = undefined;
    this.handles    = [];
    this.spring     = 0.02;
    this.friction   = 0.3;
    this.numHandles = 3;
    // End
  };
  MultiSpring.prototype = Object.create(Super.prototype, {
    constructor: {
      value: MultiSpring,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = MultiSpring.prototype;
  p.init = function(){
    //Start
    this.ball = new Ball();
    this.ball.radius = 20;
    var self = this;
    this.ball.update = function(){
      self.update(this);
    }
    this.addChild(this.ball);
    for(var i = 0; i < this.numHandles; i++) {
      var sprite = new Ball();
      sprite.radius = 10;
      sprite.color  = '#0000ff';
      sprite.x      = Math.random() * this.width();
      sprite.y      = Math.random() * this.height();
      this.handles.push(sprite);
      this.addChild(sprite);
    }
  };
  p.update = function(sprite){
    for(var i = 0; i < this.numHandles; i++) {
      var handle = this.handles[i];
      var dx     = handle.x - sprite.x;
      var dy     = handle.y - sprite.y;
      sprite.vx += dx * this.spring;
      sprite.vy += dy * this.spring;
    }
    sprite.vx *= this.friction;
    sprite.vy *= this.friction;
    sprite.x  += sprite.vx;
    sprite.y  += sprite.vy;

    for(var j = 0; j < this.numHandles; j++) {
      var handle = this.handles[j];
      sprite.context.save();
      sprite.context.translate(0, 0);
      sprite.context.rotate(0);
      sprite.context.scale(1, 1);
      sprite.context.beginPath();
      sprite.context.moveTo(0, 0);
      sprite.context.lineTo(handle.x - sprite.x, handle.y - sprite.y);
      sprite.context.stroke();
      sprite.context.restore();
    }
  };
  return MultiSpring;
})();