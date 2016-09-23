var Spring2 = (function(){
  var Super = Spring1;
  var Spring2 = function(render){
    Super.call(this, render);
    // Start
    this.friction = 0.95;
    // End
  };
  Spring2.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Spring2,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = Spring2.prototype;
  p.constructor = Spring1;
  p.update = function(sprite){
    var dx = this.targetX - sprite.x;
    var ax = dx * this.spring;
    this.vx  += ax;
    this.vx  *= this.friction;
    sprite.x += this.vx;
  };
  return Spring2;
})();