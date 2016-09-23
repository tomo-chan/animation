var Spring3 = (function(){
  var Super = Spring2;
  var Spring3 = function(render){
    Super.call(this, render);
    // Startt
    this.y       = 0;
    this.targetY = this.centerY();
    this.vy      = 0;
    // End
  };
  Spring3.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Spring3,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = Spring3.prototype;
  p.update = function(sprite){
    Super.prototype.update.call(this, sprite);
    var dy = this.targetY - sprite.y;
    var ay = dy * this.spring;
    this.vy  += ay;
    this.vy  *= this.friction;
    sprite.y += this.vy;
  };
  return Spring3;
})();