var EasingToMouse = (function(){
  var EasingToMouse = function(render){
    ChapterBase.call(this, render);
    // Start
    this.easing  = 0.05;
    // End
  };
  EasingToMouse.prototype = Object.create(ChapterBase.prototype, {
    constructor: {
      value: EasingToMouse,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  EasingToMouse.prototype.constructor = EasingToMouse;
  EasingToMouse.prototype.init = function(){
    //Start
    var sprite = new Ball();
    // End
    var self = this;
    sprite.update = function(){
      self.update(this);
    }
    this.addChild(sprite);
  };
  EasingToMouse.prototype.update = function(sprite){
    var vx    = (this.mouseX - sprite.x) * this.easing;
    var vy    = (this.mouseY - sprite.y) * this.easing;
    sprite.x += vx;
    sprite.y += vy;
  };
  return EasingToMouse;
})();