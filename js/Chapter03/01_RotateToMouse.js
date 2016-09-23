var RotateToMouse = (function(){
  var clazz = function(render){
    ChapterBase.call(this, render);
    // Start
    this.x       = this.centerX();
    this.y       = this.centerY();
    this.radians = 0;
    // End
  };
  clazz.prototype = Object.create(ChapterBase.prototype);
  clazz.prototype.constructor = clazz;
  clazz.prototype.init = function(){
    //Start
    var sprite = new Arrow();
    sprite.x = this.x;
    sprite.y = this.y;
    // End
    var self = this;
    sprite.update = function(){
      self.update();
    }
    this.sprite = sprite;
    this.addChild();
  };
  clazz.prototype.update = function(){
    var dx      = this.mouseX - this.sprite.x;
    var dy      = this.mouseY - this.sprite.y;
    var radians = Math.atan2(dy, dx);
    this.sprite.rotation = radians;
  };
  return clazz;
})();