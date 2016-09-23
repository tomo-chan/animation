var Velocity2 = (function(){
  var Velocity2 = function(render){
    Velocity1.call(this, render);
    // Start
    this.vy = 5;
    // End
  };
  Velocity2.prototype = Object.create(Velocity1.prototype);
  Velocity2.prototype.constructor = Velocity2;
  Velocity2.prototype.update = function(){
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
  };
  return Velocity2;
})();