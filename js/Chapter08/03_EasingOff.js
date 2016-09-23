var EasingOff = (function(){
  var EasingOff = function(render){
    Easing1.call(this, render);
    // Start
    // End
  };
  EasingOff.prototype = Object.create(Easing1.prototype, {
    constructor: {
      value: EasingOff,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  EasingOff.prototype.constructor = EasingOff;
  EasingOff.prototype.update = function(sprite){
    var dx = (this.targetX - sprite.x);
    if(Math.abs(dx) < 1) {
      sprite.x = this.targetX;
      sprite.update = undefined;
    } else {
      var vx = dx * this.easing;
      sprite.x += vx;
  }
  };
  return EasingOff;
})();