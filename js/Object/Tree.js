var Tree = (function(){
  var Super = Sprite;
  var Tree = function(){
    Super.call(this);
    this.color    = '#ffffff';
    this.width    = 140;
    this.height   = 100;

    this.branch    = [];
    this.branch[0] = -140 - Math.random() * 20;
    this.branch[1] = -30 - Math.random() * 30;
    this.branch[2] = Math.random() * 80 - 40;
    this.branch[3] = -100 - Math.random() * 40;
    this.branch[4] = -60 - Math.random() * 40;
    this.branch[5] = Math.random() * 60 - 30;
    this.branch[6] = -110 - Math.random() * 20;
  };
  var Sub = Super.prototype.inherit.call(Super, Tree);
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
    this.context.strokeStyle = this.hexToRGB(this.color, this.alpha);
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, this.branch[0]);
    this.context.moveTo(0, this.branch[1]);
    this.context.lineTo(this.branch[2], this.branch[3]);
    this.context.moveTo(0, this.branch[4]);
    this.context.lineTo(this.branch[5], this.branch[6]);
    this.context.stroke();
  };
  return Sub;
})();