var VelocityAngle = (function(){
  var VelocityAngle = function(render){
    Velocity2.call(this, render);
    // Start
    this.angle = 45;
    this.speed = 3;
    // End
  };
  VelocityAngle.prototype = Object.create(Velocity2.prototype);
  VelocityAngle.prototype.constructor = VelocityAngle;
  VelocityAngle.prototype.update = function(){
    var radians = this.angle * Math.PI / 180;
    var vx      = Math.cos(radians) * this.speed;
    var vy      = Math.sin(radians) * this.speed;
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
  };
  return VelocityAngle;
})();