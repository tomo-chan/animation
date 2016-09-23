var Bobbing = (function(){
  var clazz = function(render){
    ChapterBase.call(this, render);
    // Start
    this.x     = this.centerX();
    this.y     = this.centerY();
    this.angle = 0;
    // End
  };
  clazz.prototype = Object.create(ChapterBase.prototype);
  clazz.prototype.constructor = clazz;
  clazz.prototype.init = function(){
    //Start
    var sprite = new Ball();
    sprite.x = this.x;
    sprite.y = this.y;
    // End
    var self = this;
    sprite.update = function(){
      self.update();
    };
    this.sprite = sprite;
    this.addChild();
  };
  clazz.prototype.update = function(){
    this.sprite.y += Math.sin(this.angle) * 50;
    this.angle    += 0.1;
  };
  return clazz;
})();