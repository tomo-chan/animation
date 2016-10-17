var Point3D = (function(){
  var Super = Sprite;
  var Point3D = function(xpos, ypos, zpos){
    Super.call(this);
    this.xpos = xpos || 0;
    this.ypos = ypos || 0;
    this.zpos = zpos || 0;
  };
  var Sub = Super.prototype.inherit.call(Super, Point3D);
  return Sub;
})();