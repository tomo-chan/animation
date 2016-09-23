var Ball = (function(){
  var Ball = function(canvas){
    Sprite.call(this, canvas);
    this.radius = 40;
    this.color  = '#ff0000';
    this.vx     = 0;
    this.vy     = 0;
  };
  Ball.prototype = Object.create(Sprite.prototype);
  Ball.prototype.constructor = Ball;
  Ball.prototype.getBounds = function(){
    return {
      "x": this.x - this.radius,
      "y": this.y - this.radius,
      "width": this.radius * 2,
      "height": this.radius * 2
    };
  };
  Ball.prototype.draw = function(){
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, Math.PI*2, false);
    this.context.fill();
  };
  return Ball;
})();