var ShipSim = (function(){
  var ShipSim = function(render){
    ChapterBase.call(this, render);
    // Start
    this.x      = this.centerX();
    this.y      = this.centerY();
    this.vr     = 0;
    this.thrust = 0;
    this.vx     = 0;
    this.vy     = 0;

    var self = this;
    document.addEventListener('keydown', function(evt){
      switch (evt.code) {
        case 'ArrowLeft':
          self.vr = -5;
          break;
        case 'ArrowRight':
          self.vr = 5;
          break;
        case 'ArrowUp':
          self.thrust = 0.2;
          self.sprite.showFrame = true;
          break;
        default:
          break;
      }
    }, false);
    document.addEventListener('keyup', function(evt){
      self.vr               = 0;
      self.thrust           = 0;
      self.sprite.showFrame = false;
    }, false);
    // End
  };
  ShipSim.prototype = Object.create(ChapterBase.prototype);
  ShipSim.prototype.constructor = ShipSim;
  ShipSim.prototype.init = function(){
    //Start
    var sprite = new Ship();
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
  ShipSim.prototype.update = function(){
    this.sprite.rotation += this.vr * Math.PI / 180;
    var angle             = this.sprite.rotation;
    var ax                = Math.cos(angle) * this.thrust;
    var ay                = Math.sin(angle) * this.thrust;
    this.vx              += ax;
    this.vy              += ay;
    this.sprite.x        += this.vx;
    this.sprite.y        += this.vy;
  };
  return ShipSim;
})();