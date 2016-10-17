var Arrow = (function(){
  var Super = Sprite;
  var Arrow = function(){
    Super.call(this);
    this.lineDash = [1, 0, 1];
    this.color    = '#ffff00';
  };
  var Sub = Super.prototype.inherit.call(Super, Arrow);
  var p = Sub.prototype;
  p.getBounds = function(){
    return {
      "x": this.x - 50,
      "y": this.y - 50,
      "width": 100,
      "height": 100
    };
  };
  p.draw = function(){
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
  return Sub;
})();