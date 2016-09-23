var ShipSim2 = (function(){
  var ShipSim2 = function(render){
    ShipSim.call(this, render);
    // Start
    // End
  };
  ShipSim2.prototype = Object.create(ShipSim.prototype);
  ShipSim2.prototype.constructor = ShipSim2;
  ShipSim2.prototype.init = function(){
    //Start
    var sprite = new Ship();
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
  ShipSim2.prototype.update = function(){
    this.sprite.rotation += this.vr * Math.PI / 180;
    var angle             = this.sprite.rotation;
    var ax                = Math.cos(angle) * this.thrust;
    var ay                = Math.sin(angle) * this.thrust;
    this.vx              += ax;
    this.vy              += ay;
    this.sprite.x        += this.vx;
    this.sprite.y        += this.vy;
    var left   = 0;
    var right  = this.width();
    var top    = 0;
    var bottom = this.height();
    if(this.sprite.x - this.height / 2 > bottom) {
      this.sprite.y = top - this.sprite.height / 2;
    } else if(this.sprite.y < top - this.sprite.height / 2) {
      this.sprite.y = bottom + this.sprite.height / 2;
    }
  };
  return ShipSim2;
})();