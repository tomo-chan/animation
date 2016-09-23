var OffsetSpring = (function(){
  var Super = ChapterBase;
  var OffsetSpring = function(render){
    Super.call(this, render);
    // Start
    this.vx           = 0;
    this.vy           = 0;
    this.spring       = 0.02;
    this.friction     = 0.95;
    this.springLength = 100;
    // End
  };
  OffsetSpring.prototype = Object.create(Super.prototype, {
    constructor: {
      value: OffsetSpring,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = OffsetSpring.prototype;
  p.init = function(){
    //Start
    this.sprite = new Ball();
    var self = this;
    this.sprite.update = function(){
      self.update(this);
    }
    this.addChild(this.sprite);
  };
  p.update = function(sprite){
    var dx      = sprite.x - this.mouseX;
    var dy      = sprite.y - this.mouseY;
    var angle   = Math.atan2(dy, dx);
    var targetX = this.mouseX + Math.cos(angle) * this.springLength;
    var targetY = this.mouseY + Math.sin(angle) * this.springLength;
    this.vx   += (targetX - sprite.x) * this.spring;
    this.vy   += (targetY - sprite.y) * this.spring;
    this.vx   *= this.friction;
    this.vy   *= this.friction;
    sprite.x  += this.vx;
    sprite.y  += this.vy;

    sprite.context.save();
    sprite.context.translate(0, 0);
    sprite.context.rotate(0);
    sprite.context.scale(1, 1);
    sprite.context.beginPath();
    sprite.context.moveTo(0, 0);
    sprite.context.lineTo(this.mouseX - sprite.x, this.mouseY - sprite.y);
    sprite.context.stroke();
    sprite.context.restore();
  };
  return OffsetSpring;
})();