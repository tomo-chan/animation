var Gravity = (function(){
  var Gravity = function(render){
    Acceleration3.call(this, render);
    // Start
    this.gravity = 0.1;
    // End
  };
  Gravity.prototype = Object.create(Acceleration3.prototype);
  Gravity.prototype.constructor = Gravity;
  Gravity.prototype.update = function(){
    this.vy += this.gravity;
    Acceleration3.prototype.update.call(this);
  };
  return Gravity;
})();