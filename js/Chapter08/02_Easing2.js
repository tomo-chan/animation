var Easing2 = (function(){
  var Easing2 = function(render){
    Easing1.call(this, render);
    // Start
    this.isDrag  = false;
    var self = this;
    this.onCanvasMouseDown = function(evt) {
      self.isDrag = true;
    };
    this.onCanvasMouseUp = function(evt) {
      self.isDrag = false;
    };
    // End
  };
  Easing2.prototype = Object.create(Easing1.prototype, {
    constructor: {
      value: Easing2,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  Easing2.prototype.constructor = Easing2;
  Easing2.prototype.update = function(sprite){
    if(!this.isDrag) {
      var vx    = (this.targetX - sprite.x) * this.easing;
      var vy    = (this.targetY - sprite.y) * this.easing;
      sprite.x += vx;
      sprite.y += vy;
    }
  };
  return Easing2;
})();