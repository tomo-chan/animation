var Light = (function(){
  var Super = Sprite;
  var Light = function(x, y, z, brightness){
    Super.call(this);
    this.x = x || -100;
    this.y = y || -100;
    this.z = z || -100;
    this.brightness = 1 || brightness;
  };
  var Sub = Super.prototype.inherit.call(Super, Light);
  var p = Sub.prototype;
  return Sub;
})();