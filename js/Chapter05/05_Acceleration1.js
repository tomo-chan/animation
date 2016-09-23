var Acceleration1 = (function(){
  var clazz = function(render){
    ChapterBase.call(this, render);
    // Start
    this.vx = 0;
    this.ax = .2;
    // End
  };
  clazz.prototype = Object.create(ChapterBase.prototype);
  clazz.prototype.constructor = clazz;
  clazz.prototype.init = function(){
    //Start
    var self = this;
    var sprite = new Ball(this.canvas);
    sprite.x = 50;
    sprite.y = 100;
    // End
    sprite.update = function(){
      self.update();
    }
    this.sprite = sprite;
    this.addChild();
  };
  clazz.prototype.update = function(){
    this.vx       += this.ax;
    this.sprite.x += this.vx;
  };
  return clazz;
})();