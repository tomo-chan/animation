var Spring4 = (function(){
  var Super = Spring3;
  var Spring4 = function(render){
    Super.call(this, render);
    // Startt
    // End
  };
  Spring4.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Spring4,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = Spring4.prototype;
  p.update = function(sprite){
    this.targetX = this.mouseX;
    this.targetY = this.mouseY;
    Super.prototype.update.call(this, sprite);
  };
  return Spring4;
})();