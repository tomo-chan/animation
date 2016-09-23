var Velocity1 = (function(){
  var Velocity1 = function(render){
    ChapterBase.call(this, render);
    // Start
    this.vx = 5;
    // End
  };
  Velocity1.prototype = Object.create(ChapterBase.prototype);
  Velocity1.prototype.constructor = Velocity1;
  Velocity1.prototype.init = function(){
    //Start
    var sprite = new Ball();
    sprite.x = 50;
    sprite.y = 100;
    // End
    var self = this;
    sprite.update = function(){
      self.update();
    };
    this.sprite = sprite;
    this.addChild();
  };
  Velocity1.prototype.update = function(){
    this.sprite.x += this.vx;
  };
  return Velocity1;
})();