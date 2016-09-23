var Acceleration3 = (function(){
  var Acceleration3 = function(render){
    Acceleration2.call(this, render);
    // Start
    this.vy = 0;
    this.ay = 0;

    var self = this;
    document.addEventListener('keydown', function(evt){
      switch (evt.code) {
        case 'ArrowLeft':
          self.ax = -0.2;
          break;
        case 'ArrowRight':
          self.ax = 0.2;
          break;
        case 'ArrowUp':
          self.ay = -0.2;
          break;
        case 'ArrowDown':
          self.ay = 0.2;
          break;
        default:
          break;
      }
    }, false);
    document.addEventListener('keyup', function(evt){
      self.ax = 0;
      self.ay = 0;
    }, false);
    // End
  };
  Acceleration3.prototype = Object.create(Acceleration2.prototype);
  Acceleration3.prototype.constructor = Acceleration3;
  Acceleration3.prototype.init = function(){
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
  Acceleration3.prototype.update = function(){
    this.vx       += this.ax;
    this.vy       += this.ay;
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
  };
  return Acceleration3;
})();