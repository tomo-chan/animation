var Arrow = (function(){
  var Arrow = function(canvas){
    Sprite.call(this, canvas);
    this.lineDash = [1, 0, 1];
    this.color    = '#ffff00';
  };
  Arrow.prototype = Object.create(Sprite.prototype);
  Arrow.prototype.constructor = Arrow;
  Arrow.prototype.getBounds = function(){
    return {
      "x": this.x,
      "y": this.y,
      "width": 100,
      "height": 100
    };
  };
  Arrow.prototype.draw = function(){
    this.context.fillStyle = this.color;
    this.context.setLineDash(this.lineDash);
    this.context.beginPath();
    this.context.moveTo(-50, -25);
    this.context.lineTo(  0, -25);
    this.context.lineTo(  0, -50);
    this.context.lineTo( 50,   0);
    this.context.lineTo(  0,  50);
    this.context.lineTo(  0,  25);
    this.context.lineTo(-50,  25);
    this.context.lineTo(-50, -25);
    this.context.stroke();
    this.context.fill();
  }
  return Arrow;
})();