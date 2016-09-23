var DoubleSpring = (function(){
  var Super = ChapterBase;
  var DoubleSpring = function(render){
    Super.call(this, render);
    // Start
    this.spring        = 0.02;
    this.friction      = 0.95;
    this.springLength  = 100;
    this.ball0         = undefined;
    this.ball1         = undefined;
    this.ball0Dragging = false;
    this.ball1Dragging = false;
    // End
  };
  DoubleSpring.prototype = Object.create(Super.prototype, {
    constructor: {
      value: DoubleSpring,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = DoubleSpring.prototype;
  p.init = function(){
    var self = this;
    //Start
    this.ball0 = new Ball();
    this.ball0.radius = 20;
    this.ball0.x = Math.random() * this.width();
    this.ball0.y = Math.random() * this.height();
    this.ball0.addEventListener('mousedown', function(evt) {
      self.onPress(evt, self.ball0);
    });
    this.ball0.addEventListener('mouseup', function(evt) {
      self.onRelease(evt, self.ball0);
    });
    this.addChild(this.ball0);

    this.ball1 = new Ball();
    this.ball1.radius = 20;
    this.ball1.x = Math.random() * this.width();
    this.ball1.y = Math.random() * this.height();
    this.ball1.addEventListener('mousedown', function(evt) {
      self.onPress(evt, self.ball1);
    });
    this.ball1.addEventListener('mouseup', function(evt) {
      self.onRelease(evt, self.ball1);
    });
    this.addChild(this.ball1);
    
    var sprite = new Sprite();
    sprite.update = function(){
      self.update(this);
    }
    this.addChild(sprite);
  };
  p.update = function(sprite){
    if(!this.ball0Dragging) {
      this.springTo(this.ball0, this.ball1);
    }
    if(!this.ball1Dragging) {
      this.springTo(this.ball1, this.ball0);
    }
    sprite.context.beginPath();
    sprite.context.moveTo(this.ball0.x, this.ball0.y);
    sprite.context.lineTo(this.ball1.x, this.ball1.y);
    sprite.context.stroke();
  };
  p.springTo = function(ballA, ballB) {
    var dx      = ballB.x - ballA.x;
    var dy      = ballB.y - ballA.y;
    var angle   = Math.atan2(dy, dx);
    var targetX = ballB.x - Math.cos(angle) * this.springLength;
    var targetY = ballB.y - Math.sin(angle) * this.springLength;
    ballA.vx += (targetX - ballA.x) * this.spring;
    ballA.vy += (targetY - ballA.y) * this.spring;
    ballA.vx *= this.friction;
    ballA.vy *= this.friction;
    ballA.x  += ballA.vx;
    ballA.y  += ballA.vy;
  };
  p.onPress = function(evt, sprite) {
    if(sprite === this.ball0) {
      this.ball0Dragging = true;
    }
    if(sprite === this.ball1) {
      this.ball1Dragging = true;
    }
  }
  p.onRelease = function(evt, sprite) {
    if(sprite === this.ball0) {
      this.ball0Dragging = false;
    }
    if(sprite === this.ball1) {
      this.ball1Dragging = false;
    }
  }
  return DoubleSpring;
})();