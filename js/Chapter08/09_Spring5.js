var Spring5 = (function(){
  var Super = Spring4;
  var Spring5 = function(render){
    Super.call(this, render);
    // Startt
    this.gravity = 5;
    // End
  };
  Spring5.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Spring5,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = Spring5.prototype;
  p.update = function(sprite){
    var dx = this.mouseX - sprite.x;
    var dy = this.mouseY - sprite.y;
    var ax = dx * this.spring;
    var ay = dy * this.spring;
    this.vx  += ax;
    this.vy  += ay;
    this.vy  += this.gravity;
    this.vx  *= this.friction;
    this.vy  *= this.friction;
    sprite.x += this.vx;
    sprite.y += this.vy;

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
  return Spring5;
})();