var Acceleration2 = (function(){
  var clazz = function(render){
    Acceleration1.call(this, render);
    // Start
    this.ax = 0;

    var self = this;
    document.addEventListener('keydown', function(evt){
      if(evt.key === 'ArrowLeft') {
        self.ax = -0.2;
      } else if(evt.key === 'ArrowRight') {
        self.ax = 0.2;
      }
    }, false);
    document.addEventListener('keyup', function(evt){
      self.ax = 0;
    }, false);
    // End
  };
  clazz.prototype = Object.create(Acceleration1.prototype);
  clazz.prototype.constructor = clazz;
  clazz.prototype.init = function(){
    //Start
    var sprite = new Ball();
    sprite.x = 50;
    sprite.y = 100;
    // End
    var self = this;
    sprite.update = function(){
      self.update();
    }
    this.sprite = sprite;
    this.addChild();
  };
  clazz.prototype.update = function(){
    Acceleration1.prototype.update.call(this);
  };
  return clazz;
})();