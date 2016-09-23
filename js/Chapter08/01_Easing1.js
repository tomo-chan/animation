var Easing1 = (function(){
  var Super = ChapterBase;
  var Easing1 = function(render){
    Super.call(this, render);
    // Start
    this.easing  = 0.05;
    this.targetX = this.centerX();
    this.targetY = this.centerY();
    // End
  };
  Easing1.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Easing1,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = Easing1.prototype;
  p.init = function(){
    //Start
    var sprite = new Ball();
    // End
    var self = this;
    sprite.update = function(){
      self.update(this);
    };
    this.addChild(sprite);
  };
  p.update = function(sprite){
    var vx    = (this.targetX - sprite.x) * this.easing;
    var vy    = (this.targetY - sprite.y) * this.easing;
    sprite.x += vx;
    sprite.y += vy;
  };
  return Easing1;
})();