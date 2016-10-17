var Ship = (function(){
  var Super = Sprite;
  var Ship = function(){
    Super.call(this);
    this.lineDash = [1, 0, 1];
    this.color    = '#ffff00';
    this.width    = 25;
    this.height   = 20;
  };
  var Sub = Super.prototype.inherit.call(Super, Ship);
  var p = Sub.prototype;
  p.getBounds = function(){
    return {
      "x": this.x - this.width / 2,
      "y": this.y - this.height / 2,
      "width": this.width,
      "height": this.height
    };
  };
  p.draw = function(){
    this.context.fillStyle = this.color;
    this.context.setLineDash(this.lineDash);
    this.context.beginPath();
    this.context.moveTo( 10,   0);
    this.context.lineTo(-10,  10);
    this.context.lineTo( -5,   0);
    this.context.lineTo(-10, -10);
    this.context.lineTo( 10,   0);
    this.context.stroke();
    if(this.showFrame) {
      this.context.beginPath();
      this.context.moveTo(-7.5,  -5);
      this.context.lineTo( -15,   0);
      this.context.lineTo(-7.5,   5);
      this.context.stroke();
    }
  };
  return Sub;
})();