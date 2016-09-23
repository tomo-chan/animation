var ShipSimFriction = (function(){
  var ShipSimFriction = function(render){
    ShipSim2.call(this, render);
    // Start
    this.friction = 0.9;
    // End
  };
  ShipSimFriction.prototype = Object.create(ShipSim2.prototype);
  ShipSimFriction.prototype.constructor = ShipSimFriction;
  ShipSimFriction.prototype.init = function(){
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
  ShipSimFriction.prototype.update = function(){
    this.sprite.rotation += this.vr * Math.PI / 180;
    var angle             = this.sprite.rotation;
    var ax                = Math.cos(angle) * this.thrust;
    var ay                = Math.sin(angle) * this.thrust;
    this.vx              += ax;
    this.vy              += ay;
    this.vx              *= this.friction;
    this.vy              *= this.friction;
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
  return ShipSimFriction;
})();