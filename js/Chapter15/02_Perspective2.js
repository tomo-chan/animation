var Perspective2 = (function(){
  var Super = Perspective1;
  var Perspective2 = function(render){
    Super.call(this, render);
    // Start
    this.xpos = 0;
    this.ypos = 0;
    this.zpos = 0;
    this.fl   = 250;
    this.vpX  = this.centerX();
    this.vpY  = this.centerY();
    // End
  };
  Perspective2.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Perspective2,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = Perspective2.prototype;
  p.update = function(sprite){
    if(this.zpos > -this.fl) {
      Super.prototype.update.call(this, sprite);
      sprite.visible = true;
    } else {
      sprite.visible = false;
    }
  };
  return Perspective2;
})();