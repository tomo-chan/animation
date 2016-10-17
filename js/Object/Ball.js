var Ball = (function(){
  var Super = Sprite;
  var Ball = function() {
    Super.call(this);
    this.radius    = 40;
    this.color     = '#ff0000';
    this.lineWidth = 0;
  };
  var Sub = Super.prototype.inherit.call(Super, Ball);
  var p = Sub.prototype;
  p.getBounds = function(){
    return {
      "x": this.x - this.radius,
      "y": this.y - this.radius,
      "width": this.radius * 2,
      "height": this.radius * 2
    };
  };
  p.draw = function(){
    this.context.fillStyle = this.hexToRGB(this.color, this.alpha);
    this.context.lineWidth = this.lineWidth;
    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, Math.PI*2, false);
    this.context.fill();
  };
  return Sub;
})();