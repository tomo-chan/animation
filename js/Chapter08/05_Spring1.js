var Spring1 = (function(){
  var Super = ChapterBase;
  var Spring1 = function(render){
    Super.call(this, render);
    // Start
    this.y       = this.centerY();
    this.spring  = 0.05;
    this.targetX = this.centerX();
    this.vx      = 0;
    // End
  };
  Spring1.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Spring1,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = Spring1.prototype;
  p.init = function(){
    //Start
    var sprite = new Ball();
    sprite.y = this.y;
    // End
    var self = this;
    sprite.update = function(){
      self.update(this);
    }
    this.addChild(sprite);
  };
  p.update = function(sprite){
    var dx = this.targetX - sprite.x;
    var ax = dx * this.spring;
    this.vx  += ax;
    sprite.x += this.vx;
  };
  return Spring1;
})();