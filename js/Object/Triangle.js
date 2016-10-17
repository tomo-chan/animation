var Triangle = (function(){
  var Super = Sprite;
  var Triangle = function(a, b, c){
    Super.call(this);
    this.pointA = a || new Point3D(0, 0, 0);
    this.pointB = b || new Point3D(0, 0, 0);
    this.pointC = c || new Point3D(0, 0, 0);
    this.color = '#ff0000';
    this.light = new Light();
  };
  var Sub = Super.prototype.inherit.call(Super, Triangle);
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
    if(this.isBackFace()) { return; }
    this.context.fillStyle = this.hexToRGB(this.getAdjustedColor());
    this.context.beginPath();
    this.context.moveTo(this.pointA.x, this.pointA.y);
    this.context.lineTo(this.pointB.x, this.pointB.y);
    this.context.lineTo(this.pointC.x, this.pointC.y);
    this.context.lineTo(this.pointA.x, this.pointA.y);
    this.context.fill();
  };
  p.isBackFace = function() {
    var cax = this.pointC.x - this.pointA.x;
    var cay = this.pointC.y - this.pointA.y;
    var bcx = this.pointB.x - this.pointC.x;
    var bcy = this.pointB.y - this.pointC.y;
    return cax * bcy > cay * bcx;
  };
  p.depth = function() {
    var zpos = Math.min(this.pointA.z, this.pointB.z);
    return zpos;
  };
  p.getAdjustedColor = function() {
    var hex = this.color.replace('#','0x');
    var red = hex >> 16;
    var green = hex >> 8 & 0xff;
    var blue = hex & 0xff;
    
    var lightFactor = this.getLightFactor();

    red *= lightFactor;
    green *= lightFactor;
    blue *= lightFactor;

    return '#' + (red << 16 | green << 8 | blue).toString(16);
  };
  p.getLightFactor = function() {
    var ab = {};
    ab.x = this.pointA.x - this.pointB.x;
    ab.y = this.pointA.y - this.pointB.y;
    ab.z = this.pointA.z - this.pointB.z;

    var bc = {};
    bc.x = this.pointB.x - this.pointC.x;
    bc.y = this.pointB.y - this.pointC.y;
    bc.z = this.pointB.z - this.pointC.z;
    
    var norm = {};
    norm.x =   (ab.y * bc.z) - (ab.z * bc.y);
    norm.y = -((ab.x * bc.z) - (ab.z * bc.x));
    norm.z =   (ab.x * bc.y) - (ab.y * bc.x);

    var dotProd = norm.x * this.light.x + norm.y * this.light.y + norm.z * this.light.z;

    var normMag = Math.sqrt(norm.x * norm.x + norm.y * norm.y + norm.z * norm.z);
    var lightMag = Math.sqrt(this.light.x * this.light.x + this.light.y * this.light.y + this.light.z * this.light.z);

    return (Math.acos(dotProd / (normMag * lightMag)) / Math.PI);
  };
  return Sub;
})();